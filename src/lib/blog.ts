import { BLOG_POSTS, blogLinks, validateBlog, type BlogPost } from "@content/blog";
import { allPages } from "@/lib/page-registry";

/**
 * The guides, checked at module scope like the rest of the content
 * (src/lib/content.ts): a guide with a link to a page that does not exist, or
 * that fails the content gate, fails `next build` instead of shipping a 404.
 */
function assertBlogValid(): BlogPost[] {
  const known = new Set(allPages().map((p) => p.path));
  const errors = validateBlog();
  for (const post of BLOG_POSTS) {
    for (const href of blogLinks(post)) {
      if (!known.has(href)) errors.push(`blog.${post.slug}: link to "${href}", which is not a page on this site`);
    }
  }
  if (errors.length > 0) throw new Error(`Guides (/conseils) are invalid:\n  - ${errors.join("\n  - ")}`);
  return BLOG_POSTS;
}

export const posts = assertBlogValid();

/** Newest first; ties keep the authored order. */
export const postsByDate = [...posts].sort((a, b) => b.published.localeCompare(a.published));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/**
 * Guides that lead to this page, or to its parent hub: a guide linking to
 * /medecin-de-garde is also listed on /medecin-de-garde/casablanca. That is
 * what makes the linking two-way without anyone maintaining a second list.
 */
export function guidesFor(path: string, limit = 4): BlogPost[] {
  const matches = (href: string) => href === path || (href !== "/" && path.startsWith(`${href}/`));
  return posts.filter((p) => p.links.some((l) => matches(l.href))).slice(0, limit);
}
