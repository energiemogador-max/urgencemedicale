import { todo } from "./schema";
import type { City, Quartier } from "./schema";
import { CITY_DRAFTS } from "./drafts/cities";
import { QUARTIER_DRAFTS } from "./drafts/quartiers";

/**
 * Cities and their approximate public city-center coordinates (used only for
 * areaServed, not the business's own address — that lives in business.ts and
 * is a required placeholder). Names, slugs and regions are public geography,
 * not invented business data.
 */
const CITY_NAMES: { slug: City["slug"]; name: string; region: string; lat: number; lng: number }[] = [
  { slug: "casablanca", name: "Casablanca", region: "Casablanca-Settat", lat: 33.5731, lng: -7.5898 },
  { slug: "rabat", name: "Rabat", region: "Rabat-Salé-Kénitra", lat: 34.0209, lng: -6.8416 },
  { slug: "mohammedia", name: "Mohammedia", region: "Casablanca-Settat", lat: 33.6863, lng: -7.383 },
  { slug: "bouskoura", name: "Bouskoura", region: "Casablanca-Settat", lat: 33.4425, lng: -7.6564 },
  { slug: "dar-bouazza", name: "Dar Bouazza", region: "Casablanca-Settat", lat: 33.5333, lng: -7.7833 },
];
/**
 * Cities no longer served (operator, 2026-08-27): Marrakech, Tanger, Agadir,
 * Fès, Salé, Témara, Kénitra, Tétouan, Oujda, Meknès, El Jadida.
 *
 * Their written page content is still in content/drafts/ — nothing was
 * deleted. Restoring one means adding its slug back to CITY_SLUGS in
 * schema.ts and its row to CITY_NAMES above; the drafts are picked up
 * automatically and the build gates report anything still missing.
 */


const QUARTIER_NAMES: { slug: string; name: string; city: City["slug"] }[] = [
  { slug: "maarif", name: "Maarif", city: "casablanca" },
  { slug: "gauthier", name: "Gauthier", city: "casablanca" },
  { slug: "racine", name: "Racine", city: "casablanca" },
  { slug: "bourgogne", name: "Bourgogne", city: "casablanca" },
  { slug: "anfa", name: "Anfa", city: "casablanca" },
  { slug: "ain-diab", name: "Ain Diab", city: "casablanca" },
  { slug: "californie", name: "Californie", city: "casablanca" },
  { slug: "oasis", name: "Oasis", city: "casablanca" },
  { slug: "sidi-maarouf", name: "Sidi Maarouf", city: "casablanca" },
  { slug: "hay-hassani", name: "Hay Hassani", city: "casablanca" },
  { slug: "derb-sultan", name: "Derb Sultan", city: "casablanca" },
  { slug: "belvedere", name: "Belvédère", city: "casablanca" },
  { slug: "roches-noires", name: "Roches Noires", city: "casablanca" },
  { slug: "ain-sebaa", name: "Ain Sebaâ", city: "casablanca" },
  { slug: "bernoussi", name: "Bernoussi", city: "casablanca" },
  { slug: "cil", name: "CIL", city: "casablanca" },
  { slug: "beausejour", name: "Beauséjour", city: "casablanca" },
  { slug: "val-fleuri", name: "Val Fleuri", city: "casablanca" },
  { slug: "ain-chock", name: "Ain Chock", city: "casablanca" },
  // ── Rabat ─────────────────────────────────────────────────────────────
  // Rabat is a served city that had no neighbourhood pages at all while
  // Casablanca had 19 — the largest content gap on the site, and these are
  // real queries ("médecin à domicile Agdal").
  { slug: "agdal", name: "Agdal", city: "rabat" },
  { slug: "souissi", name: "Souissi", city: "rabat" },
  { slug: "hassan", name: "Hassan", city: "rabat" },
  { slug: "hay-riad", name: "Hay Riad", city: "rabat" },
  { slug: "yacoub-el-mansour", name: "Yacoub El Mansour", city: "rabat" },
  { slug: "les-orangers", name: "Les Orangers", city: "rabat" },
  { slug: "l-ocean", name: "L'Océan", city: "rabat" },
  { slug: "aviation", name: "Aviation", city: "rabat" },
  // ── Mohammedia ────────────────────────────────────────────────────────
  { slug: "mohammedia-centre", name: "Centre-ville", city: "mohammedia" },
  { slug: "al-alia", name: "Al Alia", city: "mohammedia" },
  { slug: "quartier-du-parc", name: "Quartier du Parc", city: "mohammedia" },
  { slug: "hassania", name: "Hassania", city: "mohammedia" },

  // ── Bouskoura ─────────────────────────────────────────────────────────
  // sosadomicilemaroc.com targets "bouskoura" in its title with a 620-word
  // site and no sitemap at all. This is the least defended ground in the
  // whole market.
  { slug: "bouskoura-ville-verte", name: "Ville Verte", city: "bouskoura" },
  { slug: "bouskoura-centre", name: "Centre de Bouskoura", city: "bouskoura" },
  { slug: "bouskoura-golf-city", name: "Golf City", city: "bouskoura" },

  // ── Dar Bouazza ───────────────────────────────────────────────────────
  { slug: "tamaris", name: "Tamaris", city: "dar-bouazza" },
  { slug: "dar-bouazza-centre", name: "Centre de Dar Bouazza", city: "dar-bouazza" },
  { slug: "sable-dor", name: "Sable d'Or", city: "dar-bouazza" },
];

export const cities: City[] = CITY_NAMES.map((c) => {
  const draft = CITY_DRAFTS[c.slug];
  return {
    ...c,
    // Derived, never asserted. Kept as a separate boolean it drifted the day
    // Rabat gained quartiers: the pages appeared in the sitemap while the
    // route refused to generate them, which is a 404 announced to Google.
    hasQuartierPages: QUARTIER_NAMES.some((q) => q.city === c.slug),
    intro: draft?.intro ?? todo(`${c.name} intro — 2-3 sentence answer-shaped opening for "médecin à domicile ${c.name}"`),
    body: draft?.body ?? todo(`${c.name} unique body content (coverage area, what makes this city's service distinct)`),
  };
});

/**
 * Casablanca quartiers (Phase 2's uncontested ground). Names/slugs are real;
 * response time, landmarks, nearest hospitals and access notes are local
 * knowledge that must be authored/verified in Phase 5 — left as TODO
 * placeholders here so the build fails instead of shipping invented facts.
 */


/**
 * responseTimeMinutes uses the operator's citywide range (10 à 15 min) for
 * every quartier — real per-neighborhood numbers
 * may differ once dispatch is live. nearestHospitals is NOT invented: a
 * visible "[À CONFIRMER]" marker stands in for each of the 19 quartiers
 * until real, verified facility names are supplied.
 */
export const quartiers: Quartier[] = QUARTIER_NAMES.map(({ slug, name, city }) => {
  const draft = QUARTIER_DRAFTS[slug];
  return {
    slug,
    name,
    citySlug: city,
    intro: draft?.intro ?? todo(`${name} intro — 2-3 sentence answer-shaped opening for "médecin à domicile ${name}"`),
    responseTimeMinutes: "10 à 15",
    landmarks: draft?.landmarks ?? [todo(`${name} landmarks/streets a local would recognise`)],
    nearestHospitals: ["[À CONFIRMER]"],
    accessNotes: draft?.accessNotes ?? todo(`${name} access specifics (traffic, gated residences, street layout)`),
  };
});
