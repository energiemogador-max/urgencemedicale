import Link from "next/link";
import type { City, Situation, SituationCity } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function SituationCityPage({
  situation,
  city,
  situationCity,
}: {
  situation: Situation;
  city: City;
  situationCity: SituationCity;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({ "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: situation.title, path: paths.situation(situation.slug) },
            { name: city.name, path: paths.situationCity(situation.slug, city.slug) },
          ]),
        ]}
      />
      <nav className="text-sm">
        <Link href={paths.situation(situation.slug)} className="underline">
          {situation.title}
        </Link>
      </nav>
      <h1 className="mt-2 text-3xl font-bold text-ink">
        {situation.title} à {city.name}
      </h1>
      <p className="mt-2 text-lg">{situationCity.intro}</p>
      <TrustBlock {...getTrustBlockProps()} />
      <div className="mt-8 whitespace-pre-line">{situationCity.body}</div>
    </main>
  );
}
