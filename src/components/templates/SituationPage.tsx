import Link from "next/link";
import type { City, Situation } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SituationPage({ situation, cities }: { situation: Situation; cities: City[] }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: situation.title, path: paths.situation(situation.slug) },
        ])}
      />
      <h1 className="text-3xl font-bold text-ink">{situation.title}</h1>
      <p className="mt-2 text-lg">{situation.intro}</p>
      <TrustBlock {...getTrustBlockProps()} />
      <div className="mt-8 whitespace-pre-line">{situation.body}</div>

      {cities.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-ink">{situation.title} par ville</h2>
          <ul className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={paths.situationCity(situation.slug, c.slug)} prefetch={false} className="underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
