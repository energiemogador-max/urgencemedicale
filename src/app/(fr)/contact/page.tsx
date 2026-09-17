import type { Metadata } from "next";
import { ContactPage, contactMetadata } from "@/components/pages/StaticPages";

/** /contact in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return contactMetadata("fr");
}

export default function Page() {
  return <ContactPage locale="fr" />;
}
