import type { City, Quartier, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, LinkGrid, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { cityFaqs } from "@/lib/faqs";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function CityHubPage({
  city,
  quartiers,
  specialties,
}: {
  city: City;
  quartiers: Quartier[];
  specialties: Specialty[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({ "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: city.name, path: paths.cityHub(city.slug) },
          ]),
        ]}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: city.name }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">Médecin à domicile à {city.name}</h1>
      <Lead>{city.intro}</Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={city.body} />
      </div>

      <CallBanner />

      {quartiers.length > 0 && (
        <Section
          title={`Quartiers couverts à ${city.name}`}
          lead="Chaque quartier a sa propre page, avec ses repères locaux et ses conditions d'accès."
        >
          <LinkGrid
            links={quartiers.map((q) => ({ href: paths.quartier(city.slug, q.slug), label: q.name }))}
          />
        </Section>
      )}

      {specialties.length > 0 && (
        <Section title={`Spécialités disponibles à ${city.name}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {specialties.map((s) => (
              <CardLink
                key={s.slug}
                href={paths.citySpecialty(s.slug, city.slug)}
                title={`${s.name} à ${city.name}`}
                description={s.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock entries={cityFaqs(city.name)} />
    </main>
  );
}
