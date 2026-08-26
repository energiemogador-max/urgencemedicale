import type { Metadata } from "next";
import { content } from "@/lib/content";

export function generateMetadata(): Metadata {
  return {
    title: "Médecin à domicile au Maroc, 24h/24 et 7j/7",
    description: `${content.business.legalName} envoie un médecin à domicile en ${content.business.defaultResponseTimeMinutes} minutes.`,
    alternates: { canonical: "/" },
  };
}

/**
 * Phase 1 scaffold stub — proves the content layer wires end-to-end.
 * Phase 3 replaces this with the real trust-first UI (sticky call bar,
 * named-doctor trust block, no stock imagery).
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{content.business.legalName}</h1>
      <p className="mt-2 text-lg">
        Médecin à domicile, 24h/24 et 7j/7 — intervention en {content.business.defaultResponseTimeMinutes} minutes.
      </p>
      <a
        href={`tel:${content.business.phoneHref}`}
        className="mt-6 inline-block rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white"
      >
        Appeler {content.business.phoneDisplay}
      </a>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Spécialités</h2>
        <ul className="mt-2 list-disc pl-5">
          {content.specialties.map((s) => (
            <li key={s.slug}>{s.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Villes couvertes</h2>
        <ul className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
          {content.cities.map((c) => (
            <li key={c.slug}>{c.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
