/**
 * Collecte des pharmacies de garde pour les villes desservies.
 *
 * La rotation des gardes est arrêtée par le gouverneur de la préfecture ou
 * de la province, sur proposition du conseil régional de l'Ordre des
 * pharmaciens (loi 17-04). Elle n'est publiée nulle part en données
 * ouvertes : sur data.gov.ma, « Listes globale des pharmacies de gardes du
 * royaume » n'existe qu'à l'état de demande. À défaut de source primaire
 * accessible, ce script relève la liste du jour sur plusieurs sites publics
 * qui la republient, et ne retient que ce sur quoi ils s'accordent.
 *
 * Règles de collecte :
 *  - pages HTML publiques uniquement, jamais les endpoints /api/, que tous
 *    ces sites interdisent dans leur robots.txt ;
 *  - un agent identifiable et une adresse de contact ;
 *  - une requête à la fois, avec un délai entre chaque.
 *
 * Un fait — « telle pharmacie est de garde ce soir » — n'appartient à
 * personne. Le recoupement sert donc deux fins à la fois : il vérifie la
 * donnée, et il produit notre propre relevé plutôt que la copie de la base
 * d'un tiers. Une entrée donnée par une seule source est conservée mais
 * marquée comme non confirmée ; c'est au moment de la publication qu'on
 * décide quoi faire d'elle.
 *
 * Usage : npx tsx scripts/scrape-pharmacies.ts [--out <fichier.json>] [--city <slug>]
 */

const UA =
  "Mozilla/5.0 (compatible; urgencemedicale/1.0; +https://urgencemedicale.ma/contact)";

const DELAY_MS = 2500;

/** Villes desservies. dar-bouazza n'est couvert par aucune source connue. */
const CITIES = ["casablanca", "rabat", "mohammedia", "bouskoura"] as const;
type City = (typeof CITIES)[number];

export type GardeKind = "jour" | "nuit" | "24h" | "inconnu";

export interface RawEntry {
  source: string;
  city: City;
  name: string;
  address: string;
  phone: string;
  kind: GardeKind;
  district?: string;
  hours?: string;
  lat?: number;
  lon?: number;
  /** Date que la source revendique pour SA liste (ISO), si elle l'affiche. */
  sourceDate?: string;
}

export interface MergedEntry {
  name: string;
  address: string;
  phone: string;
  kind: GardeKind;
  district?: string;
  lat?: number;
  lon?: number;
  /** Sources qui donnent cette pharmacie de garde, avec la date de chacune. */
  sources: { name: string; date: string | null }[];
  /**
   * Confirmée = au moins deux sources concordent ET au moins l'une d'elles
   * affiche la date du jour. Deux sources d'accord sur des dates
   * différentes ne prouvent rien : la garde tourne quotidiennement, et une
   * liste de la veille recopiée n'est pas une vérification.
   */
  confirmed: boolean;
  /** true si aucune source ne revendique la date du jour. */
  stale: boolean;
}

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

/** 0522638758 / +212 522 63 87 58 -> +212522638758 */
export function normalizePhone(raw: string): string {
  const d = raw.replace(/[^\d+]/g, "");
  if (d.startsWith("+212")) return "+212" + d.slice(4).replace(/^0/, "");
  if (d.startsWith("212")) return "+212" + d.slice(3).replace(/^0/, "");
  if (d.startsWith("0")) return "+212" + d.slice(1);
  return d ? "+212" + d : "";
}

