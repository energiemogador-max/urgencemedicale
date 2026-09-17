import type { CitySlug, ServiceSlug, SituationSlug, SpecialtySlug } from "../schema";

/**
 * The text a locale must supply to exist as a full translation of the site.
 *
 * Only TEXT is translated. Structure stays with the French content layer and
 * is never duplicated here: slugs, which pages exist, prices, response times,
 * doctors' Ordre numbers, coordinates. A translation therefore cannot add a
 * page, change a price or invent a doctor: it can only say the same thing in
 * another language.
 *
 * Keys:
 *  - quartiers:        the quartier slug (unique across cities)
 *  - serviceCities:    `${serviceSlug}/${citySlug}`
 *  - citySpecialties:  `${specialtySlug}/${citySlug}`
 *  - situationCities:  `${situationSlug}/${citySlug}`
 *  - languages:        the French language name used in content/doctors.ts
 *  - pricing:          the price tier slug
 *  - doctors:          the doctor slug
 */
export interface TextBlock {
  intro: string;
  body: string;
}

export interface LocaleTranslations {
  business: { legalName: string; street: string; city: string; region: string };
  languages: Record<string, string>;
  pricing: Record<string, { label: string; window: string }>;
  cities: Record<CitySlug, { name: string; region: string } & TextBlock>;
  quartiers: Record<string, { name: string; intro: string; landmarks: string[]; accessNotes: string }>;
  specialties: Record<SpecialtySlug, { name: string; shortDescription: string } & TextBlock>;
  situations: Record<SituationSlug, { title: string; shortDescription: string } & TextBlock>;
  services: Record<ServiceSlug, { name: string; shortDescription: string } & TextBlock>;
  serviceCities: Record<string, TextBlock>;
  citySpecialties: Record<string, TextBlock>;
  situationCities: Record<string, TextBlock>;
  aboutPage: TextBlock;
  doctors: Record<string, { name: string; bio: string }>;
}

/** A locale's translations are written across several files and merged. */
export type TranslationPart = { [K in keyof LocaleTranslations]?: Partial<LocaleTranslations[K]> };
