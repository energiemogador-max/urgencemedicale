import type { City, Quartier, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { toWhatsAppHref } from "@/lib/phone";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, LinkGrid, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import { faqs } from "@/lib/faqs";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function CityHubPage({
  city,
  quartiers,
  specialties,
  locale = "fr",
}: {
  city: City;
  quartiers: Quartier[];
  specialties: Specialty[];
  locale?: Locale;
}) {
  const { content, getServiceBySlug, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const L = (p: string) => localizedPath(p, locale);

  /*
   * Service spokes that exist for this city (/ambulance/casablanca, …).
   *
   * These were orphans. Search Console (2026-09-13) showed /ambulance/casablanca
   * and /ambulance/rabat not even *discovered* two weeks after going live, and
   * an internal-link count explained it: each had exactly one inbound link,
   * from /ambulance. The city hub is the natural parent — it is linked from the
   * homepage and every quartier — so listing the spokes here gives each one a
   * strong crawl path.
   *
   * Derived from content.serviceCities, so a spoke added for a new city shows
   * up here without anyone remembering to link it.
   */
  const services = content.serviceCities
    .filter((sc) => sc.citySlug === city.slug)
    .flatMap((sc) => {
      const service = getServiceBySlug(sc.serviceSlug);
      return service ? [{ slug: sc.serviceSlug, service }] : [];
    });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({ "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: t.nav.home, path: L(paths.home()) },
            { name: city.name, path: L(paths.cityHub(city.slug)) },
          ]),
        ]}
      />
      <Breadcrumbs locale={locale} trail={[{ href: L(paths.home()), label: t.nav.home }, { label: city.name }]} />
      <PageHero
        locale={locale}
        title={t.city.heroTitle}
        accent={city.name}
        lead={city.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          { label: t.facts.intervention, value: `${t.range(content.business.defaultResponseTimeMinutes)} ${t.minutes}` },
          { label: t.facts.consultation, value: t.facts.fromPrice(content.pricing.tiers[0]?.amountMad ?? "", t.currency) },
          { label: t.facts.availability, value: t.hours247 },
        ]}
      />
      <TrustBlock locale={locale} {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={city.body} />
      </div>

      <CallBanner locale={locale} />

      {quartiers.length > 0 && (
        <Section title={t.city.quartiersTitle(city.name)} lead={t.city.quartiersLead}>
          <LinkGrid links={quartiers.map((q) => ({ href: L(paths.quartier(city.slug, q.slug)), label: q.name }))} />
        </Section>
      )}

      {specialties.length > 0 && (
        <Section title={t.city.specialtiesTitle(city.name)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {specialties.map((s) => (
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

      {services.length > 0 && (
        <Section title={t.city.servicesTitle(city.name)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map(({ slug, service }) => (
              <CardLink
                key={slug}
                href={L(paths.serviceCity(slug, city.slug))}
                title={t.inCity(service.name, city.name)}
                description={service.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock locale={locale} entries={faqs(locale).cityFaqs(city.name)} />
    </main>
  );
}
