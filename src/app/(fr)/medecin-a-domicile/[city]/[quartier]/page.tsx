import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, getCityBySlug, getQuartierBySlug, getQuartiersForCity } from "@/lib/content";
import { paths } from "@/lib/urls";
import { QuartierPage } from "@/components/templates/QuartierPage";
import { pageMetadata } from "@/lib/seo";

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
  /*
   * The description used to be the page intro ("Un médecin généraliste peut se
   * déplacer à votre domicile à Belvédère, de jour comme de nuit.") — true, but
   * it gave a searcher no reason to choose this result. Search Console
   * (2026-09-16): Belvédère had 84 impressions at position 10 and no click.
   * It now carries the three facts that decide a tap — availability, arrival
   * time, starting price — all read from the content layer.
   */
  const { business, pricing } = content;
  const description = `Médecin à domicile à ${quartier.name} (${city.name}), ${business.hoursOpen} : intervention en ${quartier.responseTimeMinutes} min, consultation dès ${pricing.tiers[0]?.amountMad} ${pricing.currency}, tarif annoncé avant la visite.`;
  return pageMetadata({ title: `Médecin à domicile ${quartier.name}, ${city.name}`, description, path: paths.quartier(city.slug, quartier.slug) });
}

export default async function Page({ params }: { params: Params }) {
  const { city: citySlug, quartier: quartierSlug } = await params;
  const city = getCityBySlug(citySlug);
  const quartier = city && getQuartierBySlug(city.slug, quartierSlug);
  if (!city || !quartier) notFound();
  const siblings = getQuartiersForCity(city.slug).filter((q) => q.slug !== quartier.slug);
  return <QuartierPage city={city} quartier={quartier} siblings={siblings} />;
}
