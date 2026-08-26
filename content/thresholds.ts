/**
 * Minimum unique-content thresholds per page template (Phase 2 rule: "Define
 * a minimum unique-content threshold and ENFORCE IT AT BUILD TIME"). Counted
 * against each template's own prose fields only (intro + body, plus the
 * quartier's landmarks/hospitals/access notes) — never shared boilerplate
 * like nav, footer, or trust-block text, since that would let thin pages
 * hide behind site chrome.
 *
 * These numbers are a starting proposal, not a law of nature — revisit once
 * real Phase 5 drafts show what each template naturally supports.
 */
export const MIN_WORDS = {
  cityHub: 350,
  quartier: 300,
  specialtyHub: 350,
  citySpecialty: 250,
  situation: 450,
  situationCity: 220,
} as const;

export type ContentTemplate = keyof typeof MIN_WORDS;

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
}
