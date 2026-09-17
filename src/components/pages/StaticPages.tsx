import type { Metadata } from "next";
import Link from "next/link";
import { isUnconfirmed } from "@content/schema";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { TrustBlock } from "@/components/TrustBlock";
import { PriceBoard } from "@/components/PriceBoard";
import { CallBanner } from "@/components/CallBanner";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, FactPill, Lead, Section } from "@/components/ui";
import { toWhatsAppHref } from "@/lib/phone";
import { faqs } from "@/lib/faqs";
import { EMERGENCY_NUMBERS, EMERGENCY_SOURCES } from "@/lib/emergency";
import { buildOffers } from "@/lib/schema-org/offers";
import { buildPhysician } from "@/lib/schema-org/physician";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

/**
 * The six standalone pages — tarifs, nos-médecins, à propos, contact,
 * réserver, numéros d'urgence — in every locale. Each French route folder
 * renders its page with locale "fr"; /en and /ar go through the dispatcher.
 *
 * Only the wording changes between languages. Prices, numbers, doctors and
 * the structure of each page are the same data everywhere.
 */

function common(locale: Locale) {
  const a = api(locale);
  return { ...a, t: dict(locale), L: (p: string) => localizedPath(p, locale) };
}

function Crumbs({ locale, label, path }: { locale: Locale; label: string; path: string }) {
  const { t, L } = common(locale);
  return (
    <>
      <JsonLd
        data={buildBreadcrumbList([
          { name: t.nav.home, path: L(paths.home()) },
          { name: label, path: L(path) },
        ])}
      />
      <Breadcrumbs locale={locale} trail={[{ href: L(paths.home()), label: t.nav.home }, { label }]} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Tarifs
// ---------------------------------------------------------------------------

const TARIFS = {
  fr: {
    title: "Tarifs",
    description: "Nos tarifs de consultation à domicile, en toute transparence — jour, nuit et weekend.",
    lead: "Le tarif applicable vous est annoncé au téléphone avant que vous ne confirmiez la visite, et ne change pas à l'arrivée du médecin.",
    includedTitle: "Ce que comprend la consultation",
    included: [
      "Le déplacement du médecin jusqu'à votre domicile",
      "L'examen clinique complet sur place",
      "L'ordonnance si le médecin la juge nécessaire",
      "Le compte-rendu de la consultation",
    ],
    available: (h: string) => `Service disponible ${h}, week-ends et jours fériés compris.`,
    banner: "Ce tarif vous convient ?",
  },
  en: {
    title: "Fees",
    description: "Our home consultation fees, published openly — daytime, night and weekend.",
    lead: "The fee that applies is quoted on the phone before you confirm the visit, and does not change when the doctor arrives.",
    includedTitle: "What the consultation includes",
    included: [
      "The doctor's journey to your home",
      "A full clinical examination on the spot",
      "A prescription if the doctor considers one necessary",
      "A written report of the consultation",
    ],
    available: (h: string) => `Service available ${h}, weekends and public holidays included.`,
    banner: "Does this fee work for you?",
  },
  ar: {
    title: "الأسعار",
    description: "أسعار الاستشارة في المنزل، منشورة بكل شفافية — النهار والليل ونهاية الأسبوع.",
    lead: "نخبرك بالسعر المطبق عبر الهاتف قبل أن تؤكد الزيارة، ولا يتغير عند وصول الطبيب.",
    includedTitle: "ما تشمله الاستشارة",
    included: [
      "تنقل الطبيب إلى منزلك",
      "فحص سريري كامل على عين المكان",
      "وصفة طبية إذا رأى الطبيب ضرورتها",
      "تقرير مكتوب عن الاستشارة",
    ],
    available: (h: string) => `الخدمة متاحة ${h}، بما في ذلك نهاية الأسبوع وأيام العطل.`,
    banner: "هل يناسبك هذا السعر؟",
  },
};

export function tarifsMetadata(locale: Locale = "fr"): Metadata {
  const x = TARIFS[locale];
  return pageMetadata({ title: x.title, description: x.description, path: paths.tarifs(), locale });
}

export function TarifsPage({ locale = "fr" }: { locale?: Locale }) {
  const { content, getTrustBlockProps, t } = common(locale);
  const x = TARIFS[locale];
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={buildOffers()} />
      <Crumbs locale={locale} label={x.title} path={paths.tarifs()} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{x.title}</h1>
      <Lead>{x.lead}</Lead>
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-8">
        <PriceBoard
          locale={locale}
          pricing={content.pricing}
          phoneDisplay={content.business.phoneDisplay}
          phoneHref={content.business.phoneHref}
          tap="page-tarifs"
        />
      </div>

      <Section title={x.includedTitle}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {x.included.map((item) => (
            <li key={item} className="crescent-marker rounded-lg border border-border bg-surface px-4 py-3 text-ink-muted">
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-muted">{x.available(t.hoursProse)}</p>
      </Section>

      <FaqBlock locale={locale} entries={faqs(locale).homeFaqs()} />
      <CallBanner locale={locale} label={x.banner} />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Nos médecins
// ---------------------------------------------------------------------------

const DOCTORS = {
  fr: {
    title: "Nos médecins",
    description: "Les médecins qui interviennent à domicile, avec leur numéro d'inscription à l'Ordre National des Médecins.",
    lead: "Chaque médecin qui se déplace chez vous est nommément identifié et inscrit à l'Ordre National des Médecins. Son numéro d'inscription est public et vérifiable.",
    team: "L'équipe",
    banner: "Un de nos médecins peut venir chez vous",
  },
  en: {
    title: "Our doctors",
    description: "The doctors who make home visits, with their registration number at the Ordre National des Médecins.",
    lead: "Every doctor who comes to your home is identified by name and registered with the Ordre National des Médecins, Morocco's medical council. Their registration number is public and can be checked.",
    team: "The team",
    banner: "One of our doctors can come to you",
  },
  ar: {
    title: "أطباؤنا",
    description: "الأطباء الذين يقومون بالزيارات المنزلية، مع أرقام تسجيلهم في الهيئة الوطنية للطبيبات والأطباء.",
    lead: "كل طبيب يتنقل إلى منزلك معروف باسمه ومسجل في الهيئة الوطنية للطبيبات والأطباء. ورقم تسجيله عمومي ويمكن التحقق منه.",
    team: "الفريق",
    banner: "يمكن لأحد أطبائنا أن يأتي إليك",
  },
};

export function nosMedecinsMetadata(locale: Locale = "fr"): Metadata {
  const x = DOCTORS[locale];
  return pageMetadata({ title: x.title, description: x.description, path: paths.nosMedecins(), locale });
}

export function NosMedecinsPage({ locale = "fr" }: { locale?: Locale }) {
  const { content, getTrustBlockProps, t } = common(locale);
  const x = DOCTORS[locale];
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Physician nodes always use the French record: one doctor, one entity. */}
      <JsonLd data={api("fr").content.doctors.map(buildPhysician)} />
      <Crumbs locale={locale} label={x.title} path={paths.nosMedecins()} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{x.title}</h1>
      <Lead>{x.lead}</Lead>
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <Section title={x.team}>
        <ul className="grid gap-4">
          {content.doctors.map((d) => (
            <li key={d.slug} className="rounded-lg border border-border bg-surface p-5">
              <h3 className="text-xl font-bold text-ink">{d.name}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="rounded-full bg-primary-tint px-2.5 py-0.5 font-semibold text-primary">
                  {content.specialties.find((s) => s.slug === d.specialtySlug)?.name}
                </span>
                {!isUnconfirmed(d.ordreNumber) && <span className="text-ink-muted">{t.trust.ordreNumber(d.ordreNumber)}</span>}
              </div>
              <p className="mt-3 max-w-[68ch] text-ink-muted">{d.bio}</p>
              <p className="mt-2 text-sm text-ink-muted">
                <span className="font-semibold text-ink">{t.specialty.languages}</span>{" "}
                {d.languages.join(locale === "ar" ? "، " : ", ")}
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <CallBanner locale={locale} label={x.banner} />
    </main>
  );
}

// ---------------------------------------------------------------------------
// À propos
// ---------------------------------------------------------------------------

const ABOUT = {
  fr: { title: "À propos", heading: (b: string) => `À propos de ${b}`, minutes: "minutes" },
  en: { title: "About us", heading: (b: string) => `About ${b}`, minutes: "minutes" },
  ar: { title: "من نحن", heading: (b: string) => `عن ${b}`, minutes: "دقيقة" },
};

export function aProposMetadata(locale: Locale = "fr"): Metadata {
  const { content } = api(locale);
  return pageMetadata({ title: ABOUT[locale].title, description: content.aboutPage.intro, path: paths.aPropos(), locale });
}

export function AProposPage({ locale = "fr" }: { locale?: Locale }) {
  const { content, getTrustBlockProps, t } = common(locale);
  const x = ABOUT[locale];
  const { business, aboutPage, pricing } = content;
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Crumbs locale={locale} label={x.title} path={paths.aPropos()} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{x.heading(business.legalName)}</h1>
      <Lead>{aboutPage.intro}</Lead>
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <FactPill label={t.facts.availability} value={t.hours247} />
        <FactPill label={t.facts.intervention} value={`${t.range(business.defaultResponseTimeMinutes)} ${x.minutes}`} />
        <FactPill label={t.facts.consultation} value={`${pricing.tiers[0]?.amountMad} ${t.currency}`} />
      </div>

      <div className="mt-8">
        <Prose text={aboutPage.body} />
      </div>

      <FaqBlock locale={locale} entries={faqs(locale).homeFaqs()} />
      <CallBanner locale={locale} />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

const CONTACT = {
  fr: {
    title: "Contact",
    description: (b: string, p: string) => `Contactez ${b} — ${p}.`,
    lead: "Le téléphone est le moyen le plus rapide de faire venir un médecin. Le délai et le tarif vous sont annoncés pendant l'appel.",
    address: "Adresse",
    minutes: "minutes",
  },
  en: {
    title: "Contact",
    description: (b: string, p: string) => `Contact ${b} — ${p}.`,
    lead: "The phone is the fastest way to get a doctor to you. The expected delay and the fee are given during the call.",
    address: "Address",
    minutes: "minutes",
  },
  ar: {
    title: "اتصل بنا",
    description: (b: string, p: string) => `اتصل بـ ${b} — ${p}.`,
    lead: "الهاتف هو أسرع وسيلة لطلب طبيب. ونخبرك بالمدة المتوقعة والسعر أثناء المكالمة.",
    address: "العنوان",
    minutes: "دقيقة",
  },
};

export function contactMetadata(locale: Locale = "fr"): Metadata {
  const { content } = api(locale);
  const x = CONTACT[locale];
  return pageMetadata({
    title: x.title,
    description: x.description(content.business.legalName, content.business.phoneDisplay),
    path: paths.contact(),
    locale,
  });
}

export function ContactPage({ locale = "fr" }: { locale?: Locale }) {
  const { content, getTrustBlockProps, t } = common(locale);
  const x = CONTACT[locale];
  const { business } = content;
  const { address } = business;
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Crumbs locale={locale} label={x.title} path={paths.contact()} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{x.title}</h1>
      <Lead>{x.lead}</Lead>
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <CallButton locale={locale} phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} tap="contact" />
        <WhatsAppButton locale={locale} href={toWhatsAppHref(business.whatsappNumber)} tap="contact" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <FactPill label={t.facts.availability} value={t.hours247} />
        <FactPill label={t.facts.intervention} value={`${t.range(business.defaultResponseTimeMinutes)} ${x.minutes}`} />
      </div>

      <Section title={x.address}>
        <address className="rounded-lg border border-border bg-surface p-5 not-italic">
          <span className="block font-bold text-ink" dir="ltr">
            {business.legalName}
          </span>
          <span className="mt-1 block text-ink-muted">
            {address.street}
            <br />
            {address.postalCode} {address.city}
            <br />
            {address.region}
          </span>
        </address>
      </Section>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Réserver
// ---------------------------------------------------------------------------

/*
 * Booking is by phone or WhatsApp. "No database" (repo-wide constraint) rules
 * out a self-hosted booking store, so the page routes to the one channel
 * known to work.
 */
const BOOKING = {
  fr: {
    crumb: "Réserver",
    title: "Réserver un médecin à domicile",
    description: "Réservez la visite d'un médecin à domicile.",
    lead: "Pour une prise en charge immédiate, appelez directement — c'est le moyen le plus rapide de faire venir un médecin, et le délai vous est confirmé pendant l'appel.",
    asked: "Ce qu'on vous demandera",
    items: [
      "L'adresse complète, avec l'étage et le code d'accès s'il y en a un",
      "L'âge de la personne à examiner",
      "Le motif général de la consultation",
      "Un numéro joignable pendant le trajet du médecin",
    ],
  },
  en: {
    crumb: "Book",
    title: "Book a doctor at home",
    description: "Book a home visit from a doctor.",
    lead: "For immediate care, call directly — it is the fastest way to get a doctor to you, and the expected delay is confirmed during the call.",
    asked: "What we will ask you",
    items: [
      "The full address, with the floor and the door code if there is one",
      "The age of the person to be seen",
      "The general reason for the consultation",
      "A number where you can be reached while the doctor is on the way",
    ],
  },
  ar: {
    crumb: "الحجز",
    title: "احجز طبيبًا في المنزل",
    description: "احجز زيارة طبيب في منزلك.",
    lead: "للتكفل الفوري، اتصل مباشرة — فهي أسرع وسيلة لطلب طبيب، ونؤكد لك المدة أثناء المكالمة.",
    asked: "ما الذي سنطلبه منك",
    items: [
      "العنوان الكامل، مع الطابق ورمز الدخول إن وُجد",
      "عمر الشخص المراد فحصه",
      "السبب العام للاستشارة",
      "رقم هاتف يمكن الاتصال بك عليه أثناء تنقل الطبيب",
    ],
  },
};

export function reserverMetadata(locale: Locale = "fr"): Metadata {
  const x = BOOKING[locale];
  return pageMetadata({ title: x.title, description: x.description, path: paths.reserver(), locale });
}

export function ReserverPage({ locale = "fr" }: { locale?: Locale }) {
  const { content, getTrustBlockProps } = common(locale);
  const x = BOOKING[locale];
  const { business } = content;
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Crumbs locale={locale} label={x.crumb} path={paths.reserver()} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{x.title}</h1>
      <Lead>{x.lead}</Lead>
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <CallButton locale={locale} phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} tap="reserver" />
        <WhatsAppButton locale={locale} href={toWhatsAppHref(business.whatsappNumber)} tap="reserver" />
      </div>

      <Section title={x.asked}>
        <ol className="grid gap-3 sm:grid-cols-2">
          {x.items.map((item, i) => (
            <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-sm font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-ink-muted">{item}</span>
            </li>
          ))}
        </ol>
      </Section>

      <FaqBlock locale={locale} entries={faqs(locale).homeFaqs()} />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Numéros d'urgence au Maroc
// ---------------------------------------------------------------------------

/*
 * WHY THIS PAGE EXISTS: people search for these numbers, and a medical site
 * is exactly where someone looks. Its first job is to send a reader in a
 * life-threatening situation somewhere else.
 *
 * DESIGN RULES: the large tappable tiles are the PUBLIC numbers, not ours;
 * our number appears only in a separate section further down. Every tile
 * carries data-tap="secours", which the visitor tracker ignores. No medical
 * advice: the only symptoms named are the ones that route to the emergency
 * services. Every number comes from src/lib/emergency.ts, sources listed.
 */
const n = EMERGENCY_NUMBERS;

interface EmergencyText {
  crumb: string;
  title: string;
  description: string;
  lead: string;
  labels: { samu: string; civil: string; police: string; gendarmerie: string; antiPoison: string };
  roles: [string, string, string, string, string, string];
  whichTitle: string;
  which: { strong: string; text: string }[];
  sayTitle: string;
  say: string[];
  restTitle: string;
  rest: (brand: string, cities: string, hours: string, day: string, night: string, currency: string) => string;
  seePrices: string;
  garde: string;
  faq: { question: string; answer: string }[];
  sourcesLead: string;
  citySeparator: string;
}

const EMERGENCY: Record<Locale, EmergencyText> = {
  fr: {
    crumb: "Numéros d'urgence au Maroc",
    title: "Numéros d'urgence au Maroc",
    description: `SAMU ${n.samu.number}, Protection civile ${n.protectionCivile.number}, Police ${n.police.number} ou ${n.police112.number}, Gendarmerie ${n.gendarmerie.number}, Centre Anti-Poison ${n.antiPoison.display} : quel numéro appeler, et quand.`,
    lead: "Les numéros publics à composer en cas d'urgence, joignables à toute heure. Ce site est un service privé de médecin à domicile : il ne les remplace pas.",
    labels: {
      samu: "SAMU",
      civil: "Protection civile",
      police: "Police",
      gendarmerie: "Gendarmerie royale",
      antiPoison: "Centre Anti-Poison et de Pharmacovigilance du Maroc",
    },
    roles: [
      "Urgences médicales",
      "Pompiers, ambulance",
      `Également joignable au ${n.police112.number}`,
      `Autre numéro de la police, avec le ${n.police.number}`,
      "Gendarmerie royale",
      "Intoxications — un médecin répond 24h/24, 7j/7",
    ],
    whichTitle: "Lequel appeler ?",
    which: [
      {
        strong:
          "Une personne ne respire plus normalement, a perdu connaissance, saigne abondamment ou se plaint d'une douleur violente dans la poitrine",
        text: ` : appelez le ${n.samu.number} (SAMU) ou le ${n.protectionCivile.number} (Protection civile), sans attendre. Ce sont les services publics prévus pour l'urgence vitale ; un service privé de médecin à domicile ne les remplace pas.`,
      },
      {
        strong: "Un incendie, un accident, une personne en danger",
        text: ` : le ${n.protectionCivile.number} pour la Protection civile, qui regroupe pompiers et ambulances ; le ${n.police.number} ou le ${n.police112.number} pour la police ; le ${n.gendarmerie.number} pour la Gendarmerie royale.`,
      },
      {
        strong: "Une intoxication",
        text: ` — un produit ménager, un médicament, une plante, une émanation de gaz : le Centre Anti-Poison et de Pharmacovigilance du Maroc répond au ${n.antiPoison.display} et au ${n.antiPoison.alternate.display}, vingt-quatre heures sur vingt-quatre et sept jours sur sept, avec un médecin au bout du fil. Si la personne a perdu connaissance ou respire mal, ce sont d'abord les secours qu'il faut appeler.`,
      },
      {
        strong: "Tout ce qui ne peut pas attendre le lendemain sans relever de l'urgence vitale",
        text: " — une fièvre qui monte la nuit, une douleur qui empêche de dormir, une personne âgée qui ne peut pas se déplacer jusqu'à un cabinet : c'est le rôle d'un médecin à domicile. Il se déplace, examine la personne et décide sur place de la suite, y compris d'une orientation vers l'hôpital si l'examen le justifie.",
      },
    ],
    sayTitle: "Ce qu'il faut dire au téléphone",
    say: [
      "Quel que soit le numéro composé, les mêmes informations font gagner du temps : l'adresse exacte avec un repère visible — une mosquée, une école, une pharmacie —, l'étage et le code d'entrée, ce qui s'est passé et depuis quand, l'âge approximatif de la personne, et un numéro sur lequel on peut vous rappeler.",
      "Restez joignable après l'appel et, si possible, envoyez quelqu'un attendre à l'entrée de l'immeuble ou de la résidence. De nuit, quand les numéros de rue se lisent mal, c'est souvent ce qui fait gagner le plus de temps.",
      "Enregistrez ces numéros dans votre téléphone et notez-les près de la porte, en particulier si vous vivez avec une personne âgée ou de jeunes enfants, ou si quelqu'un d'autre les garde : un papier affiché évite une recherche au pire moment.",
    ],
    restTitle: "Pour tout le reste : un médecin à domicile",
    rest: (b, c, h, d, ni, cur) =>
      `${b} envoie un médecin chez vous à ${c}, ${h}. La consultation coûte ${d} ${cur} en journée et le week-end, ${ni} ${cur} la nuit et les jours fériés ; le tarif applicable est confirmé au téléphone avant la visite.`,
    seePrices: "Voir les tarifs",
    garde: "Médecin de garde à domicile",
    faq: [
      {
        question: "Quel est le numéro du SAMU au Maroc ?",
        answer: `Le ${n.samu.number}. La Protection civile, qui regroupe pompiers et ambulances, répond au ${n.protectionCivile.number}.`,
      },
      {
        question: "Quel est le numéro de la police au Maroc ?",
        answer: `Le ${n.police.number} ou le ${n.police112.number}. La Gendarmerie royale répond au ${n.gendarmerie.number}.`,
      },
      {
        question: "Un médecin à domicile peut-il remplacer le SAMU ?",
        answer: `Non. Devant une urgence vitale, appelez le ${n.samu.number} ou le ${n.protectionCivile.number} : un service privé de médecin à domicile ne les remplace pas.`,
      },
      {
        question: "Qui appeler en cas d'intoxication ?",
        answer: `Le Centre Anti-Poison et de Pharmacovigilance du Maroc, au ${n.antiPoison.display} ou au ${n.antiPoison.alternate.display}, joignable vingt-quatre heures sur vingt-quatre et sept jours sur sept. Si la personne a perdu connaissance ou respire mal, appelez d'abord le ${n.samu.number} ou le ${n.protectionCivile.number}.`,
      },
    ],
    sourcesLead: "Numéros vérifiés le 16 septembre 2026 auprès des sources suivantes :",
    citySeparator: ", ",
  },
  en: {
    crumb: "Emergency numbers in Morocco",
    title: "Emergency numbers in Morocco",
    description: `SAMU ${n.samu.number}, Civil Protection ${n.protectionCivile.number}, Police ${n.police.number} or ${n.police112.number}, Gendarmerie ${n.gendarmerie.number}, Poison Control ${n.antiPoison.display}: which number to call, and when.`,
    lead: "The public numbers to dial in an emergency, answered at any hour. This site is a private home-doctor service: it does not replace them.",
    labels: {
      samu: "SAMU",
      civil: "Civil Protection",
      police: "Police",
      gendarmerie: "Royal Gendarmerie",
      antiPoison: "Moroccan Poison Control and Pharmacovigilance Centre",
    },
    roles: [
      "Medical emergencies",
      "Fire brigade, ambulance",
      `Also reachable on ${n.police112.number}`,
      `The other police number, with ${n.police.number}`,
      "Royal Gendarmerie",
      "Poisoning — a doctor answers 24/7",
    ],
    whichTitle: "Which one to call?",
    which: [
      {
        strong:
          "Someone is no longer breathing normally, has lost consciousness, is bleeding heavily or has severe chest pain",
        text: `: call ${n.samu.number} (SAMU) or ${n.protectionCivile.number} (Civil Protection) without waiting. These are the public services set up for life-threatening emergencies; a private home-doctor service does not replace them.`,
      },
      {
        strong: "A fire, an accident, someone in danger",
        text: `: ${n.protectionCivile.number} for the Civil Protection, which runs the fire brigade and ambulances; ${n.police.number} or ${n.police112.number} for the police; ${n.gendarmerie.number} for the Royal Gendarmerie.`,
      },
      {
        strong: "Poisoning",
        text: ` — a household product, a medicine, a plant, gas fumes: the Moroccan Poison Control and Pharmacovigilance Centre answers on ${n.antiPoison.display} and ${n.antiPoison.alternate.display}, 24 hours a day, 7 days a week, with a doctor on the line. If the person has lost consciousness or is breathing badly, call the emergency services first.`,
      },
      {
        strong: "Anything that cannot wait until tomorrow but is not life-threatening",
        text: " — a temperature climbing at night, pain that keeps someone awake, an older person who cannot get to a practice: that is what a home doctor is for. The doctor comes to you, examines the person and decides on the spot what happens next, including referral to hospital if the examination calls for it.",
      },
    ],
    sayTitle: "What to say on the phone",
    say: [
      "Whichever number you dial, the same details save time: the exact address with a visible landmark — a mosque, a school, a pharmacy — the floor and the entry code, what happened and since when, the person's approximate age, and a number you can be called back on.",
      "Stay reachable after the call and, if you can, send someone to wait at the entrance of the building or residence. At night, when street numbers are hard to read, that is often what saves the most time.",
      "Save these numbers in your phone and write them down near the door, especially if you live with an older person or young children, or if someone else looks after them: a note on the wall avoids a search at the worst moment.",
    ],
    restTitle: "For everything else: a doctor at home",
    rest: (b, c, h, d, ni, cur) =>
      `${b} sends a doctor to your home in ${c}, ${h}. A consultation costs ${d} ${cur} during the day and at weekends, and ${ni} ${cur} at night and on public holidays; the fee that applies is confirmed on the phone before the visit.`,
    seePrices: "See our fees",
    garde: "On-call doctor at home",
    faq: [
      {
        question: "What is the SAMU number in Morocco?",
        answer: `${n.samu.number}. The Civil Protection, which runs the fire brigade and ambulances, answers on ${n.protectionCivile.number}.`,
      },
      {
        question: "What is the police number in Morocco?",
        answer: `${n.police.number} or ${n.police112.number}. The Royal Gendarmerie answers on ${n.gendarmerie.number}.`,
      },
      {
        question: "Can a home doctor replace the SAMU?",
        answer: `No. In a life-threatening emergency, call ${n.samu.number} or ${n.protectionCivile.number}: a private home-doctor service does not replace them.`,
      },
      {
        question: "Who should I call for poisoning?",
        answer: `The Moroccan Poison Control and Pharmacovigilance Centre, on ${n.antiPoison.display} or ${n.antiPoison.alternate.display}, 24 hours a day, 7 days a week. If the person has lost consciousness or is breathing badly, call ${n.samu.number} or ${n.protectionCivile.number} first.`,
      },
    ],
    sourcesLead: "Numbers checked on 16 September 2026 against the following sources:",
    citySeparator: ", ",
  },
  ar: {
    crumb: "أرقام الطوارئ في المغرب",
    title: "أرقام الطوارئ في المغرب",
    description: `الإسعاف الطبي SAMU ${n.samu.number}، الوقاية المدنية ${n.protectionCivile.number}، الشرطة ${n.police.number} أو ${n.police112.number}، الدرك ${n.gendarmerie.number}، مركز محاربة التسمم ${n.antiPoison.display}: بأي رقم تتصل، ومتى.`,
    lead: "الأرقام العمومية التي يُتصل بها في حالة الطوارئ، وهي متاحة في أي ساعة. هذا الموقع خدمة خاصة للطبيب في المنزل: وهو لا يعوضها.",
    labels: {
      samu: "الإسعاف الطبي SAMU",
      civil: "الوقاية المدنية",
      police: "الشرطة",
      gendarmerie: "الدرك الملكي",
      antiPoison: "المركز المغربي لمحاربة التسمم واليقظة الدوائية",
    },
    roles: [
      "المستعجلات الطبية",
      "الإطفاء، الإسعاف",
      `يمكن الاتصال بها أيضًا على ${n.police112.number}`,
      `الرقم الآخر للشرطة، إلى جانب ${n.police.number}`,
      "الدرك الملكي",
      "حالات التسمم — يجيب طبيب على مدار الساعة",
    ],
    whichTitle: "بأي رقم تتصل؟",
    which: [
      {
        strong: "شخص لم يعد يتنفس بشكل طبيعي، أو فقد وعيه، أو ينزف بغزارة، أو يشكو من ألم شديد في الصدر",
        text: `: اتصل بالرقم ${n.samu.number} (الإسعاف الطبي SAMU) أو ${n.protectionCivile.number} (الوقاية المدنية) دون انتظار. فهذه هي المصالح العمومية المخصصة للحالات التي تهدد الحياة، ولا تعوضها خدمة خاصة للطبيب في المنزل.`,
      },
      {
        strong: "حريق، أو حادث، أو شخص في خطر",
        text: `: الرقم ${n.protectionCivile.number} للوقاية المدنية، التي تضم الإطفاء والإسعاف؛ والرقم ${n.police.number} أو ${n.police112.number} للشرطة؛ والرقم ${n.gendarmerie.number} للدرك الملكي.`,
      },
      {
        strong: "حالة تسمم",
        text: ` — مادة منزلية، أو دواء، أو نبتة، أو استنشاق غاز: يجيب المركز المغربي لمحاربة التسمم واليقظة الدوائية على الرقمين ${n.antiPoison.display} و${n.antiPoison.alternate.display}، على مدار الساعة وطوال أيام الأسبوع، مع طبيب على الخط. وإذا فقد الشخص وعيه أو كان يتنفس بصعوبة، فيجب الاتصال بمصالح الإسعاف أولًا.`,
      },
      {
        strong: "كل ما لا يمكنه الانتظار إلى الغد دون أن يهدد الحياة",
        text: " — حرارة ترتفع ليلًا، أو ألم يمنع من النوم، أو شخص مسن لا يستطيع التنقل إلى العيادة: هذا هو دور الطبيب في المنزل. يتنقل إليك، ويفحص الشخص، ويقرر على عين المكان ما يلي، بما في ذلك التوجيه إلى المستشفى إذا استدعى الفحص ذلك.",
      },
    ],
    sayTitle: "ما الذي تقوله عبر الهاتف",
    say: [
      "أيًا كان الرقم الذي تتصل به، فإن المعلومات نفسها توفر الوقت: العنوان بالضبط مع معلم ظاهر — مسجد، أو مدرسة، أو صيدلية — والطابق ورمز الدخول، وما الذي حدث ومنذ متى، والعمر التقريبي للشخص، ورقم يمكن الاتصال بك عليه.",
      "ابقَ متاحًا بعد المكالمة، وإن أمكن، أرسل شخصًا لينتظر عند مدخل العمارة أو الإقامة. ففي الليل، حين تصعب قراءة أرقام الشوارع، غالبًا ما يكون هذا هو ما يوفر أكبر قدر من الوقت.",
      "احفظ هذه الأرقام في هاتفك ودوّنها قرب الباب، خاصة إذا كنت تعيش مع شخص مسن أو أطفال صغار، أو إذا كان شخص آخر يعتني بهم: فورقة معلقة تغني عن البحث في أسوأ لحظة.",
    ],
    restTitle: "لكل ما عدا ذلك: طبيب في المنزل",
    rest: (b, c, h, d, ni, cur) =>
      `ترسل ${b} طبيبًا إلى منزلك في ${c}، ${h}. تكلف الاستشارة ${d} ${cur} في النهار ونهاية الأسبوع، و${ni} ${cur} في الليل وأيام العطل؛ ونؤكد السعر المطبق عبر الهاتف قبل الزيارة.`,
    seePrices: "الاطلاع على الأسعار",
    garde: "طبيب المداومة في المنزل",
    faq: [
      {
        question: "ما هو رقم الإسعاف الطبي SAMU في المغرب؟",
        answer: `الرقم ${n.samu.number}. وتجيب الوقاية المدنية، التي تضم الإطفاء والإسعاف، على الرقم ${n.protectionCivile.number}.`,
      },
      {
        question: "ما هو رقم الشرطة في المغرب؟",
        answer: `الرقم ${n.police.number} أو ${n.police112.number}. ويجيب الدرك الملكي على الرقم ${n.gendarmerie.number}.`,
      },
      {
        question: "هل يمكن للطبيب في المنزل أن يعوض الإسعاف الطبي SAMU؟",
        answer: `لا. في حالة تهدد الحياة، اتصل بالرقم ${n.samu.number} أو ${n.protectionCivile.number}: فخدمة الطبيب في المنزل الخاصة لا تعوضها.`,
      },
      {
        question: "بمن أتصل في حالة التسمم؟",
        answer: `بالمركز المغربي لمحاربة التسمم واليقظة الدوائية، على الرقم ${n.antiPoison.display} أو ${n.antiPoison.alternate.display}، على مدار الساعة وطوال أيام الأسبوع. وإذا فقد الشخص وعيه أو كان يتنفس بصعوبة، فاتصل أولًا بالرقم ${n.samu.number} أو ${n.protectionCivile.number}.`,
      },
    ],
    sourcesLead: "تم التحقق من الأرقام بتاريخ 16 شتنبر 2026 لدى المصادر التالية:",
    citySeparator: "، ",
  },
};

export function numerosUrgenceMetadata(locale: Locale = "fr"): Metadata {
  const x = EMERGENCY[locale];
  return pageMetadata({
    title:
      locale === "fr"
        ? `Numéros d'urgence au Maroc : ${n.samu.number}, ${n.protectionCivile.number}, ${n.police.number}, ${n.police112.number}`
        : `${x.title}: ${n.samu.number}, ${n.protectionCivile.number}, ${n.police.number}, ${n.police112.number}`,
    description: x.description,
    path: paths.numerosUrgence(),
    locale,
  });
}

export function NumerosUrgencePage({ locale = "fr" }: { locale?: Locale }) {
  const { content, t, L } = common(locale);
  const x = EMERGENCY[locale];
  const { business, cities, pricing } = content;
  const tiles = [
    { entry: n.samu, label: x.labels.samu },
    { entry: n.protectionCivile, label: x.labels.civil },
    { entry: n.police, label: x.labels.police },
    { entry: n.police112, label: x.labels.police },
    { entry: n.gendarmerie, label: x.labels.gendarmerie },
    { entry: n.antiPoison, label: x.labels.antiPoison },
  ].map((tile, i) => ({ ...tile, role: x.roles[i] }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Crumbs locale={locale} label={x.crumb} path={paths.numerosUrgence()} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{x.title}</h1>
      <Lead>{x.lead}</Lead>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ entry, label, role }) => (
          <li key={entry.number}>
            <a
              href={`tel:${entry.number}`}
              data-tap="secours"
              className="flex h-full flex-col rounded-xl border-2 border-primary bg-surface px-5 py-4 no-underline transition-colors hover:bg-primary-tint"
            >
              <span className="text-4xl font-black tabular-nums tracking-tight text-primary" dir="ltr">
                {entry.display}
              </span>
              <span className="mt-1 font-bold text-ink">{label}</span>
              <span className="mt-0.5 text-sm text-ink-muted">{role}</span>
            </a>
          </li>
        ))}
      </ul>

      <Section title={x.whichTitle}>
        <div className="grid max-w-[68ch] gap-4 text-ink">
          {x.which.map((w) => (
            <p key={w.strong}>
              <strong>{w.strong}</strong>
              {w.text}
            </p>
          ))}
        </div>
      </Section>

      <Section title={x.sayTitle}>
        <div className="grid max-w-[68ch] gap-4 text-ink">
          {x.say.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section title={x.restTitle} tone="panel">
        <p className="max-w-[68ch] text-ink">
          {x.rest(
            business.legalName,
            cities.map((c) => c.name).join(x.citySeparator),
            t.hoursProse,
            pricing.tiers[0]?.amountMad ?? "",
            pricing.tiers[1]?.amountMad ?? "",
            t.currency
          )}
        </p>
        <div className="mt-4 max-w-sm">
          <CallButton locale={locale} phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} tap="numeros-urgence" />
        </div>
        <p className="mt-4 text-sm">
          <Link href={L(paths.tarifs())} prefetch={false}>
            {x.seePrices}
          </Link>{" "}
          ·{" "}
          <Link href={L(paths.situation("medecin-de-garde"))} prefetch={false}>
            {x.garde}
          </Link>
        </p>
      </Section>

      <FaqBlock locale={locale} entries={x.faq} />

      <Section title={locale === "ar" ? "المصادر" : "Sources"}>
        <p className="text-sm text-ink-muted">{x.sourcesLead}</p>
        <ul className="mt-2 grid gap-1 text-sm" dir="auto">
          {EMERGENCY_SOURCES.map((s) => (
            <li key={s.url} lang="fr">
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
