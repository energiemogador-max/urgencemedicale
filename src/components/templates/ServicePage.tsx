import type { City, Service } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { toWhatsAppHref } from "@/lib/phone";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, CardLink, Section } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { AmbulanceVisuals } from "@/components/AmbulanceVisuals";
import { content, getTrustBlockProps } from "@/lib/content";
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
      <PageHero
        title={service.name}
        lead={service.intro}
        phoneDisplay={content.business.phoneDisplay}
        phoneHref={content.business.phoneHref}
        whatsappHref={toWhatsAppHref(content.business.whatsappNumber)}
        facts={[
          { label: "Disponibilité", value: content.business.hoursOpen },
          { label: "Demande", value: "Par téléphone" },
          { label: "Tarif", value: "Annoncé avant l'intervention" },
        ]}
      />
      <TrustBlock {...getTrustBlockProps()} responseTimeMinutes={undefined} />
      {service.slug === "ambulance" && <AmbulanceVisuals />}

      <div className="mt-8">
        <Prose text={service.body} />
      </div>

      <CallBanner
        label="Une demande pour ce service ?"
        text="La demande se fait par téléphone. Le tarif dépend de l'intervention et vous est annoncé avant qu'elle ne soit confirmée."
      />

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
