import type { Metadata } from "next";
import { NumerosUrgencePage, numerosUrgenceMetadata } from "@/components/pages/StaticPages";

/** /numeros-urgence-maroc in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return numerosUrgenceMetadata("fr");
}

export default function Page() {
  return <NumerosUrgencePage locale="fr" />;
}
