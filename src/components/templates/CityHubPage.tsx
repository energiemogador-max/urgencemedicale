import Link from "next/link";
import type { City, Quartier } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function CityHubPage({ city, quartiers }: { city: City; quartiers: Quartier[] }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({ "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: city.name, path: paths.cityHub(city.slug) },
          ]),
        ]}
      />
      <h1 className="text-3xl font-bold text-ink">Médecin à domicile à {city.name}</h1>
      <p className="mt-2 text-lg">{city.intro}</p>
      <TrustBlock {...getTrustBlockProps()} />
      <div className="mt-8 whitespace-pre-line">{city.body}</div>
      {quartiers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-ink">Quartiers couverts à {city.name}</h2>
          <ul className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
            {quartiers.map((q) => (
              <li key={q.slug}>
                <Link href={paths.quartier(city.slug, q.slug)} prefetch={false} className="underline">
                  {q.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
