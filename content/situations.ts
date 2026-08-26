import type { Situation } from "./schema";

export const situations: Situation[] = [
  {
    slug: "fievre-enfant-nuit",
    title: "Fièvre chez l'enfant la nuit",
    shortDescription: "Que faire face à une forte fièvre chez un enfant en pleine nuit, et quand faire venir un médecin.",
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
