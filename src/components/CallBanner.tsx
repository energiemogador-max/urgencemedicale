import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { api } from "@/lib/locale-content";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { EcgTrace, LiveryBand } from "@/components/Livery";

/**
 * Mid-page call-to-action.
 *
 * A live competitor sweep (2026-08-28) counted tap-to-call links per page:
 * sosmedecinmaroc.com 15, soins-a-domicile.ma 7, sosmedecincasa.com 7 — and
 * this site 3, all of them in the chrome (header, hero, footer). On a page
 * someone scrolls through at 2am, the number needs to be reachable from
 * wherever they stop reading, not only at the ends.
 *
 * It sits after the body prose on every template: the reader has just been
 * told how the visit works, which is the moment they decide.
 *
 * Deliberately a plain <a>, not a button — it must work with JavaScript off,
 * and it is the same tel: href the header uses so a tap is a tap regardless
 * of where it happens.
 */
export function CallBanner({ label, text, locale = "fr" }: { label?: string; text?: string; locale?: Locale }) {
  const { business } = api(locale).content;
  const t = dict(locale);

  return (
    <aside className="relative isolate mt-12 overflow-hidden rounded-3xl bg-primary px-5 pb-8 pt-6 sm:px-8 sm:pt-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <EcgTrace className="h-5 w-32 text-call-bright" />
          <p className="mt-3 text-[clamp(1.35rem,1.1rem+1vw,1.75rem)] font-black uppercase leading-tight tracking-tight text-on-primary">
            {label ?? t.banner.defaultLabel}
          </p>
          <p className="mt-1.5 max-w-[48ch] text-sm text-on-primary-muted">
            {text ?? t.banner.defaultText(t.hoursProse)}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <a
            href={`tel:${business.phoneHref}`}
            data-tap="banniere"
            className="flex items-center justify-center gap-3 rounded-2xl bg-call px-5 py-3 no-underline shadow-[0_14px_30px_-10px_rgba(226,1,2,0.6)] transition-colors hover:bg-call-dark"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-call">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-white">{t.call.call}</span>
              <span className="block text-xl font-black tabular-nums text-white" dir="ltr">
                {business.phoneDisplay}
              </span>
            </span>
          </a>
          <WhatsAppButton
            href={toWhatsAppHref(business.whatsappNumber)}
            tap="banniere"
            locale={locale}
            className="justify-center rounded-2xl"
          />
        </div>
      </div>
      <LiveryBand className="absolute inset-x-0 bottom-0 h-2" />
    </aside>
  );
}
