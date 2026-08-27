import { assertContentValid } from "@content/index";
import type { CitySlug, ServiceSlug, SituationSlug, SpecialtySlug } from "@content/schema";

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

export function getCitySpecialty(citySlug: string, specialtySlug: string) {
  return content.citySpecialties.find((cs) => cs.citySlug === citySlug && cs.specialtySlug === specialtySlug);
}

export function getCitiesForSpecialty(specialtySlug: SpecialtySlug) {
  return content.citySpecialties.filter((cs) => cs.specialtySlug === specialtySlug);
}

export function getSituationCity(situationSlug: string, citySlug: string) {
  return content.situationCities.find((sc) => sc.situationSlug === situationSlug && sc.citySlug === citySlug);
}

export function getCitiesForSituation(situationSlug: SituationSlug) {
  return content.situationCities.filter((sc) => sc.situationSlug === situationSlug);
}

export function getServiceBySlug(slug: string) {
  return content.services.find((s) => s.slug === slug);
}

export function getServiceCity(serviceSlug: string, citySlug: string) {
  return content.serviceCities.find((sc) => sc.serviceSlug === serviceSlug && sc.citySlug === citySlug);
}

export function getCitiesForService(serviceSlug: ServiceSlug) {
  return content.serviceCities.filter((sc) => sc.serviceSlug === serviceSlug);
}

/**
 * Props for <TrustBlock>, defaulting to the site-wide response time unless a
 * page has its own (e.g. a quartier).
 *
 * A single doctor is named outright — that's the strongest E-E-A-T signal and
 * no competitor publishes it. With a team, the badge switches to the headcount
 * instead, because naming one of seven on every page attaches the wrong
 * doctor to most of them.
 */
export function getTrustBlockProps(responseTimeMinutesOverride?: string) {
  const soleDoctor = content.doctors.length === 1 ? content.doctors[0] : undefined;
  return {
    doctorName: soleDoctor?.name,
    ordreNumber: soleDoctor?.ordreNumber,
    doctorCount: content.doctors.length,
    city: content.business.address.city,
    responseTimeMinutes: responseTimeMinutesOverride ?? content.business.defaultResponseTimeMinutes,
  };
}
