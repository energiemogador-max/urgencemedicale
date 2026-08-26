import type { MedicalSpecialty } from "schema-dts";
import type { SpecialtySlug } from "@content/schema";

/** Our 5 specialties map cleanly onto real schema.org MedicalSpecialty enum members — nothing invented. */
export const SPECIALTY_TO_SCHEMA_ORG: Record<SpecialtySlug, MedicalSpecialty> = {
  generaliste: "PrimaryCare",
  pediatre: "Pediatric",
  geriatre: "Geriatric",
  cardiologue: "Cardiovascular",
  urgentiste: "Emergency",
};
