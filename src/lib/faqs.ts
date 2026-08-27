import type { FaqEntry } from "@/lib/schema-org/faq";
import type { Service, ServiceSlug } from "@content/schema";
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

/**
 * The second question differs per service because the honest answer does:
 * nursing care runs on a prescription, transport is booked around a
 * destination and a time, and a follow-up is agreed as a schedule. A single
 * shared question would have to be vague enough to be useless — or, worse,
 * state the nursing answer on the transport page.
 */
const SERVICE_SPECIFIC_FAQ: Record<ServiceSlug, FaqEntry> = {
  "soins-infirmiers-a-domicile": {
    question: "Faut-il une ordonnance ?",
    answer:
      "Oui. Les soins infirmiers sont réalisés sur prescription médicale : l'ordonnance définit les actes à effectuer et leur fréquence. Si vous n'en avez pas, une consultation à domicile permet d'abord au médecin d'établir le traitement.",
  },
  "oxygenotherapie-a-domicile": {
    question: "Faut-il fournir le matériel soi-même ?",
    answer:
      "Non. Le matériel nécessaire au traitement est fourni et installé à votre domicile. Une ordonnance est requise : c'est elle qui détermine ce qui est mis en place et à quel réglage. Le réglage lui-même relève du médecin prescripteur et n'est jamais modifié sans son avis.",
  },
  "hospitalisation-a-domicile": {
    question: "Comment savoir si une hospitalisation à domicile est possible ?",
    answer:
      "C'est une évaluation médicale qui le détermine. Un médecin examine la nature des soins nécessaires, leur fréquence, l'état de la personne et les conditions du domicile, puis indique si la situation s'y prête. Toutes les situations ne relèvent pas de ce mode de prise en charge, et cette évaluation précède toujours la mise en place.",
  },
  "evacuation-sanitaire": {
    question: "Quels trajets sont assurés ?",
    answer:
      "Les transferts sont assurés par la route, entre villes et entre établissements de santé au Maroc. Indiquez au téléphone le point de départ, la destination exacte et l'état de la personne : ces éléments déterminent la façon dont le transfert est organisé, ainsi que le tarif, qui vous est annoncé avant le départ.",
  },
  "transport-medicalise": {
    question: "Faut-il réserver à l'avance ?",
    answer:
      "Pour un trajet programmé — un examen à heure fixe, une sortie d'hospitalisation prévue — mieux vaut réserver la veille ou plus tôt, afin que le trajet soit organisé en fonction de l'heure de rendez-vous. Un transport non programmé reste possible : le délai vous est annoncé au téléphone en fonction de l'heure et de la destination.",
  },
  "suivi-medical-personnalise": {
    question: "À quelle fréquence le médecin passe-t-il ?",
    answer:
      "La fréquence n'est pas fixée d'avance : elle est convenue avec le médecin en fonction de l'état de la personne, et réévaluée au fil des visites. Elle vous est confirmée, avec le tarif applicable, avant la mise en place du suivi.",
  },
};

export function serviceFaqs(service: Service): FaqEntry[] {
  return [
    {
      question: `${service.name} : comment faire la demande ?`,
      answer: `Vous appelez le ${content.business.phoneDisplay}. Nous vérifions avec vous ce qui est nécessaire, l'adresse et le moment souhaité, puis nous vous confirmons le tarif avant toute intervention.`,
    },
    SERVICE_SPECIFIC_FAQ[service.slug],
    ...commonFaqs(),
  ];
}

export function situationFaqs(): FaqEntry[] {
  return commonFaqs();
}
