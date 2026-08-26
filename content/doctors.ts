import { todo } from "./schema";
import type { Doctor } from "./schema";

/**
 * Named, credentialed doctors (required for the full-operation model's
 * /nos-medecins, trust blocks, and Physician structured data). Name and Ordre
 * National des Médecins number are hard placeholders — never invented.
 * Add one entry per doctor; each field must be filled before the build passes.
 */
export const doctors: Doctor[] = [
  {
    slug: todo("doctor slug, e.g. dr-amina-bennani"),
    name: todo("doctor full name"),
    ordreNumber: todo("Ordre National des Médecins registration number"),
    specialtySlug: "generaliste",
    bio: todo("doctor bio — credentials, experience, languages"),
  },
];
