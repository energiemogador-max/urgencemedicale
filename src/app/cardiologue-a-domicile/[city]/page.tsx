import type { Metadata } from "next";
import { CitySpecialtyRoute, citySpecialtyMetadata, specialtyCityStaticParams } from "@/lib/route-factories";

export const dynamicParams = false;

export function generateStaticParams() {
  return specialtyCityStaticParams();
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  return citySpecialtyMetadata("cardiologue", city);
}

export default async function Page({ params }: { params: Params }) {
  const { city } = await params;
  return <CitySpecialtyRoute specialtySlug="cardiologue" citySlug={city} />;
}
