import type { Metadata } from "next";
import { isUnconfirmed } from "@content/schema";
import Link from "next/link";
import { content, getTrustBlockProps, getQuartiersForCity } from "@/lib/content";
import { TrustBlock } from "@/components/TrustBlock";
import { Reviews } from "@/components/Reviews";
import { LiveStatus } from "@/components/LiveStatus";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Hero } from "@/components/Hero";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { CardLink, LinkGrid, Section } from "@/components/ui";
import { PriceBoard } from "@/components/PriceBoard";
import { AmbulanceVisuals } from "@/components/AmbulanceVisuals";
import { paths } from "@/lib/urls";
import { homeFaqs } from "@/lib/faqs";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "Médecin à domicile Casablanca et Rabat 24/7", description: `${content.business.legalName} envoie un médecin à domicile en ${content.business.defaultResponseTimeMinutes} minutes.`, path: "/" });
}

export default function HomePage() {
  /* Distinct languages across the team, in the order they were supplied, so
     adding a doctor who speaks another one updates the hero automatically. */
  const spokenLanguages = [...new Set(content.doctors.flatMap((d) => d.languages))];
  const { business, doctors, specialties, situations, services, cities, pricing } = content;
  const casablancaQuartiers = getQuartiersForCity("casablanca");

  /**
   * Coverage text is derived from the served-city list, never hardcoded. The
   * hero card read "Partout au Maroc" while the site listed 16 cities, and
   * would have gone on saying it after the area was cut to 5 — the kind of
   * claim that quietly becomes false when data changes underneath it.
   */

  return (
    <main className="mx-auto max-w-5xl px-4 pb-10 pt-4 sm:pt-10">
      <JsonLd data={[buildMedicalBusiness(), buildBreadcrumbList([{ name: "Accueil", path: paths.home() }])]} />

      <Hero
        title="L'urgence médicale"
        titleAccent="à domicile,"
        titleTail={business.hoursOpen}
        lead={`Un médecin inscrit à l'Ordre National des Médecins se déplace chez vous à ${cities
          .map((c) => c.name)
          .join(", ")}. Le tarif applicable vous est annoncé au téléphone avant que vous ne confirmiez la visite.`}
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        callLabel="Appelez-nous"
        image={{
          src: "/images/doctor-640.webp",
          srcSet: "/images/doctor-640.webp 640w, /images/doctor-1000.webp 1000w",
          avifSrcSet: "/images/doctor-640.avif 640w, /images/doctor-1000.avif 1000w",
          width: 640,
          height: 960,
          alt: "Médecin en blouse blanche avec un stéthoscope",
        }}
        badge={<LiveStatus />}
        /*
         * Every value here is a fact a reader can check, and every number is
         * derived from the content layer so it cannot drift.
         *
         * What was here before was "Rapide", "Qualifiés", "Fiable", "Confort
         * & sécurité" — four adjectives that every competitor in this market
         * also claims, on a site whose entire advantage is that its claims can
         * be verified. Adjectives were the weakest copy on the strongest page.
         */
        features={[
          {
            title: "Intervention",
            emphasis: `${business.defaultResponseTimeMinutes} min`,
            detail: business.hoursOpen,
            icon: "clock",
          },
          {
            title: "Médecins",
            emphasis: `${doctors.length} nommés`,
            detail: "N° d'Ordre publié",
            icon: "doctor",
          },
          {
            title: "Langues",
            emphasis: `${spokenLanguages.length} parlées`,
            detail: spokenLanguages.join(" · "),
            icon: "home",
          },
          {
            title: "Consultation",
            emphasis: `dès ${pricing.tiers[0]?.amountMad} ${pricing.currency}`,
            detail: `Jour ${pricing.tiers[0]?.amountMad} · nuit ${pricing.tiers[1]?.amountMad} ${pricing.currency}`,
            icon: "shield",
          },
        ]}
      >
        <WhatsAppButton href={toWhatsAppHref(business.whatsappNumber)} tap="hero" className="w-full sm:w-auto" />
      </Hero>

      {/*
        Four shortcuts under the hero. Every label links: this is the first
        thing under the hero, so leaving it inert wasted four prominent
        internal links from the site's strongest page. Two by two on a phone,
        where the old full-width navy bars stacked four deep.

        The row of four fact tiles that used to follow is gone: it repeated
        the hero's facts a third time, just below the hero and the trust strip.
      */}
      <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {[
          { label: "Urgences médicales", href: paths.specialtyHub("urgentiste"), d: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z" },
          {
            label: "Consultation à domicile",
            href: paths.specialtyHub("generaliste"),
            d: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z",
          },
          {
            label: "Soins infirmiers",
            href: paths.service("soins-infirmiers-a-domicile"),
            d: "M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11Z",
          },
          {
            label: "Suivi personnalisé",
            href: paths.service("suivi-medical-personnalise"),
            d: "M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4 9 2 2 4-4",
          },
        ].map((q) => (
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
      <TrustBlock {...getTrustBlockProps()} />

      <Section
        title="Comment ça se passe"
        lead="Trois étapes, sans salle d'attente et sans mauvaise surprise sur le tarif."
        tone="panel"
      >
        {/*
          A real sequence, so it is drawn as one: a rail joins the three
          steps, vertical on a phone and horizontal from `sm` up.
        */}
        <ol className="relative grid gap-3 sm:grid-cols-3 sm:gap-4">
          <span aria-hidden="true" className="absolute bottom-8 left-[2.35rem] top-8 w-0.5 bg-primary/25 sm:hidden" />
          <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-[2.6rem] hidden h-0.5 bg-primary/25 sm:block" />
          {[
            {
              n: "1",
              t: "Vous appelez",
              d: "Régulation médicale au téléphone : vous indiquez l'adresse, l'étage et le motif. Le délai et le tarif vous sont annoncés immédiatement.",
            },
            {
              n: "2",
              t: "Le médecin se déplace",
              d: "Il vous rappelle avant d'arriver pour confirmer l'accès à l'immeuble ou à la résidence.",
            },
            {
              n: "3",
              t: "Consultation chez vous",
              d: "Examen complet sur place, puis traitement, ordonnance ou orientation selon ce qu'il constate.",
            },
          ].map((step) => (
            <li key={step.n} className="relative flex gap-4 rounded-2xl border border-border bg-surface p-4 sm:block sm:p-5">
              <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-black tabular-nums text-white ring-4 ring-surface-2">
                {step.n}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-black text-ink sm:mt-3">{step.t}</span>
                <span className="mt-1 block text-sm text-ink-muted">{step.d}</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/*
        The named team, on the homepage itself. A live comparison (2026-09-16)
        found allo-sosmedecin.ma naming five doctors on its homepage while this
        one named none — the names and Ordre numbers existed only on
        /nos-medecins. They are the strongest trust signal this service has, and
        every value here comes from content/doctors.ts.
      */}
      <Section
        title="Les médecins qui se déplacent"
        lead="Chacun est nommé, avec son numéro d'inscription à l'Ordre National des Médecins — public, et vérifiable avant d'ouvrir votre porte."
      >
        {/*
          A sideways rail on phones (seven cards stacked one per row were
          1,000px of scrolling), a grid from `sm` up. Initials, not photos:
          there are no real portraits yet, and a stock face beside a real
          doctor's name and Ordre number would be exactly the wrong thing.
        */}
        <ul className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {doctors.map((d) => {
            const initials = d.name
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
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-black tracking-wide text-white"
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
                    <span className="text-ink-muted">N° d&apos;Ordre National</span>
                    <span className="font-black tabular-nums text-ink">{d.ordreNumber}</span>
                  </span>
                )}
                <span className="mt-1.5 block text-sm text-ink-muted">{d.languages.join(" · ")}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4">
          <Link href={paths.nosMedecins()} prefetch={false}>
            Lire la présentation de chaque médecin
          </Link>
        </p>
      </Section>

      <Section title="Tarifs" lead="Publiés à l'avance, contrairement à l'usage du secteur." tone="panel">
        <PriceBoard pricing={pricing} phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} tap="tarifs" />
        <p className="mt-4 text-sm">
          <Link href={paths.tarifs()} prefetch={false}>
            Détail des tarifs
          </Link>
        </p>
      </Section>

      <Section title="Motifs de consultation fréquents">
        <div className="grid gap-3 sm:grid-cols-2">
          {situations.map((s) => (
            <CardLink
              key={s.slug}
              href={paths.situation(s.slug)}
              title={s.title}
              description={s.shortDescription}
            />
          ))}
        </div>
      </Section>

      <Section title="Spécialités disponibles" lead="Chaque spécialité se déplace au domicile du patient.">
        <div className="grid gap-3 sm:grid-cols-2">
          {specialties.map((s) => (
            <CardLink
              key={s.slug}
              href={paths.specialtyHub(s.slug)}
              title={`${s.name} à domicile`}
              description={s.shortDescription}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Services à domicile"
        lead="Au-delà de la consultation : ce que nous assurons aussi chez vous."
      >
        <div className="-mt-2 mb-5">
          <AmbulanceVisuals variant="single" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <CardLink
              key={s.slug}
              href={paths.service(s.slug)}
              title={s.name}
              description={s.shortDescription}
            />
          ))}
        </div>
      </Section>

      <CallBanner label="Un médecin chez vous, maintenant ?" />

      <Section title="Villes couvertes">
        <LinkGrid links={cities.map((c) => ({ href: paths.cityHub(c.slug), label: c.name }))} />
      </Section>

      {casablancaQuartiers.length > 0 && (
        <Section
          title="Quartiers de Casablanca"
          lead="Chaque quartier a sa propre page, avec ses repères et ses conditions d'accès."
        >
          <LinkGrid
            links={casablancaQuartiers.map((q) => ({
              href: paths.quartier("casablanca", q.slug),
              label: q.name,
            }))}
          />
        </Section>
      )}

      <Section title={`À propos de ${business.legalName}`}>
        <Prose text={content.aboutPage.body} />
      </Section>

      <Reviews />

      <FaqBlock entries={homeFaqs()} />
      <CallBanner />

    </main>
  );
}
