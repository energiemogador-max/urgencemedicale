/**
 * The canonical host. Apex, no `www` — this must match the Custom domain
 * attached to the Worker in Cloudflare, which is `urgencemedicale.ma`. Every
 * canonical tag, all 139 sitemap URLs, the robots.txt Sitemap line and every
 * JSON-LD @id derive from this constant, so a mismatch here means Google
 * crawls one host and is told the content lives on another.
 *
 * If this ever moves to `www`, the www hostname needs its own Custom domain
 * entry on the Worker and the apex needs a redirect to it — changing this
 * string alone is not enough.
 */
export const SITE_URL = "https://urgencemedicale.ma";

/**
 * The bare domain, for display in the UI (hero, footer). Derived from
 * SITE_URL so the two can never disagree.
 *
 * NOTE: the operator's vehicle livery and hero artwork read
 * "urgencemedical.ma" (no trailing "e"). They confirmed the site should keep
 * this spelling, so the printed assets are the ones that will need updating.
 */
export const SITE_DOMAIN = new URL(SITE_URL).hostname.replace(/^www\./, "");

/**
 * Display brand name derived from the domain itself — not a business fact.
 * `content.business.legalName` (content/business.ts, a required placeholder)
 * remains the authoritative legal name for schema.org and the footer.
 */
export const SITE_NAME = "Urgence Médicale";

/**
 * The last day the text of the pages changed, for the sitemap's <lastmod>.
 *
 * It used to be the build time. The site rebuilds every day for the
 * pharmacies de garde, so all 372 URLs claimed to have changed every day,
 * and Google stops trusting a sitemap whose dates are always "today" — the
 * very signal that should send it back to a page that did change. Bump this
 * by hand when an edit changes what the pages say; the pharmacy page and the
 * guides carry their own dates (see app/sitemap.ts).
 */
export const CONTENT_UPDATED = "2026-11-12";
