import type { Metadata } from "next";
import { SituationRoute, situationMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return situationMetadata("suivi-post-hospitalisation");
}

export default function Page() {
  return <SituationRoute situationSlug="suivi-post-hospitalisation" />;
}
