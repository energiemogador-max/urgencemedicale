import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SPECIALTY_ELIGIBLE_CITY_SLUGS,
  type CitySlug,
  type ServiceSlug,
  type SituationSlug,
  type SpecialtySlug,
} from "@content/schema";
import { content } from "@/lib/content";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { SpecialtyHubPage } from "@/components/templates/SpecialtyHubPage";
import { CitySpecialtyPage } from "@/components/templates/CitySpecialtyPage";
import { SituationPage } from "@/components/templates/SituationPage";
import { SituationCityPage } from "@/components/templates/SituationCityPage";
import { ServicePage } from "@/components/templates/ServicePage";
import { ServiceCityPage } from "@/components/templates/ServiceCityPage";
import { pageMetadata } from "@/lib/seo";

/**
 * Shared logic behind the `{specialty}-a-domicile/`, `{situation}/` and
 * `{service}/` route families, in every language. Next.js requires one
 * `page.tsx` per URL segment, but every specialty (and every situation, and
 * every service) renders through the exact same lookup + notFound + template
 * — so that logic lives once here. French route folders call these with the
 * default locale; the /en and /ar dispatchers (src/lib/render-page.tsx) pass
 * theirs.
 */

// ---- specialty hub (/{specialty}-a-domicile) -------------------------------

export function specialtyHubMetadata(specialtySlug: SpecialtySlug, locale: Locale = "fr"): Metadata {
  const specialty = api(locale).getSpecialtyBySlug(specialtySlug);
  if (!specialty) return {};
  return pageMetadata({
    title: dict(locale).meta.specialtyHub(specialty.name),
    description: specialty.intro,
    path: paths.specialtyHub(specialty.slug),
    locale,
  });
}