/** Clé de rapprochement : sans accents, sans « pharmacie », sans ponctuation. */
export function nameKey(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/pharmacie|pharmacy|صيدلية/g, " ")
    .replace(/[^a-z0-9؀-ۿ]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const NAMED: Record<string, string> = {
  nbsp: " ", amp: "&", quot: '"', apos: "'", rsquo: "'", lsquo: "'",
  eacute: "é", egrave: "è", ecirc: "ê", agrave: "à", acirc: "â",
  ccedil: "ç", ocirc: "ô", ugrave: "ù", ucirc: "û", icirc: "î",
  iuml: "ï", euml: "ë", deg: "°", laquo: "«", raquo: "»", hellip: "…",
  ndash: "–", mdash: "—",
};

function decode(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    // Entités numériques, décimales et hexadécimales : &#039; &#x27; …
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Corrige les dégâts d'encodage présents en amont. aidoctor.ma sert
 * « Pharmacie Val D 039 Anfa » : l'apostrophe a été mangée par un double
 * encodage (&#039;) quelque part dans leur chaîne, et la séquence arrive
 * telle quelle. On répare plutôt que de republier la faute.
 */
export function repair(s: string): string {
  return s
    .replace(/\s0?39\s/g, "'")
    .replace(/\s?&#x?0*(27|39);\s?/gi, "'")
    .replace(/\bD'\s*/g, "d'")
    .replace(/\s+/g, " ")
    .trim();
}

/** « Ain chock » / « Ain Chock » -> « Ain Chock ». */
export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length > 2 && !["et", "de", "du", "la", "le", "les"].includes(w) ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ")
    .trim();
}

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** « vendredi 18 septembre 2026 » -> « 2026-09-18 ». */
export function parseFrenchDate(text: string): string | null {
  const m = text
    .normalize("NFC")
    .match(/(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(20\d\d)/i);
  if (!m) return null;
  const day = Number(m[1]);
  const month = MOIS.indexOf(m[2]!.toLowerCase()) + 1;
  if (month === 0) return null;
  return `${m[3]}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** La date que la page revendique pour sa liste, si elle l'affiche. */
export function sourceDateOf(html: string): string | null {
  const text = decode(html.replace(/<(script|style)[\s\S]*?<\/\1>/g, " "));
  const claim = text.match(
    /(?:derni[eè]re liste[^.]{0,40}|mise à jour[^.]{0,40}|liste du[^.]{0,40}|aujourd'hui[^.]{0,40})/i,
  );
  return parseFrenchDate(claim?.[0] ?? "") ?? parseFrenchDate(text.slice(0, 3000));
}

/**
 * Bandeaux, titres et compteurs que les pages rendent dans le même balisage
 * que les fiches. Sans ce filtre, « Liste mise à jour aujourd'hui (vendredi
 * 18 septembre 2026) ✓ » se retrouve publié comme nom de pharmacie.
 */
export function isBanner(name: string): boolean {
  const n = name.toLowerCase();
  return (
    /lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/.test(n) ||
    /derni[eè]re liste|mise à jour|liste du|liste des|pharmacies? de garde à|✓|voir la liste|aujourd'hui/.test(n) ||
    /^\d/.test(n.trim()) ||
    name.trim().length < 3
  );
}

function kindFrom(text: string): GardeKind {
  const t = text.toLowerCase();
  if (/24\s*h|permanence|24\/24/.test(t)) return "24h";
  if (/nuit/.test(t)) return "nuit";
  if (/jour/.test(t)) return "jour";
  return "inconnu";
}

// ---------------------------------------------------------------------------
// Récupération
// ---------------------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html" },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Un 404 rendu en 200 (page « erreur ») ne doit pas être analysé.
    if (/erreur-404|page introuvable|not found/i.test(html.slice(0, 4000))) return null;
    return html;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Analyseurs, un par source
// ---------------------------------------------------------------------------

/**
 * aidoctor.ma — liste en <li>, la plus complète et la seule qui donne
 * l'arrondissement. robots.txt autorise explicitement /pharmacie-de-garde/*.
 */
export function parseAidoctor(html: string, city: City): RawEntry[] {
  const out: RawEntry[] = [];
  const items = html.match(/<li[^>]*>[\s\S]*?<\/li>/g) ?? [];
  for (const li of items) {
    const name = li.match(/<strong[^>]*>([\s\S]*?)<\/strong>/)?.[1];
    const tel = li.match(/href="tel:([^"]+)"/)?.[1];
    if (!name || !tel) continue;
    const spans = [...li.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)].map((m) => decode(m[1]!));
    if (spans.length === 0) continue;
    const status = spans[0] ?? "";
    const address = spans[1] ?? "";
    const districtRaw = spans[2] ?? "";
    const district = districtRaw.replace(/^\(|\)$/g, "").trim();
    out.push({
      source: "aidoctor.ma",
      city,
      name: decode(name),
      address,
      phone: normalizePhone(tel),
      kind: kindFrom(status),
      district: district || undefined,
    });
  }
  return out;
}

/**
 * sahha.ma — cartes rendues côté serveur, plus un ItemList JSON-LD (partiel)
 * qui porte les coordonnées. robots.txt autorise les pages, pas /api/.
 */
export function parseSahha(html: string, city: City): RawEntry[] {
  const out: RawEntry[] = [];

  // Coordonnées disponibles pour une partie des fiches, via JSON-LD.
  const geo = new Map<string, { lat: number; lon: number }>();
  for (const block of html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) ?? []) {
    const json = block.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try {
      const data = JSON.parse(json);
      for (const li of data?.itemListElement ?? []) {
        const it = li?.item;
        if (it?.["@type"] === "Pharmacy" && it?.geo) {
          geo.set(nameKey(it.name ?? ""), { lat: it.geo.latitude, lon: it.geo.longitude });
        }
      }
    } catch {
      /* bloc non pertinent */
    }
  }

  // Les cartes : <h3>…<a>Nom</a></h3> … badge … adresse … <bdi>téléphone</bdi>
  const cards = html.split(/<h3[^>]*>/).slice(1);
  for (const card of cards) {
    const name = card.match(/<a[^>]*>([\s\S]*?)<\/a>/)?.[1];
    const phone = card.match(/<bdi[^>]*>([\s\S]*?)<\/bdi>/)?.[1];
    const address = card.match(/<span class="break-words">([\s\S]*?)<\/span>/)?.[1];
    if (!name || !phone) continue;
    const head = card.slice(0, card.indexOf("break-words") + 1 || 1200);
    out.push({
      source: "sahha.ma",
      city,
      name: decode(name),
      address: address ? decode(address) : "",
      phone: normalizePhone(decode(phone)),
      kind: kindFrom(decode(head)),
      ...(geo.get(nameKey(decode(name))) ?? {}),
    });
  }
  return out;
}

/** pharmacieenpermanence.ma — un sous-domaine par ville, cartes avec horaires. */
export function parsePermanence(html: string, city: City): RawEntry[] {
  const out: RawEntry[] = [];
  const cards = html.split(/<article|<div class="[^"]*rounded-/).slice(1);
  for (const card of cards) {
    const tel = card.match(/href="tel:([^"]+)"/)?.[1];
    if (!tel) continue;
    const name =
      card.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/)?.[1] ??
      card.match(/class="[^"]*font-semibold[^"]*"[^>]*>([\s\S]*?)</)?.[1];
    if (!name) continue;
    const address = card.match(/<span class="line-clamp-2">([\s\S]*?)<\/span>/)?.[1];
    const hours = card.match(/<span>(\d{1,2}h[\d:h\- ]*\d{0,2}h?)<\/span>/)?.[1];
    out.push({
      source: "pharmacieenpermanence.ma",
      city,
      name: decode(name),
      address: address ? decode(address) : "",
      phone: normalizePhone(tel),
      kind: hours ? kindFrom(hours.includes("20h") || hours.includes("21h") ? "jour" : hours) : "inconnu",
      hours: hours ? decode(hours) : undefined,
    });
  }
  return out;
}

const SOURCES: {
  name: string;
  url: (c: City) => string | null;
  parse: (html: string, c: City) => RawEntry[];
}[] = [
  {
    name: "aidoctor.ma",
    url: (c) => (c === "bouskoura" ? null : `https://aidoctor.ma/pharmacie-de-garde/${c}`),
    parse: parseAidoctor,
  },
  {
    name: "sahha.ma",
    url: (c) => (c === "bouskoura" ? null : `https://sahha.ma/pharmacie-de-garde/${c}`),
    parse: parseSahha,
  },
  {
    name: "pharmacieenpermanence.ma",
    url: (c) => `https://${c}.pharmacieenpermanence.ma/`,
    parse: parsePermanence,
  },
];

// ---------------------------------------------------------------------------
// Recoupement
// ---------------------------------------------------------------------------

/**
 * Deux relevés désignent la même officine si le téléphone concorde, ou, à
 * défaut de téléphone exploitable, si le nom normalisé concorde. Le nom seul
 * ne suffit pas : « Pharmacie Al Amal » existe plusieurs fois par ville.
 */
export function merge(entries: RawEntry[], today: string): MergedEntry[] {
  const byKey = new Map<string, RawEntry[]>();
  for (const e of entries) {
    const key = e.phone && e.phone.length >= 12 ? e.phone : `name:${nameKey(e.name)}`;
    const list = byKey.get(key) ?? [];
    list.push(e);
    byKey.set(key, list);
  }

  const merged: MergedEntry[] = [];
  for (const group of byKey.values()) {
    const seen = new Map<string, string | null>();
    for (const g of group) if (!seen.has(g.source)) seen.set(g.source, g.sourceDate ?? null);
    const sources = [...seen].map(([name, date]) => ({ name, date })).sort((a, b) => a.name.localeCompare(b.name));

    // On garde la valeur la plus renseignée de chaque champ.
    // À champ égal, on préfère la version non abîmée : une source peut
    // servir « Val D 039 Anfa » là où l'autre a gardé l'apostrophe.
    const damaged = (v: string) => /\s0?39\s|&#|�/.test(v);
    const longest = (pick: (e: RawEntry) => string | undefined) => {
      const vals = group.map(pick).filter((v): v is string => !!v);
      const clean = vals.filter((v) => !damaged(v));
      return (clean.length ? clean : vals).sort((a, b) => b.length - a.length)[0];
    };
    const kinds = group.map((g) => g.kind).filter((k) => k !== "inconnu");
    const geo = group.find((g) => g.lat != null);

    const freshSources = sources.filter((s) => s.date === today);
    merged.push({
      name: repair(longest((e) => e.name) ?? ""),
      address: repair(longest((e) => e.address) ?? ""),
      phone: group.find((g) => g.phone)?.phone ?? "",
      // « 24h » l'emporte : c'est l'information la plus utile la nuit, et la
      // plus prudente à afficher si deux sources divergent.
      kind: kinds.includes("24h") ? "24h" : (kinds[0] ?? "inconnu"),
      district: (() => { const d = longest((e) => e.district); return d ? titleCase(repair(d)) : undefined; })(),
      lat: geo?.lat,
      lon: geo?.lon,
      sources,
      confirmed: sources.length >= 2 && freshSources.length >= 1,
      stale: freshSources.length === 0,
    });
  }
  merged.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  return merged;
}

// ---------------------------------------------------------------------------
// Entrée
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const outPath = args[args.indexOf("--out") + 1] && args.includes("--out") ? args[args.indexOf("--out") + 1]! : "";
  const only = args.includes("--city") ? args[args.indexOf("--city") + 1] : null;
  const cities = (only ? [only] : CITIES) as City[];

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" });
  console.log(`date du jour (Casablanca) : ${today}\n`);

  const result: Record<string, { collectedAt: string; forDate: string; entries: MergedEntry[] }> = {};

  for (const city of cities) {
    const raw: RawEntry[] = [];
    for (const src of SOURCES) {
      const url = src.url(city);
      if (!url) continue;
      const html = await fetchPage(url);
      if (!html) {
        console.log(`  ${city.padEnd(12)} ${src.name.padEnd(26)} — indisponible`);
        await sleep(DELAY_MS);
        continue;
      }
      const date = sourceDateOf(html);
      const parsed = src
        .parse(html, city)
        .filter((e) => !isBanner(e.name))
        .map((e) => ({ ...e, sourceDate: date ?? undefined }));
      raw.push(...parsed);
      const flag = date === today ? "à jour" : date ? `PÉRIMÉE (${date})` : "sans date";
      console.log(
        `  ${city.padEnd(12)} ${src.name.padEnd(26)} ${String(parsed.length).padStart(3)} entrée(s)  [${flag}]`,
      );
      await sleep(DELAY_MS);
    }
    const entries = merge(raw, today);
    const confirmed = entries.filter((e) => e.confirmed).length;
    const stale = entries.filter((e) => e.stale).length;
    console.log(
      `  ${city.padEnd(12)} => ${entries.length} officine(s), ${confirmed} publiable(s), ${stale} sans source du jour\n`,
    );
    result[city] = { collectedAt: new Date().toISOString(), forDate: today, entries };
  }

  const json = JSON.stringify(result, null, 2);
  if (outPath) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(outPath, json, "utf8");
    console.log(`écrit -> ${outPath}`);
  } else {
    console.log(json);
  }
}

if (process.argv[1]?.includes("scrape-pharmacies")) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
