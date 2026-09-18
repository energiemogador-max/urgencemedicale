import type { Locale } from "@/lib/i18n";

/**
 * Interface text for the three locales.
 *
 * Page CONTENT (city bodies, quartier notes, service prose…) lives in the
 * content layer and its translations in content/i18n. This file holds the
 * text the templates and components wrap around that content: headings,
 * labels, buttons, the sentences built around a city or a price.
 *
 * Rules that apply to every locale:
 *  - no claim that the French site does not make;
 *  - no medical advice: symptoms only ever route to the emergency numbers;
 *  - numbers, prices and delays are passed in from the content layer, never
 *    typed here.
 *
 * Arabic is Modern Standard Arabic with Moroccan usage: "الهيئة الوطنية
 * للطبيبات والأطباء" is the official Arabic name of the Ordre National des
 * Médecins, prices are in "درهم", and digits stay Western, as on Moroccan
 * signage and phones.
 */
export interface Dict {
  htmlLang: string;
  ogLocale: string;
  currency: string;
  /** "10 à 15" (stored in French in the content layer) in this locale. */
  range: (frenchRange: string) => string;
  minutes: string;
  hours247: string;
  /** The same, inside a sentence. */
  hoursProse: string;

  nav: {
    home: string;
    specialties: string;
    cities: string;
    situations: string;
    services: string;
    prices: string;
    doctors: string;
    contact: string;
    about: string;
    menu: string;
    mainNav: string;
    breadcrumb: string;
    language: string;
    brandTagline: string;
    homeAria: (brand: string) => string;
  };

  call: {
    callUs: string;
    callNow: string;
    call: string;
    callShort: string;
    whatsappAria: string;
  };

  /** "{specialty} à domicile" — the specialty hub label. */
  specialtyAtHome: (name: string) => string;
  /** "{thing} à {city}". */
  inCity: (thing: string, city: string) => string;

  trust: {
    doctorsCount: (n: number) => string;
    registered: string;
    ordreNumber: (n: string) => string;
    intervention: (range: string) => string;
  };

  liveStatus: {
    open: string;
    fallback: (day: string, night: string, currency: string) => string;
    dayShort: string;
    nightShort: string;
    dayLong: string;
    nightLong: string;
    /** Separator between hours and minutes in the clock. */
    clockSep: string;
  };

  banner: {
    defaultLabel: string;
    defaultText: (hours: string) => string;
    serviceLabel: string;
    serviceText: string;
  };

  price: {
    confirmedBefore: string;
    confirmedStrong: string;
    unchanged: string;
  };

  faqTitle: string;
  illustration: string;
  ambulanceAltFront: string;
  ambulanceAltBack: string;

  footer: {
    tagline: (hours: string) => string;
    office: string;
    disclaimerStart: string;
    or: string;
    allNumbers: string;
    pharmacieGarde: string;
    samu: string;
    civil: string;
  };

  reviews: {
    title: string;
    lead: string;
    rating: (n: number) => string;
    googleListing: string;
    leaveReview: string;
    dateLocale: string;
  };

  facts: {
    intervention: string;
    consultation: string;
    availability: string;
    zone: string;
    request: string;
    byPhone: string;
    fee: string;
    feeBeforeVisit: string;
    feeBeforeIntervention: string;
    fromPrice: (amount: string, currency: string) => string;
    citiesCount: (n: number) => string;
    namedDoctors: (n: number) => string;
    namedDoctorsValue: (n: number) => string;
  };

  city: {
    heroTitle: string;
    quartiersTitle: (city: string) => string;
    quartiersLead: string;
    specialtiesTitle: (city: string) => string;
    servicesTitle: (city: string) => string;
  };

  quartier: {
    heroTitle: (quartier: string) => string;
    landmarks: (quartier: string) => string;
    hospitals: string;
    access: (quartier: string) => string;
    others: (city: string) => string;
  };

