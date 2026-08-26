import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { buildPhysician } from "@/lib/schema-org/physician";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function generateMetadata(): Metadata {
  return {
    title: "Nos médecins",
    description: "Les médecins qui interviennent à domicile, avec leur numéro d'inscription à l'Ordre National des Médecins.",
    alternates: { canonical: paths.nosMedecins() },
  };
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          ...content.doctors.map(buildPhysician),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: "Nos médecins", path: paths.nosMedecins() },
          ]),
        ]}
      />
      <h1 className="text-3xl font-bold text-ink">Nos médecins</h1>
      <p className="mt-2 text-lg">
        Chaque médecin qui se déplace chez vous est nommément identifié et inscrit à l&apos;Ordre National des Médecins.
      </p>
      <TrustBlock {...getTrustBlockProps()} />

      <ul className="mt-10 space-y-8">
        {content.doctors.map((d) => (
          <li key={d.slug} className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-ink">{d.name}</h2>
            <p className="text-sm text-ink-muted">
              {content.specialties.find((s) => s.slug === d.specialtySlug)?.name} — Ordre National des Médecins n°{" "}
              {d.ordreNumber}
            </p>
            <p className="mt-2 whitespace-pre-line">{d.bio}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
