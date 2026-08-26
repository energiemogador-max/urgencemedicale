import type { Metadata } from "next";
import { SituationRoute, situationMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return situationMetadata("contre-visite-medicale");
}

export default function Page() {
  return <SituationRoute situationSlug="contre-visite-medicale" />;
}