  specialty: {
    doctorsTitle: (specialty: string, count: number) => string;
    languages: string;
    byCity: (label: string) => string;
    others: string;
    othersInCity: (city: string) => string;
  };

  situation: {
    byCity: (title: string) => string;
    others: string;
    othersInCity: (city: string) => string;
  };

  service: {
    byCity: (name: string) => string;
    others: string;
    quartiersServed: (city: string) => string;
  };

  meta: {
    specialtyHub: (name: string) => string;
    citySpecialty: (name: string, city: string) => string;
    situationCity: (title: string, city: string) => string;
    serviceCity: (name: string, city: string) => string;
    cityHub: (city: string) => string;
    quartier: (quartier: string, city: string) => string;
    quartierDescription: (quartier: string, city: string, hours: string, range: string, price: string) => string;
  };
}

const fr: Dict = {
  htmlLang: "fr",
  ogLocale: "fr_MA",
  currency: "MAD",
  range: (r) => r,
  minutes: "min",
  hours247: "24/7",
  hoursProse: "24/7",
  nav: {
    home: "Accueil",
    specialties: "Spécialités",
    cities: "Villes",
    situations: "Situations",
    services: "Services",
    prices: "Tarifs",
    doctors: "Nos médecins",
    contact: "Contact",
    about: "À propos",
    menu: "Menu",
    mainNav: "Navigation principale",
    breadcrumb: "Fil d'Ariane",
    language: "Langue",
    brandTagline: "À domicile",
    homeAria: (b) => `${b} — accueil`,
  },
  call: {
    callUs: "Appelez-nous",
    callNow: "Appelez maintenant",
    call: "Appelez",
    callShort: "Appeler",
    whatsappAria: "Contacter sur WhatsApp",
  },
  specialtyAtHome: (n) => `${n} à domicile`,
  inCity: (t, c) => `${t} à ${c}`,
  trust: {
    doctorsCount: (n) => `${n} médecins`,
    registered: "inscrits à l'Ordre National des Médecins",
    ordreNumber: (n) => `Ordre National des Médecins n° ${n}`,
    intervention: (r) => `Intervention en ${r} min`,
  },
  liveStatus: {
    open: "Service ouvert",
    fallback: (d, n, c) => `24h/24 · ${d} à ${n} ${c}`,
    dayShort: "Tarif jour",
    nightShort: "Tarif nuit",
    dayLong: "Tarif de journée",
    nightLong: "Tarif de nuit",
    clockSep: "h",
  },
  banner: {
    defaultLabel: "Besoin d'un médecin maintenant ?",
    defaultText: (h) =>
      `Un médecin se déplace chez vous, ${h}. Le tarif vous est annoncé avant que vous ne confirmiez.`,
    serviceLabel: "Une demande pour ce service ?",
    serviceText:
      "La demande se fait par téléphone. Le tarif dépend de l'intervention et vous est annoncé avant qu'elle ne soit confirmée.",
  },
  price: {
    confirmedBefore: "Le tarif applicable vous est",
    confirmedStrong: "confirmé au téléphone, avant la visite",
    unchanged: "Il ne change pas à l'arrivée du médecin.",
  },
  faqTitle: "Questions fréquentes",
  illustration: "Image d'illustration",
  ambulanceAltFront: "Illustration : ambulances aux couleurs d'Urgence Médicale à domicile, vues de face",
  ambulanceAltBack: "Illustration : ambulances aux couleurs d'Urgence Médicale à domicile, vues de l'arrière",
  footer: {
    tagline: (h) => `Un médecin à votre domicile, ${h}. Le tarif vous est annoncé avant que vous ne confirmiez la visite.`,
    office: "Le cabinet",
    disclaimerStart: "Ce service ne remplace pas les services d'urgence. En cas d'urgence vitale, appelez immédiatement le",
    or: "ou le",
    allNumbers: "Tous les numéros d'urgence",
    pharmacieGarde: "Pharmacie de garde à Casablanca",
    samu: "SAMU",
    civil: "Protection civile",
  },
  reviews: {
    title: "Avis de patients",
    lead: "Publiés par les patients sur notre fiche Google, reproduits ici mot pour mot.",
    rating: (n) => `Note : ${n} sur 5`,
    googleListing: "Consulter la fiche Google",
    leaveReview: "Laisser un avis",
    dateLocale: "fr-MA",
  },
  facts: {
    intervention: "Intervention",
    consultation: "Consultation",
    availability: "Disponibilité",
    zone: "Zone",
    request: "Demande",
    byPhone: "Par téléphone",
    fee: "Tarif",
    feeBeforeVisit: "Annoncé avant la visite",
    feeBeforeIntervention: "Annoncé avant l'intervention",
    fromPrice: (a, c) => `dès ${a} ${c}`,
    citiesCount: (n) => `${n} villes`,
    namedDoctors: (n) => (n > 1 ? "Médecins nommés" : "Médecin nommé"),
    namedDoctorsValue: (n) => `${n} · n° d'Ordre publié`,
  },
  city: {
    heroTitle: "Médecin à domicile à",
    quartiersTitle: (c) => `Quartiers couverts à ${c}`,
    quartiersLead: "Chaque quartier a sa propre page, avec ses repères locaux et ses conditions d'accès.",
    specialtiesTitle: (c) => `Spécialités disponibles à ${c}`,
    servicesTitle: (c) => `Services à domicile à ${c}`,
  },
  quartier: {
    heroTitle: (q) => `Médecin à domicile à ${q},`,
    landmarks: (q) => `Repères à ${q}`,
    hospitals: "Hôpitaux et cliniques les plus proches",
    access: (q) => `Accès et circulation à ${q}`,
    others: (c) => `Autres quartiers de ${c}`,
  },
  specialty: {
    doctorsTitle: (s, n) => (n > 1 ? `Nos ${s.toLowerCase()}s` : `Votre ${s.toLowerCase()}`),
    languages: "Langues :",
    byCity: (l) => `${l} par ville`,
    others: "Autres spécialités à domicile",
    othersInCity: (c) => `Autres spécialités à ${c}`,
  },
  situation: {
    byCity: (t) => `${t} par ville`,
    others: "Autres motifs de consultation",
    othersInCity: (c) => `Autres motifs de consultation à ${c}`,
  },
  service: {
    byCity: (n) => `${n} par ville`,
    others: "Autres services à domicile",
    quartiersServed: (c) => `Quartiers desservis à ${c}`,
  },
  meta: {
    specialtyHub: (n) => `${n} à domicile`,
    citySpecialty: (n, c) => `${n} à domicile à ${c}`,
    situationCity: (t, c) => `${t} à ${c}`,
    serviceCity: (n, c) => `${n} à ${c}`,
    cityHub: (c) => `Médecin à domicile à ${c}`,
    quartier: (q, c) => `Médecin à domicile ${q}, ${c}`,
    quartierDescription: (q, c, h, r, p) =>
      `Médecin à domicile à ${q} (${c}), ${h} : intervention en ${r} min, consultation dès ${p}, tarif annoncé avant la visite.`,
  },
};

