import { todo } from "./schema";
import type { Situation } from "./schema";
import { SITUATION_DRAFTS } from "./drafts/situations";

const SITUATION_META: { slug: Situation["slug"]; title: string; shortDescription: string; geoMultiplied: boolean }[] = [
  {
    slug: "medecin-de-garde",
    title: "Médecin de garde à domicile",
    shortDescription:
      "Un docteur de garde qui se déplace chez vous la nuit, le week-end et les jours fériés.",
    geoMultiplied: true,
  },
  {
    slug: "fievre-enfant-nuit",
    title: "Fièvre chez l'enfant la nuit",
    shortDescription: "Faire venir un médecin à domicile pour examiner un enfant fiévreux, la nuit.",
    geoMultiplied: true,
  },
  {
    slug: "certificat-medical",
    title: "Certificat médical à domicile",
    shortDescription: "Obtenir un certificat médical établi par un médecin lors d'une visite à domicile.",
    geoMultiplied: false,
  },
  {
    slug: "contre-visite-medicale",
    title: "Contre-visite médicale",
    shortDescription: "Contre-visite médicale à domicile demandée par un employeur pendant un arrêt de travail.",
    geoMultiplied: false,
  },
  {
    slug: "suivi-post-hospitalisation",
    title: "Suivi post-hospitalisation",
    shortDescription: "Suivi médical à domicile après une sortie d'hospitalisation.",
    geoMultiplied: false,
  },
  {
    slug: "prise-de-sang-domicile",
    title: "Prise de sang à domicile",
    shortDescription: "Prélèvement sanguin réalisé à domicile par un professionnel de santé.",
    geoMultiplied: true,
  },
  {
    slug: "ecg-domicile",
    title: "ECG à domicile",
    shortDescription: "Réalisation d'un électrocardiogramme à domicile.",
    geoMultiplied: true,
  },
];

export const situations: Situation[] = SITUATION_META.map((s) => {
  const draft = SITUATION_DRAFTS[s.slug];
  return {
    ...s,
    intro: draft?.intro ?? todo(`${s.title} intro — 2-3 sentence answer-shaped opening directly answering the query`),
    body: draft?.body ?? todo(`${s.title} cornerstone body content (this is Phase 5's AEO layer, no medical advice, routes to calling a doctor)`),
  };
});