export function SpecialtyHubRoute({ specialtySlug, locale = "fr" }: { specialtySlug: SpecialtySlug; locale?: Locale }) {
  const a = api(locale);
  const specialty = a.getSpecialtyBySlug(specialtySlug);
  if (!specialty) notFound();
  const cities = a
    .getCitiesForSpecialty(specialtySlug)
    .map((cs) => a.getCityBySlug(cs.citySlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  return (
    <SpecialtyHubPage
      locale={locale}
      specialty={specialty}
      cities={cities}
      otherSpecialties={a.content.specialties.filter((s) => s.slug !== specialtySlug)}
      doctors={a.getDoctorsBySpecialty(specialtySlug)}
    />
  );
}

// ---- specialty x city spoke (/{specialty}-a-domicile/[city]) --------------

export function specialtyCityStaticParams(): { city: CitySlug }[] {
  return SPECIALTY_ELIGIBLE_CITY_SLUGS.map((city) => ({ city }));
}

export function citySpecialtyMetadata(specialtySlug: SpecialtySlug, citySlug: string, locale: Locale = "fr"): Metadata {
  const a = api(locale);
  const specialty = a.getSpecialtyBySlug(specialtySlug);
  const city = a.getCityBySlug(citySlug);
  const cs = specialty && city ? a.getCitySpecialty(city.slug, specialty.slug) : undefined;
  if (!specialty || !city || !cs) return {};
  return pageMetadata({
    title: dict(locale).meta.citySpecialty(specialty.name, city.name),
    description: cs.intro,
    path: paths.citySpecialty(specialty.slug, city.slug),
    locale,
  });
}

export function CitySpecialtyRoute({
  specialtySlug,
  citySlug,
  locale = "fr",
}: {
  specialtySlug: SpecialtySlug;
  citySlug: string;
  locale?: Locale;
}) {
  const a = api(locale);
  const specialty = a.getSpecialtyBySlug(specialtySlug);
  const city = a.getCityBySlug(citySlug);
  const cs = specialty && city ? a.getCitySpecialty(city.slug, specialty.slug) : undefined;
  if (!specialty || !city || !cs) notFound();
  return (
    <CitySpecialtyPage
      locale={locale}
      specialty={specialty}
      city={city}
      citySpecialty={cs}
      quartiers={a.getQuartiersForCity(city.slug)}
      otherSpecialties={a.content.specialties.filter((s) => s.slug !== specialtySlug)}
    />
  );
}

// ---- situation standalone (/{situation}) -----------------------------------

/**
 * Appends the main city to a hub page's title when there is room for it.
 *
 * Search Console (2026-09-04) shows most query impressions coming from
 * Morocco, on queries that are explicitly local. The titles being served
 * carried no city at all, spending their last characters on the phone number
 * and none on where the service operates.
 *
 * The city is added first and the phone number only if it still fits, because
 * for a local query the city is what makes the result look like the right
 * answer. Only hub pages go through here: city and quartier pages already
 * name their own place.
 */
function withCityScope(title: string, locale: Locale): string {
  const city = api(locale).content.business.address.city;
  if (title.includes(city)) return title;
  const scoped = dict(locale).inCity(title, city);
  return scoped.length <= 60 ? scoped : title;
}

export function situationMetadata(situationSlug: SituationSlug, locale: Locale = "fr"): Metadata {
  const situation = api(locale).getSituationBySlug(situationSlug);
  if (!situation) return {};
  return pageMetadata({
    title: withCityScope(situation.title, locale),
    description: situation.intro,
    path: paths.situation(situation.slug),
    locale,
  });
}

export function SituationRoute({ situationSlug, locale = "fr" }: { situationSlug: SituationSlug; locale?: Locale }) {
  const a = api(locale);
  const situation = a.getSituationBySlug(situationSlug);
  if (!situation) notFound();
  const cities = situation.geoMultiplied
    ? a
        .getCitiesForSituation(situationSlug)
        .map((sc) => a.getCityBySlug(sc.citySlug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
    : [];
  return (
    <SituationPage
      locale={locale}
      situation={situation}
      cities={cities}
      otherSituations={a.content.situations.filter((s) => s.slug !== situationSlug)}
    />
  );
}

// ---- situation x city spoke (/{situation}/[city], geo-multiplied only) ----

export function situationCityStaticParams(): { city: CitySlug }[] {
  return content.cities.map((c) => ({ city: c.slug }));
}

export function situationCityMetadata(situationSlug: SituationSlug, citySlug: string, locale: Locale = "fr"): Metadata {
  const a = api(locale);
  const situation = a.getSituationBySlug(situationSlug);
  const city = a.getCityBySlug(citySlug);
  const sc = situation && city ? a.getSituationCity(situation.slug, city.slug) : undefined;
  if (!situation || !city || !sc) return {};
  return pageMetadata({
    title: dict(locale).meta.situationCity(situation.title, city.name),
    description: sc.intro,
    path: paths.situationCity(situation.slug, city.slug),
    locale,
  });
}

export function SituationCityRoute({
  situationSlug,
  citySlug,
  locale = "fr",
}: {
  situationSlug: SituationSlug;
  citySlug: string;
  locale?: Locale;
}) {
  const a = api(locale);
  const situation = a.getSituationBySlug(situationSlug);
  const city = a.getCityBySlug(citySlug);
  const sc = situation && city ? a.getSituationCity(situation.slug, city.slug) : undefined;
  if (!situation || !city || !sc) notFound();
  return (
    <SituationCityPage
      locale={locale}
      situation={situation}
      city={city}
      situationCity={sc}
      quartiers={a.getQuartiersForCity(city.slug)}
      otherSituations={a.content.situations.filter((s) => s.slug !== situationSlug)}
    />
  );
}

// ---- service standalone (/{service}) ---------------------------------------

export function serviceMetadata(serviceSlug: ServiceSlug, locale: Locale = "fr"): Metadata {
  const service = api(locale).getServiceBySlug(serviceSlug);
  if (!service) return {};
  return pageMetadata({
    title: withCityScope(service.name, locale),
    description: service.intro,
    path: paths.service(service.slug),
    locale,
  });
}

export function ServiceRoute({ serviceSlug, locale = "fr" }: { serviceSlug: ServiceSlug; locale?: Locale }) {
  const a = api(locale);
  const service = a.getServiceBySlug(serviceSlug);
  if (!service) notFound();
  const cities = service.geoMultiplied
    ? a
        .getCitiesForService(serviceSlug)
        .map((sc) => a.getCityBySlug(sc.citySlug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
    : [];
  return (
    <ServicePage
      locale={locale}
      service={service}
      cities={cities}
      otherServices={a.content.services.filter((s) => s.slug !== serviceSlug)}
    />
  );
}

// ---- service x city spoke (/{service}/[city], geo-multiplied only) --------

export function serviceCityStaticParams(serviceSlug: ServiceSlug): { city: CitySlug }[] {
  return content.serviceCities.filter((sc) => sc.serviceSlug === serviceSlug).map((sc) => ({ city: sc.citySlug }));
}

export function serviceCityMetadata(serviceSlug: ServiceSlug, citySlug: string, locale: Locale = "fr"): Metadata {
  const a = api(locale);
  const service = a.getServiceBySlug(serviceSlug);
  const city = a.getCityBySlug(citySlug);
  const sc = service && city ? a.getServiceCity(service.slug, city.slug) : undefined;
  if (!service || !city || !sc) return {};
  return pageMetadata({
    title: dict(locale).meta.serviceCity(service.name, city.name),
    description: sc.intro,
    path: paths.serviceCity(service.slug, city.slug),
    locale,
  });
}

export function ServiceCityRoute({
  serviceSlug,
  citySlug,
  locale = "fr",
}: {
  serviceSlug: ServiceSlug;
  citySlug: string;
  locale?: Locale;
}) {
  const a = api(locale);
  const service = a.getServiceBySlug(serviceSlug);
  const city = a.getCityBySlug(citySlug);
  const sc = service && city ? a.getServiceCity(service.slug, city.slug) : undefined;
  if (!service || !city || !sc) notFound();
  return (
    <ServiceCityPage
      locale={locale}
      service={service}
      city={city}
      serviceCity={sc}
      quartiers={a.getQuartiersForCity(city.slug)}
      otherServices={a.content.services.filter((s) => s.slug !== serviceSlug)}
    />
  );
}
