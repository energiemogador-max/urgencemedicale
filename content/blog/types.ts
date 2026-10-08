/**
 * A guide in the /conseils section.
 *
 * French only: the guides answer the questions Search Console shows people in
 * Morocco typing (certificates, garde, fees, ambulance, ECG…), and they exist
 * to send those readers to the service pages. They are not translated, so they
 * carry no hreflang and never appear under /en or /ar.
 *
 * `body` uses the Prose format (src/components/Prose.tsx): blank lines between
 * paragraphs, `**Heading**` on its own line for a section, `- ` lines for a
 * list, and `[label](/path)` for an internal link. Every link must point at a
 * page that exists (checked at build by src/lib/blog.ts).
 *
 * Same rules as every page on the site: no medical advice (symptoms route to a
 * doctor or to the emergency numbers), no figure, price or claim that the
 * service pages do not already make.
 */
export interface BlogPost {
  slug: string;
  /** The H1, written for the reader. */
  title: string;
  /** The <title>; 43 characters at most so the phone number still fits (src/lib/seo.ts). */
  metaTitle: string;
  /** 155 characters at most, complete sentences. */
  description: string;
  /** ISO dates. */
  published: string;
  updated?: string;
  category: BlogCategory;
  /** The opening paragraph: the answer, first. */
  intro: string;
  body: string;
  faq: { question: string; answer: string }[];
  /**
   * The service pages this guide leads to. Shown as cards under the guide, and
   * used the other way round: a service page lists the guides that point at it
   * (or at its parent hub).
   */
  links: { href: string; label: string }[];
}

export type BlogCategory = "certificats" | "garde-urgences" | "soins-examens" | "transport" | "pratique";

export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
  certificats: "Certificats et démarches",
  "garde-urgences": "Médecin de garde et urgences",
  "soins-examens": "Soins et examens à domicile",
  transport: "Ambulance et transport",
  pratique: "Infos pratiques",
};
