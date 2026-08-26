import type { Specialty } from "./schema";

export const specialties: Specialty[] = [
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
