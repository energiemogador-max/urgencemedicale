import type { Metadata } from "next";
import { SpecialtyHubRoute, specialtyHubMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return specialtyHubMetadata("cardiologue");
}

export default function Page() {
  return <SpecialtyHubRoute specialtySlug="cardiologue" />;
}
