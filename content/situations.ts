import { todo } from "./schema";
import type { Situation } from "./schema";

const SITUATION_META: { slug: Situation["slug"]; title: string; shortDescription: string; geoMultiplied: boolean }[] = [
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

/**
 * Phase 5 Checkpoint 4 voice sample — fièvre-enfant-nuit only. This is the
 * riskiest page in the whole taxonomy: it's a symptom topic, and the hard
 * rule is absolute — "No medical advice anywhere. Symptom mentions route to
 * 'call a doctor', never to guidance." So this draft describes the SERVICE
 * (a doctor comes and examines the child) and repeatedly hands the actual
 * medical judgment back to a person (the doctor on the phone, or emergency
 * services) — it never states a temperature threshold, a symptom checklist,
 * or anything that reads as "here's how to assess your child yourself."
 */
const SITUATION_DRAFTS: Partial<Record<Situation["slug"], Pick<Situation, "intro" | "body">>> = {
  "fievre-enfant-nuit": {
    intro:
      "Une fièvre qui grimpe chez un enfant en pleine nuit inquiète n'importe quel parent, surtout loin des horaires d'un cabinet. Un médecin généraliste ou pédiatre peut se déplacer à votre domicile pour l'examiner sur place, cette nuit même, sans attendre le lendemain.",
    body: `La fièvre est l'un des motifs d'appel les plus fréquents la nuit, et l'un des plus difficiles à juger sans avis médical : un même chiffre sur le thermomètre peut être anodin chez un enfant qui joue et inquiétant chez un enfant abattu. Plutôt que de chercher une réponse en ligne à 3h du matin, un médecin peut venir l'examiner directement chez vous et vous dire, en le voyant, ce qu'il en est.

Faire venir un médecin à domicile la nuit évite un trajet aux urgences avec un enfant fatigué et une salle d'attente chargée. Le médecin ausculte l'enfant, l'examine et peut prescrire un traitement immédiatement si besoin ; il peut aussi vous indiquer la pharmacie de garde la plus proche.

Après votre appel, la personne qui répond vous demande l'âge de l'enfant, l'adresse et quelques informations générales, puis vous indique le délai avant l'arrivée du médecin. Ce délai est communiqué avant que vous ne confirmiez la visite, tout comme le tarif de nuit, pour que vous puissiez décider en connaissance de cause.

Le médecin qui se déplace est un généraliste ou un pédiatre selon la disponibilité au moment de l'appel, et il est systématiquement inscrit à l'Ordre National des Médecins. Une fois sur place, il examine l'enfant, pose ses questions aux parents et détermine lui-même la conduite à tenir : traitement sur place, ordonnance, ou orientation vers un service hospitalier si l'examen le justifie.

Cette solution à domicile n'est cependant pas adaptée à toutes les situations. Si l'état de votre enfant vous inquiète fortement ou semble se dégrader rapidement, le plus sûr est de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond peut vous aider à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable.

La fièvre nocturne chez l'enfant est l'un des motifs d'appel les plus courants de ce service, aux côtés de la toux, des otalgies ou des vomissements. Elle touche aussi bien les nourrissons que les enfants plus grands, et l'inquiétude qu'elle provoque ne dépend pas toujours de sa gravité réelle — c'est précisément pour trancher ce doute qu'un examen sur place a de la valeur.

Le service fonctionne 24h/24 et 7j/7, toute l'année, week-ends et jours fériés compris, dans toutes les villes couvertes par notre réseau de médecins — le délai d'intervention exact dépend de votre ville et de votre quartier de résidence.`,
  },
};

export const situations: Situation[] = SITUATION_META.map((s) => {
  const draft = SITUATION_DRAFTS[s.slug];
  return {
    ...s,
    intro: draft?.intro ?? todo(`${s.title} intro — 2-3 sentence answer-shaped opening directly answering the query`),
    body: draft?.body ?? todo(`${s.title} cornerstone body content (this is Phase 5's AEO layer, no medical advice, routes to calling a doctor)`),
  };
});
