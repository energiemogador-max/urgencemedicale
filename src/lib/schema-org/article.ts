import type { Article, WithContext } from "schema-dts";
import type { BlogPost } from "@content/blog";
import { SITE_URL } from "@/lib/site";
import { paths } from "@/lib/urls";
import { BUSINESS_ID } from "@/lib/schema-org/business";

/**
 * Article for a guide. Author and publisher are the business itself, by
 * reference to the MedicalBusiness node: the guides are written by the team,
 * and naming a doctor as author of a text no doctor signed would be an
 * invented credential.
 */
export function buildArticle(post: BlogPost): WithContext<Article> {
  const url = `${SITE_URL}${paths.blogPost(post.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    inLanguage: "fr-MA",
    mainEntityOfPage: url,
    url,
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
    image: `${SITE_URL}/opengraph-image`,
  };
}
