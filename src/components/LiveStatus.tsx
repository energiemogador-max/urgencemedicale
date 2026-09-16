import { content } from "@/lib/content";
import { LiveStatusClient } from "@/components/LiveStatusClient";

/**
 * Live service status, floated over the hero photograph as a compact badge.
 *
 * WHAT IT IS FOR
 *
 * It answers, without being asked, the two questions someone has at 02h00 with
 * a sick child: is anyone awake, and what will this cost.
 *
 * It is a badge rather than a full panel because the hero is a photograph: a
 * large information panel would fight the image for the same space.
 *
 * HOW IT DEGRADES
 *
 * The fallback line (open 24/7, 500 to 700 MAD) is server-rendered and always
 * true. LiveStatusClient replaces it with the clock after hydration. With
 * JavaScript off, the badge is still correct — it just does not know the hour.
 * Nobody is ever shown a tariff asserted as "now" that is wrong for their
 * clock, because nothing is asserted until the clock is read.
 *
 * This component used to carry its own inline <script> doing that swap before
 * hydration. It caused React hydration error #418 on every homepage load — see
 * LiveStatusClient for the details.
 *
 * WHY THE RULE IS SAFE TO COMPUTE
 *
 * The published tariffs make this purely a function of the hour: 07h00-20h00
 * is the day rate, and that rate explicitly includes Saturday and Sunday.
 * Public holidays are billed at the night rate and are deliberately NOT
 * computed — Morocco's holidays include moveable Islamic dates, and a page that
 * quietly gets one wrong is worse than one that stays silent. The tariff is
 * confirmed on the phone before the visit either way.
 *
 * Solid white, not a translucent panel: this sits on a photograph, and
 * translucency would make the contrast of the text depend on the pixels
 * underneath it.
 */
export function LiveStatus() {
  const { pricing } = content;
  const day = pricing.tiers.find((t) => t.slug === "jour-weekend");
  const night = pricing.tiers.find((t) => t.slug === "nuit-ferie");

  return (
    <div className="absolute right-4 top-4 z-10 max-w-[13.5rem] rounded-2xl bg-white/95 px-4 py-3 shadow-2xl ring-1 ring-white/50 backdrop-blur lg:bottom-8 lg:right-8 lg:top-auto">
      <p className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-whatsapp" />
        </span>
        <span className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-ink">Service ouvert</span>
      </p>

      <LiveStatusClient day={day?.amountMad ?? ""} night={night?.amountMad ?? ""} currency={pricing.currency} />
    </div>
  );
}
