import type { PhysicianLeaf, WithContext } from "schema-dts";
import { isUnconfirmed } from "@content/schema";
import type { Doctor } from "@content/schema";
import { SITE_URL } from "@/lib/site";
import { SPECIALTY_TO_SCHEMA_ORG } from "./specialty-map";
import { BUSINESS_ID } from "./business";

/** Display name -> BCP-47, for the languages this practice actually lists. */
const LANGUAGE_CODES: Record<string, string> = {
  Arabe: "ar",
  Français: "fr",
  Anglais: "en",
  Darija: "ary",
  Espagnol: "es",
  Amazigh: "zgh",
};

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
    // BCP-47 alongside the display name so the value is unambiguous to a
    // consumer that does not read French.
    knowsLanguage: doctor.languages.map((name) => ({
      "@type": "Language" as const,
      name,
      ...(LANGUAGE_CODES[name] ? { alternateName: LANGUAGE_CODES[name] } : {}),
    })),
    // A Physician node is valid without `identifier`. Emitting the literal
    // "[À CONFIRMER]" marker would publish a structured, machine-readable
    // claim about a real licensed person that is simply false — far worse
    // than the property being absent. It reappears on its own once the real
    // registration number is filled in.
    ...(isUnconfirmed(doctor.ordreNumber)
      ? {}
      : {
          identifier: {
            "@type": "PropertyValue" as const,
            propertyID: "Ordre National des Médecins",
            value: doctor.ordreNumber,
          },
        }),
    parentOrganization: { "@id": BUSINESS_ID },
  };
}
