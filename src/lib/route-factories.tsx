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

export function situationMetadata(situationSlug: SituationSlug): Metadata {
  const situation = getSituationBySlug(situationSlug);
  if (!situation) return {};
  return pageMetadata({ title: situation.title, description: situation.intro, path: paths.situation(situation.slug) });
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
  return pageMetadata({ title: service.name, description: service.intro, path: paths.service(service.slug) });
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
