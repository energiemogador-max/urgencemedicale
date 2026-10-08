import type { Metadata } from "next";
import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/BlogPages";

/** /conseils — the guides, French only. */
export function generateMetadata(): Metadata {
  return blogIndexMetadata();
}

export default function Page() {
  return <BlogIndexPage />;
}