const en: Dict = {
  htmlLang: "en",
  ogLocale: "en_GB",
  currency: "MAD",
  range: (r) => r.replace(" à ", " to "),
  minutes: "min",
  hours247: "24/7",
  hoursProse: "24/7",
  nav: {
    home: "Home",
    specialties: "Specialties",
    cities: "Cities",
    situations: "Situations",
    services: "Services",
    prices: "Fees",
    doctors: "Our doctors",
    contact: "Contact",
    about: "About us",
    menu: "Menu",
    mainNav: "Main navigation",
    breadcrumb: "Breadcrumb",
    language: "Language",
    brandTagline: "Home visits",
    homeAria: (b) => `${b} — home`,
  },
  call: {
    callUs: "Call us",
    callNow: "Call now",
    call: "Call",
    callShort: "Call",
    whatsappAria: "Contact us on WhatsApp",
  },
  specialtyAtHome: (n) => `${n} at home`,
  inCity: (t, c) => `${t} in ${c}`,
  trust: {
    doctorsCount: (n) => `${n} doctors`,
    registered: "registered with the Ordre National des Médecins",
    ordreNumber: (n) => `Ordre National des Médecins No. ${n}`,
    intervention: (r) => `Arrival in ${r} min`,
  },
  liveStatus: {
    open: "Service open",
    fallback: (d, n, c) => `24/7 · ${d} to ${n} ${c}`,
    dayShort: "Day fee",
    nightShort: "Night fee",
    dayLong: "Daytime fee",
    nightLong: "Night fee",
    clockSep: ":",
  },
  banner: {
    defaultLabel: "Need a doctor now?",
    defaultText: (h) => `A doctor comes to you, ${h}. The fee is quoted before you confirm.`,
    serviceLabel: "Need this service?",
    serviceText:
      "Requests are made by phone. The fee depends on what is needed and is quoted before anything is confirmed.",
  },
  price: {
    confirmedBefore: "The fee that applies is",
    confirmedStrong: "confirmed on the phone, before the visit",
    unchanged: "It does not change when the doctor arrives.",
  },
  faqTitle: "Frequently asked questions",
  illustration: "Illustration",
  ambulanceAltFront: "Illustration: ambulances in the Urgence Médicale à domicile livery, front view",
  ambulanceAltBack: "Illustration: ambulances in the Urgence Médicale à domicile livery, rear view",
  footer: {
    tagline: (h) => `A doctor at your home, ${h}. The fee is quoted before you confirm the visit.`,
    office: "Our office",
    disclaimerStart: "This service does not replace the emergency services. If a life may be at risk, call",
    or: "or",
    allNumbers: "All emergency numbers",
    pharmacieGarde: "On-call pharmacy in Casablanca",
    samu: "SAMU, medical emergencies",
    civil: "Civil Protection",
  },
  reviews: {
    title: "Patient reviews",
    lead: "Posted by patients on our Google listing and reproduced here word for word.",
    rating: (n) => `Rating: ${n} out of 5`,
    googleListing: "See our Google listing",
    leaveReview: "Leave a review",
    dateLocale: "en-GB",
  },
  facts: {
    intervention: "Arrival",
    consultation: "Consultation",
    availability: "Availability",
    zone: "Area",
    request: "How to book",
    byPhone: "By phone",
    fee: "Fee",
    feeBeforeVisit: "Quoted before the visit",
    feeBeforeIntervention: "Quoted before the service",
    fromPrice: (a, c) => `from ${a} ${c}`,
    citiesCount: (n) => `${n} cities`,
    namedDoctors: (n) => (n > 1 ? "Named doctors" : "Named doctor"),
    namedDoctorsValue: (n) => `${n} · Ordre number published`,
  },
  city: {
    heroTitle: "Doctor at home in",
    quartiersTitle: (c) => `Neighbourhoods covered in ${c}`,
    quartiersLead: "Each neighbourhood has its own page, with local landmarks and access notes.",
    specialtiesTitle: (c) => `Specialties available in ${c}`,
    servicesTitle: (c) => `Home services in ${c}`,
  },
  quartier: {
    heroTitle: (q) => `Doctor at home in ${q},`,
    landmarks: (q) => `Landmarks in ${q}`,
    hospitals: "Nearest hospitals and clinics",
    access: (q) => `Getting to you in ${q}`,
    others: (c) => `Other neighbourhoods in ${c}`,
  },
  specialty: {
    doctorsTitle: (s, n) => (n > 1 ? `Our ${s.toLowerCase()}s` : `Your ${s.toLowerCase()}`),
    languages: "Languages:",
    byCity: (l) => `${l} by city`,
    others: "Other specialties at home",
    othersInCity: (c) => `Other specialties in ${c}`,
  },
  situation: {
    byCity: (t) => `${t} by city`,
    others: "Other reasons to call a doctor",
    othersInCity: (c) => `Other reasons to call a doctor in ${c}`,
  },
  service: {
    byCity: (n) => `${n} by city`,
    others: "Other home services",
    quartiersServed: (c) => `Neighbourhoods served in ${c}`,
  },
  meta: {
    specialtyHub: (n) => `${n} at home`,
    citySpecialty: (n, c) => `${n} at home in ${c}`,
    situationCity: (t, c) => `${t} in ${c}`,
    serviceCity: (n, c) => `${n} in ${c}`,
    cityHub: (c) => `Doctor at home in ${c}`,
    quartier: (q, c) => `Doctor at home in ${q}, ${c}`,
    quartierDescription: (q, c, h, r, p) =>
      `Doctor at home in ${q} (${c}), ${h}: arrival in ${r} min, consultation from ${p}, fee quoted before the visit.`,
  },
};

