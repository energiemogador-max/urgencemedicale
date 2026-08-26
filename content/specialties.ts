import { todo } from "./schema";
import type { Specialty } from "./schema";
import { SPECIALTY_DRAFTS } from "./drafts/specialties";

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

export const specialties: Specialty[] = SPECIALTY_META.map((s) => {
  const draft = SPECIALTY_DRAFTS[s.slug];
  return {
    ...s,
    intro: draft?.intro ?? todo(`${s.name} intro — 2-3 sentence answer-shaped opening for "${s.name.toLowerCase()} à domicile"`),
    body: draft?.body ?? todo(`${s.name} hub body content (national scope, what the visit covers, when to call this specialty vs. a généraliste)`),
  };
});
