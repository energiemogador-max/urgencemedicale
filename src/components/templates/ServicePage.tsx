import type { City, Service } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Lead, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { serviceFaqs } from "@/lib/faqs";
import { buildService } from "@/lib/schema-org/service";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function ServicePage({
  service,
  cities,
  otherServices,
}: {
  service: Service;
  cities: City[];
  otherServices: Service[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildService(service),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: service.name, path: paths.service(service.slug) },
          ]),
        ]}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: service.name }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">{service.name}</h1>
      <Lead>{service.intro}</Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <Prose text={service.body} />
      </div>

      <CallBanner />

      {cities.length > 0 && (
        <Section title={`${service.name} par ville`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <CardLink
                key={c.slug}
                href={paths.serviceCity(service.slug, c.slug)}
                title={c.name}
                description={`${service.name} à ${c.name}`}
              />
            ))}
          </div>
        </Section>
      )}

      {otherServices.length > 0 && (
        <Section title="Autres services à domicile">
          <div className="grid gap-3 sm:grid-cols-2">
            {otherServices.map((s) => (
              <CardLink
                key={s.slug}
                href={paths.service(s.slug)}
                title={s.name}
                description={s.shortDescription}
              />
            ))}
          </div>
        </Section>
      )}

      <FaqBlock entries={serviceFaqs(service)} />
    </main>
  );
}
