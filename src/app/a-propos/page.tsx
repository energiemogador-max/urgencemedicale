import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function generateMetadata(): Metadata {
  return {
    title: "À propos",
    description: content.aboutPage.intro,
    alternates: { canonical: paths.aPropos() },
  };
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: "À propos", path: paths.aPropos() },
        ])}
      />
      <h1 className="text-3xl font-bold text-ink">À propos de {content.business.legalName}</h1>
      <p className="mt-2 text-lg">{content.aboutPage.intro}</p>
      <TrustBlock {...getTrustBlockProps()} />
      <div className="mt-8 whitespace-pre-line">{content.aboutPage.body}</div>
    </main>
  );
}