const ar: Dict = {
  htmlLang: "ar",
  ogLocale: "ar_MA",
  currency: "درهم",
  range: (r) => r.replace(" à ", " إلى "),
  minutes: "دقيقة",
  hours247: "24/7",
  hoursProse: "على مدار الساعة طوال أيام الأسبوع",
  nav: {
    home: "الرئيسية",
    specialties: "التخصصات",
    cities: "المدن",
    situations: "الحالات",
    services: "الخدمات",
    prices: "الأسعار",
    doctors: "أطباؤنا",
    contact: "اتصل بنا",
    about: "من نحن",
    menu: "القائمة",
    mainNav: "القائمة الرئيسية",
    breadcrumb: "مسار التصفح",
    language: "اللغة",
    brandTagline: "في منزلك",
    homeAria: (b) => `${b} — الصفحة الرئيسية`,
  },
  call: {
    callUs: "اتصل بنا",
    callNow: "اتصل الآن",
    call: "اتصل",
    callShort: "اتصل",
    whatsappAria: "تواصل معنا عبر واتساب",
  },
  specialtyAtHome: (n) => `${n} في المنزل`,
  inCity: (t, c) => `${t} في ${c}`,
  trust: {
    doctorsCount: (n) => `${n} أطباء`,
    registered: "مسجلون في الهيئة الوطنية للطبيبات والأطباء",
    ordreNumber: (n) => `رقم التسجيل في الهيئة الوطنية للطبيبات والأطباء: ${n}`,
    intervention: (r) => `الوصول خلال ${r} دقيقة`,
  },
  liveStatus: {
    open: "الخدمة متاحة الآن",
    fallback: (d, n, c) => `24/24 · من ${d} إلى ${n} ${c}`,
    dayShort: "تعريفة النهار",
    nightShort: "تعريفة الليل",
    dayLong: "تعريفة النهار",
    nightLong: "تعريفة الليل",
    clockSep: ":",
  },
  banner: {
    defaultLabel: "هل تحتاج إلى طبيب الآن؟",
    defaultText: (h) => `يأتي الطبيب إلى منزلك، ${h}. نخبرك بالسعر قبل أن تؤكد الزيارة.`,
    serviceLabel: "هل تحتاج إلى هذه الخدمة؟",
    serviceText: "يتم الطلب عبر الهاتف. يتوقف السعر على نوع التدخل، ونخبرك به قبل تأكيده.",
  },
  price: {
    confirmedBefore: "نؤكد لك السعر المطبق",
    confirmedStrong: "عبر الهاتف، قبل الزيارة",
    unchanged: "ولا يتغير عند وصول الطبيب.",
  },
  faqTitle: "أسئلة شائعة",
  illustration: "صورة توضيحية",
  ambulanceAltFront: "صورة توضيحية: سيارات إسعاف بألوان Urgence Médicale à domicile، من الأمام",
  ambulanceAltBack: "صورة توضيحية: سيارات إسعاف بألوان Urgence Médicale à domicile، من الخلف",
  footer: {
    tagline: (h) => `طبيب في منزلك، ${h}. نخبرك بالسعر قبل أن تؤكد الزيارة.`,
    office: "العنوان",
    disclaimerStart: "هذه الخدمة لا تعوض مصالح الإسعاف. إذا كانت الحياة في خطر، اتصل فورًا بالرقم",
    or: "أو",
    allNumbers: "جميع أرقام الطوارئ",
    pharmacieGarde: "صيدلية الحراسة بالدار البيضاء",
    samu: "الإسعاف الطبي SAMU",
    civil: "الوقاية المدنية",
  },
  reviews: {
    title: "آراء المرضى",
    lead: "نشرها المرضى على صفحتنا في Google، وننقلها هنا كما هي.",
    rating: (n) => `التقييم: ${n} من 5`,
    googleListing: "صفحتنا على Google",
    leaveReview: "اترك تقييمًا",
    dateLocale: "ar-MA",
  },
  facts: {
    intervention: "الوصول",
    consultation: "الاستشارة",
    availability: "التوفر",
    zone: "المنطقة",
    request: "الطلب",
    byPhone: "عبر الهاتف",
    fee: "السعر",
    feeBeforeVisit: "يُعلن قبل الزيارة",
    feeBeforeIntervention: "يُعلن قبل التدخل",
    fromPrice: (a, c) => `ابتداءً من ${a} ${c}`,
    citiesCount: (n) => `${n} مدن`,
    namedDoctors: (n) => (n > 1 ? "أطباء بأسمائهم" : "طبيب باسمه"),
    namedDoctorsValue: (n) => `${n} · رقم التسجيل منشور`,
  },
  city: {
    heroTitle: "طبيب في المنزل في",
    quartiersTitle: (c) => `الأحياء المشمولة في ${c}`,
    quartiersLead: "لكل حي صفحته الخاصة، مع معالمه المحلية وظروف الوصول إليه.",
    specialtiesTitle: (c) => `التخصصات المتوفرة في ${c}`,
    servicesTitle: (c) => `الخدمات المنزلية في ${c}`,
  },
  quartier: {
    heroTitle: (q) => `طبيب في المنزل في ${q}،`,
    landmarks: (q) => `معالم ${q}`,
    hospitals: "أقرب المستشفيات والمصحات",
    access: (q) => `الوصول والتنقل في ${q}`,
    others: (c) => `أحياء أخرى في ${c}`,
  },
  specialty: {
    doctorsTitle: (_s, n) => (n > 1 ? "أطباؤنا في هذا التخصص" : "طبيبك في هذا التخصص"),
    languages: "اللغات:",
    byCity: (l) => `${l} حسب المدينة`,
    others: "تخصصات أخرى في المنزل",
    othersInCity: (c) => `تخصصات أخرى في ${c}`,
  },
  situation: {
    byCity: (t) => `${t} حسب المدينة`,
    others: "دواعٍ أخرى لطلب الطبيب",
    othersInCity: (c) => `دواعٍ أخرى لطلب الطبيب في ${c}`,
  },
  service: {
    byCity: (n) => `${n} حسب المدينة`,
    others: "خدمات منزلية أخرى",
    quartiersServed: (c) => `الأحياء المخدومة في ${c}`,
  },
  meta: {
    specialtyHub: (n) => `${n} في المنزل`,
    citySpecialty: (n, c) => `${n} في المنزل في ${c}`,
    situationCity: (t, c) => `${t} في ${c}`,
    serviceCity: (n, c) => `${n} في ${c}`,
    cityHub: (c) => `طبيب في المنزل في ${c}`,
    quartier: (q, c) => `طبيب في المنزل في ${q}، ${c}`,
    quartierDescription: (q, c, h, r, p) =>
      `طبيب في المنزل في ${q} (${c})، ${h}: الوصول خلال ${r} دقيقة، الاستشارة ابتداءً من ${p}، والسعر يُعلن قبل الزيارة.`,
  },
};

const DICTS: Record<Locale, Dict> = { fr, en, ar };

export function dict(locale: Locale): Dict {
  return DICTS[locale];
}
