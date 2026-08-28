import type { Metadata } from "next";
import { isUnconfirmed } from "@content/schema";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, Lead, Section } from "@/components/ui";
import { buildPhysician } from "@/lib/schema-org/physician";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "Nos médecins", description: "Les médecins qui interviennent à domicile, avec leur numéro d'inscription à l'Ordre National des Médecins.", path: paths.nosMedecins() });
}

export default function Page() {
  const { doctors, specialties } = content;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          ...doctors.map(buildPhysician),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: "Nos médecins", path: paths.nosMedecins() },
          ]),
        ]}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: "Nos médecins" }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">Nos médecins</h1>
      <Lead>
        Chaque médecin qui se déplace chez vous est nommément identifié et inscrit à l&apos;Ordre National des
        Médecins. Son numéro d&apos;inscription est public et vérifiable.
      </Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <Section title="L'équipe">
        <ul className="grid gap-4">
          {doctors.map((d) => (
            <li key={d.slug} className="rounded-lg border border-border bg-surface p-5">
              <h3 className="text-xl font-bold text-ink">{d.name}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="rounded-full bg-primary-tint px-2.5 py-0.5 font-semibold text-primary">
                  {specialties.find((s) => s.slug === d.specialtySlug)?.name}
                </span>
                {!isUnconfirmed(d.ordreNumber) && (
                  <span className="text-ink-muted">Ordre National des Médecins n° {d.ordreNumber}</span>
                )}
              </div>
              <p className="mt-3 max-w-[68ch] text-ink-muted">{d.bio}</p>
              <p className="mt-2 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Langues :</span> {d.languages.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <CallBanner label={"Un de nos médecins peut venir chez vous"} />

    </main>
  );
}
