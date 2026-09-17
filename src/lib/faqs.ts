import type { FaqEntry } from "@/lib/schema-org/faq";
import type { Service, ServiceSlug } from "@content/schema";
import { EMERGENCY_NUMBERS } from "@/lib/emergency";
import { api } from "@/lib/locale-content";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";

/**
 * FAQ answers are assembled from values that already exist in the content
 * layer (price tiers, response time, hours, doctor registration) rather than
 * written as free text, so an FAQ can never state a price or delay that
 * contradicts /tarifs or the trust block. No medical advice anywhere: the
 * "quand appeler" style questions describe the service and defer judgment to
 * the doctor or the emergency services.
 *
 * Each locale supplies the same questions, in the same order, built from the
 * same values. English and Arabic are translations of the French, not
 * separate copy.
 */

const { samu, protectionCivile } = EMERGENCY_NUMBERS;

interface FaqText {
  price: (parts: string[], ) => string;
  pricePart: (label: string, amount: string, currency: string, window: string) => string;
  common: (hours: string, secours: string) => FaqEntry[];
  secours: string;
  city: (city: string, hours: string) => FaqEntry;
  quartier: (quartier: string, range: string) => FaqEntry;
  specialty: (name: string) => FaqEntry;
  serviceRequest: (name: string, phone: string) => FaqEntry;
  serviceSpecific: (secours: string) => Record<ServiceSlug, FaqEntry>;
  serviceExtra: Partial<Record<ServiceSlug, FaqEntry[]>>;
}

const FR: FaqText = {
  secours: `le ${samu.number} (SAMU) ou le ${protectionCivile.number} (Protection civile)`,
  pricePart: (l, a, c, w) => `${l.toLowerCase()} ${a} ${c} (${w})`,
  price: (parts) =>
    `Les tarifs sont publiés sur le site : ${parts.join(", ")}. Le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite.`,
  common: (hours, secours) => [
    {
      question: "Le médecin se déplace-t-il la nuit et le week-end ?",
      answer: `Oui. Le service fonctionne ${hours}, week-ends et jours fériés compris. Le tarif de nuit ou de week-end vous est indiqué au moment de l'appel, avant votre confirmation.`,
    },
    { question: "Combien coûte une consultation à domicile ?", answer: "" },
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
      answer: `Ce service ne remplace pas les services d'urgence. Si l'état de la personne vous inquiète fortement ou semble se dégrader rapidement, appelez directement ${secours} plutôt que d'attendre une visite à domicile.`,
    },
  ],
  city: (city, hours) => ({
    question: `Un médecin peut-il venir chez moi à ${city} ?`,
    answer: `Oui, le service couvre ${city} ${hours}. Le délai estimé avant l'arrivée du médecin vous est communiqué au téléphone, avant que vous ne confirmiez la visite.`,
  }),
  quartier: (q, r) => ({
    question: `Quel est le délai d'intervention à ${q} ?`,
    answer: `L'intervention à ${q} est annoncée en ${r} minutes. Le délai réel est confirmé au téléphone au moment de l'appel, en fonction de l'heure et de la circulation.`,
  }),
  specialty: (name) => ({
    question: `Comment se déroule une consultation de ${name.toLowerCase()} à domicile ?`,
    answer:
      "Le médecin vous appelle avant d'arriver pour confirmer l'adresse et l'accès. Sur place, il procède à un examen complet, puis détermine lui-même la conduite à tenir : traitement, ordonnance, ou orientation vers un examen complémentaire ou un service hospitalier.",
  }),
  serviceRequest: (name, phone) => ({
    question: `${name} : comment faire la demande ?`,
    answer: `Vous appelez le ${phone}. Nous vérifions avec vous ce qui est nécessaire, l'adresse et le moment souhaité, puis nous vous confirmons le tarif avant toute intervention.`,
  }),
  serviceSpecific: (secours) => ({
    "soins-infirmiers-a-domicile": {
      question: "Faut-il une ordonnance ?",
      answer:
        "Oui. Les soins infirmiers sont réalisés sur prescription médicale : l'ordonnance définit les actes à effectuer et leur fréquence. Si vous n'en avez pas, une consultation à domicile permet d'abord au médecin d'établir le traitement.",
    },
    ambulance: {
      question: "Faut-il appeler une ambulance privée ou les secours ?",
      answer: `S'il y a un doute sur la gravité — respiration difficile, perte de connaissance, douleur violente dans la poitrine, saignement important, accident — appelez immédiatement ${secours} : ces services disposent des moyens de réanimation et de la priorité de circulation. Un transport privé s'adresse aux patients dont l'état est connu et stable et qui doivent être déplacés vers un examen, entre deux établissements, ou pour rentrer chez eux.`,
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
  }),
  /*
   * Ambulance gets the price question because Search Console showed "prix
   * ambulance", "prix d'une ambulance" and "ambulance privée prix" sitting at
   * positions 62-70 with no page answering them. The answer states what the
   * price depends on and when it is given; it states no amount, because none
   * has been supplied.
   */
  serviceExtra: {
    ambulance: [
      {
        question: "Combien coûte une ambulance privée ?",
        answer:
          "Il n'y a pas de tarif unique : le montant dépend de la distance, du type de transport (patient assis ou allongé, transport simple ou médicalisé), du matériel nécessaire pendant le trajet et des conditions d'accès au départ et à l'arrivée. Il vous est annoncé au téléphone avant le départ.",
      },
    ],
  },
};

