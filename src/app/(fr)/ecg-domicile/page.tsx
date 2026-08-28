import type { Metadata } from "next";
import { SituationRoute, situationMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return situationMetadata("ecg-domicile");
}

export default function Page() {
  return <SituationRoute situationSlug="ecg-domicile" />;
}
