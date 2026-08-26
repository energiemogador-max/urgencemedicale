import { todo } from "./schema";
import type { Specialty } from "./schema";

const SPECIALTY_META: { slug: Specialty["slug"]; name: string; shortDescription: string }[] = [
  {
    slug: "generaliste",
    name: "Médecin généraliste",
    shortDescription: "Consultation à domicile pour toute affection courante, sur rendez-vous ou en urgence.",
  },
  {
    slug: "pediatre",
    name: "Pédiatre",
    shortDescription: "Consultation à domicile pour nourrissons, enfants et adolescents.",
  },
  {
    slug: "geriatre",
    name: "Gériatre",
    shortDescription: "Suivi et consultation à domicile adaptés aux besoins des personnes âgées.",
  },
  {
    slug: "cardiologue",
    name: "Cardiologue",
    shortDescription: "Consultation et suivi cardiologique à domicile, y compris ECG.",
  },
  {
    slug: "urgentiste",
    name: "Médecin urgentiste",
    shortDescription: "Intervention à domicile pour les situations nécessitant une prise en charge rapide.",
  },
];

/** Phase 5 Checkpoint 4 voice sample — pédiatre only, drafted for voice approval. */
const SPECIALTY_DRAFTS: Partial<Record<Specialty["slug"], Pick<Specialty, "intro" | "body">>> = {
  pediatre: {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous, sans les délais d'une salle d'attente ni le stress d'un déplacement quand il ne se sent pas bien. La consultation se déroule dans l'environnement familier de l'enfant, ce qui facilite souvent l'examen.",
    body: `Faire venir un pédiatre à domicile permet d'examiner un enfant fébrile, fatigué ou grognon sans lui imposer un trajet ni une attente en salle bondée, un facteur qui compte particulièrement pour les tout-petits et les nourrissons. Le médecin observe l'enfant dans son cadre habituel, ce qui aide souvent à obtenir un comportement plus naturel qu'en cabinet et facilite l'examen clinique.

La consultation à domicile couvre les mêmes actes qu'une consultation pédiatrique standard : auscultation, prise de température, examen ORL, évaluation de l'état général et, si besoin, orientation vers un examen complémentaire ou un service d'urgence. Le pédiatre peut aussi répondre aux questions des parents sur le suivi de croissance, la vaccination ou une pathologie chronique déjà suivie.

Les motifs de consultation les plus fréquents en pédiatrie à domicile sont la fièvre, la toux, les otalgies, les éruptions cutanées et le suivi après une sortie de maternité. Dans chacun de ces cas, l'objectif du médecin est le même : examiner l'enfant, poser un diagnostic et, si nécessaire, prescrire un traitement ou orienter vers un spécialiste ou un service hospitalier.

Chaque pédiatre qui se déplace est inscrit à l'Ordre National des Médecins ; son nom et son numéro d'inscription sont indiqués sur la page Nos médecins. Après l'appel, le délai avant l'arrivée du médecin est communiqué immédiatement, et le tarif est annoncé avant la confirmation du rendez-vous — jamais après la visite.

Ce service s'adresse aussi bien aux familles qui n'ont pas encore de pédiatre attitré qu'à celles dont le pédiatre habituel n'est pas disponible dans l'immédiat. Il n'est pas nécessaire d'avoir déjà consulté un pédiatre pour y faire appel : chaque visite constitue une consultation complète, avec un compte-rendu que vous pouvez transmettre au pédiatre habituel de l'enfant si vous en avez un.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de détresse respiratoire, de perte de connaissance ou de convulsion, il faut contacter directement les services d'urgence.`,
  },
};

export const specialties: Specialty[] = SPECIALTY_META.map((s) => {
  const draft = SPECIALTY_DRAFTS[s.slug];
  return {
    ...s,
    intro: draft?.intro ?? todo(`${s.name} intro — 2-3 sentence answer-shaped opening for "${s.name.toLowerCase()} à domicile"`),
    body: draft?.body ?? todo(`${s.name} hub body content (national scope, what the visit covers, when to call this specialty vs. a généraliste)`),
  };
});
