import type { City, Quartier, Service, ServiceCity } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { toWhatsAppHref } from "@/lib/phone";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, LinkGrid, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { AmbulanceVisuals } from "@/components/AmbulanceVisuals";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import { faqs } from "@/lib/faqs";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { buildService } from "@/lib/schema-org/service";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function ServiceCityPage({
  service,
  city,
  serviceCity,
  quartiers,
  otherServices,
  locale = "fr",
}: {
  service: Service;
  city: City;
  serviceCity: ServiceCity;
  quartiers: Quartier[];
  otherServices: Service[];
  locale?: Locale;
}) {
  const { content, getTrustBlockProps } = api(locale);
  const t = dict(locale);
  const L = (p: string) => localizedPath(p, locale);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildService(service, city),
          buildBreadcrumbList([
            { name: t.nav.home, path: L(paths.home()) },
            { name: service.name, path: L(paths.service(service.slug)) },
            { name: city.name, path: L(paths.serviceCity(service.slug, city.slug)) },
          ]),
        ]}
      />
      <Breadcrumbs
        locale={locale}
        trail={[
          { href: L(paths.home()), label: t.nav.home },
          { href: L(paths.service(service.slug)), label: service.name },
          { label: city.name },
        ]}
      />
      <PageHero
        locale={locale}
        title={t.inCity(service.name, "").trim()}
        accent={city.name}
        lead={serviceCity.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          { label: t.facts.zone, value: city.name },
          { label: t.facts.availability, value: t.hours247 },
          { label: t.facts.fee, value: t.facts.feeBeforeIntervention },
        ]}
      />
      <TrustBlock locale={locale} {...getTrustBlockProps()} responseTimeMinutes={undefined} />
      {service.slug === "ambulance" && <AmbulanceVisuals locale={locale} />}

      <div className="mt-8">
        <Prose text={serviceCity.body} />
      </div>

      <CallBanner locale={locale} label={t.banner.serviceLabel} text={t.banner.serviceText} />

      {quartiers.length > 0 && (
        <Section title={t.service.quartiersServed(city.name)}>
          <LinkGrid links={quartiers.map((q) => ({ href: L(paths.quartier(city.slug, q.slug)), label: q.name }))} />
        </Section>
      )}

      {otherServices.length > 0 && (
        <Section title={t.service.others}>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherServices.map((s) => (
              <CardLink key={s.slug} href={L(paths.service(s.slug))} title={s.name} description={s.shortDescription} />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock locale={locale} entries={faqs(locale).serviceFaqs(service)} />
    </main>
  );
}
