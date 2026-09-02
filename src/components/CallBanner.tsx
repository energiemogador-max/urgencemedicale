import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { content } from "@/lib/content";

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
export function CallBanner({ label }: { label?: string }) {
  const { business } = content;

  return (
    <aside className="mt-10 rounded-2xl border border-border bg-primary p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-black uppercase tracking-tight text-on-primary">
            {label ?? "Besoin d'un médecin maintenant ?"}
          </p>
          <p className="mt-1 text-sm text-on-primary-muted">
            Un médecin se déplace chez vous, {business.hoursOpen}. Le tarif vous est annoncé avant que vous ne
            confirmiez.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <a
            href={`tel:${business.phoneHref}`}
            data-tap="banniere"
            className="flex items-center justify-center gap-3 rounded-xl bg-call px-5 py-3 no-underline transition-colors hover:bg-call-dark"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-call">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">Appelez</span>
              <span className="block text-lg font-black tabular-nums text-white">{business.phoneDisplay}</span>
            </span>
          </a>
          <WhatsAppButton href={toWhatsAppHref(business.whatsappNumber)} tap="banniere" className="justify-center rounded-xl" />
        </div>
      </div>
    </aside>
  );
}
