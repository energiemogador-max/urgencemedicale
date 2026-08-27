import type { Metadata } from "next";
import { SituationRoute, situationMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return situationMetadata("medecin-de-garde");
}

export default function Page() {
  return <SituationRoute situationSlug="medecin-de-garde" />;
}
