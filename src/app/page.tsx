import type { Metadata } from "next";
import Link from "next/link";
import { content, getTrustBlockProps, getQuartiersForCity } from "@/lib/content";
import { TrustBlock } from "@/components/TrustBlock";
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

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "Médecin à domicile au Maroc, 24h/24 et 7j/7", description: `${content.business.legalName} envoie un médecin à domicile en ${content.business.defaultResponseTimeMinutes} minutes.`, path: "/" });
}

export default function HomePage() {
  const { business, specialties, situations, cities, pricing } = content;
  const casablancaQuartiers = getQuartiersForCity("casablanca");

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={[buildMedicalBusiness(), buildBreadcrumbList([{ name: "Accueil", path: paths.home() }])]} />

      <Hero
        badge={`Disponible ${business.hoursOpen}`}
        title="Un médecin chez vous, jour et nuit."
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        callLabel="Appelez maintenant"
        lead={`Le médecin se déplace à votre domicile et vous appelle avant d'arriver. Le tarif vous est annoncé au téléphone avant que vous ne confirmiez la visite — jamais après.`}
        image={{
          src: "/images/ambulance-1200.webp",
          srcSet:
            "/images/ambulance-800.webp 800w, /images/ambulance-1200.webp 1200w, /images/ambulance-1600.webp 1586w",
          width: 1200,
          height: 751,
          alt: `Véhicule d'intervention ${business.legalName}, équipé pour le transport médicalisé`,
        }}
      >
        <WhatsAppButton href={toWhatsAppHref(business.whatsappNumber)} className="w-full sm:w-auto" />
      </Hero>
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
              d: "Vous indiquez l'adresse, l'étage et le motif. Le délai et le tarif vous sont annoncés immédiatement.",
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

      <Section title="Tarifs" lead="Publiés à l'avance, contrairement à l'usage du secteur." tone="panel">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink-muted">Consultation</th>
                <th className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink-muted">Horaire</th>
                <th className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink-muted">Prix</th>
              </tr>
            </thead>
            <tbody>
              {pricing.tiers.map((t) => (
                <tr key={t.slug} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{t.label}</td>
                  <td className="px-4 py-3 text-ink-muted">{t.window}</td>
                  <td className="px-4 py-3 font-bold tabular-nums text-primary">
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
    </main>
  );
}
