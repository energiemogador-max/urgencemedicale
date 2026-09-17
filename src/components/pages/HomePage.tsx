import type { Metadata } from "next";
import Link from "next/link";
import { isUnconfirmed } from "@content/schema";
import { api } from "@/lib/locale-content";
import { TrustBlock } from "@/components/TrustBlock";
import { Reviews } from "@/components/Reviews";
import { LiveStatus } from "@/components/LiveStatus";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Hero } from "@/components/Hero";
import { PriceBoard } from "@/components/PriceBoard";
import { AmbulanceVisuals } from "@/components/AmbulanceVisuals";
import { CardLink, LinkGrid, Section } from "@/components/ui";
import { paths } from "@/lib/urls";
import { faqs } from "@/lib/faqs";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

/**
 * The homepage, in any locale.
 *
 * Every number on it (response time, doctors, languages, prices) comes from
 * the content layer, so no language can drift from another. The strings
 * below are the only per-locale text; English and Arabic say what the French
 * says, no more.
 */
interface HomeText {
  metaTitle: string;
  metaDescription: (brand: string, range: string) => string;
  heroTitle: string;
  heroAccent: string;
  heroLead: (cities: string) => string;
  citySeparator: string;
  imageAlt: string;
  featDoctors: string;
  featNamed: (n: number) => string;
  featOrdre: string;
  featLanguages: string;
  featSpoken: (n: number) => string;
  dayNight: (day: string, night: string, currency: string) => string;
  quick: [string, string, string, string];
  stepsTitle: string;
  stepsLead: string;
  steps: [string, string][];
  doctorsTitle: string;
  doctorsLead: string;
  ordreLabel: string;
  doctorsLink: string;
  pricesLead: string;
  pricesLink: string;
  situationsTitle: string;
  specialtiesTitle: string;
  specialtiesLead: string;
  servicesTitle: string;
  servicesLead: string;
  midBanner: string;
  citiesTitle: string;
  quartiersTitle: (city: string) => string;
  quartiersLead: string;
  about: (brand: string) => string;
}

