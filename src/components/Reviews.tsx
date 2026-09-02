import { content } from "@/lib/content";
import { Section } from "@/components/ui";

/**
 * Patient reviews, server-rendered from content/reviews.ts.
 *
 * Renders NOTHING when there are no reviews — not an empty section, not a
 * "be the first to review us" prompt. A trust block with no trust in it is
 * worse than no trust block.
 *
 * See content/reviews.ts for why this is transcribed rather than an embedded
 * widget, and content/schema.ts (ReviewSchema) for why it deliberately emits
 * no Review/AggregateRating JSON-LD.
 */

const dateFr = new Intl.DateTimeFormat("fr-MA", { day: "numeric", month: "long", year: "numeric" });

/**
 * Five stars with `rating` filled.
 *
 * The empty star is an OUTLINE in the same gold, not a grey fill. Grey was the
 * first attempt and it fails two ways: #9fb6c9 on white is 2.10:1, under the
 * 3:1 WCAG 1.4.11 floor for a graphic that carries meaning, and gold-vs-grey
 * is only 1.46:1, so "4 stars" and "5 stars" are nearly the same image to a
 * colour-blind reader. Outline-vs-solid separates them by shape, which
 * survives any colour vision, and keeps both shapes on the one gold that does
 * clear 3:1.
 *
 * Each star is its own element so the accessible name can sit on the group
 * while the shapes stay aria-hidden — a screen reader reads "Note : 4 sur 5",
 * not five separate stars.
 */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-star" role="img" aria-label={`Note : ${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="currentColor">
            <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.6z" />
          </svg>
        ) : (
          <svg
            key={i}
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          >
            <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.6z" />
          </svg>
        )
      )}
    </span>
  );
}

export function Reviews() {
  const { reviews, business } = content;
  if (reviews.length === 0) return null;

  const listing = business.profiles[0];

  return (
    <Section
      title="Avis de patients"
      lead="Publiés par les patients sur notre fiche Google, reproduits ici mot pour mot."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {reviews.map((r) => (
          <li key={`${r.author}-${r.date}`} className="rounded-xl border border-border bg-surface p-5">
            <Stars rating={r.rating} />
            <blockquote className="mt-3 text-ink" lang={r.lang}>
              {r.text}
            </blockquote>
            <p className="mt-3 text-sm text-ink-muted">
              <span className="font-semibold text-ink">{r.author}</span>
              {" — "}
              <time dateTime={r.date}>{dateFr.format(new Date(`${r.date}T12:00:00Z`))}</time>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm text-ink-muted">
        {listing && (
          <a href={listing} target="_blank" rel="noopener noreferrer">
            Consulter la fiche Google
          </a>
        )}
        {listing && business.reviewUrl && " · "}
        {business.reviewUrl && (
          <a href={business.reviewUrl} target="_blank" rel="noopener noreferrer">
            Laisser un avis
          </a>
        )}
      </p>
    </Section>
  );
}
