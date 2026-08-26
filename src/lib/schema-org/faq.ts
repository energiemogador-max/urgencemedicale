import type { FAQPage, WithContext } from "schema-dts";

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Builder ready for Phase 5: no template currently has an FAQ content block
 * (situations.ts / specialties.ts don't model one yet), so this isn't wired
 * into any page yet — "FAQPage wherever an FAQ block appears" is conditional
 * on that content existing. Call this once a page actually renders FAQ copy.
 */
export function buildFaqPage(entries: FaqEntry[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: e.answer,
      },
    })),
  };
}
