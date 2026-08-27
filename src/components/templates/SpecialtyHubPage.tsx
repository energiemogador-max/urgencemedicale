import type { City, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { specialtyFaqs } from "@/lib/faqs";
import { buildSpecialtyFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SpecialtyHubPage({
  specialty,
  cities,
  otherSpecialties,
}: {
  specialty: Specialty;
  cities: City[];
  otherSpecialties: Specialty[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildSpecialtyFragment(specialty.slug),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: `${specialty.name} à domicile`, path: paths.specialtyHub(specialty.slug) },
          ]),
        ]}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: `${specialty.name} à domicile` }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{specialty.name} à domicile</h1>
      <Lead>{specialty.intro}</Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={specialty.body} />
      </div>

      {cities.length > 0 && (
        <Section title={`${specialty.name} à domicile par ville`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <CardLink
                key={c.slug}
                href={paths.citySpecialty(specialty.slug, c.slug)}
                title={c.name}
                description={`${specialty.name} à domicile à ${c.name}`}
              />
            ))}
          </div>
        </Section>
      )}

      {otherSpecialties.length > 0 && (
        <Section title="Autres spécialités à domicile">
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSpecialties.map((s) => (
              <CardLink
                key={s.slug}
                href={paths.specialtyHub(s.slug)}
                title={`${s.name} à domicile`}
                description={s.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock entries={specialtyFaqs(specialty.name)} />
    </main>
  );
}
