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
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
        "https://schema.org/Saturday",
        "https://schema.org/Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    isAcceptingNewPatients: true,
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