const EN: FaqText = {
  secours: `${samu.number} (SAMU, medical emergencies) or ${protectionCivile.number} (Civil Protection)`,
  pricePart: (l, a, c, w) => `${l.toLowerCase()}: ${a} ${c} (${w})`,
  price: (parts) =>
    `Our fees are published on this site: ${parts.join("; ")}. The fee that applies is confirmed on the phone before you confirm the visit.`,
  common: (hours, secours) => [
    {
      question: "Does the doctor come at night and at weekends?",
      answer: `Yes. The service runs ${hours}, weekends and public holidays included. The night or weekend fee is given to you when you call, before you confirm.`,
    },
    { question: "How much does a home consultation cost?", answer: "" },
    {
      question: "Is the doctor registered with the Ordre National des Médecins?",
      answer:
        "Yes. Every doctor who makes home visits is registered with the Ordre National des Médecins, Morocco's medical council. Their name and registration number are listed on the Our doctors page.",
    },
    {
      question: "Do I need to be an existing patient to call?",
      answer:
        "No. You do not need to have seen us before: every visit is a full consultation, with a written report you can pass on to your regular doctor if you have one.",
    },
    {
      question: "What if it is a life-threatening emergency?",
      answer: `This service does not replace the emergency services. If you are very worried about the person's condition, or it seems to be getting worse quickly, call ${secours} directly rather than waiting for a home visit.`,
    },
  ],
  city: (city, hours) => ({
    question: `Can a doctor come to my home in ${city}?`,
    answer: `Yes. The service covers ${city} ${hours}. The expected time before the doctor arrives is given to you on the phone, before you confirm the visit.`,
  }),
  quartier: (q, r) => ({
    question: `How long does it take for a doctor to reach ${q}?`,
    answer: `The expected arrival time in ${q} is ${r} minutes. The actual time is confirmed on the phone when you call, depending on the hour and the traffic.`,
  }),
  specialty: (name) => ({
    question: `How does a home consultation with a ${name.toLowerCase()} work?`,
    answer:
      "The doctor calls you before arriving to confirm the address and how to get in. On site, they carry out a full examination and then decide what should happen next: treatment, a prescription, or referral for further tests or to a hospital department.",
  }),
  serviceRequest: (name, phone) => ({
    question: `${name}: how do I make a request?`,
    answer: `Call ${phone}. We go through what is needed, the address and the preferred time with you, then confirm the fee before anything is done.`,
  }),
  serviceSpecific: (secours) => ({
    "soins-infirmiers-a-domicile": {
      question: "Do I need a prescription?",
      answer:
        "Yes. Nursing care is carried out on a medical prescription, which sets out the procedures and how often they are done. If you do not have one, a home consultation first lets a doctor decide on the treatment.",
    },
    ambulance: {
      question: "Should I call a private ambulance or the emergency services?",
      answer: `If there is any doubt about how serious it is — difficulty breathing, loss of consciousness, severe chest pain, heavy bleeding, an accident — call ${secours} immediately: those services have resuscitation equipment and priority on the road. Private transport is for patients whose condition is known and stable and who need to be taken to an appointment, between two facilities, or back home.`,
    },
    "oxygenotherapie-a-domicile": {
      question: "Do I have to provide the equipment?",
      answer:
        "No. The equipment needed for the treatment is supplied and installed at your home. A prescription is required: it determines what is set up and at what setting. The setting itself is the prescribing doctor's decision and is never changed without their advice.",
    },
    "hospitalisation-a-domicile": {
      question: "How do I know whether hospital-at-home is possible?",
      answer:
        "A medical assessment decides. A doctor looks at the care needed, how often, the person's condition and the home itself, then says whether the situation is suitable. Not every situation is, and this assessment always comes before anything is set up.",
    },
    "evacuation-sanitaire": {
      question: "Which journeys do you cover?",
      answer:
        "Transfers are made by road, between cities and between health facilities within Morocco. On the phone, give the starting point, the exact destination and the person's condition: these determine how the transfer is organised and the fee, which is quoted before departure.",
    },
    "transport-medicalise": {
      question: "Do I need to book in advance?",
      answer:
        "For a planned journey — a test at a set time, a scheduled discharge from hospital — it is best to book the day before or earlier, so the journey is organised around the appointment time. Unplanned transport is still possible: the waiting time is given on the phone, depending on the hour and the destination.",
    },
    "suivi-medical-personnalise": {
      question: "How often does the doctor visit?",
      answer:
        "The frequency is not fixed in advance: it is agreed with the doctor according to the person's condition, and reviewed as the visits go on. It is confirmed to you, together with the fee, before the follow-up starts.",
    },
  }),
  serviceExtra: {
    ambulance: [
      {
        question: "How much does a private ambulance cost?",
        answer:
          "There is no single fee: the amount depends on the distance, the type of transport (patient sitting or lying down, standard or medically equipped), the equipment needed during the journey and the access conditions at both ends. It is quoted on the phone before departure.",
      },
    ],
  },
};

