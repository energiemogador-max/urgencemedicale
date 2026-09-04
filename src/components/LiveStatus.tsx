import { content } from "@/lib/content";

/**
 * The hero's right-hand panel: a live service status, in place of a photograph.
 *
 * WHY THIS REPLACED THE PHOTO
 *
 * What was there was a stock image of a doctor in a white coat — the same
 * image, in spirit, that every competitor in this market uses. It occupied the
 * most valuable space on the site and told a visitor nothing they did not
 * already assume.
 *
 * This answers, without being asked, the three questions someone actually has
 * at 02h00 with a sick child: is anyone awake, how long, and what will it
 * cost. No competitor surveyed publishes a price at all, let alone the one
 * that applies right now.
 *
 * HOW IT DEGRADES
 *
 * Everything factual is server-rendered: both tariffs, both time windows, the
 * response time, the cities. With JavaScript off — or before hydration, or if
 * the inline script throws — the panel is complete and correct; it simply does
 * not know the hour.
 *
 * The live line starts `hidden` and the script unhides it. That ordering
 * matters: a visitor must never see a tariff highlighted as "now" that is
 * wrong for their clock, so nothing is highlighted until the clock is read.
 *
 * WHY THE RULE IS SAFE TO COMPUTE
 *
 * The published tariffs make this purely a function of the hour: 07h00-20h00
 * is the day rate, and the day rate explicitly includes Saturday and Sunday,
 * so the weekend needs no special case. Public holidays are billed at the
 * night rate and are NOT computed — Morocco's holidays include moveable
 * Islamic dates, and a page that quietly gets one wrong is worse than one that
 * says so. The panel states the holiday rule in words and lets the person on
 * the phone confirm, which is where the tariff is confirmed anyway.
 */
export function LiveStatus() {
  const { business, pricing } = content;
  const day = pricing.tiers.find((t) => t.slug === "jour-weekend");
  const night = pricing.tiers.find((t) => t.slug === "nuit-ferie");

  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-primary px-6 py-8 sm:px-8 lg:px-10">
      {/* Crescent watermark — the brand's own mark, at a size that reads as
          texture rather than decoration. Masked, so it needs no extra asset. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 bg-white/[0.06]"
        style={{
          maskImage: "var(--crescent-mask)",
          WebkitMaskImage: "var(--crescent-mask)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />

      <div id="um-status" className="relative">
        <p className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-whatsapp" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-on-primary-muted">
            Service ouvert — {business.hoursOpen}
          </span>
        </p>

        {/* Filled in by the script below; absent without JavaScript. */}
        <p id="um-live" hidden className="mt-5 leading-none">
          <span
            id="um-clock"
            className="block text-[clamp(2.6rem,7vw,3.6rem)] font-black tabular-nums tracking-tight text-white"
          />
          <span id="um-period" className="mt-2 block text-sm font-bold uppercase tracking-[0.14em] text-call-ink" />
        </p>

        <dl className="mt-7 grid gap-2.5">
          {[
            { id: "um-tier-jour", tier: day },
            { id: "um-tier-nuit", tier: night },
          ].map(({ id, tier }) =>
            tier ? (
              <div
                key={tier.slug}
                id={id}
                data-active="0"
                className="flex items-baseline justify-between gap-4 rounded-xl border border-white/10 px-4 py-3 transition-colors data-[active=1]:border-call data-[active=1]:bg-white/10"
              >
                <dt className="min-w-0">
                  <span className="block text-sm font-bold text-white">{tier.label}</span>
                  <span className="mt-0.5 block text-xs text-on-primary-faint">{tier.window}</span>
                </dt>
                <dd className="shrink-0 text-xl font-black tabular-nums text-white">
                  {tier.amountMad} <span className="text-sm font-bold text-on-primary-muted">{pricing.currency}</span>
                </dd>
              </div>
            ) : null
          )}
        </dl>

        <p className="mt-3 text-xs text-on-primary-faint">
          Les jours fériés sont au tarif de nuit. Le tarif applicable vous est confirmé au téléphone avant que vous ne
          validiez la visite.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-5">
          <span className="text-sm text-on-primary-muted">
            Intervention en{" "}
            <span className="font-black text-white">{business.defaultResponseTimeMinutes} min</span>
          </span>
          <span className="text-sm text-on-primary-muted">
            <span className="font-black text-white">{content.cities.length} villes</span> couvertes
          </span>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  try {
    var root = document.getElementById("um-status");
    if (!root) return;
    var live = document.getElementById("um-live");
    var clock = document.getElementById("um-clock");
    var period = document.getElementById("um-period");
    var dayEl = document.getElementById("um-tier-jour");
    var nightEl = document.getElementById("um-tier-nuit");
    var pad = function(n){ return n < 10 ? "0" + n : "" + n; };
    function tick(){
      var d = new Date(), h = d.getHours();
      /* Published rule: 07h00-20h00 is the day rate, weekends included. */
      var isNight = h < 7 || h >= 20;
      if (clock) clock.textContent = pad(h) + "h" + pad(d.getMinutes());
      if (period) period.textContent = isNight ? "Nous sommes au tarif de nuit" : "Nous sommes au tarif de journée";
      if (dayEl) dayEl.setAttribute("data-active", isNight ? "0" : "1");
      if (nightEl) nightEl.setAttribute("data-active", isNight ? "1" : "0");
      if (live) live.hidden = false;
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
