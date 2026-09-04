import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SPECIALTY_ELIGIBLE_CITY_SLUGS,
  type CitySlug,
  type ServiceSlug,
  type SituationSlug,
  type SpecialtySlug,
} from "@content/schema";
import {
  content,
  getCityBySlug,
  getCitiesForSituation,
  getCitiesForSpecialty,
  getCitySpecialty,
  getCitiesForService,
  getDoctorsBySpecialty,
  getQuartiersForCity,
  getServiceBySlug,
  getServiceCity,
  getSituationBySlug,
  getSituationCity,
  getSpecialtyBySlug,
} from "@/lib/content";
import { paths } from "@/lib/urls";
import { SpecialtyHubPage } from "@/components/templates/SpecialtyHubPage";
import { CitySpecialtyPage } from "@/components/templates/CitySpecialtyPage";
import { SituationPage } from "@/components/templates/SituationPage";
import { SituationCityPage } from "@/components/templates/SituationCityPage";
import { ServicePage } from "@/components/templates/ServicePage";
import { ServiceCityPage } from "@/components/templates/ServiceCityPage";
import { pageMetadata } from "@/lib/seo";

/**
 * Shared logic behind the `{specialty}-a-domicile/`, `{situation}/` and
 * `{service}/` route families. Next.js requires one `page.tsx` per URL
 * segment, but every specialty (and every situation, and every service)
 * renders through the exact same lookup + notFound + template — so that logic
 * lives once here, and each literal route folder's page.tsx is just a few
 * lines parameterizing the slug.
 */

// ---- specialty hub (/{specialty}-a-domicile) -------------------------------

export function specialtyHubMetadata(specialtySlug: SpecialtySlug): Metadata {
  const specialty = getSpecialtyBySlug(specialtySlug);
  if (!specialty) return {};
  return pageMetadata({ title: `${specialty.name} à domicile`, description: specialty.intro, path: paths.specialtyHub(specialty.slug) });
}

