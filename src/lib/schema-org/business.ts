import type { MedicalBusinessLeaf, MedicalSpecialty, MedicalTherapy, Place, WithContext } from "schema-dts";
import type { SpecialtySlug } from "@content/schema";
import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { SPECIALTY_TO_SCHEMA_ORG } from "./specialty-map";

export const BUSINESS_ID = `${SITE_URL}/#business` as const;

/**
 * schema-dts's generated `MedicalBusinessLeaf` only extends `LocalBusinessBase`
 * (a single-inheritance codegen artifact) even though schema.org's real
 * vocabulary also gives MedicalBusiness every MedicalOrganization property
 * (medicalSpecialty, availableService, isAcceptingNewPatients — see
 * https://schema.org/MedicalBusiness, "Properties from MedicalOrganization").
 * This intersection restores those properties with their real schema-dts
 * value types instead of casting to `any`.
 */
type MedicalBusinessNode = MedicalBusinessLeaf & {
  medicalSpecialty?: MedicalSpecialty[];
  availableService?: MedicalTherapy[];
  isAcceptingNewPatients?: boolean;
};

/** All seven days — this service is 24/7, so both hours nodes use the full week. */
const ALL_DAYS = [
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
  "https://schema.org/Saturday",
  "https://schema.org/Sunday",
] as const;

/**
 * A 24/7 emergency contact point, in the languages the doctors actually
 * consult in.
 *
 * Added after a live competitor sweep (2026-08-28): omnidoc.ma and
 * sosmedecinmaroc.com both publish ContactPoint and we did not. It is the
 * node that tells Google this is a number to call rather than a string of
 * digits on a page, and `availableLanguage` is a claim none of them make.
 */
function buildContactPoint(languages: string[]) {
  const { business } = content;
  return {
    "@type": "ContactPoint" as const,
    contactType: "emergency",
    telephone: business.phoneHref,
    availableLanguage: languages,
    areaServed: content.cities.map((c) => c.name),
    hoursAvailable: {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: ALL_DAYS,
      opens: "00:00",
      closes: "23:59",
    },
  };
}

/**
 * The single site-wide MedicalBusiness/LocalBusiness node — full address,
 * geo, 24/7 opening hours, every specialty and city served. Emitted once on
 * the homepage; every other page's JSON-LD references it by @id instead of
 * repeating the full graph.
 */
export function buildMedicalBusiness(): WithContext<MedicalBusinessNode> {
  const { business } = content;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": BUSINESS_ID,
    name: business.legalName,
    telephone: business.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressRegion: business.address.region,
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: Number(business.geo.lat),
      longitude: Number(business.geo.lng),
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ALL_DAYS,
      opens: "00:00",
      closes: "23:59",
    },
    isAcceptingNewPatients: true,
    // Ties this site's business entity to its Google Business Profile, so the
    // two are understood as one business rather than two similar ones.
    ...(business.profiles.length ? { sameAs: business.profiles } : {}),
    contactPoint: buildContactPoint(
      Array.from(new Set(content.doctors.flatMap((d) => d.languages)))
    ),
    medicalSpecialty: content.specialties.map((s) => SPECIALTY_TO_SCHEMA_ORG[s.slug]),
    areaServed: content.cities.map((c) => ({ "@type": "City", name: c.name })),
    availableService: content.specialties.map((s) => ({
      "@type": "MedicalTherapy",
      name: `${s.name} à domicile`,
      description: s.shortDescription,
    })),
  };
}

/**
 * A location- or specialty-scoped fragment of the same business entity (same
 * @id as `buildMedicalBusiness()`), for city/quartier/specialty pages to
 * signal their specific relevance without repeating the full address/geo/
 * hours graph on every one of the ~100 location pages.
 */
function fragment(overrides: Partial<MedicalBusinessNode>): WithContext<MedicalBusinessNode> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": BUSINESS_ID,
    ...overrides,
  };
}

export function buildAreaServedFragment(place: Place): WithContext<MedicalBusinessNode> {
  return fragment({ areaServed: [place] });
}

export function buildSpecialtyFragment(specialtySlug: SpecialtySlug, place?: Place): WithContext<MedicalBusinessNode> {
  return fragment({
    medicalSpecialty: [SPECIALTY_TO_SCHEMA_ORG[specialtySlug]],
    ...(place ? { areaServed: [place] } : {}),
  });
}
