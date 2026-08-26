import type { PhysicianLeaf, WithContext } from "schema-dts";
import type { Doctor } from "@content/schema";
import { SITE_URL } from "@/lib/site";
import { SPECIALTY_TO_SCHEMA_ORG } from "./specialty-map";
import { BUSINESS_ID } from "./business";

export function physicianId(doctor: Doctor): string {
  return `${SITE_URL}/nos-medecins#${doctor.slug}`;
}

/** One Physician node per named doctor, with the Ordre National des Médecins number as a formal identifier. */
export function buildPhysician(doctor: Doctor): WithContext<PhysicianLeaf> {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": physicianId(doctor),
    name: doctor.name,
    description: doctor.bio,
    medicalSpecialty: SPECIALTY_TO_SCHEMA_ORG[doctor.specialtySlug],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Ordre National des Médecins",
      value: doctor.ordreNumber,
    },
    parentOrganization: { "@id": BUSINESS_ID },
  };
}
