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
 * 1. Bios describe what each doctor's specialty means for a home visit and
 *    what they can decide on the spot. They still contain NO years of
 *    practice, diplomas, hospital affiliations or subspecialties — none of
 *    that was supplied, and on a YMYL medical page a plausible-sounding
 *    credential is worse than a short bio. Supplying those facts is the
 *    single highest-value thing left: allo-sosmedecin.ma publishes real
 *    biographies and it is the one area where they currently win.
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
    bio:
      "Médecin généraliste. Il prend en charge à domicile les motifs les plus courants — fièvre, douleur, infection, malaise, renouvellement ou ajustement d'un traitement — pour lesquels un patient irait normalement en cabinet. Sur place, il procède à un examen clinique complet, puis décide : traitement remis directement, ordonnance, certificat médical, ou orientation vers un examen complémentaire ou un service hospitalier lorsque la situation le justifie. Il consulte en arabe, en français et en anglais."
  },
  {
    slug: "dr-echcaymaa-ouenza",
    name: "Docteur Echcaymaa Ouenza",
    ordreNumber: "35788968",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "urgentiste",
    bio:
      "Médecin urgentiste. Sa spécialité est l'évaluation rapide d'une situation aiguë : déterminer, avec la personne devant elle, ce qui peut être traité à domicile et ce qui doit être orienté sans délai vers une structure hospitalière. C'est précisément le jugement qu'un conseil téléphonique ne peut pas remplacer. Elle intervient sur les appels non programmés, de jour comme de nuit, et consulte en arabe, en français et en anglais."
  },
  {
    slug: "dr-majda-boujdi",
    name: "Docteur Majda Boujdi",
    ordreNumber: "89677956",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "urgentiste",
    bio:
      "Médecin urgentiste. Elle assure les consultations non programmées à domicile, lorsque l'état du patient ne permet pas d'attendre un rendez-vous. Son travail consiste autant à traiter qu'à trancher : reconnaître ce qui relève d'une prise en charge à domicile et ce qui impose un transfert, sans attendre que la situation se dégrade. Elle consulte en arabe, en français et en anglais."
  },
  {
    slug: "dr-naoufal-naim",
    name: "Docteur Naoufal Naim",
    ordreNumber: "24656978",
    languages: ["Arabe", "Français", "Anglais", "Amazigh"],
    specialtySlug: "urgentiste",
    bio:
      "Médecin urgentiste. Il se déplace pour les demandes qui relèvent d'une prise en charge sans délai, et évalue sur place la conduite à tenir : traitement immédiat, surveillance, ou orientation hospitalière. Il consulte en arabe, en français, en anglais et en amazigh — une langue que peu de services à domicile proposent, et qui change la qualité de l'échange pour les patients qui s'expriment plus à l'aise dans leur langue première, en particulier les personnes âgées."
  },
  {
    slug: "dr-abdelouahed-el-haiti",
    name: "Docteur Abdelouahed El Haiti",
    ordreNumber: "25648956",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "urgentiste",
    bio:
      "Médecin urgentiste. Il intervient à domicile sur les motifs d'appel qui nécessitent un examen rapide sur place plutôt qu'un avis à distance. L'examen direct permet de constater ce qu'une description téléphonique ne montre pas — l'état général, la respiration, la douleur réelle — et c'est sur cette base que la conduite à tenir est décidée. Il consulte en arabe, en français et en anglais."
  },
  {
    slug: "dr-yassine-ragbaoui",
    name: "Docteur Yassine Ragbaoui",
    ordreNumber: "45567487",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "cardiologue",
    bio:
      "Cardiologue. Il assure consultation et suivi cardiologique au domicile des patients pour qui le déplacement en cabinet est difficile : personnes âgées, patients en convalescence, ou suivi d'un traitement au long cours. La consultation à domicile permet également de réaliser un électrocardiogramme sur place. Il consulte en arabe, en français et en anglais."
  },
  {
    slug: "dr-marjane-benjelloune",
    name: "Docteur Marjane Benjelloune",
    ordreNumber: "65478423",
    languages: ["Arabe", "Français", "Anglais"],
    specialtySlug: "geriatre",
    bio:
      "Gériatre. Elle assure consultation et suivi à domicile adaptés aux besoins des personnes âgées, dans leur cadre de vie habituel. Voir un patient chez lui apporte des éléments qu'une consultation en cabinet ne montre jamais : l'autonomie réelle au quotidien, l'organisation du logement, la façon dont les traitements sont réellement pris, et la présence ou non d'un aidant. Elle consulte en arabe, en français et en anglais."
  },
];
