export const SITE_URL = "https://www.urgencemedicale.ma";

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
