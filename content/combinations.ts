import {
  CITY_SLUGS,
  GEO_MULTIPLIED_SITUATION_SLUGS,
  SPECIALTY_ELIGIBLE_CITY_SLUGS,
  SPECIALTY_SLUGS,
  todo,
} from "./schema";
import type { CitySpecialty, SituationCity } from "./schema";
import { cities } from "./geo";
import { specialties } from "./specialties";
import { situations } from "./situations";

function cityName(slug: string): string {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}
function specialtyName(slug: string): string {
  return specialties.find((s) => s.slug === slug)?.name ?? slug;
}
function situationTitle(slug: string): string {
  return situations.find((s) => s.slug === slug)?.title ?? slug;
}

/**
 * Top-6-cities x 5-specialties spoke pages (Phase 2 rule: "City x specialty:
 * top 6 cities only"). Each pair needs its own unique intro/body — never
 * mail-merged from the parent city/specialty pages, which would ship
 * duplicate/thin content across 30 pages.
 */
export const citySpecialties: CitySpecialty[] = SPECIALTY_ELIGIBLE_CITY_SLUGS.flatMap((citySlug) =>
  SPECIALTY_SLUGS.map(
    (specialtySlug): CitySpecialty => ({
      citySlug,
      specialtySlug,
      intro: todo(
        `${specialtyName(specialtySlug)} à domicile ${cityName(citySlug)} intro — 2-3 sentence answer-shaped opening`
      ),
      body: todo(`${specialtyName(specialtySlug)} à domicile ${cityName(citySlug)} unique body content`),
    })
  )
);

/**
 * 3-highest-intent-situations x all-16-cities spoke pages (Phase 2 rule).
 * Same non-mail-merge requirement as above.
 */
export const situationCities: SituationCity[] = GEO_MULTIPLIED_SITUATION_SLUGS.flatMap((situationSlug) =>
  CITY_SLUGS.map(
    (citySlug): SituationCity => ({
      situationSlug,
      citySlug,
      intro: todo(`${situationTitle(situationSlug)} ${cityName(citySlug)} intro — 2-3 sentence answer-shaped opening`),
      body: todo(`${situationTitle(situationSlug)} ${cityName(citySlug)} unique body content`),
    })
  )
);
