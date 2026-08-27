import type { Doctor } from "./schema";

/**
 * Named, credentialed doctors. PREVIEW STATE (2026-08-27): name is
 * operator-supplied ("Docteur Seriani"). ordreNumber is NOT invented — it's a
 * visible "[À CONFIRMER]" marker, since a fabricated Ordre National des
 * Médecins number is a licensed-professional credential claim, not a
 * cosmetic placeholder. Bio is kept to only what's actually known (name,
 * that they see patients at home in Casablanca) — no invented years of
 * experience, languages, or education.
 */
export const doctors: Doctor[] = [
  {
    slug: "dr-seriani",
    name: "Docteur Seriani",
    ordreNumber: "[À CONFIRMER]",
    specialtySlug: "generaliste",
    bio: "Le Docteur Seriani intervient à domicile à Casablanca.",
  },
];
