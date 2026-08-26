import Link from "next/link";
import type { City, CitySpecialty, Specialty } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { buildSpecialtyFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function CitySpecialtyPage({
  specialty,
  city,
  citySpecialty,
}: {
  specialty: Specialty;
  city: City;
  citySpecialty: CitySpecialty;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          buildSpecialtyFragment(specialty.slug, { "@type": "City", name: city.name }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: `${specialty.name} à domicile`, path: paths.specialtyHub(specialty.slug) },
            { name: city.name, path: paths.citySpecialty(specialty.slug, city.slug) },
          ]),
        ]}
      />
      <nav className="text-sm">
        <Link href={paths.specialtyHub(specialty.slug)} className="underline">
          {specialty.name} à domicile
        </Link>
      </nav>
      <h1 className="mt-2 text-3xl font-bold text-ink">
        {specialty.name} à domicile à {city.name}
      </h1>
      <p className="mt-2 text-lg">{citySpecialty.intro}</p>
      <TrustBlock {...getTrustBlockProps()} />
      <div className="mt-8 whitespace-pre-line">{citySpecialty.body}</div>
    </main>
  );
}