const TEXT: Record<Locale, HomeText> = {
  fr: {
    metaTitle: "Médecin à domicile Casablanca et Rabat 24/7",
    metaDescription: (b, r) => `${b} envoie un médecin à domicile en ${r} minutes.`,
    heroTitle: "L'urgence médicale",
    heroAccent: "à domicile,",
    heroLead: (c) =>
      `Un médecin inscrit à l'Ordre National des Médecins se déplace chez vous à ${c}. Le tarif applicable vous est annoncé au téléphone avant que vous ne confirmiez la visite.`,
    citySeparator: ", ",
    imageAlt: "Médecin en blouse blanche avec un stéthoscope",
    featDoctors: "Médecins",
    featNamed: (n) => `${n} nommés`,
    featOrdre: "N° d'Ordre publié",
    featLanguages: "Langues",
    featSpoken: (n) => `${n} parlées`,
    dayNight: (d, n, c) => `Jour ${d} · nuit ${n} ${c}`,
    quick: ["Urgences médicales", "Consultation à domicile", "Soins infirmiers", "Suivi personnalisé"],
    stepsTitle: "Comment ça se passe",
    stepsLead: "Trois étapes, sans salle d'attente et sans mauvaise surprise sur le tarif.",
    steps: [
      [
        "Vous appelez",
        "Régulation médicale au téléphone : vous indiquez l'adresse, l'étage et le motif. Le délai et le tarif vous sont annoncés immédiatement.",
      ],
      ["Le médecin se déplace", "Il vous rappelle avant d'arriver pour confirmer l'accès à l'immeuble ou à la résidence."],
      [
        "Consultation chez vous",
        "Examen complet sur place, puis traitement, ordonnance ou orientation selon ce qu'il constate.",
      ],
    ],
    doctorsTitle: "Les médecins qui se déplacent",
    doctorsLead:
      "Chacun est nommé, avec son numéro d'inscription à l'Ordre National des Médecins — public, et vérifiable avant d'ouvrir votre porte.",
    ordreLabel: "N° d'Ordre National",
    doctorsLink: "Lire la présentation de chaque médecin",
    pricesLead: "Publiés à l'avance, contrairement à l'usage du secteur.",
    pricesLink: "Détail des tarifs",
    situationsTitle: "Motifs de consultation fréquents",
    specialtiesTitle: "Spécialités disponibles",
    specialtiesLead: "Chaque spécialité se déplace au domicile du patient.",
    servicesTitle: "Services à domicile",
    servicesLead: "Au-delà de la consultation : ce que nous assurons aussi chez vous.",
    midBanner: "Un médecin chez vous, maintenant ?",
    citiesTitle: "Villes couvertes",
    quartiersTitle: (c) => `Quartiers de ${c}`,
    quartiersLead: "Chaque quartier a sa propre page, avec ses repères et ses conditions d'accès.",
    about: (b) => `À propos de ${b}`,
  },
  en: {
    metaTitle: "Doctor at home in Casablanca & Rabat, 24/7",
    metaDescription: (b, r) => `${b} sends a doctor to your home within ${r} minutes.`,
    heroTitle: "Urgent medical care",
    heroAccent: "at home,",
    heroLead: (c) =>
      `A doctor registered with the Ordre National des Médecins comes to you in ${c}. The fee that applies is quoted on the phone before you confirm the visit.`,
    citySeparator: ", ",
    imageAlt: "Doctor in a white coat with a stethoscope",
    featDoctors: "Doctors",
    featNamed: (n) => `${n} named`,
    featOrdre: "Ordre number published",
    featLanguages: "Languages",
    featSpoken: (n) => `${n} spoken`,
    dayNight: (d, n, c) => `Day ${d} · night ${n} ${c}`,
    quick: ["Medical emergencies", "Home consultation", "Nursing care", "Ongoing follow-up"],
    stepsTitle: "How a visit works",
    stepsLead: "Three steps, no waiting room and no surprise on the fee.",
    steps: [
      [
        "You call",
        "Our medical call desk takes the address, the floor and the reason for the visit. The expected delay and the fee are given to you straight away.",
      ],
      ["The doctor travels to you", "They call you before arriving to confirm how to get into the building or residence."],
      [
        "Consultation at home",
        "A full examination on the spot, then treatment, a prescription or a referral, depending on what the doctor finds.",
      ],
    ],
    doctorsTitle: "The doctors who come to you",
    doctorsLead:
      "Each one is named, with their registration number at the Ordre National des Médecins — public, and checkable before you open your door.",
    ordreLabel: "Ordre National No.",
    doctorsLink: "Read each doctor's profile",
    pricesLead: "Published in advance, unlike the usual practice in this sector.",
    pricesLink: "Fee details",
    situationsTitle: "Common reasons to call a doctor",
    specialtiesTitle: "Specialties available",
    specialtiesLead: "Each specialty comes to the patient's home.",
    servicesTitle: "Home services",
    servicesLead: "Beyond the consultation: what we also provide at your home.",
    midBanner: "A doctor at your home, now?",
    citiesTitle: "Cities covered",
    quartiersTitle: (c) => `${c} neighbourhoods`,
    quartiersLead: "Each neighbourhood has its own page, with its landmarks and access notes.",
    about: (b) => `About ${b}`,
  },
  ar: {
    metaTitle: "طبيب في المنزل بالدار البيضاء والرباط 24/7",
    metaDescription: (b, r) => `${b} ترسل طبيبًا إلى منزلك خلال ${r} دقيقة.`,
    heroTitle: "الرعاية الطبية العاجلة",
    heroAccent: "في منزلك،",
    heroLead: (c) =>
      `يتنقل إلى منزلك طبيب مسجل في الهيئة الوطنية للطبيبات والأطباء، في ${c}. ونخبرك بالسعر المطبق عبر الهاتف قبل أن تؤكد الزيارة.`,
    citySeparator: "، ",
    imageAlt: "طبيب بمعطف أبيض وسماعة طبية",
    featDoctors: "الأطباء",
    featNamed: (n) => `${n} بأسمائهم`,
    featOrdre: "رقم التسجيل منشور",
    featLanguages: "اللغات",
    featSpoken: (n) => `${n} لغات`,
    dayNight: (d, n, c) => `النهار ${d} · الليل ${n} ${c}`,
    quick: ["المستعجلات الطبية", "استشارة في المنزل", "العلاجات التمريضية", "التتبع الطبي"],
    stepsTitle: "كيف تجري الزيارة",
    stepsLead: "ثلاث خطوات، بلا قاعة انتظار وبلا مفاجأة في السعر.",
    steps: [
      [
        "تتصل بنا",
        "نستقبل مكالمتك: تخبرنا بالعنوان والطابق وسبب الطلب، ونخبرك فورًا بالمدة المتوقعة والسعر.",
      ],
      ["يتنقل الطبيب إليك", "يتصل بك قبل وصوله للتأكد من طريقة الدخول إلى العمارة أو الإقامة."],
      ["الاستشارة في منزلك", "فحص كامل على عين المكان، ثم علاج أو وصفة طبية أو توجيه، حسب ما يلاحظه الطبيب."],
    ],
    doctorsTitle: "الأطباء الذين يتنقلون إليك",
    doctorsLead:
      "كل واحد منهم مذكور باسمه، مع رقم تسجيله في الهيئة الوطنية للطبيبات والأطباء — رقم عمومي يمكنك التحقق منه قبل أن تفتح بابك.",
    ordreLabel: "رقم التسجيل في الهيئة",
    doctorsLink: "اقرأ تقديم كل طبيب",
    pricesLead: "منشورة مسبقًا، على خلاف المعتاد في هذا القطاع.",
    pricesLink: "تفاصيل الأسعار",
    situationsTitle: "دواعي الاتصال الأكثر شيوعًا",
    specialtiesTitle: "التخصصات المتوفرة",
    specialtiesLead: "كل تخصص يتنقل إلى منزل المريض.",
    servicesTitle: "الخدمات المنزلية",
    servicesLead: "ما يتجاوز الاستشارة: ما نؤمنه أيضًا في منزلك.",
    midBanner: "طبيب في منزلك، الآن؟",
    citiesTitle: "المدن المشمولة",
    quartiersTitle: (c) => `أحياء ${c}`,
    quartiersLead: "لكل حي صفحته الخاصة، مع معالمه وظروف الوصول إليه.",
    about: (b) => `عن ${b}`,
  },
};

