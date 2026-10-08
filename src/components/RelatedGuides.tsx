import type { Locale } from "@/lib/i18n";
import { guidesFor } from "@/lib/blog";
import { paths } from "@/lib/urls";
import { CardLink, Section } from "@/components/ui";

/**
 * The guides (/conseils) that lead to this page, listed on it, so the linking
 * runs both ways: guide → service page, and service page → guide. French
 * only, like the guides themselves.
 */
export function RelatedGuides({ path, locale = "fr" }: { path: string; locale?: Locale }) {
  if (locale !== "fr") return null;
  const guides = guidesFor(path);
  if (guides.length === 0) return null;
  return (
    <Section title="Guides pratiques">
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <CardLink key={g.slug} href={paths.blogPost(g.slug)} title={g.title} description={g.description} />
        ))}
      </div>
    </Section>
  );
}
