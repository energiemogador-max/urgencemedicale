import type { CitySlug, Content, ServiceSlug, SituationSlug, SpecialtySlug } from "@content/schema";
import { localizeContent } from "@content/i18n";
import { content as frenchContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * Content for any locale, with the same lookups src/lib/content.ts offers for
 * French. `api("fr")` is the French content itself; `api("en")` and
 * `api("ar")` are the same graph with translated text (content/i18n).
 *
 * Templates call `api(locale)` instead of importing `content` directly, so one
 * template renders all three languages.
 */
function build(c: Content) {
  return {
    content: c,
    getCityBySlug: (slug: string) => c.cities.find((x) => x.slug === slug),
    getQuartiersForCity: (city: CitySlug) => c.quartiers.filter((q) => q.citySlug === city),
    getQuartierBySlug: (city: CitySlug, slug: string) => c.quartiers.find((q) => q.citySlug === city && q.slug === slug),
    getSpecialtyBySlug: (slug: string) => c.specialties.find((x) => x.slug === slug),
    getSituationBySlug: (slug: string) => c.situations.find((x) => x.slug === slug),
    getServiceBySlug: (slug: string) => c.services.find((x) => x.slug === slug),
    getDoctorsBySpecialty: (s: SpecialtySlug) => c.doctors.filter((d) => d.specialtySlug === s),
    getCitySpecialty: (city: string, s: string) => c.citySpecialties.find((x) => x.citySlug === city && x.specialtySlug === s),
    getCitiesForSpecialty: (s: SpecialtySlug) => c.citySpecialties.filter((x) => x.specialtySlug === s),
    getSituationCity: (s: string, city: string) => c.situationCities.find((x) => x.situationSlug === s && x.citySlug === city),
    getCitiesForSituation: (s: SituationSlug) => c.situationCities.filter((x) => x.situationSlug === s),
    getServiceCity: (s: string, city: string) => c.serviceCities.find((x) => x.serviceSlug === s && x.citySlug === city),
    getCitiesForService: (s: ServiceSlug) => c.serviceCities.filter((x) => x.serviceSlug === s),
    /** Props for <TrustBlock>; see src/lib/content.ts for the reasoning. */
    getTrustBlockProps: (responseTimeMinutesOverride?: string) => {
      const sole = c.doctors.length === 1 ? c.doctors[0] : undefined;
      return {
        doctorName: sole?.name,
        ordreNumber: sole?.ordreNumber,
        doctorCount: c.doctors.length,
        city: c.business.address.city,
        responseTimeMinutes: responseTimeMinutesOverride ?? c.business.defaultResponseTimeMinutes,
      };
    },
  };
}

export type ContentApi = ReturnType<typeof build>;

const cache = new Map<Locale, ContentApi>();

export function api(locale: Locale): ContentApi {
  let a = cache.get(locale);
  if (!a) {
    a = build(locale === "fr" ? frenchContent : localizeContent(frenchContent, locale));
    cache.set(locale, a);
  }
  return a;
}
