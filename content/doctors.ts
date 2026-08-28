import type { Doctor } from "./schema";

/**
 * Named, credentialed doctors. Names and Ordre National des Médecins
 * registration numbers are both operator-supplied (2026-08-27) — none of it
 * is invented, and none of it may be. The number is emitted into Physician
 * JSON-LD as a formal `identifier`, i.e. a structured public assertion about
 * a real licensed person, so a wrong value is not a cosmetic bug.
 *
 * Two things here are still deliberately NOT invented:
 *
 * 1. Bios state only the specialty the operator assigned and the fact of
 *    home visits, phrased from the already-vetted wording in
 *    content/specialties.ts. No years of practice, languages, diplomas,
 *    hospital affiliations, or subspecialties — none of that was supplied.
 * 2. Languages are operator-supplied (2026-08-28): Arabic, French and English
 *    for the whole team, plus Amazigh for Docteur Naoufal Naim. Amazigh is an
 *    official language of Morocco and a real differentiator for a home-visit
 *    service — it is worth surfacing, not flattening into a team-wide list.
 * 3. No pronouns, and no gendered honorific beyond the standard "Docteur"
 *    used for all physicians in Moroccan and French practice. Nothing here
 *    infers a doctor's gender from their name.
 *
 * NAME ORDER: the operator supplied these as a mixed-order list (most
 * surname-first, "Ilyas Hamzaoui" given-name-first). Each was read
 * individually rather than pattern-matched, and rendered "Docteur Prénom
 * Nom" per French convention. "Docteur Naoufal Naim" is the one genuinely
 * ambiguous reading — both elements work as either name — and should be
 * confirmed with the doctor.
 */
export const doctors: Doctor[] = [
  {
    slug: "dr-ilyas-hamzaoui",
    name: "Docteur Ilyas Hamzaoui",
    ordreNumber: "25688962",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "generaliste",
    bio: "Médecin généraliste. Se déplace au domicile des patients pour les affections courantes, sur rendez-vous comme en urgence.",
  },
  {
    slug: "dr-echcaymaa-ouenza",
    name: "Docteur Echcaymaa Ouenza",
    ordreNumber: "35788968",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "urgentiste",
    bio: "Médecin urgentiste. Intervient au domicile des patients pour les situations qui demandent une prise en charge rapide.",
  },
  {
    slug: "dr-majda-boujdi",
    name: "Docteur Majda Boujdi",
    ordreNumber: "89677956",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "urgentiste",
    bio: "Médecin urgentiste. Assure les consultations non programmées à domicile, lorsque l'état du patient ne permet pas d'attendre un rendez-vous.",
  },
  {
    slug: "dr-naoufal-naim",
    name: "Docteur Naoufal Naim",
    ordreNumber: "24656978",
    languages: ["Arabe", "Français", "Anglais", "Amazigh"],
    specialtySlug: "urgentiste",
    bio: "Médecin urgentiste. Se déplace à domicile pour les demandes qui relèvent d'une prise en charge sans délai.",
  },
  {
    slug: "dr-abdelouahed-el-haiti",
    name: "Docteur Abdelouahed El Haiti",
    ordreNumber: "25648956",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "urgentiste",
    bio: "Médecin urgentiste. Intervient à domicile sur les motifs d'appel nécessitant un examen rapide sur place.",
  },
  {
    slug: "dr-yassine-ragbaoui",
    name: "Docteur Yassine Ragbaoui",
    ordreNumber: "45567487",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "cardiologue",
    bio: "Cardiologue. Assure consultation et suivi cardiologique à domicile, pour les patients dont le déplacement en cabinet est difficile.",
  },
  {
    slug: "dr-marjane-benjelloune",
    name: "Docteur Marjane Benjelloune",
    ordreNumber: "65478423",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "geriatre",
    bio: "Gériatre. Assure consultation et suivi à domicile adaptés aux besoins des personnes âgées, dans leur cadre de vie habituel.",
  },
];
