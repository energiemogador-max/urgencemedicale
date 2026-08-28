import type { Metadata } from "next";
import { SituationRoute, situationMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return situationMetadata("prise-de-sang-domicile");
}

export default function Page() {
  return <SituationRoute situationSlug="prise-de-sang-domicile" />;
}