const AR: FaqText = {
  secours: `${samu.number} (الإسعاف الطبي SAMU) أو ${protectionCivile.number} (الوقاية المدنية)`,
  pricePart: (l, a, c, w) => `${l}: ${a} ${c} (${w})`,
  price: (parts) =>
    `أسعارنا منشورة على الموقع: ${parts.join("؛ ")}. ونؤكد لك السعر المطبق عبر الهاتف قبل أن تصادق على الزيارة.`,
  common: (hours, secours) => [
    {
      question: "هل يتنقل الطبيب ليلًا وفي نهاية الأسبوع؟",
      answer: `نعم. تعمل الخدمة ${hours}، بما في ذلك نهاية الأسبوع وأيام العطل. ونخبرك بتعريفة الليل أو نهاية الأسبوع عند الاتصال، قبل أن تؤكد.`,
    },
    { question: "كم تكلف الاستشارة في المنزل؟", answer: "" },
    {
      question: "هل الطبيب مسجل في الهيئة الوطنية للطبيبات والأطباء؟",
      answer:
        "نعم. كل طبيب يقوم بالزيارات المنزلية مسجل في الهيئة الوطنية للطبيبات والأطباء. واسمه ورقم تسجيله منشوران في صفحة أطبائنا.",
    },
    {
      question: "هل يجب أن أكون مريضًا سابقًا لديكم لكي أتصل؟",
      answer:
        "لا. لا يشترط أن تكون قد استشرتنا من قبل: كل زيارة استشارة كاملة، مع تقرير مكتوب يمكنك تسليمه لطبيبك المعالج إن كان لك طبيب.",
    },
    {
      question: "وماذا لو كانت الحياة في خطر؟",
      answer: `هذه الخدمة لا تعوض مصالح الإسعاف. إذا كانت حالة الشخص تقلقك كثيرًا أو بدت أنها تتدهور بسرعة، فاتصل مباشرة بالرقم ${secours} بدل انتظار زيارة منزلية.`,
    },
  ],
  city: (city, hours) => ({
    question: `هل يمكن أن يأتي طبيب إلى منزلي في ${city}؟`,
    answer: `نعم، تغطي الخدمة ${city} ${hours}. ونخبرك عبر الهاتف بالمدة المتوقعة قبل وصول الطبيب، قبل أن تؤكد الزيارة.`,
  }),
  quartier: (q, r) => ({
    question: `كم يستغرق وصول الطبيب إلى ${q}؟`,
    answer: `المدة المعلنة للوصول إلى ${q} هي ${r} دقيقة. ونؤكد المدة الفعلية عبر الهاتف عند الاتصال، حسب الساعة وحركة السير.`,
  }),
  specialty: (name) => ({
    question: `كيف تجري الاستشارة في المنزل مع ${name}؟`,
    answer:
      "يتصل بك الطبيب قبل وصوله للتأكد من العنوان وطريقة الدخول. وفي عين المكان، يجري فحصًا كاملًا، ثم يقرر بنفسه ما ينبغي فعله: علاج، أو وصفة طبية، أو توجيه نحو فحص تكميلي أو مصلحة استشفائية.",
  }),
  serviceRequest: (name, phone) => ({
    question: `${name}: كيف أقدم الطلب؟`,
    answer: `اتصل بالرقم ${phone}. نراجع معك ما تحتاجه، والعنوان، والوقت المناسب، ثم نؤكد لك السعر قبل أي تدخل.`,
  }),
  serviceSpecific: (secours) => ({
    "soins-infirmiers-a-domicile": {
      question: "هل أحتاج إلى وصفة طبية؟",
      answer:
        "نعم. تُقدَّم العلاجات التمريضية بناءً على وصفة طبية، وهي التي تحدد الإجراءات وعدد مراتها. وإن لم تكن لديك وصفة، فإن استشارة في المنزل تتيح للطبيب أولًا تحديد العلاج.",
    },
    ambulance: {
      question: "هل أتصل بسيارة إسعاف خاصة أم بمصالح الإسعاف؟",
      answer: `إذا كان هناك أي شك في خطورة الحالة — صعوبة في التنفس، أو فقدان الوعي، أو ألم شديد في الصدر، أو نزيف حاد، أو حادث — فاتصل فورًا بالرقم ${secours}: فهذه المصالح تتوفر على وسائل الإنعاش وأولوية المرور. أما النقل الخاص فهو للمرضى الذين تكون حالتهم معروفة ومستقرة ويحتاجون إلى التنقل نحو فحص، أو بين مؤسستين، أو للعودة إلى منازلهم.`,
    },
    "oxygenotherapie-a-domicile": {
      question: "هل يجب أن أوفر المعدات بنفسي؟",
      answer:
        "لا. نوفر المعدات اللازمة للعلاج ونركبها في منزلك. وتلزم وصفة طبية، فهي التي تحدد ما يُركَّب وبأي ضبط. أما الضبط نفسه فمن اختصاص الطبيب الذي وصف العلاج، ولا يُغيَّر أبدًا دون رأيه.",
    },
    "hospitalisation-a-domicile": {
      question: "كيف أعرف إن كان الاستشفاء المنزلي ممكنًا؟",
      answer:
        "يحدد ذلك تقييم طبي. يدرس الطبيب طبيعة العلاجات اللازمة وتواترها، وحالة الشخص، وظروف المنزل، ثم يبين إن كانت الحالة مناسبة. فليست كل الحالات مناسبة لهذا النوع من التكفل، ويسبق هذا التقييم دائمًا أي ترتيب.",
    },
    "evacuation-sanitaire": {
      question: "ما هي الرحلات التي تؤمنونها؟",
      answer:
        "نؤمن النقل عبر الطريق، بين المدن وبين المؤسسات الصحية داخل المغرب. أخبرنا عبر الهاتف بنقطة الانطلاق، والوجهة بالضبط، وحالة الشخص: فهذه العناصر تحدد طريقة تنظيم النقل، وكذلك السعر الذي نعلنه لك قبل الانطلاق.",
    },
    "transport-medicalise": {
      question: "هل يجب الحجز مسبقًا؟",
      answer:
        "بالنسبة لرحلة مبرمجة — فحص في ساعة محددة، أو خروج مقرر من المستشفى — من الأفضل الحجز قبل يوم أو أكثر، حتى تُنظَّم الرحلة حسب موعدك. ويبقى النقل غير المبرمج ممكنًا: ونخبرك بالمدة عبر الهاتف حسب الساعة والوجهة.",
    },
    "suivi-medical-personnalise": {
      question: "كم مرة يزور الطبيب المريض؟",
      answer:
        "لا يُحدَّد عدد الزيارات مسبقًا: يُتفق عليه مع الطبيب حسب حالة الشخص، ويُعاد تقييمه مع توالي الزيارات. ونؤكده لك، مع السعر المطبق، قبل بدء التتبع.",
    },
  }),
  serviceExtra: {
    ambulance: [
      {
        question: "كم تكلف سيارة إسعاف خاصة؟",
        answer:
          "لا يوجد سعر موحد: يتوقف المبلغ على المسافة، ونوع النقل (مريض جالس أو ممدد، نقل عادي أو مجهز طبيًا)، والمعدات اللازمة أثناء الرحلة، وظروف الوصول عند الانطلاق والوصول. ونعلنه لك عبر الهاتف قبل الانطلاق.",
      },
    ],
  },
};