export function homeMetadata(locale: Locale = "fr"): Metadata {
  const { content } = api(locale);
  const t = dict(locale);
  const x = TEXT[locale];
  return pageMetadata({
    title: x.metaTitle,
    description: x.metaDescription(content.business.legalName, t.range(content.business.defaultResponseTimeMinutes)),
    path: paths.home(),
    locale,
  });
}

const QUICK_ICONS = [
  "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z",
  "M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11Z",
  "M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4 9 2 2 4-4",
];

export function HomePage({ locale = "fr" }: { locale?: Locale }) {
  const { content, getQuartiersForCity, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const x = TEXT[locale];
  const L = (p: string) => localizedPath(p, locale);

  /* Distinct languages across the team, in the order they were supplied, so
     adding a doctor who speaks another one updates the hero automatically. */
  const spokenLanguages = [...new Set(content.doctors.flatMap((d) => d.languages))];
  const { business, doctors, specialties, situations, services, cities, pricing } = content;
  const mainCity = cities.find((c) => c.slug === "casablanca");
  const casablancaQuartiers = getQuartiersForCity("casablanca");
  const day = pricing.tiers[0]?.amountMad ?? "";
  const night = pricing.tiers[1]?.amountMad ?? "";

  const quick = [
    paths.specialtyHub("urgentiste"),
    paths.specialtyHub("generaliste"),
    paths.service("soins-infirmiers-a-domicile"),
    paths.service("suivi-medical-personnalise"),
  ].map((href, i) => ({ href: L(href), label: x.quick[i], d: QUICK_ICONS[i] }));

  return (
    <main className="pb-10">
      <JsonLd data={[buildMedicalBusiness(), buildBreadcrumbList([{ name: t.nav.home, path: L(paths.home()) }])]} />

      {/* Phones: inside the page column. Desktop: full width, edge to edge. */}
      <div className="mx-auto max-w-5xl px-4 pt-4 sm:pt-10 lg:max-w-none lg:px-0 lg:pt-0">
        <Hero
          title={x.heroTitle}
          titleAccent={x.heroAccent}
          titleTail={t.hours247}
          lead={x.heroLead(cities.map((c) => c.name).join(x.citySeparator))}
          image={{
            src: "/images/doctor-640.webp",
            srcSet: "/images/doctor-640.webp 640w, /images/doctor-1000.webp 1000w",
            avifSrcSet: "/images/doctor-640.avif 640w, /images/doctor-1000.avif 1000w",
            width: 640,
            height: 960,
            alt: x.imageAlt,
          }}
          badge={<LiveStatus locale={locale} />}
          /*
           * Every value here is a fact a reader can check, derived from the
           * content layer so it cannot drift. Adjectives ("Rapide",
           * "Qualifiés") were the weakest copy on the strongest page.
           */
          features={[
            {
              title: t.facts.intervention,
              emphasis: `${t.range(business.defaultResponseTimeMinutes)} ${t.minutes}`,
              detail: t.hours247,
              icon: "clock",
            },
            { title: x.featDoctors, emphasis: x.featNamed(doctors.length), detail: x.featOrdre, icon: "doctor" },
            {
              title: x.featLanguages,
              emphasis: x.featSpoken(spokenLanguages.length),
              detail: spokenLanguages.join(" · "),
              icon: "home",
            },
            {
              title: t.facts.consultation,
              emphasis: t.facts.fromPrice(day, t.currency),
              detail: x.dayNight(day, night, t.currency),
              icon: "shield",
            },
          ]}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        {/*
          Four shortcuts under the hero, two by two on a phone. Every label
          links: this is the first thing under the hero.
        */}
        <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {quick.map((q) => (
            <li key={q.label}>
              <Link
                href={q.href}
                prefetch={false}
                className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-surface p-3 no-underline transition-colors hover:border-primary/40 hover:bg-primary-tint/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path d={q.d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm font-bold leading-tight text-ink">{q.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <TrustBlock locale={locale} {...getTrustBlockProps()} />

        <Section title={x.stepsTitle} lead={x.stepsLead} tone="panel">
          {/*
            A real sequence, so it is drawn as one: a rail joins the three
            steps, vertical on a phone and horizontal from `sm` up.
          */}
          <ol className="relative grid gap-3 sm:grid-cols-3 sm:gap-4">
            <span aria-hidden="true" className="absolute bottom-8 start-[2.35rem] top-8 w-0.5 bg-primary/25 sm:hidden" />
            <span aria-hidden="true" className="absolute inset-x-[16%] top-[2.6rem] hidden h-0.5 bg-primary/25 sm:block" />
            {x.steps.map(([title, text], i) => (
              <li key={title} className="relative flex gap-4 rounded-2xl border border-border bg-surface p-4 sm:block sm:p-5">
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-black tabular-nums text-white ring-4 ring-surface-2">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-black text-ink sm:mt-3">{title}</span>
                  <span className="mt-1 block text-sm text-ink-muted">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Section>

        {/*
          The named team, on the homepage itself: the strongest trust signal
          this service has. A sideways rail on phones, a grid from `sm` up.
          Initials, not photos: there are no real portraits yet, and a stock
          face beside a real doctor's name would be exactly the wrong thing.
        */}
        <Section title={x.doctorsTitle} lead={x.doctorsLead}>
          <ul className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {doctors.map((d) => {
              const frenchName = api("fr").content.doctors.find((f) => f.slug === d.slug)?.name ?? d.name;
              const initials = frenchName
                .replace(/^(Docteur|Dr\.?)\s+/i, "")
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join("");
              return (
                <li
                  key={d.slug}
                  className="flex w-[78%] shrink-0 flex-col rounded-2xl border border-border bg-surface p-4 sm:w-auto"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      dir="ltr"
                      className="brand-latin flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-black tracking-wide text-white"
                    >
                      {initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-black leading-tight text-ink">{d.name}</span>
                      <span className="mt-1 inline-block rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-bold text-primary">
                        {specialties.find((s) => s.slug === d.specialtySlug)?.name}
                      </span>
                    </span>
                  </span>
                  {!isUnconfirmed(d.ordreNumber) && (
                    <span className="mt-4 flex items-baseline justify-between gap-2 border-t border-dashed border-border pt-3 text-sm">
                      <span className="text-ink-muted">{x.ordreLabel}</span>
                      <span className="font-black tabular-nums text-ink">{d.ordreNumber}</span>
                    </span>
                  )}
                  <span className="mt-1.5 block text-sm text-ink-muted">{d.languages.join(" · ")}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4">
            <Link href={L(paths.nosMedecins())} prefetch={false}>
              {x.doctorsLink}
            </Link>
          </p>
        </Section>

        <Section title={t.nav.prices} lead={x.pricesLead} tone="panel">
          <PriceBoard
            locale={locale}
            pricing={pricing}
            phoneDisplay={business.phoneDisplay}
            phoneHref={business.phoneHref}
            tap="tarifs"
          />
          <p className="mt-4 text-sm">
            <Link href={L(paths.tarifs())} prefetch={false}>
              {x.pricesLink}
            </Link>
          </p>
        </Section>

        <Section title={x.situationsTitle}>
          <div className="grid gap-3 sm:grid-cols-2">
            {situations.map((s) => (
              <CardLink key={s.slug} href={L(paths.situation(s.slug))} title={s.title} description={s.shortDescription} />
            ))}
          </div>
        </Section>

        <Section title={x.specialtiesTitle} lead={x.specialtiesLead}>
          <div className="grid gap-3 sm:grid-cols-2">
            {specialties.map((s) => (
              <CardLink
                key={s.slug}
                href={L(paths.specialtyHub(s.slug))}
                title={t.specialtyAtHome(s.name)}
                description={s.shortDescription}
              />
            ))}
          </div>
        </Section>

        <Section title={x.servicesTitle} lead={x.servicesLead}>
          <div className="-mt-2 mb-5">
            <AmbulanceVisuals variant="single" locale={locale} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <CardLink key={s.slug} href={L(paths.service(s.slug))} title={s.name} description={s.shortDescription} />
            ))}
          </div>
        </Section>

        <CallBanner locale={locale} label={x.midBanner} />

        <Section title={x.citiesTitle}>
          <LinkGrid links={cities.map((c) => ({ href: L(paths.cityHub(c.slug)), label: c.name }))} />
        </Section>

        {casablancaQuartiers.length > 0 && mainCity && (
          <Section title={x.quartiersTitle(mainCity.name)} lead={x.quartiersLead}>
            <LinkGrid
              links={casablancaQuartiers.map((q) => ({
                href: L(paths.quartier("casablanca", q.slug)),
                label: q.name,
              }))}
            />
          </Section>
        )}

        <Section title={x.about(business.legalName)}>
          <Prose text={content.aboutPage.body} />
        </Section>

        <Reviews locale={locale} />

        <FaqBlock locale={locale} entries={faqs(locale).homeFaqs()} />
        <CallBanner locale={locale} />
      </div>
    </main>
  );
}
