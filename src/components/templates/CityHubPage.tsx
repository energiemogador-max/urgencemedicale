import type { City, Quartier, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, LinkGrid, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { content, getServiceBySlug, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { cityFaqs } from "@/lib/faqs";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function CityHubPage({
  city,
  quartiers,
  specialties,
}: {
  city: City;
  quartiers: Quartier[];
  specialties: Specialty[];
}) {
  /*
   * Service spokes that exist for this city (/ambulance/casablanca, …).
   *
   * These were orphans. Search Console (2026-09-13) showed /ambulance/casablanca
   * and /ambulance/rabat not even *discovered* two weeks after going live, and
   * an internal-link count explained it: each had exactly one inbound link,
   * from /ambulance. Google deprioritises URLs it can only reach through a
   * sitemap and a single hub. The city hub is the natural parent — it is
   * linked from the homepage and every quartier — so listing the spokes here
   * gives each one a strong crawl path, and gives a visitor already on
   * "médecin à domicile à Rabat" the services available in Rabat.
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
            { name: "Accueil", path: paths.home() },
            { name: city.name, path: paths.cityHub(city.slug) },
          ]),
        ]}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: city.name }]} />
      <PageHero
        title="Médecin à domicile à"
        accent={city.name}
        lead={city.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        facts={[
          { label: "Intervention", value: `${content.business.defaultResponseTimeMinutes} min` },
          { label: "Consultation", value: `dès ${content.pricing.tiers[0]?.amountMad} ${content.pricing.currency}` },
          { label: "Disponibilité", value: content.business.hoursOpen },
        ]}
      />
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={city.body} />
      </div>

      <CallBanner />

      {quartiers.length > 0 && (
        <Section
          title={`Quartiers couverts à ${city.name}`}
          lead="Chaque quartier a sa propre page, avec ses repères locaux et ses conditions d'accès."
        >
          <LinkGrid
            links={quartiers.map((q) => ({ href: paths.quartier(city.slug, q.slug), label: q.name }))}
          />
        </Section>
      )}

      {specialties.length > 0 && (
        <Section title={`Spécialités disponibles à ${city.name}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {specialties.map((s) => (
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

      {services.length > 0 && (
        <Section title={`Services à domicile à ${city.name}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map(({ slug, service }) => (
              <CardLink
                key={slug}
                href={paths.serviceCity(slug, city.slug)}
                title={`${service.name} à ${city.name}`}
                description={service.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock entries={cityFaqs(city.name)} />
    </main>
  );
}