const TEXTS: Record<Locale, FaqText> = { fr: FR, en: EN, ar: AR };

/** The FAQ builders for one locale. */
export function faqs(locale: Locale = "fr") {
  const x = TEXTS[locale];
  const t = dict(locale);
  const { content } = api(locale);

  const priceAnswer = () =>
    x.price(content.pricing.tiers.map((tier) => x.pricePart(tier.label, tier.amountMad, t.currency, tier.window)));

  const common = (): FaqEntry[] =>
    x.common(t.hoursProse, x.secours).map((e) => (e.answer === "" ? { ...e, answer: priceAnswer() } : e));

  return {
    homeFaqs: (): FaqEntry[] => common(),
    cityFaqs: (cityName: string): FaqEntry[] => [x.city(cityName, t.hoursProse), ...common()],
    quartierFaqs: (quartierName: string, responseTimeMinutes: string): FaqEntry[] => [
      x.quartier(quartierName, t.range(responseTimeMinutes)),
      ...common(),
    ],
    specialtyFaqs: (specialtyName: string): FaqEntry[] => [x.specialty(specialtyName), ...common()],
    /**
     * The second question differs per service because the honest answer does:
     * nursing care runs on a prescription, transport is booked around a
     * destination and a time, and a follow-up is agreed as a schedule.
     */
    serviceFaqs: (service: Service): FaqEntry[] => [
      x.serviceRequest(service.name, content.business.phoneDisplay),
      x.serviceSpecific(x.secours)[service.slug],
      ...(x.serviceExtra[service.slug] ?? []),
      ...common(),
    ],
    situationFaqs: (): FaqEntry[] => common(),
  };
}

/* French shortcuts, kept for the pages that have not needed a locale. */
export const homeFaqs = () => faqs("fr").homeFaqs();
export const cityFaqs = (cityName: string) => faqs("fr").cityFaqs(cityName);
export const quartierFaqs = (q: string, r: string) => faqs("fr").quartierFaqs(q, r);
export const specialtyFaqs = (s: string) => faqs("fr").specialtyFaqs(s);
export const serviceFaqs = (s: Service) => faqs("fr").serviceFaqs(s);
export const situationFaqs = () => faqs("fr").situationFaqs();
