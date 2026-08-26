import { todo } from "./schema";
import type { City, Quartier } from "./schema";

/**
 * Cities and their approximate public city-center coordinates (used only for
 * areaServed, not the business's own address — that lives in business.ts and
 * is a required placeholder). Names, slugs and regions are public geography,
 * not invented business data.
 */
export const cities: City[] = [
  { slug: "casablanca", name: "Casablanca", region: "Casablanca-Settat", lat: 33.5731, lng: -7.5898, hasQuartierPages: true },
  { slug: "rabat", name: "Rabat", region: "Rabat-Salé-Kénitra", lat: 34.0209, lng: -6.8416, hasQuartierPages: false },
  { slug: "marrakech", name: "Marrakech", region: "Marrakech-Safi", lat: 31.6295, lng: -7.9811, hasQuartierPages: false },
  { slug: "tanger", name: "Tanger", region: "Tanger-Tétouan-Al Hoceïma", lat: 35.7595, lng: -5.834, hasQuartierPages: false },
  { slug: "agadir", name: "Agadir", region: "Souss-Massa", lat: 30.4278, lng: -9.5981, hasQuartierPages: false },
  { slug: "fes", name: "Fès", region: "Fès-Meknès", lat: 34.0331, lng: -5.0003, hasQuartierPages: false },
  { slug: "sale", name: "Salé", region: "Rabat-Salé-Kénitra", lat: 34.0531, lng: -6.7985, hasQuartierPages: false },
  { slug: "temara", name: "Témara", region: "Rabat-Salé-Kénitra", lat: 33.9287, lng: -6.9061, hasQuartierPages: false },
  { slug: "mohammedia", name: "Mohammedia", region: "Casablanca-Settat", lat: 33.6863, lng: -7.383, hasQuartierPages: false },
  { slug: "kenitra", name: "Kénitra", region: "Rabat-Salé-Kénitra", lat: 34.261, lng: -6.5802, hasQuartierPages: false },
  { slug: "tetouan", name: "Tétouan", region: "Tanger-Tétouan-Al Hoceïma", lat: 35.5785, lng: -5.3684, hasQuartierPages: false },
  { slug: "oujda", name: "Oujda", region: "Oriental", lat: 34.6805, lng: -1.9086, hasQuartierPages: false },
  { slug: "meknes", name: "Meknès", region: "Fès-Meknès", lat: 33.8935, lng: -5.5473, hasQuartierPages: false },
  { slug: "el-jadida", name: "El Jadida", region: "Casablanca-Settat", lat: 33.2316, lng: -8.5007, hasQuartierPages: false },
  { slug: "bouskoura", name: "Bouskoura", region: "Casablanca-Settat", lat: 33.4425, lng: -7.6564, hasQuartierPages: false },
  { slug: "dar-bouazza", name: "Dar Bouazza", region: "Casablanca-Settat", lat: 33.5333, lng: -7.7833, hasQuartierPages: false },
];

/**
 * Casablanca quartiers (Phase 2's uncontested ground). Names/slugs are real;
 * response time, landmarks, nearest hospitals and access notes are local
 * knowledge that must be authored/verified in Phase 5 — left as TODO
 * placeholders here so the build fails instead of shipping invented facts.
 */
const QUARTIER_NAMES: { slug: string; name: string }[] = [
  { slug: "maarif", name: "Maarif" },
  { slug: "gauthier", name: "Gauthier" },
  { slug: "racine", name: "Racine" },
  { slug: "bourgogne", name: "Bourgogne" },
  { slug: "anfa", name: "Anfa" },
  { slug: "ain-diab", name: "Ain Diab" },
  { slug: "californie", name: "Californie" },
  { slug: "oasis", name: "Oasis" },
  { slug: "sidi-maarouf", name: "Sidi Maarouf" },
  { slug: "hay-hassani", name: "Hay Hassani" },
  { slug: "derb-sultan", name: "Derb Sultan" },
  { slug: "belvedere", name: "Belvédère" },
  { slug: "roches-noires", name: "Roches Noires" },
  { slug: "ain-sebaa", name: "Ain Sebaâ" },
  { slug: "bernoussi", name: "Bernoussi" },
  { slug: "cil", name: "CIL" },
  { slug: "beausejour", name: "Beauséjour" },
  { slug: "val-fleuri", name: "Val Fleuri" },
  { slug: "ain-chock", name: "Ain Chock" },
];

export const quartiers: Quartier[] = QUARTIER_NAMES.map(({ slug, name }) => ({
  slug,
  name,
  citySlug: "casablanca",
  responseTimeMinutes: todo(`${name} response time commitment in minutes`),
  landmarks: [todo(`${name} landmarks/streets a local would recognise`)],
  nearestHospitals: [todo(`${name} nearest named hospital(s)/clinic(s)`)],
  accessNotes: todo(`${name} access specifics (traffic, gated residences, street layout)`),
}));
