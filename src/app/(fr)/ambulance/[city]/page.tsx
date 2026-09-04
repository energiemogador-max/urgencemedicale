import type { Metadata } from "next";
import { ServiceCityRoute, serviceCityMetadata, serviceCityStaticParams } from "@/lib/route-factories";

/**
 * /ambulance/{ville}.
 *
 * Added on Search Console evidence (2026-09-04): the single /ambulance page
 * was drawing impressions on city-level queries — "ambulance casablanca ain
 * sebaa", "urgence ambulance", "ambulance" — while sitting at position 62,
 * because nothing on the site paired "ambulance" with a place name.
 *
 * Only the cities that have written prose in content/drafts/service-cities.ts
 * are generated; the content layer fails the build rather than emitting a
 * mail-merged page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCityStaticParams("ambulance");
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  return serviceCityMetadata("ambulance", city);
}

export default async function Page({ params }: { params: Params }) {
  const { city } = await params;
  return <ServiceCityRoute serviceSlug="ambulance" citySlug={city} />;
}
