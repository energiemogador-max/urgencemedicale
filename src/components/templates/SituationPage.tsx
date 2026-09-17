import type { City, Situation } from "@content/schema";
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
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SituationPage({
  situation,
  cities,
  otherSituations,
  locale = "fr",
}: {
  situation: Situation;
  cities: City[];
  otherSituations: Situation[];
  locale?: Locale;
}) {
  const { content, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const L = (p: string) => localizedPath(p, locale);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: t.nav.home, path: L(paths.home()) },
          { name: situation.title, path: L(paths.situation(situation.slug)) },
        ])}
      />
      <Breadcrumbs locale={locale} trail={[{ href: L(paths.home()), label: t.nav.home }, { label: situation.title }]} />
      <PageHero
        locale={locale}
        title={situation.title}
        lead={situation.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          { label: t.facts.zone, value: t.facts.citiesCount(content.cities.length) },
          { label: t.facts.request, value: t.facts.byPhone },
          { label: t.facts.fee, value: t.facts.feeBeforeVisit },
        ]}
      />
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={situation.body} />
      </div>

      <CallBanner locale={locale} />

      {cities.length > 0 && (
        <Section title={t.situation.byCity(situation.title)}>
          <LinkGrid
            links={cities.map((c) => ({ href: L(paths.situationCity(situation.slug, c.slug)), label: c.name }))}
          />
        </Section>
      )}

      {otherSituations.length > 0 && (
        <Section title={t.situation.others}>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSituations.map((s) => (
              <CardLink
                key={s.slug}
                href={L(paths.situation(s.slug))}
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
