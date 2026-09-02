import { toWhatsAppHref } from "@/lib/phone";

/**
 * Fixed call bar, phones only.
 *
 * WHY THIS EXISTS
 *
 * The hero's call button sits roughly 620px down the homepage on a phone:
 * 84px of logo, a two-line headline, the lead, four proof items, then the
 * action. On an iPhone SE that is below the fold, and on a scrolled page it is
 * gone entirely. That left the sticky header as the only always-reachable
 * number — at the very TOP of the screen, which is the furthest point from a
 * thumb holding the phone one-handed.
 *
 * This is an emergency service whose entire conversion is one tap. The number
 * belongs where the thumb already is.
 *
 * Hidden from `md:` up, where the header number is a mouse-move away and a
 * fixed bar would just eat the viewport. Hidden in print too — a bar floating
 * over a printed prescription page is noise.
 *
 * A spacer of equal height follows the footer in the layout, so the bar never
 * covers the last line of content. Note there is no `viewport-fit=cover`: the
 * visual viewport therefore stops above the home indicator on notched phones,
 * and the browser keeps this bar clear of it without any env() padding.
 */
export function MobileCallBar({
  phoneDisplay,
  phoneHref,
  whatsappNumber,
  callLabel = "Appeler maintenant",
}: {
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  callLabel?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-2 shadow-[0_-4px_16px_rgba(11,28,51,0.14)] backdrop-blur md:hidden print:hidden">
      <div className="flex items-stretch gap-2">
        {/*
          `data-tap` names the surface for the beacon in lib/analytics.ts.
          Without it every tap looks identical in the dashboard and there is no
          way to tell whether this bar earns its place — which is exactly the
          question it should have to answer.
        */}
        <a
          href={`tel:${phoneHref}`}
          data-tap="barre-mobile"
          className="flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-call px-3 py-2.5 no-underline active:bg-call-dark"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-call">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
            </svg>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/85">
              {callLabel}
            </span>
            <span className="block text-lg font-black tabular-nums text-white" dir="ltr">
              {phoneDisplay}
            </span>
          </span>
        </a>

        <a
          href={toWhatsAppHref(whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          data-tap="barre-mobile"
          aria-label="Contacter sur WhatsApp"
          className="flex w-14 shrink-0 items-center justify-center rounded-xl bg-whatsapp text-ink no-underline active:bg-whatsapp-dark"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
            <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10.1 9 9.6 7.8 9.4 7.3c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
            <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4 14.9 3.5 13.5 3.5 12 3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 20.2 12 20.2z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/** Reserves the bar's height at the end of the page so it covers no content. */
export function MobileCallBarSpacer() {
  return <div aria-hidden="true" className="h-[4.75rem] md:hidden print:hidden" />;
}
