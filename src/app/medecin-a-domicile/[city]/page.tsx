import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, getCityBySlug, getQuartiersForCity } from "@/lib/content";
import { paths } from "@/lib/urls";
import { CityHubPage } from "@/components/templates/CityHubPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return content.cities.map((c) => ({ city: c.slug }));
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Médecin à domicile à ${city.name}`,
    description: city.intro,
    alternates: { canonical: paths.cityHub(city.slug) },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  return <CityHubPage city={city} quartiers={getQuartiersForCity(city.slug)} />;
}
