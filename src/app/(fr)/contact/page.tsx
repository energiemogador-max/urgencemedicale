import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Breadcrumbs, FactPill, Lead, Section } from "@/components/ui";
import { toWhatsAppHref } from "@/lib/phone";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "Contact", description: `Contactez ${content.business.legalName} — ${content.business.phoneDisplay}.`, path: paths.contact() });
}

export default function Page() {
  const { business } = content;
  const { address } = business;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: "Contact", path: paths.contact() },
        ])}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: "Contact" }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">Contact</h1>
      <Lead>
        Le téléphone est le moyen le plus rapide de faire venir un médecin. Le délai et le tarif vous sont annoncés
        pendant l&apos;appel.
      </Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <CallButton phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} />
        <WhatsAppButton href={toWhatsAppHref(business.whatsappNumber)} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <FactPill label="Disponibilité" value={business.hoursOpen} />
        <FactPill label="Intervention" value={`${business.defaultResponseTimeMinutes} minutes`} />
      </div>

      <Section title="Adresse">
        <address className="rounded-lg border border-border bg-surface p-5 not-italic">
          <span className="block font-bold text-ink">{business.legalName}</span>
          <span className="mt-1 block text-ink-muted">
            {address.street}
            <br />
            {address.postalCode} {address.city}
            <br />
            {address.region}
          </span>
        </address>
      </Section>
    </main>
  );
}
