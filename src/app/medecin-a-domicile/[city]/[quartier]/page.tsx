import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, getCityBySlug, getQuartierBySlug, getQuartiersForCity } from "@/lib/content";
import { paths } from "@/lib/urls";
import { QuartierPage } from "@/components/templates/QuartierPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return content.cities
    .filter((c) => c.hasQuartierPages)
    .flatMap((c) => getQuartiersForCity(c.slug).map((q) => ({ city: c.slug, quartier: q.slug })));
}

type Params = Promise<{ city: string; quartier: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: citySlug, quartier: quartierSlug } = await params;
  const city = getCityBySlug(citySlug);
  const quartier = city && getQuartierBySlug(city.slug, quartierSlug);
  if (!city || !quartier) return {};
  return {
    title: `Médecin à domicile à ${quartier.name}, ${city.name}`,
    description: quartier.intro,
    alternates: { canonical: paths.quartier(city.slug, quartier.slug) },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { city: citySlug, quartier: quartierSlug } = await params;
  const city = getCityBySlug(citySlug);
  const quartier = city && getQuartierBySlug(city.slug, quartierSlug);
  if (!city || !quartier) notFound();
  return <QuartierPage city={city} quartier={quartier} />;
}
