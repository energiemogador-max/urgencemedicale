import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, FactPill, Lead } from "@/components/ui";
import { homeFaqs } from "@/lib/faqs";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "À propos", description: content.aboutPage.intro, path: paths.aPropos() });
}

export default function Page() {
  const { business, aboutPage, pricing } = content;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: "À propos", path: paths.aPropos() },
        ])}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: "À propos" }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">À propos de {business.legalName}</h1>
      <Lead>{aboutPage.intro}</Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <FactPill label="Disponibilité" value={business.hoursOpen} />
        <FactPill label="Intervention" value={`${business.defaultResponseTimeMinutes} minutes`} />
        <FactPill label="Consultation" value={`${pricing.tiers[0]?.amountMad} ${pricing.currency}`} />
      </div>

      <div className="mt-8">
        <Prose text={aboutPage.body} />
      </div>

      <FaqBlock entries={homeFaqs()} />
      <CallBanner />

    </main>
  );
}
