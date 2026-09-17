import type { City, Quartier } from "@content/schema";
import { isUnconfirmed } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { PageHero } from "@/components/PageHero";
import { toWhatsAppHref } from "@/lib/phone";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, LinkGrid, Section } from "@/components/ui";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import { faqs } from "@/lib/faqs";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function QuartierPage({
  city,
  quartier,
  siblings,
  locale = "fr",
}: {
  city: City;
  quartier: Quartier;
  siblings: Quartier[];
  locale?: Locale;
}) {
  const { content, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const L = (p: string) => localizedPath(p, locale);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({
            "@type": "Place",
            name: quartier.name,
            containedInPlace: { "@type": "City", name: city.name },
          }),
          buildBreadcrumbList([
            { name: t.nav.home, path: L(paths.home()) },
            { name: city.name, path: L(paths.cityHub(city.slug)) },
            { name: quartier.name, path: L(paths.quartier(city.slug, quartier.slug)) },
          ]),
        ]}
      />
      <Breadcrumbs
        locale={locale}
        trail={[
          { href: L(paths.home()), label: t.nav.home },
          { href: L(paths.cityHub(city.slug)), label: city.name },
          { label: quartier.name },
        ]}
      />
      <PageHero
        locale={locale}
        title={t.quartier.heroTitle(quartier.name)}
        accent={city.name}
        lead={quartier.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          { label: t.facts.intervention, value: `${t.range(quartier.responseTimeMinutes)} ${t.minutes}` },
          { label: t.facts.consultation, value: t.facts.fromPrice(content.pricing.tiers[0]?.amountMad ?? "", t.currency) },
          { label: t.facts.availability, value: t.hours247 },
        ]}
      />
      <TrustBlock locale={locale} {...getTrustBlockProps(quartier.responseTimeMinutes)} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-lg font-bold text-ink">{t.quartier.landmarks(quartier.name)}</h2>
          <ul className="mt-3 space-y-2">
            {quartier.landmarks.map((l) => (
              <li key={l} className="crescent-marker text-ink-muted">
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Omitted entirely until real, verified facility names exist —
            naming the wrong hospital near a home-visit service is worse than
            not naming one, and printing "[À CONFIRMER]" is worse than both. */}
        {quartier.nearestHospitals.some((h) => !isUnconfirmed(h)) && (
          <section className="rounded-lg border border-border bg-surface p-4">
            <h2 className="text-lg font-bold text-ink">{t.quartier.hospitals}</h2>
            <ul className="mt-3 space-y-2">
              {quartier.nearestHospitals
                .filter((h) => !isUnconfirmed(h))
                .map((h) => (
                  <li key={h} className="crescent-marker text-ink-muted">
                    <span>{h}</span>
                  </li>
                ))}
            </ul>
          </section>
        )}
      </div>

      <Section title={t.quartier.access(quartier.name)}>
        <p className="max-w-[68ch] text-ink-muted">{quartier.accessNotes}</p>
      </Section>

      {siblings.length > 0 && (
        <Section title={t.quartier.others(city.name)}>
          <LinkGrid links={siblings.map((q) => ({ href: L(paths.quartier(city.slug, q.slug)), label: q.name }))} />
        </Section>
      )}

      <CallBanner locale={locale} />

      <FaqBlock locale={locale} entries={faqs(locale).quartierFaqs(quartier.name, quartier.responseTimeMinutes)} />
    </main>
  );
}
