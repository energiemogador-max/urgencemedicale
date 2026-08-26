import Link from "next/link";
import type { City, Quartier } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function QuartierPage({ city, quartier }: { city: City; quartier: Quartier }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({
            "@type": "Place",
            name: quartier.name,
            containedInPlace: { "@type": "City", name: city.name },
          }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: city.name, path: paths.cityHub(city.slug) },
            { name: quartier.name, path: paths.quartier(city.slug, quartier.slug) },
          ]),
        ]}
      />
      <nav className="text-sm">
        <Link href={paths.cityHub(city.slug)} className="underline">
          {city.name}
        </Link>
      </nav>
      <h1 className="mt-2 text-3xl font-bold text-ink">
        Médecin à domicile à {quartier.name}, {city.name}
      </h1>
      <p className="mt-2 text-lg">{quartier.intro}</p>
      <TrustBlock {...getTrustBlockProps(quartier.responseTimeMinutes)} />

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-ink">Repères à {quartier.name}</h2>
        <ul className="mt-2 list-disc pl-5">
          {quartier.landmarks.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-ink">Hôpitaux et cliniques les plus proches</h2>
        <ul className="mt-2 list-disc pl-5">
          {quartier.nearestHospitals.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-ink">Accès</h2>
        <p className="mt-2 whitespace-pre-line">{quartier.accessNotes}</p>
      </section>
    </main>
  );
}
