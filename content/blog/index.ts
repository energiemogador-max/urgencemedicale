import { countWords } from "../thresholds";
import type { BlogPost } from "./types";
import { CERTIFICAT_POSTS } from "./posts-certificats";
import { GARDE_POSTS } from "./posts-garde";
import { SOINS_POSTS } from "./posts-soins";
import { TRANSPORT_POSTS } from "./posts-transport";

export type { BlogPost, BlogCategory } from "./types";
export { BLOG_CATEGORIES } from "./types";

export const BLOG_POSTS: BlogPost[] = [...CERTIFICAT_POSTS, ...GARDE_POSTS, ...SOINS_POSTS, ...TRANSPORT_POSTS];

/** A guide is long-form: anything shorter is a thin page in a YMYL niche. */
export const BLOG_MIN_WORDS = 800;
const TITLE_MAX = 43;
const DESC_MAX = 155;

/** Every internal link a guide makes, in its body and its link cards. */
export function blogLinks(post: BlogPost): string[] {
  const inline = [...post.body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1] ?? "");
  return [...inline, ...post.links.map((l) => l.href)];
}

/**
 * Checks that need no knowledge of the page registry. Whether each link
 * points at a real page is checked by src/lib/blog.ts, which has the registry.
 */
export function validateBlog(posts: BlogPost[] = BLOG_POSTS): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const p of posts) {
    const at = `blog.${p.slug}`;
    if (seen.has(p.slug)) errors.push(`${at}: duplicate slug`);
    seen.add(p.slug);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errors.push(`${at}: slug must be lowercase-hyphenated`);
    if (p.metaTitle.length > TITLE_MAX) errors.push(`${at}: metaTitle is ${p.metaTitle.length} chars, max ${TITLE_MAX}`);
    if (p.description.length > DESC_MAX) errors.push(`${at}: description is ${p.description.length} chars, max ${DESC_MAX}`);
    if (!/[.!?]$/.test(p.description)) errors.push(`${at}: description must end with a full sentence`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.published)) errors.push(`${at}: published must be YYYY-MM-DD`);
    const words = countWords([p.intro, p.body, ...p.faq.flatMap((f) => [f.question, f.answer])].join(" "));
    if (words < BLOG_MIN_WORDS) errors.push(`${at}: only ${words} words, needs at least ${BLOG_MIN_WORDS}`);
    if (p.faq.length < 2) errors.push(`${at}: needs at least 2 FAQ entries`);
    if (p.links.length === 0) errors.push(`${at}: needs at least one service page link`);
    for (const href of blogLinks(p)) {
      if (!href.startsWith("/") || href.includes("//")) errors.push(`${at}: link "${href}" must be a site path`);
    }
  }
  return errors;
}
