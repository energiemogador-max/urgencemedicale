import Link from "next/link";
import type { City, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { buildSpecialtyFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SpecialtyHubPage({ specialty, cities }: { specialty: Specialty; cities: City[] }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          buildSpecialtyFragment(specialty.slug),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: `${specialty.name} à domicile`, path: paths.specialtyHub(specialty.slug) },
          ]),
        ]}
      />
      <h1 className="text-3xl font-bold text-ink">{specialty.name} à domicile</h1>
      <p className="mt-2 text-lg">{specialty.intro}</p>
      <TrustBlock {...getTrustBlockProps()} />
      <div className="mt-8 whitespace-pre-line">{specialty.body}</div>

      {cities.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-ink">{specialty.name} à domicile par ville</h2>
          <ul className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={paths.citySpecialty(specialty.slug, c.slug)} className="underline">
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
