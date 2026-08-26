import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { buildOffers } from "@/lib/schema-org/offers";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function generateMetadata(): Metadata {
  return {
    title: "Tarifs",
    description: "Nos tarifs de consultation à domicile, en toute transparence — jour, nuit et weekend.",
    alternates: { canonical: paths.tarifs() },
  };
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          ...buildOffers(),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: "Tarifs", path: paths.tarifs() },
          ]),
        ]}
      />
      <h1 className="text-3xl font-bold text-ink">Tarifs</h1>
      <p className="mt-2 text-lg">Le tarif est annoncé avant votre confirmation, sans surprise à l&apos;arrivée du médecin.</p>
      <TrustBlock {...getTrustBlockProps()} />

      <table className="mt-10 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2">Consultation</th>
            <th className="py-2">Horaire</th>
            <th className="py-2">Prix</th>
          </tr>
        </thead>
        <tbody>
          {content.pricing.tiers.map((t) => (
            <tr key={t.slug} className="border-b border-border">
              <td className="py-2">{t.label}</td>
              <td className="py-2">{t.window}</td>
              <td className="py-2 font-bold text-primary">{t.amountMad} MAD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
