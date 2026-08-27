import Link from "next/link";
import type { City, Doctor, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { specialtyFaqs } from "@/lib/faqs";
import { buildSpecialtyFragment } from "@/lib/schema-org/business";
import { buildPhysician } from "@/lib/schema-org/physician";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SpecialtyHubPage({
  specialty,
  cities,
  otherSpecialties,
  doctors,
}: {
  specialty: Specialty;
  cities: City[];
  otherSpecialties: Specialty[];
  doctors: Doctor[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildSpecialtyFragment(specialty.slug),
          ...doctors.map(buildPhysician),
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

      {/*
        Naming the physicians who actually cover this specialty is the one
        E-E-A-T signal no competitor in this market publishes — not one of the
        nine audited names a single doctor anywhere on their site. The
        Physician nodes reuse their /nos-medecins @id, so this is the same
        entity surfaced in a second place, not a duplicate.
      */}
      {doctors.length > 0 && (
        <Section title={doctors.length > 1 ? `Nos ${specialty.name.toLowerCase()}s` : `Votre ${specialty.name.toLowerCase()}`}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {doctors.map((d) => (
              <li key={d.slug} className="rounded-lg border border-border bg-surface p-4">
                <Link href={paths.nosMedecins()} className="font-bold text-ink no-underline hover:underline">
                  {d.name}
                </Link>
                <p className="mt-1.5 text-sm text-ink-muted">{d.bio}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

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