export function SpecialtyHubRoute({ specialtySlug }: { specialtySlug: SpecialtySlug }) {
  const specialty = getSpecialtyBySlug(specialtySlug);
  if (!specialty) notFound();
  const cities = getCitiesForSpecialty(specialtySlug)
    .map((cs) => getCityBySlug(cs.citySlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const otherSpecialties = content.specialties.filter((s) => s.slug !== specialtySlug);
  return (
    <SpecialtyHubPage
      specialty={specialty}
      cities={cities}
      otherSpecialties={otherSpecialties}
      doctors={getDoctorsBySpecialty(specialtySlug)}
    />
  );
}

// ---- specialty x city spoke (/{specialty}-a-domicile/[city]) --------------

export function specialtyCityStaticParams(): { city: CitySlug }[] {
  return SPECIALTY_ELIGIBLE_CITY_SLUGS.map((city) => ({ city }));
}

export function citySpecialtyMetadata(specialtySlug: SpecialtySlug, citySlug: string): Metadata {
  const specialty = getSpecialtyBySlug(specialtySlug);
  const city = getCityBySlug(citySlug);
  const cs = specialty && city ? getCitySpecialty(city.slug, specialty.slug) : undefined;
  if (!specialty || !city || !cs) return {};
  return pageMetadata({ title: `${specialty.name} à domicile à ${city.name}`, description: cs.intro, path: paths.citySpecialty(specialty.slug, city.slug) });
}

export function CitySpecialtyRoute({ specialtySlug, citySlug }: { specialtySlug: SpecialtySlug; citySlug: string }) {
  const specialty = getSpecialtyBySlug(specialtySlug);
  const city = getCityBySlug(citySlug);
  const cs = specialty && city ? getCitySpecialty(city.slug, specialty.slug) : undefined;
  if (!specialty || !city || !cs) notFound();
  return (
    <CitySpecialtyPage
      specialty={specialty}
      city={city}
      citySpecialty={cs}
      quartiers={getQuartiersForCity(city.slug)}
      otherSpecialties={content.specialties.filter((s) => s.slug !== specialtySlug)}
    />
  );
}

// ---- situation standalone (/{situation}) -----------------------------------

/**
 * Appends the main city to a hub page's title when there is room for it.
 *
 * Search Console (2026-09-04) shows 80 of 97 query impressions coming from
 * Morocco, on queries that are explicitly local — "urgences médicales
 * casablanca", "ambulance casablanca ain sebaa", "medecin geriatre a
 * domicile". The titles being served carried no city at all: they read
 * "Certificat médical à domicile | 06 01 99 12 96", spending their last 17
 * characters on the phone number and none on where the service operates.
 *
 * The city is added first and the phone number only if it still fits, because
 * for a local query the city is what makes the result look like the right
 * answer. clampTitle() drops the phone when it no longer fits, which is the
 * correct trade rather than a regression.
 *
 * Only hub pages go through here. City and quartier pages already name their
 * own place, and adding a second one would read as spam.
 */
function withCityScope(title: string): string {
  const city = content.business.address.city;
  if (title.includes(city)) return title;
  const scoped = `${title} à ${city}`;
  return scoped.length <= 60 ? scoped : title;
}

export function situationMetadata(situationSlug: SituationSlug): Metadata {
  const situation = getSituationBySlug(situationSlug);
  if (!situation) return {};
  return pageMetadata({
    title: withCityScope(situation.title),
    description: situation.intro,
    path: paths.situation(situation.slug),
  });
}

export function SituationRoute({ situationSlug }: { situationSlug: SituationSlug }) {
  const situation = getSituationBySlug(situationSlug);
  if (!situation) notFound();
  const cities = situation.geoMultiplied
    ? getCitiesForSituation(situationSlug)
        .map((sc) => getCityBySlug(sc.citySlug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
    : [];
  const otherSituations = content.situations.filter((s) => s.slug !== situationSlug);
  return <SituationPage situation={situation} cities={cities} otherSituations={otherSituations} />;
}

// ---- situation x city spoke (/{situation}/[city], geo-multiplied only) ----

export function situationCityStaticParams(): { city: CitySlug }[] {
  return content.cities.map((c) => ({ city: c.slug }));
}

export function situationCityMetadata(situationSlug: SituationSlug, citySlug: string): Metadata {
  const situation = getSituationBySlug(situationSlug);
  const city = getCityBySlug(citySlug);
  const sc = situation && city ? getSituationCity(situation.slug, city.slug) : undefined;
  if (!situation || !city || !sc) return {};
  return pageMetadata({ title: `${situation.title} à ${city.name}`, description: sc.intro, path: paths.situationCity(situation.slug, city.slug) });
}

export function SituationCityRoute({ situationSlug, citySlug }: { situationSlug: SituationSlug; citySlug: string }) {
  const situation = getSituationBySlug(situationSlug);
  const city = getCityBySlug(citySlug);
  const sc = situation && city ? getSituationCity(situation.slug, city.slug) : undefined;
  if (!situation || !city || !sc) notFound();
  return (
    <SituationCityPage
      situation={situation}
      city={city}
      situationCity={sc}
      quartiers={getQuartiersForCity(city.slug)}
      otherSituations={content.situations.filter((s) => s.slug !== situationSlug)}
    />
  );
}

// ---- service standalone (/{service}) ---------------------------------------

export function serviceMetadata(serviceSlug: ServiceSlug): Metadata {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};
  return pageMetadata({
    title: withCityScope(service.name),
    description: service.intro,
    path: paths.service(service.slug),
  });
}

export function ServiceRoute({ serviceSlug }: { serviceSlug: ServiceSlug }) {
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();
  const cities = service.geoMultiplied
    ? getCitiesForService(serviceSlug)
        .map((sc) => getCityBySlug(sc.citySlug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
    : [];
  const otherServices = content.services.filter((s) => s.slug !== serviceSlug);
  return <ServicePage service={service} cities={cities} otherServices={otherServices} />;
}

// ---- service x city spoke (/{service}/[city], geo-multiplied only) --------

export function serviceCityStaticParams(serviceSlug: ServiceSlug): { city: CitySlug }[] {
  return getCitiesForService(serviceSlug).map((sc) => ({ city: sc.citySlug }));
}

export function serviceCityMetadata(serviceSlug: ServiceSlug, citySlug: string): Metadata {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  const sc = service && city ? getServiceCity(service.slug, city.slug) : undefined;
  if (!service || !city || !sc) return {};
  return pageMetadata({ title: `${service.name} à ${city.name}`, description: sc.intro, path: paths.serviceCity(service.slug, city.slug) });
}

export function ServiceCityRoute({ serviceSlug, citySlug }: { serviceSlug: ServiceSlug; citySlug: string }) {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  const sc = service && city ? getServiceCity(service.slug, city.slug) : undefined;
  if (!service || !city || !sc) notFound();
  return (
    <ServiceCityPage
      service={service}
      city={city}
      serviceCity={sc}
      quartiers={getQuartiersForCity(city.slug)}
      otherServices={content.services.filter((s) => s.slug !== serviceSlug)}
    />
  );
}
