import type { Metadata } from "next";
import { PharmacieGardePage, pharmacieGardeMetadata } from "@/components/pages/PharmacieGardePage";

/** /pharmacie-de-garde-casablanca in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return pharmacieGardeMetadata("fr");
}

export default function Page() {
  return <PharmacieGardePage locale="fr" />;
}
