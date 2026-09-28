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
   *
   * The fact-colon-list rewrite that followed that finding didn't help:
   * Search Console (2026-09-22), six days later, showed the SAME page at 128
   * impressions, position 9.6, still zero clicks. This function is why —
   * it duplicates src/lib/dictionaries.ts's quartierDescription in the
   * shared en/ar dispatcher (src/lib/render-page.tsx) instead of calling
   * it, so editing the dictionary that day changed nothing for French
   * quartier pages, which this route serves and which carry the vast
   * majority of the site's real traffic (Morocco dominates Countries.csv).
   *
   * Rewritten here to lead with an active, reassuring sentence rather than
   * a dry fact list, and split into two sentences so a very long quartier
   * name (e.g. "Centre de Dar Bouazza") degrades to a complete short
   * sentence instead of Google truncating mid-clause — verified against
   * every quartier's actual name length before shipping. Kept in sync by
   * hand with the dictionary version; there is no single source for this
   * one string across fr/en/ar because French still has its own route
   * tree rather than going through the shared dispatcher.
   */
  const { business, pricing } = content;
  const description = `Un médecin vient vous examiner à ${quartier.name} (${city.name}), ${business.hoursOpen}. Arrivée en ${quartier.responseTimeMinutes} min, consultation dès ${pricing.tiers[0]?.amountMad} ${pricing.currency}, tarif confirmé avant la visite.`;
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
