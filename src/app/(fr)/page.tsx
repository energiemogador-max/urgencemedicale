import type { Metadata } from "next";
import Link from "next/link";
import { content, getTrustBlockProps, getQuartiersForCity } from "@/lib/content";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Hero } from "@/components/Hero";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { CardLink, FactPill, LinkGrid, Section } from "@/components/ui";
import { paths } from "@/lib/urls";
import { homeFaqs } from "@/lib/faqs";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { SITE_DOMAIN } from "@/lib/site";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "Médecin à domicile Casablanca et Rabat 24/7", description: `${content.business.legalName} envoie un médecin à domicile en ${content.business.defaultResponseTimeMinutes} minutes.`, path: "/" });
}

export default function HomePage() {
  const { business, specialties, situations, services, cities, pricing } = content;
  const casablancaQuartiers = getQuartiersForCity("casablanca");

  /**
   * Coverage text is derived from the served-city list, never hardcoded. The
   * hero card read "Partout au Maroc" while the site listed 16 cities, and
   * would have gone on saying it after the area was cut to 5 — the kind of
   * claim that quietly becomes false when data changes underneath it.
   */
  const coverageTitle = `${cities.length} villes couvertes`;
  const coverageNote = cities.map((c) => c.name).join(", ");

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={[buildMedicalBusiness(), buildBreadcrumbList([{ name: "Accueil", path: paths.home() }])]} />

      <Hero
        logo={{
          src: "/images/logo-420.webp",
          srcSet: "/images/logo-420.webp 420w, /images/logo-840.webp 840w",
          width: 420,
          height: 161,
          alt: `${business.legalName} — logo`,
        }}
        title="L'urgence médicale"
        titleAccent="à domicile,"
        titleTail={business.hoursOpen}
        lead="Assistance médicale à domicile : des médecins qualifiés chez vous, en un temps record. Le tarif vous est annoncé au téléphone avant que vous ne confirmiez la visite."
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        callLabel="Appelez-nous"
        siteLabel={SITE_DOMAIN}
        siteTagline="Votre santé, notre priorité"
        features={[
          { title: "Intervention", emphasis: "Rapide", detail: `${business.hoursOpen}`, icon: "clock" },
          { title: "Médecins", emphasis: "Qualifiés", detail: "Inscrits à l'Ordre", icon: "doctor" },
          { title: "Soins", emphasis: "À domicile", detail: "Confort & sécurité", icon: "home" },
          { title: "Service", emphasis: "Fiable", detail: "Tarif annoncé d'avance", icon: "shield" },
        ]}
        coverageTitle={coverageTitle}
        coverageNote={coverageNote}
        image={{
          src: "/images/doctor-640.webp",
          srcSet: "/images/doctor-640.webp 640w, /images/doctor-1000.webp 1000w",
          width: 640,
          height: 960,
          alt: "Médecin en blouse blanche avec un stéthoscope",
        }}
      >
        <WhatsAppButton href={toWhatsAppHref(business.whatsappNumber)} className="w-full sm:w-auto" />
      </Hero>

      {/*
        Service strip, matching the brand artwork. Every label links: the strip
        is the first thing under the hero, so leaving it inert wasted four
        prominent internal links from the site's strongest page.
      */}
      <ul className="mt-4 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Urgences médicales", href: paths.specialtyHub("urgentiste") },
          { label: "Consultations à domicile", href: paths.specialtyHub("generaliste") },
          { label: "Soins infirmiers", href: paths.service("soins-infirmiers-a-domicile") },
          { label: "Suivi personnalisé", href: paths.service("suivi-medical-personnalise") },
        ].map((s) => (
          <li key={s.label} className="bg-primary">
            <Link
              href={s.href}
              prefetch={false}
              className="block px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white no-underline hover:bg-primary-dark"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FactPill label="Disponibilité" value={`${business.hoursOpen}`} />
        <FactPill label="Intervention" value={`${business.defaultResponseTimeMinutes} minutes`} />
        <FactPill label="Consultation" value={`à partir de ${pricing.tiers[0]?.amountMad} ${pricing.currency}`} />
        <FactPill label="Médecins" value="Inscrits à l'Ordre" />
      </div>

      <Section
        title="Comment ça se passe"
        lead="Trois étapes, sans salle d'attente et sans mauvaise surprise sur le tarif."
        tone="panel"
      >
        <ol className="grid gap-4 sm:grid-cols-3">
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
            <li key={step.n} className="rounded-lg border border-border bg-surface p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-white">
                {step.n}
              </span>
              <span className="mt-3 block font-bold text-ink">{step.t}</span>
              <span className="mt-1.5 block text-sm text-ink-muted">{step.d}</span>
            </li>
          ))}
        </ol>
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

      <Section
        title="Services à domicile"
        lead="Au-delà de la consultation : ce que nous assurons aussi chez vous."
      >
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

      <Section title="Tarifs" lead="Publiés à l'avance, contrairement à l'usage du secteur." tone="panel">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full table-fixed border-collapse text-left">
            <thead className="border-b border-border">
              <tr>
                <th className="px-2 py-2.5 text-[0.8rem] font-bold uppercase tracking-wide text-ink-muted sm:px-4 sm:py-3 sm:text-sm">Consultation</th>
                <th className="px-2 py-2.5 text-[0.8rem] font-bold uppercase tracking-wide text-ink-muted sm:px-4 sm:py-3 sm:text-sm">Horaire</th>
                <th className="px-2 py-2.5 text-[0.8rem] font-bold uppercase tracking-wide text-ink-muted sm:px-4 sm:py-3 sm:text-sm">Prix</th>
              </tr>
            </thead>
            <tbody>
              {pricing.tiers.map((t) => (
                <tr key={t.slug} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{t.label}</td>
                  <td className="px-2 py-2.5 text-[0.85rem] text-ink-muted sm:px-4 sm:py-3 sm:text-base">{t.window}</td>
                  <td className="px-2 py-2.5 text-[0.95rem] font-bold whitespace-nowrap tabular-nums text-primary sm:px-4 sm:py-3 sm:text-base">
                    {t.amountMad} {pricing.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          <Link href={paths.tarifs()} prefetch={false}>
            Détail des tarifs
          </Link>
        </p>
      </Section>

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

      <FaqBlock entries={homeFaqs()} />
      <CallBanner />

    </main>
  );
}
