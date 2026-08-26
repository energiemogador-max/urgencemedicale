import { assertContentValid } from "@content/index";
import type { CitySlug, SpecialtySlug } from "@content/schema";

/**
 * The single content entry point for app code. Asserting validity at module
 * scope means any route that imports from here fails immediately — in both
 * `next dev` and `next build` — if content is malformed or still has
 * unfilled placeholders, instead of rendering invented data.
 */
export const content = assertContentValid();

export function getCityBySlug(slug: string) {
  return content.cities.find((c) => c.slug === slug);
}

export function getQuartiersForCity(citySlug: CitySlug) {
  return content.quartiers.filter((q) => q.citySlug === citySlug);
}

export function getQuartierBySlug(citySlug: CitySlug, slug: string) {
  return content.quartiers.find((q) => q.citySlug === citySlug && q.slug === slug);
}

export function getSpecialtyBySlug(slug: string) {
  return content.specialties.find((s) => s.slug === slug);
}

export function getSituationBySlug(slug: string) {
  return content.situations.find((s) => s.slug === slug);
}

export function getDoctorsBySpecialty(specialtySlug: SpecialtySlug) {
  return content.doctors.filter((d) => d.specialtySlug === specialtySlug);
}
