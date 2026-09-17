import Link from "next/link";
import type { City, Doctor, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { PageHero } from "@/components/PageHero";
import { toWhatsAppHref } from "@/lib/phone";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Section } from "@/components/ui";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import { faqs } from "@/lib/faqs";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { buildSpecialtyFragment } from "@/lib/schema-org/business";
import { buildPhysician } from "@/lib/schema-org/physician";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SpecialtyHubPage({
  specialty,
  cities,
  otherSpecialties,
  doctors,
  locale = "fr",
}: {
  specialty: Specialty;
  cities: City[];
  otherSpecialties: Specialty[];
  doctors: Doctor[];
  locale?: Locale;
}) {
  const { content, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const L = (p: string) => localizedPath(p, locale);
  const label = t.specialtyAtHome(specialty.name);
  // Physician nodes always use the French record: one doctor, one entity, in
  // every language.
  const frenchDoctors = api("fr").content.doctors.filter((d) => doctors.some((x) => x.slug === d.slug));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildSpecialtyFragment(specialty.slug),
          ...frenchDoctors.map(buildPhysician),
          buildBreadcrumbList([
            { name: t.nav.home, path: L(paths.home()) },
            { name: label, path: L(paths.specialtyHub(specialty.slug)) },
          ]),
        ]}
      />
      <Breadcrumbs locale={locale} trail={[{ href: L(paths.home()), label: t.nav.home }, { label }]} />
      <PageHero
        locale={locale}
        title={label}
        lead={specialty.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          ...(doctors.length > 0
            ? [{ label: t.facts.namedDoctors(doctors.length), value: t.facts.namedDoctorsValue(doctors.length) }]
            : []),
          { label: t.facts.request, value: t.facts.byPhone },
          { label: t.facts.fee, value: t.facts.feeBeforeVisit },
        ]}
      />
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={specialty.body} />
      </div>

      <CallBanner locale={locale} />

      {/*
        Naming the physicians who actually cover this specialty is the one
        E-E-A-T signal no competitor in this market publishes. The Physician
        nodes reuse their /nos-medecins @id, so this is the same entity
        surfaced in a second place, not a duplicate.
      */}
      {doctors.length > 0 && (
        <Section title={t.specialty.doctorsTitle(specialty.name, doctors.length)}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {doctors.map((d) => (
              <li key={d.slug} className="rounded-lg border border-border bg-surface p-4">
                <Link href={L(paths.nosMedecins())} className="font-bold text-ink no-underline hover:underline">
                  {d.name}
                </Link>
                <p className="mt-1.5 text-sm text-ink-muted">{d.bio}</p>
                <p className="mt-1.5 text-sm text-ink-muted">
                  <span className="font-semibold text-ink">{t.specialty.languages}</span> {d.languages.join(locale === "ar" ? "، " : ", ")}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {cities.length > 0 && (
        <Section title={t.specialty.byCity(label)}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <CardLink
                key={c.slug}
                href={L(paths.citySpecialty(specialty.slug, c.slug))}
                title={c.name}
                description={t.meta.citySpecialty(specialty.name, c.name)}
              />
            ))}
          </div>
        </Section>
      )}

      {otherSpecialties.length > 0 && (
        <Section title={t.specialty.others}>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSpecialties.map((s) => (
              <CardLink
                key={s.slug}
                href={L(paths.specialtyHub(s.slug))}
                title={t.specialtyAtHome(s.name)}
                description={s.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock locale={locale} entries={faqs(locale).specialtyFaqs(specialty.name)} />
    </main>
  );
}
