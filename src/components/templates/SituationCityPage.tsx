import type { City, Quartier, Situation, SituationCity } from "@content/schema";
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
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SituationCityPage({
  situation,
  city,
  situationCity,
  quartiers,
  otherSituations,
  locale = "fr",
}: {
  situation: Situation;
  city: City;
  situationCity: SituationCity;
  quartiers: Quartier[];
  otherSituations: Situation[];
  locale?: Locale;
}) {
  const { content, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const L = (p: string) => localizedPath(p, locale);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({ "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: t.nav.home, path: L(paths.home()) },
            { name: situation.title, path: L(paths.situation(situation.slug)) },
            { name: city.name, path: L(paths.situationCity(situation.slug, city.slug)) },
          ]),
        ]}
      />
      <Breadcrumbs
        locale={locale}
        trail={[
          { href: L(paths.home()), label: t.nav.home },
          { href: L(paths.situation(situation.slug)), label: situation.title },
          { label: city.name },
        ]}
      />
      <PageHero
        locale={locale}
        title={t.inCity(situation.title, "").trim()}
        accent={city.name}
        lead={situationCity.intro}
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
        <Prose text={situationCity.body} />
      </div>

      <CallBanner locale={locale} />

      {quartiers.length > 0 && (
        <Section title={t.service.quartiersServed(city.name)}>
          <LinkGrid links={quartiers.map((q) => ({ href: L(paths.quartier(city.slug, q.slug)), label: q.name }))} />
        </Section>
      )}

      {otherSituations.length > 0 && (
        <Section title={t.situation.othersInCity(city.name)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSituations.map((s) => (
              <CardLink
                key={s.slug}
                href={L(s.geoMultiplied ? paths.situationCity(s.slug, city.slug) : paths.situation(s.slug))}
                title={s.title}
                description={s.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock locale={locale} entries={faqs(locale).situationFaqs()} />
    </main>
  );
}
