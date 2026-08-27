import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SPECIALTY_ELIGIBLE_CITY_SLUGS } from "@content/schema";
import { content, getCityBySlug, getQuartiersForCity } from "@/lib/content";
import { paths } from "@/lib/urls";
import { CityHubPage } from "@/components/templates/CityHubPage";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return content.cities.map((c) => ({ city: c.slug }));
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return pageMetadata({ title: `Médecin à domicile à ${city.name}`, description: city.intro, path: paths.cityHub(city.slug) });
}

export default async function Page({ params }: { params: Params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  // Specialty spoke pages only exist for the top-6 cities (Phase 2 rule), so
  // only link them where the target page actually exists.
  const specialties = SPECIALTY_ELIGIBLE_CITY_SLUGS.includes(city.slug) ? content.specialties : [];
  return <CityHubPage city={city} quartiers={getQuartiersForCity(city.slug)} specialties={specialties} />;
}
