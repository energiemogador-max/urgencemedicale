import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function generateMetadata(): Metadata {
  return {
    title: "Contact",
    description: `Contactez ${content.business.legalName} — ${content.business.phoneDisplay}.`,
    alternates: { canonical: paths.contact() },
  };
}

export default function Page() {
  const { address } = content.business;
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: "Contact", path: paths.contact() },
        ])}
      />
      <h1 className="text-3xl font-bold text-ink">Contact</h1>
      <TrustBlock {...getTrustBlockProps()} />
      <address className="mt-8 not-italic">
        {content.business.legalName}
        <br />
        {address.street}
        <br />
        {address.postalCode} {address.city}, {address.region}
      </address>
      <p className="mt-4">Disponible {content.business.hoursOpen}.</p>
    </main>
  );
}
