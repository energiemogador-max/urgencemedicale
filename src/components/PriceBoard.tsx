import type { Pricing } from "@content/schema";
import { CrescentMark } from "@/components/CrescentMark";

/**
 * The two consultation tariffs, as two large price cards.
 *
 * WHY NOT A TABLE
 *
 * It was a three-column table. On a 390px phone the column heads ran together
 * ("CONSULTATIONHORAIRE") and the labels broke one word per line, on the one
 * block that sets this service apart: its prices are published and most
 * competitors' are not. A price someone has to squint at does not work as an
 * argument.
 *
 * The night card is navy with the crescent, which is also the moon, and a
 * reader can tell the two rates apart before reading a word. Every value
 * comes from content/pricing.ts; the card never computes or rounds anything.
 *
 * Pure presentational: pricing and phone are passed in, so this can be used
 * on any page without importing the whole content layer into it.
 */
export function PriceBoard({
  pricing,
  phoneDisplay,
  phoneHref,
  tap,
}: {
  pricing: Pricing;
  phoneDisplay: string;
  phoneHref: string;
  /** `data-tap` label for the call link, so the dashboard can attribute it. */
  tap: string;
}) {
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {pricing.tiers.map((t) => {
          const night = t.slug.includes("nuit");
          return (
            <li
              key={t.slug}
              className={`relative isolate overflow-hidden rounded-2xl p-5 sm:p-6 ${
                night ? "bg-primary text-on-primary" : "border border-border bg-surface text-ink"
              }`}
            >
              {night ? (
                <CrescentMark className="pointer-events-none absolute -right-6 -top-6 -z-10 h-32 w-32 text-white/[0.08]" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-5 -top-5 -z-10 h-28 w-28 text-primary/[0.07]"
                >
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <path
                    d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              <p className={`text-sm font-bold ${night ? "text-on-primary" : "text-ink"}`}>{t.label}</p>
              <p className={`mt-0.5 text-sm ${night ? "text-on-primary-muted" : "text-ink-muted"}`}>{t.window}</p>

              <p
                className={`mt-5 flex items-baseline gap-2 border-t border-dashed pt-4 ${
                  night ? "border-white/25" : "border-border"
                }`}
              >
                <span
                  className={`text-5xl font-black leading-none tracking-tight tabular-nums ${
                    night ? "text-white" : "text-primary"
                  }`}
                >
                  {t.amountMad}
                </span>
                <span className={`text-lg font-black ${night ? "text-call-bright" : "text-call-ink"}`}>
                  {pricing.currency}
                </span>
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          Le tarif applicable vous est <strong className="text-ink">confirmé au téléphone, avant la visite</strong>.
          Il ne change pas à l&apos;arrivée du médecin.
        </p>
        <a
          href={`tel:${phoneHref}`}
          data-tap={tap}
          className="flex shrink-0 items-center justify-center gap-2.5 rounded-xl bg-call px-4 py-2.5 font-black text-white no-underline transition-colors hover:bg-call-dark"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
          </svg>
          <span className="tabular-nums" dir="ltr">
            {phoneDisplay}
          </span>
        </a>
      </div>
    </div>
  );
}
