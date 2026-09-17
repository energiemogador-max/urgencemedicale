import type { City, Situation } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { PageHero } from "@/components/PageHero";
import { toWhatsAppHref } from "@/lib/phone";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, LinkGrid, Section } from "@/components/ui";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { situationFaqs } from "@/lib/faqs";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SituationPage({
  situation,
  cities,
  otherSituations,
}: {
  situation: Situation;
  cities: City[];
  otherSituations: Situation[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: situation.title, path: paths.situation(situation.slug) },
        ])}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: situation.title }]} />
      <PageHero
        title={situation.title}
        lead={situation.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          { label: "Zone", value: `${content.cities.length} villes` },
          { label: "Demande", value: "Par téléphone" },
          { label: "Tarif", value: "Annoncé avant la visite" },
        ]}
      />
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={situation.body} />
      </div>

      <CallBanner />

      {cities.length > 0 && (
        <Section title={`${situation.title} par ville`}>
          <LinkGrid
            links={cities.map((c) => ({ href: paths.situationCity(situation.slug, c.slug), label: c.name }))}
          />
        </Section>
      )}

      {otherSituations.length > 0 && (
        <Section title="Autres motifs de consultation">
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSituations.map((s) => (
              <CardLink
                key={s.slug}
                href={paths.situation(s.slug)}
                title={s.title}
                description={s.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock entries={situationFaqs()} />
    </main>
  );
}
