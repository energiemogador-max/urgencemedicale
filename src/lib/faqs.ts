import type { FaqEntry } from "@/lib/schema-org/faq";
import { content } from "@/lib/content";

/**
 * FAQ answers are assembled from values that already exist in the content
 * layer (price tiers, response time, hours, doctor registration) rather than
 * written as free text, so an FAQ can never state a price or delay that
 * contradicts /tarifs or the trust block. No medical advice anywhere: the
 * "quand appeler" style questions describe the service and defer judgment to
 * the doctor or the emergency services.
 */

function priceSentence(): string {
  const { tiers, currency } = content.pricing;
  const parts = tiers.map((t) => `${t.label.toLowerCase()} ${t.amountMad} ${currency} (${t.window})`);
  return `Les tarifs sont publiés sur le site : ${parts.join(", ")}. Le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite.`;
}

const commonFaqs = (): FaqEntry[] => [
  {
    question: "Le médecin se déplace-t-il la nuit et le week-end ?",
    answer: `Oui. Le service fonctionne ${content.business.hoursOpen}, week-ends et jours fériés compris. Le tarif de nuit ou de week-end vous est indiqué au moment de l'appel, avant votre confirmation.`,
  },
  {
    question: "Combien coûte une consultation à domicile ?",
    answer: priceSentence(),
  },
  {
    question: "Le médecin est-il inscrit à l'Ordre National des Médecins ?",
    answer:
      "Oui. Chaque médecin qui se déplace est inscrit à l'Ordre National des Médecins. Son nom et son numéro d'inscription figurent sur la page Nos médecins.",
  },
  {
    question: "Faut-il être déjà patient pour appeler ?",
    answer:
      "Non. Il n'est pas nécessaire d'avoir déjà consulté : chaque visite constitue une consultation complète, avec un compte-rendu que vous pouvez transmettre à votre médecin traitant si vous en avez un.",
  },
  {
    question: "Et en cas d'urgence vitale ?",
    answer:
      "Ce service ne remplace pas les services d'urgence. Si l'état de la personne vous inquiète fortement ou semble se dégrader rapidement, contactez directement les secours plutôt que d'attendre une visite à domicile.",
  },
];

export function homeFaqs(): FaqEntry[] {
  return commonFaqs();
}

export function cityFaqs(cityName: string): FaqEntry[] {
  return [
    {
      question: `Un médecin peut-il venir chez moi à ${cityName} ?`,
      answer: `Oui, le service couvre ${cityName} ${content.business.hoursOpen}. Le délai estimé avant l'arrivée du médecin vous est communiqué au téléphone, avant que vous ne confirmiez la visite.`,
    },
    ...commonFaqs(),
  ];
}

export function quartierFaqs(quartierName: string, responseTimeMinutes: string): FaqEntry[] {
  return [
    {
      question: `Quel est le délai d'intervention à ${quartierName} ?`,
      answer: `L'intervention à ${quartierName} est annoncée en ${responseTimeMinutes} minutes. Le délai réel est confirmé au téléphone au moment de l'appel, en fonction de l'heure et de la circulation.`,
    },
    ...commonFaqs(),
  ];
}

export function specialtyFaqs(specialtyName: string): FaqEntry[] {
  return [
    {
      question: `Comment se déroule une consultation de ${specialtyName.toLowerCase()} à domicile ?`,
      answer:
        "Le médecin vous appelle avant d'arriver pour confirmer l'adresse et l'accès. Sur place, il procède à un examen complet, puis détermine lui-même la conduite à tenir : traitement, ordonnance, ou orientation vers un examen complémentaire ou un service hospitalier.",
    },
    ...commonFaqs(),
  ];
}

export function situationFaqs(): FaqEntry[] {
  return commonFaqs();
}
