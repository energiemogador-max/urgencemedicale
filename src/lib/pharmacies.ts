import { z } from "zod";
import raw from "@content/pharmacies-garde.json";

/**
 * Les pharmacies de garde de Casablanca, relevées par
 * scripts/scrape-pharmacies.ts et validées ici avant d'atteindre un gabarit.
 *
 * DEUX RÈGLES TIENNENT CETTE PAGE
 *
 * 1. Rien d'invérifié ne sort d'ici. `publishable()` ne rend que les fiches
 *    confirmées par deux sources dont au moins une affichait la date du jour
 *    au moment de la collecte. Le filtre est à la frontière, pas dans le
 *    gabarit : aucun rendu ne peut publier une fiche non confirmée par
 *    inadvertance.
 *
 * 2. La date de la liste est publiée avec la liste. Une garde tourne chaque
 *    jour ; une liste sans date est au mieux inutile, au pire dangereuse. Si
 *    la régénération quotidienne échoue, la page continue d'afficher la date
 *    réelle du relevé, et le script inline de la page prévient le lecteur
 *    que cette date n'est pas celle d'aujourd'hui.
 *
 * Pourquoi Casablanca seulement : voir l'en-tête du script de collecte. Les
 * autres villes desservies n'ont aucune source vérifiable.
 */

const Entry = z.object({
  name: z.string().min(2),
  address: z.string(),
  phone: z.string().regex(/^\+212\d{9}$/, "téléphone hors format E.164 marocain"),
  kind: z.enum(["jour", "nuit", "24h", "inconnu"]),
  district: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  sources: z.array(z.object({ name: z.string(), date: z.string().nullable() })).min(1),
  confirmed: z.boolean(),
  stale: z.boolean(),
});

const City = z.object({
  collectedAt: z.string(),
  forDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  entries: z.array(Entry),
});

const Dataset = z.object({ casablanca: City });

export type GardeEntry = z.infer<typeof Entry>;

let cache: { forDate: string; collectedAt: string; entries: GardeEntry[] } | undefined;

/**
 * Les fiches publiables du jour, triées : les 24h d'abord — c'est la seule
 * information qui compte à trois heures du matin — puis par nom.
 */
export function garde(): { forDate: string; collectedAt: string; entries: GardeEntry[] } {
  if (cache) return cache;
  const parsed = Dataset.parse(raw).casablanca;
  const entries = parsed.entries
    .filter((e) => e.confirmed && !e.stale && e.phone)
    .sort((a, b) => {
      const rank = (k: GardeEntry["kind"]) => (k === "24h" ? 0 : k === "nuit" ? 1 : 2);
      return rank(a.kind) - rank(b.kind) || a.name.localeCompare(b.name, "fr");
    });
  cache = { forDate: parsed.forDate, collectedAt: parsed.collectedAt, entries };
  return cache;
}

/** Les sources distinctes citées par le relevé, pour l'attribution en pied de liste. */
export function gardeSources(): string[] {
  return [...new Set(garde().entries.flatMap((e) => e.sources.map((s) => s.name)))].sort();
}

/**
 * Clé de regroupement d'un secteur de garde.
 *
 * Les sources écrivent le même secteur de plusieurs façons — « Ville et
 * Bourgogne et Maarif » et « Ville Bourgogne Maarif » sont le même tour de
 * garde. On enlève les liaisons et les accents pour les réunir sous une
 * seule entrée du filtre, sinon le lecteur voit deux lignes pour un secteur
 * et croit en avoir manqué une.
 */
export function districtKey(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\b(et|de|du|la|le|les|d')\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");
}

export interface GardeDistrict {
  key: string;
  label: string;
  count: number;
}

/**
 * Les secteurs présents dans le relevé du jour, avec leur effectif, le plus
 * fourni d'abord. Le libellé retenu est la variante la plus complète : entre
 * « Ville Bourgogne Maarif » et « Ville et Bourgogne et Maarif », la seconde
 * se lit mieux.
 */
export function gardeDistricts(): GardeDistrict[] {
  const groups = new Map<string, { labels: string[]; count: number }>();
  for (const e of garde().entries) {
    if (!e.district) continue;
    const key = districtKey(e.district);
    const g = groups.get(key) ?? { labels: [], count: 0 };
    g.labels.push(e.district);
    g.count += 1;
    groups.set(key, g);
  }
  return [...groups]
    .map(([key, g]) => ({
      key,
      label: g.labels.sort((a, b) => b.length - a.length)[0]!,
      count: g.count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fr"));
}

/** Nombre de fiches sans secteur indiqué — le filtre leur réserve une entrée. */
export function gardeWithoutDistrict(): number {
  return garde().entries.filter((e) => !e.district).length;
}

/** « 2026-09-18 » -> « vendredi 18 septembre 2026 », dans la locale demandée. */
export function formatGardeDate(iso: string, locale: "fr" | "en" | "ar"): string {
  const tag = locale === "ar" ? "ar-MA" : locale === "en" ? "en-GB" : "fr-MA";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!)).toLocaleDateString(tag, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
