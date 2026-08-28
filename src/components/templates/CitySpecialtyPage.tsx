import type { City, CitySpecialty, Quartier, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, LinkGrid, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { specialtyFaqs } from "@/lib/faqs";
import { buildSpecialtyFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function CitySpecialtyPage({
  specialty,
  city,
  citySpecialty,
  quartiers,
  otherSpecialties,
}: {
  specialty: Specialty;
  city: City;
  citySpecialty: CitySpecialty;
  quartiers: Quartier[];
  otherSpecialties: Specialty[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildSpecialtyFragment(specialty.slug, { "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: `${specialty.name} à domicile`, path: paths.specialtyHub(specialty.slug) },
            { name: city.name, path: paths.citySpecialty(specialty.slug, city.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        trail={[
          { href: paths.home(), label: "Accueil" },
          { href: paths.specialtyHub(specialty.slug), label: `${specialty.name} à domicile` },
          { label: city.name },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold text-ink">
        {specialty.name} à domicile à {city.name}
      </h1>
      <Lead>{citySpecialty.intro}</Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={citySpecialty.body} />
      </div>

      <CallBanner />

      {quartiers.length > 0 && (
        <Section title={`Quartiers desservis à ${city.name}`}>
          <LinkGrid
            links={quartiers.map((q) => ({ href: paths.quartier(city.slug, q.slug), label: q.name }))}
          />
        </Section>
      )}

      {otherSpecialties.length > 0 && (
        <Section title={`Autres spécialités à ${city.name}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSpecialties.map((s) => (
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

      <FaqBlock entries={specialtyFaqs(specialty.name)} />
    </main>
  );
}
