import type { City, Quartier, Situation, SituationCity } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, LinkGrid, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { situationFaqs } from "@/lib/faqs";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SituationCityPage({
  situation,
  city,
  situationCity,
  quartiers,
  otherSituations,
}: {
  situation: Situation;
  city: City;
  situationCity: SituationCity;
  quartiers: Quartier[];
  otherSituations: Situation[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({ "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: situation.title, path: paths.situation(situation.slug) },
            { name: city.name, path: paths.situationCity(situation.slug, city.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        trail={[
          { href: paths.home(), label: "Accueil" },
          { href: paths.situation(situation.slug), label: situation.title },
          { label: city.name },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold text-ink">
        {situation.title} à {city.name}
      </h1>
      <Lead>{situationCity.intro}</Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={situationCity.body} />
      </div>

      <CallBanner />

      {quartiers.length > 0 && (
        <Section title={`Quartiers desservis à ${city.name}`}>
          <LinkGrid
            links={quartiers.map((q) => ({ href: paths.quartier(city.slug, q.slug), label: q.name }))}
          />
        </Section>
      )}

      {otherSituations.length > 0 && (
        <Section title={`Autres motifs de consultation à ${city.name}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSituations.map((s) => (
              <CardLink
                key={s.slug}
                href={s.geoMultiplied ? paths.situationCity(s.slug, city.slug) : paths.situation(s.slug)}
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
