import type { City, Quartier, Service, ServiceCity } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, LinkGrid, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { serviceFaqs } from "@/lib/faqs";
import { buildService } from "@/lib/schema-org/service";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function ServiceCityPage({
  service,
  city,
  serviceCity,
  quartiers,
  otherServices,
}: {
  service: Service;
  city: City;
  serviceCity: ServiceCity;
  quartiers: Quartier[];
  otherServices: Service[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildService(service, city),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: service.name, path: paths.service(service.slug) },
            { name: city.name, path: paths.serviceCity(service.slug, city.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        trail={[
          { href: paths.home(), label: "Accueil" },
          { href: paths.service(service.slug), label: service.name },
          { label: city.name },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold text-ink">
        {service.name} à {city.name}
      </h1>
      <Lead>{serviceCity.intro}</Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={serviceCity.body} />
      </div>

      <CallBanner />

      {quartiers.length > 0 && (
        <Section title={`Quartiers desservis à ${city.name}`}>
          <LinkGrid links={quartiers.map((q) => ({ href: paths.quartier(city.slug, q.slug), label: q.name }))} />
        </Section>
      )}

      {otherServices.length > 0 && (
        <Section title="Autres services à domicile">
          <div className="grid gap-3 sm:grid-cols-2">
            {otherServices.map((s) => (
              <CardLink key={s.slug} href={paths.service(s.slug)} title={s.name} description={s.shortDescription} />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock entries={serviceFaqs(service)} />
    </main>
  );
}
