import { content } from "@/lib/content";

/**
 * Live service status, floated over the hero photograph as a compact badge.
 *
 * WHAT IT IS FOR
 *
 * It answers, without being asked, the two questions someone has at 02h00 with
 * a sick child: is anyone awake, and what will this cost. No competitor
 * surveyed publishes a price at all, let alone the one that applies right now.
 *
 * It is a badge rather than a full panel because the hero is now a photograph:
 * a large information panel would fight the image for the same space. Small
 * and specific beats large and general here — the tariff table lives on
 * /tarifs, and this only has to carry the number that applies tonight.
 *
 * HOW IT DEGRADES
 *
 * The fallback line is server-rendered and always true: open 24/7, 500 to 700
 * MAD. The live line starts `hidden`; the script reads the clock, fills it,
 * unhides it, and hides the fallback. With JavaScript off, or before the
 * script runs, or if it throws, the badge is still correct — it just does not
 * know the hour. Nobody is ever shown a tariff asserted as "now" that is wrong
 * for their clock, because nothing is asserted until the clock is read.
 *
 * WHY THE RULE IS SAFE TO COMPUTE
 *
 * The published tariffs make this purely a function of the hour: 07h00-20h00
 * is the day rate, and that rate explicitly includes Saturday and Sunday, so
 * the weekend needs no special case. Public holidays are billed at the night
 * rate and are deliberately NOT computed — Morocco's holidays include moveable
 * Islamic dates, and a page that quietly gets one wrong is worse than one that
 * stays silent. The tariff is confirmed on the phone before the visit either
 * way, which is where that edge belongs.
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
    <div
      id="um-status"
      className="absolute right-4 top-4 z-10 max-w-[13.5rem] rounded-2xl bg-white/95 px-4 py-3 shadow-2xl ring-1 ring-white/50 backdrop-blur lg:bottom-8 lg:right-8 lg:top-auto"
    >
      <p className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-whatsapp" />
        </span>
        <span className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-ink">Service ouvert</span>
      </p>

      {/* Server-rendered truth. Replaced by the live line once the clock is read. */}
      <p id="um-fallback" className="mt-1.5 text-sm text-ink-muted">
        24h/24 · {day?.amountMad} à {night?.amountMad} {pricing.currency}
      </p>

      <p id="um-live" hidden className="mt-1.5">
        <span id="um-clock" className="block text-2xl font-black leading-none tabular-nums text-primary" />
        <span id="um-period" className="mt-1 block text-xs font-bold uppercase tracking-wide text-ink-muted" />
        <span id="um-rate" className="mt-1.5 block text-lg font-black leading-none tabular-nums text-call-ink" />
      </p>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  try {
    var live = document.getElementById("um-live");
    var fallback = document.getElementById("um-fallback");
    var clock = document.getElementById("um-clock");
    var period = document.getElementById("um-period");
    var rate = document.getElementById("um-rate");
    if (!live || !clock) return;
    var DAY = ${JSON.stringify(day?.amountMad ?? "")};
    var NIGHT = ${JSON.stringify(night?.amountMad ?? "")};
    var CUR = ${JSON.stringify(pricing.currency)};
    var pad = function(n){ return n < 10 ? "0" + n : "" + n; };
    function tick(){
      var d = new Date(), h = d.getHours();
      /* Published rule: 07h00-20h00 is the day rate, weekends included. */
      var isNight = h < 7 || h >= 20;
      clock.textContent = pad(h) + "h" + pad(d.getMinutes());
      if (period) period.textContent = isNight ? "Tarif de nuit" : "Tarif de journée";
      if (rate) rate.textContent = (isNight ? NIGHT : DAY) + " " + CUR;
      live.hidden = false;
      if (fallback) fallback.hidden = true;
    }
    tick();
    setInterval(tick, 30000);
    document.addEventListener("visibilitychange", function(){
      if (document.visibilityState === "visible") tick();
    });
  } catch (e) {}
})();
`.trim(),
        }}
      />
    </div>
  );
}
