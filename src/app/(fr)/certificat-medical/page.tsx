import type { Metadata } from "next";
import { SituationRoute, situationMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return situationMetadata("certificat-medical");
}

export default function Page() {
  return <SituationRoute situationSlug="certificat-medical" />;
}
