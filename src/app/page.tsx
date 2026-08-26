import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { paths } from "@/lib/urls";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function generateMetadata(): Metadata {
  return {
    title: "Médecin à domicile au Maroc, 24h/24 et 7j/7",
    description: `${content.business.legalName} envoie un médecin à domicile en ${content.business.defaultResponseTimeMinutes} minutes.`,
    alternates: { canonical: "/" },
  };
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={[buildMedicalBusiness(), buildBreadcrumbList([{ name: "Accueil", path: paths.home() }])]} />
      <h1 className="text-3xl font-bold text-ink">{content.business.legalName}</h1>
      <p className="mt-2 text-lg">
        Médecin à domicile, 24h/24 et 7j/7 — intervention en {content.business.defaultResponseTimeMinutes} minutes.
      </p>
      <TrustBlock {...getTrustBlockProps()} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Spécialités</h2>
        <ul className="mt-2 list-disc pl-5">
          {content.specialties.map((s) => (
            <li key={s.slug}>{s.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Villes couvertes</h2>
        <ul className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
          {content.cities.map((c) => (
            <li key={c.slug}>{c.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
