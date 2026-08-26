import type { Metadata } from "next";
import { SituationRoute, situationMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return situationMetadata("fievre-enfant-nuit");
}

export default function Page() {
  return <SituationRoute situationSlug="fievre-enfant-nuit" />;
}
