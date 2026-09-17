import type { Metadata } from "next";
import { HomePage, homeMetadata } from "@/components/pages/HomePage";

/** The French homepage. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return homeMetadata("fr");
}

export default function Page() {
  return <HomePage locale="fr" />;
}
