import type { City, CitySpecialty, Quartier, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { PageHero } from "@/components/PageHero";
import { toWhatsAppHref } from "@/lib/phone";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, LinkGrid, Section } from "@/components/ui";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import { faqs } from "@/lib/faqs";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { buildSpecialtyFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function CitySpecialtyPage({
  specialty,
  city,
  citySpecialty,
  quartiers,
  otherSpecialties,
  locale = "fr",
}: {
  specialty: Specialty;
  city: City;
  citySpecialty: CitySpecialty;
  quartiers: Quartier[];
  otherSpecialties: Specialty[];
  locale?: Locale;
}) {
  const { content, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const L = (p: string) => localizedPath(p, locale);
  const hubLabel = t.specialtyAtHome(specialty.name);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildSpecialtyFragment(specialty.slug, { "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: t.nav.home, path: L(paths.home()) },
            { name: hubLabel, path: L(paths.specialtyHub(specialty.slug)) },
            { name: city.name, path: L(paths.citySpecialty(specialty.slug, city.slug)) },
          ]),
        ]}
      />
      <Breadcrumbs
        locale={locale}
        trail={[
          { href: L(paths.home()), label: t.nav.home },
          { href: L(paths.specialtyHub(specialty.slug)), label: hubLabel },
          { label: city.name },
        ]}
      />
      <PageHero
        locale={locale}
        title={t.inCity(hubLabel, "").trim()}
        accent={city.name}
        lead={citySpecialty.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          { label: t.facts.zone, value: city.name },
          { label: t.facts.request, value: t.facts.byPhone },
          { label: t.facts.fee, value: t.facts.feeBeforeVisit },
        ]}
      />
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={citySpecialty.body} />
      </div>

      <CallBanner locale={locale} />

      {quartiers.length > 0 && (
        <Section title={t.service.quartiersServed(city.name)}>
          <LinkGrid links={quartiers.map((q) => ({ href: L(paths.quartier(city.slug, q.slug)), label: q.name }))} />
        </Section>
      )}

      {otherSpecialties.length > 0 && (
        <Section title={t.specialty.othersInCity(city.name)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSpecialties.map((s) => (
              <CardLink
                key={s.slug}
                href={L(paths.citySpecialty(s.slug, city.slug))}
                title={t.inCity(s.name, city.name)}
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
