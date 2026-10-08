import type { Metadata } from "next";
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from "@content/blog";
import { content } from "@/lib/content";
import { toWhatsAppHref } from "@/lib/phone";
import { paths } from "@/lib/urls";
import { pageMetadata } from "@/lib/seo";
import { postsByDate } from "@/lib/blog";
import { countWords } from "@content/thresholds";
import { EMERGENCY_NUMBERS } from "@/lib/emergency";
import { JsonLd } from "@/components/JsonLd";
import { Prose, frenchSpacing } from "@/components/Prose";
import { FaqBlock } from "@/components/FaqBlock";
import { CallBanner } from "@/components/CallBanner";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs, CardLink, Section } from "@/components/ui";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { buildArticle } from "@/lib/schema-org/article";

/**
 * The guides (/conseils), French only.
 *
 * Each guide opens with the same call-first hero as the service pages: a
 * reader who arrives on "certificat de convalescence" at 9pm is one tap from
 * a doctor. Then the text, a call banner, the FAQ (with FAQPage JSON-LD), and
 * the service pages the guide leads to.
 */

const INDEX_TITLE = "Conseils et guides pratiques";
const INDEX_DESCRIPTION =
  "Certificats médicaux, médecin de garde, fièvre de l'enfant, ECG, ambulance, tarifs : nos guides pratiques pour savoir qui appeler et quoi préparer.";

const dateFr = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const readingMinutes = (p: BlogPost) =>
  Math.max(1, Math.round(countWords([p.intro, p.body].join(" ")) / 200));

export function blogIndexMetadata(): Metadata {
  return pageMetadata({ title: "Conseils santé à domicile", description: INDEX_DESCRIPTION, path: paths.blogIndex() });
}

export function BlogIndexPage() {
  const byCategory = (Object.keys(BLOG_CATEGORIES) as BlogCategory[])
    .map((c) => ({ category: c, posts: postsByDate.filter((p) => p.category === c) }))
    .filter((g) => g.posts.length > 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: INDEX_TITLE, path: paths.blogIndex() },
        ])}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: INDEX_TITLE }]} />
      <h1 className="mt-6 text-[clamp(1.9rem,1.4rem+2vw,2.75rem)] font-black leading-tight tracking-tight text-ink">
        {INDEX_TITLE}
      </h1>
      <p className="mt-3 max-w-[62ch] text-lg text-ink-muted">
        Qui appeler la nuit, comment obtenir un certificat, ce que coûte une visite, quoi préparer avant l’arrivée du
        médecin : des réponses concrètes, sans jargon. Ces guides donnent des informations générales et ne remplacent pas
        l’avis d’un médecin.
      </p>

      {byCategory.map(({ category, posts }) => (
        <Section key={category} title={BLOG_CATEGORIES[category]}>
          <div className="grid gap-3 sm:grid-cols-2">
            {posts.map((p) => (
              <CardLink key={p.slug} href={paths.blogPost(p.slug)} title={p.title} description={p.description} />
            ))}
          </div>
        </Section>
      ))}

      <CallBanner />
    </main>
  );
}

export function blogPostMetadata(post: BlogPost): Metadata {
  return pageMetadata({ title: post.metaTitle, description: post.description, path: paths.blogPost(post.slug) });
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const { business, pricing } = content;
  const others = postsByDate.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 4);
  const { samu, protectionCivile } = EMERGENCY_NUMBERS;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildArticle(post),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: INDEX_TITLE, path: paths.blogIndex() },
            { name: post.title, path: paths.blogPost(post.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        trail={[
          { href: paths.home(), label: "Accueil" },
          { href: paths.blogIndex(), label: "Conseils" },
          { label: BLOG_CATEGORIES[post.category] },
        ]}
      />
      <PageHero
        title={frenchSpacing(post.title)}
        lead={frenchSpacing(post.intro)}
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        whatsappHref={toWhatsAppHref(business.whatsappNumber)}
        facts={[
          { label: "Arrivée du médecin", value: `${business.defaultResponseTimeMinutes} min` },
          { label: "Consultation", value: `dès ${pricing.tiers[0]?.amountMad} ${pricing.currency}` },
          { label: "Disponibilité", value: "24h/24" },
        ]}
      />

      <p className="mt-6 text-sm text-ink-muted">
        Guide rédigé par l’équipe {business.legalName} · publié le {dateFr(post.published)}
        {post.updated ? ` · mis à jour le ${dateFr(post.updated)}` : ""} · {readingMinutes(post)} min de lecture
      </p>
      <p className="mt-3 max-w-[68ch] rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-ink-muted">
        Information générale : ce guide ne remplace pas l’avis d’un médecin. En cas d’urgence vitale, appelez le{" "}
        <a href={`tel:${samu.number}`} data-tap="secours" className="font-bold text-ink underline">
          {samu.number}
        </a>{" "}
        (SAMU) ou le{" "}
        <a href={`tel:${protectionCivile.number}`} data-tap="secours" className="font-bold text-ink underline">
          {protectionCivile.number}
        </a>{" "}
        (Protection civile).
      </p>

      <article className="mt-8 max-w-[72ch]">
        <Prose text={post.body} />
      </article>

      <CallBanner />

      <FaqBlock entries={post.faq} />

      <Section title="Pour aller plus loin">
        <div className="grid gap-3 sm:grid-cols-2">
          {post.links.map((l) => (
            <CardLink key={l.href} href={l.href} title={l.label} />
          ))}
        </div>
      </Section>

      {others.length > 0 && (
        <Section title="Autres guides">
          <div className="grid gap-3 sm:grid-cols-2">
            {others.map((p) => (
              <CardLink key={p.slug} href={paths.blogPost(p.slug)} title={p.title} description={p.description} />
            ))}
          </div>
        </Section>
      )}
    </main>
  );
}
