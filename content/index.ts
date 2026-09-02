import { ContentSchema, isPlaceholder } from "./schema";
import type { Content } from "./schema";
import { MIN_WORDS, countWords } from "./thresholds";
import { business } from "./business";
import { doctors } from "./doctors";
import { pricing } from "./pricing";
import { aboutPage } from "./pages";
import { reviews } from "./reviews";
import { cities, quartiers } from "./geo";
import { specialties } from "./specialties";
import { situations } from "./situations";
import { services } from "./services";
import { serviceCities } from "./service-cities";
import { citySpecialties, situationCities } from "./combinations";

const raw: Content = {
  business,
  doctors,
  pricing,
  aboutPage,
  reviews,
  cities,
  quartiers,
  specialties,
  situations,
  services,
  serviceCities,
  citySpecialties,
  situationCities,
};

/** Recursively collects every unfilled TODO placeholder, with a JSON-path-like location. */
function collectPlaceholders(value: unknown, path: string, out: string[]): void {
  if (typeof value === "string") {
    if (isPlaceholder(value)) out.push(`${path}: ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectPlaceholders(item, `${path}[${i}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, val] of Object.entries(value)) {
      collectPlaceholders(val, path ? `${path}.${key}` : key, out);
    }
  }
}

/**
 * Checks each templated page's unique-content word count against
 * content/thresholds.ts. Skipped per-field while that field still has an
 * unfilled placeholder (already reported by the placeholder scan above), so
 * the two checks don't double-report the same unwritten page — this check is
 * what starts firing once Phase 5 replaces placeholders with real, but
 * possibly too-thin, prose.
 */
function checkThresholds(c: Content): string[] {
  const errors: string[] = [];

  function check(label: string, fields: string[], min: number) {
    if (fields.some(isPlaceholder)) return;
    const words = countWords(fields.join(" "));
    if (words < min) {
      errors.push(`${label}: only ${words} unique word(s), needs at least ${min}`);
    }
  }

  for (const city of c.cities) {
    check(`cities.${city.slug}`, [city.intro, city.body], MIN_WORDS.cityHub);
  }
  for (const q of c.quartiers) {
    check(`quartiers.${q.slug}`, [q.intro, ...q.landmarks, ...q.nearestHospitals, q.accessNotes], MIN_WORDS.quartier);
  }
  for (const s of c.specialties) {
    check(`specialties.${s.slug}`, [s.intro, s.body], MIN_WORDS.specialtyHub);
  }
  for (const s of c.situations) {
    check(`situations.${s.slug}`, [s.intro, s.body], MIN_WORDS.situation);
  }
  for (const s of c.services) {
    check(`services.${s.slug}`, [s.intro, s.body], MIN_WORDS.service);
  }
  for (const sc of c.serviceCities) {
    check(`serviceCities.${sc.serviceSlug}.${sc.citySlug}`, [sc.intro, sc.body], MIN_WORDS.serviceCity);
  }
  for (const cs of c.citySpecialties) {
    check(`citySpecialties.${cs.citySlug}.${cs.specialtySlug}`, [cs.intro, cs.body], MIN_WORDS.citySpecialty);
  }
  for (const sc of c.situationCities) {
    check(`situationCities.${sc.situationSlug}.${sc.citySlug}`, [sc.intro, sc.body], MIN_WORDS.situationCity);
  }

  return errors;
}

export interface ContentValidationResult {
  ok: boolean;
  errors: string[];
}

export function validateContent(): ContentValidationResult {
  const errors: string[] = [];

  const parsed = ContentSchema.safeParse(raw);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors.push(`${issue.path.join(".")}: ${issue.message}`);
    }
  }

  const placeholders: string[] = [];
  collectPlaceholders(raw, "", placeholders);
  errors.push(...placeholders.map((p) => `unfilled placeholder at ${p}`));

  errors.push(...checkThresholds(raw));

  return { ok: errors.length === 0, errors };
}

/**
 * Throws a single aggregated error listing every problem if content is
 * invalid or still has placeholders. Not called eagerly here — this module
 * stays side-effect-free so `scripts/validate-content.ts` can report cleanly.
 * `src/lib/content.ts` (the app-facing loader every page imports from) calls
 * this at module scope instead, so it fails loudly in both `next dev` and
 * `next build`.
 */
export function assertContentValid(): Content {
  const result = validateContent();
  if (!result.ok) {
    throw new Error(
      `Content validation failed (${result.errors.length} issue(s)):\n` +
        result.errors.map((e) => `  - ${e}`).join("\n")
    );
  }
  return raw;
}

export { business, doctors, pricing, aboutPage, reviews, cities, quartiers, specialties, situations, services, serviceCities };
