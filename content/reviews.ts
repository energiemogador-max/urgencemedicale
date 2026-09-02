import type { Review } from "./schema";

/**
 * Patient reviews, transcribed by hand from the Google Business Profile.
 *
 * WHY TRANSCRIBED AND NOT A WIDGET
 *
 * The obvious implementation is an embedded Google/Elfsight/Trustindex
 * widget. All of them were rejected for this site, for reasons that are
 * specific to it rather than general:
 *
 *  - This is a static export behind a strict CSP that allows no external
 *    script or style origins. A third-party widget would need that policy
 *    reopened — on a site whose whole purpose is a phone number.
 *  - Every such widget is client-side: it renders after JavaScript, so the
 *    reviews are invisible to a crawler reading the HTML, and it adds a
 *    third-party round-trip to a page with a 1.8s LCP budget on 4G. The
 *    reviews would cost real load time and contribute nothing to indexing.
 *  - The Google Places API returns at most 5 reviews, needs a billed API key
 *    exposed in the client, and cannot be called at build time from a key
 *    that is safe to publish.
 *
 * Transcribing costs two minutes per review, renders server-side in the HTML,
 * adds zero bytes of JavaScript, and is the only version a crawler can read.
 *
 * RULES FOR EDITING THIS FILE
 *
 *  1. Copy the text VERBATIM from the Google review. Do not tidy the spelling,
 *     do not translate, do not shorten, do not merge two reviews. If a review
 *     is in Darija or Arabic, paste it as written and set `lang`.
 *  2. Never write a review that was not left by a real patient on Google. This
 *     is a medical service: invented reviews are fraud, not marketing, and
 *     Google removes listings for it.
 *  3. Abbreviate the surname (`Fatima Z.`). The full name is public on Google,
 *     but reproducing it next to a medical service on our own site is a
 *     needless disclosure. First name plus initial is enough to be verifiable
 *     against the listing.
 *  4. `date` is the review's own date on Google, ISO format.
 *
 * An empty array renders nothing at all — no empty section, no "no reviews
 * yet" placeholder. That is the correct state until the text is pasted in.
 */
export const reviews: Review[] = [
  // Two reviews exist on the Google Business Profile as of 2026-09-02.
  // Paste each one here, verbatim, in this shape:
  //
  // {
  //   author: "Prénom N.",
  //   rating: 5,
  //   date: "2026-08-14",
  //   text: "…exactly what the patient wrote on Google, unedited…",
  // },
];
