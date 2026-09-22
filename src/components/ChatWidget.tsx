import { localizedPath, type Locale } from "@/lib/i18n";
import { paths } from "@/lib/urls";
import { dict } from "@/lib/dictionaries";
import { chatWidgetScript } from "@/lib/chat-widget";

/**
 * The mascot mark used everywhere this widget needs to say "this is AI, not
 * a person" — as the launcher button's own face, and again, small, next to
 * the panel title. A generic chat bubble reads as "customer support" to
 * most people; this mark is the deliberate signal on top of the title text
 * itself already saying "IA"/"AI"/"ذكاء اصطناعي": never let a visitor
 * mistake a bot's words for a person's, or for medical advice given by one.
 *
 * Source: assistantAI.png (1254², supplied), cropped to its circular content
 * and re-exported at 96/192/288px WebP — 5.7KB/13KB/21KB, in the same family
 * as the site's own mark-96/mark-192 (see SiteHeader). The original PNG
 * stays out of the repo; only the sizes actually served are committed.
 *
 * Sized entirely through `className` (Tailwind's own height/width scale,
 * including md: variants), never a fixed pixel prop — a badge that reads
 * fine on a phone reads as an afterthought on a desktop screen with far
 * more room and no thumb to reach it, so every call site below sizes up at
 * `md:`. `sizes` mirrors that same breakpoint so the browser actually
 * fetches the sharper source once the badge is displayed larger, rather
 * than upscaling the small one.
 */
function AiMark({ className, sizes }: { className: string; sizes: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/assistant-ai-96.webp"
      srcSet="/images/assistant-ai-96.webp 96w, /images/assistant-ai-192.webp 192w, /images/assistant-ai-288.webp 288w"
      sizes={sizes}
      width={96}
      height={96}
      alt=""
      decoding="async"
      className={className}
    />
  );
}

/**
 * The floating assistant, present on every page (mounted once from
 * SiteChrome, like the tap tracker and the live clock).
 *
 * WHAT IT IS AND ISN'T
 *
 * It answers practical questions about the service — cities covered, fees,
 * how a visit works — and it never diagnoses, never names a medicine, never
 * suggests a treatment. Those rules live in the system prompt the Worker
 * sends (worker/chat.js), not here; this component only renders the box the
 * conversation happens in and the button that calls a real doctor.
 *
 * That button — {t.callCta} — is the actual point of the widget. Someone
 * who opens a chat window at 2am wants a doctor, and the shortest path to
 * one is a single tap that dials the number, not a good answer from a bot.
 * It carries the SAME data-tap surface a normal call button would (no
 * "assistant" prefix): a call placed from here is a real conversion and
 * must count as one.
 *
 * NO REACT RUNTIME: this is a static export (see strip-runtime.ts) — the
 * interactivity is a single inline script, in the same family as the live
 * clock, the tap tracker and the pharmacy-page filter.
 */
export function ChatWidget({
  locale = "fr",
  phoneDisplay,
  phoneHref,
}: {
  locale?: Locale;
  phoneDisplay: string;
  phoneHref: string;
}) {
  const t = dict(locale).chat;

  // A translated string could contain "</script" (unlikely, but a future
  // edit could introduce one); escaping every "<" keeps the HTML parser
  // from ever treating it as the end of this script element.
  const textJson = JSON.stringify(t).replace(/</g, "\\u003c");

  return (
    <div id="chat-widget" className="print:hidden">
      <script
        id="chat-widget-text"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: textJson }}
      />

      <button
        id="chat-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="chat-panel"
        aria-label={t.toggleLabel}
        className="fixed bottom-[5.75rem] end-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-[0_6px_20px_rgba(11,28,51,0.35)] active:bg-primary-dark md:bottom-6 md:end-6 md:h-20 md:w-20"
      >
        <AiMark className="h-12 w-12 rounded-full md:h-16 md:w-16" sizes="(min-width: 768px) 64px, 48px" />
      </button>

      <div
        id="chat-panel"
        role="dialog"
        aria-modal="false"
        aria-label={t.title}
        hidden
        className="fixed bottom-[9.5rem] end-3 start-3 z-40 flex max-h-[min(32rem,70vh)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_12px_36px_rgba(11,28,51,0.35)] md:bottom-28 md:start-auto md:end-6 md:w-[380px]"
      >
        <div className="flex shrink-0 items-start justify-between gap-2 border-b border-border bg-primary px-4 py-3 text-on-primary">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 truncate font-bold">
              <AiMark className="h-6 w-6 shrink-0 rounded-full md:h-7 md:w-7" sizes="28px" />
              {t.title}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-on-primary-muted">
              {t.disclaimer}{" "}
              <a href={localizedPath(paths.assistantIa(), locale)} className="underline">
                {t.learnMore}
              </a>
            </p>
          </div>
          <button
            id="chat-close"
            type="button"
            aria-label={t.closeLabel}
            className="shrink-0 rounded-md p-1 text-on-primary-muted hover:bg-primary-dark hover:text-on-primary"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div id="chat-log" className="flex-1 space-y-2.5 overflow-y-auto p-3"></div>

        <div className="shrink-0 border-t border-border p-3">
          <a
            href={`tel:${phoneHref}`}
            data-tap="chat"
            className="mb-2.5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-call px-4 text-sm font-bold text-white active:bg-call-dark"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
            </svg>
            {t.callCta}
            <span dir="ltr" className="font-mono text-[0.85em] opacity-90">
              {phoneDisplay}
            </span>
          </a>
          <form id="chat-form" className="flex items-end gap-2">
            <textarea
              id="chat-input"
              rows={1}
              placeholder={t.placeholder}
              className="min-h-11 flex-1 resize-none rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink"
            />
            <button
              id="chat-send"
              type="submit"
              aria-label={t.send}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary active:bg-primary-dark disabled:opacity-50"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 rtl:-scale-x-100">
                <path d="M3 11.5 20.5 3l-6 17-3.5-7-8-1.5z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: chatWidgetScript(locale) }} />
    </div>
  );
}
