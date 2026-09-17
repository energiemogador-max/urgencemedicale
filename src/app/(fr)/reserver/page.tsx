import type { Metadata } from "next";
import { ReserverPage, reserverMetadata } from "@/components/pages/StaticPages";

/** /reserver in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return reserverMetadata("fr");
}

export default function Page() {
  return <ReserverPage locale="fr" />;
}
