import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SPECIALTY_ELIGIBLE_CITY_SLUGS,
  type CitySlug,
  type SituationSlug,
  type SpecialtySlug,
} from "@content/schema";
import {
  content,
  getCityBySlug,
  getCitiesForSituation,
  getCitiesForSpecialty,
  getCitySpecialty,
  getQuartiersForCity,
  getSituationBySlug,
  getSituationCity,
  getSpecialtyBySlug,
} from "@/lib/content";
import { paths } from "@/lib/urls";
import { SpecialtyHubPage } from "@/components/templates/SpecialtyHubPage";
import { CitySpecialtyPage } from "@/components/templates/CitySpecialtyPage";
import { SituationPage } from "@/components/templates/SituationPage";
import { SituationCityPage } from "@/components/templates/SituationCityPage";

/**
 * Shared logic behind the 5 `{specialty}-a-domicile/` routes and the 6
 * `{situation}/` routes. Next.js requires one `page.tsx` per URL segment, but
 * every specialty (and every situation) renders through the exact same
 * lookup + notFound + template — so that logic lives once here, and each
 * literal route folder's page.tsx is just a few lines parameterizing the slug.
 */

// ---- specialty hub (/{specialty}-a-domicile) -------------------------------

export function specialtyHubMetadata(specialtySlug: SpecialtySlug): Metadata {
  const specialty = getSpecialtyBySlug(specialtySlug);
  if (!specialty) return {};
  return {
    title: `${specialty.name} à domicile`,
    description: specialty.intro,
    alternates: { canonical: paths.specialtyHub(specialty.slug) },
  };
}

export function SpecialtyHubRoute({ specialtySlug }: { specialtySlug: SpecialtySlug }) {
  const specialty = getSpecialtyBySlug(specialtySlug);
  if (!specialty) notFound();
  const cities = getCitiesForSpecialty(specialtySlug)
    .map((cs) => getCityBySlug(cs.citySlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const otherSpecialties = content.specialties.filter((s) => s.slug !== specialtySlug);
  return <SpecialtyHubPage specialty={specialty} cities={cities} otherSpecialties={otherSpecialties} />;
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
  return {
    title: `${specialty.name} à domicile à ${city.name}`,
    description: cs.intro,
    alternates: { canonical: paths.citySpecialty(specialty.slug, city.slug) },
  };
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
  return {
    title: situation.title,
    description: situation.intro,
    alternates: { canonical: paths.situation(situation.slug) },
  };
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
  return {
    title: `${situation.title} à ${city.name}`,
    description: sc.intro,
    alternates: { canonical: paths.situationCity(situation.slug, city.slug) },
  };
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
