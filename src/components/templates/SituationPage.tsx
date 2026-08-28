import type { City, Situation } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, LinkGrid, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
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
      <h1 className="mt-2 text-3xl font-bold text-ink">{situation.title}</h1>
      <Lead>{situation.intro}</Lead>
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
