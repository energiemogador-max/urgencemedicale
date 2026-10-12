import { api } from "@/lib/locale-content";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { Section } from "@/components/ui";

/**
 * Patient reviews, server-rendered from content/reviews.ts.
 *
 * With no review transcribed, it does not show an empty "be the first to
 * review us" section. It shows the Google listing itself: the business has a
 * real profile with real reviews on it (operator, 2026-10-12: "have you added
 * our business to our website front"), and until this block existed the
 * homepage linked to it nowhere a visitor could see. Two links, no rating and
 * no review count, since none is transcribed here to back one up.
 *
 * See content/reviews.ts for why this is transcribed rather than an embedded
 * widget, and content/schema.ts (ReviewSchema) for why it deliberately emits
 * no Review/AggregateRating JSON-LD.
 */


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
function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5 text-star" role="img" aria-label={label}>
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

/** Google's "G", drawn inline: no external image or font request. */
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5 shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.5z" />
      <path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export function Reviews({ locale = "fr" }: { locale?: Locale }) {
  const { reviews, business } = api(locale).content;
  const t = dict(locale);
  const date = new Intl.DateTimeFormat(t.reviews.dateLocale, { day: "numeric", month: "long", year: "numeric" });
  const listing = business.profiles[0];

  if (reviews.length === 0) {
    if (!listing && !business.reviewUrl) return null;
    return (
      <Section title={t.reviews.inviteTitle} lead={t.reviews.inviteLead}>
        <div className="flex flex-col gap-3 sm:flex-row">
          {listing && (
            <a
              href={listing}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 font-bold text-primary no-underline hover:bg-primary-tint"
            >
              <GoogleG />
              {t.reviews.googleListing}
            </a>
          )}
          {business.reviewUrl && (
            <a
              href={business.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white no-underline hover:bg-primary-dark"
            >
              <span aria-hidden="true" className="text-star">
                ★
              </span>
              {t.reviews.leaveReview}
            </a>
          )}
        </div>
      </Section>
    );
  }

  return (
    <Section
      title={t.reviews.title}
      lead={t.reviews.lead}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {reviews.map((r) => (
          <li key={`${r.author}-${r.date}`} className="rounded-xl border border-border bg-surface p-5">
            <Stars rating={r.rating} label={t.reviews.rating(r.rating)} />
            <blockquote className="mt-3 text-ink" lang={r.lang}>
              {r.text}
            </blockquote>
            <p className="mt-3 text-sm text-ink-muted">
              <span className="font-semibold text-ink">{r.author}</span>
              {" — "}
              <time dateTime={r.date}>{date.format(new Date(`${r.date}T12:00:00Z`))}</time>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm text-ink-muted">
        {listing && (
          <a href={listing} target="_blank" rel="noopener noreferrer">
            {t.reviews.googleListing}
          </a>
        )}
        {listing && business.reviewUrl && " · "}
        {business.reviewUrl && (
          <a href={business.reviewUrl} target="_blank" rel="noopener noreferrer">
            {t.reviews.leaveReview}
          </a>
        )}
      </p>
    </Section>
  );
}
