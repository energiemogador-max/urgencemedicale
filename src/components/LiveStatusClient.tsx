"use client";

import { useEffect, useState } from "react";

/**
 * The live part of the status badge: clock, period, applicable tariff.
 *
 * WHY THIS IS A CLIENT COMPONENT NOW
 *
 * It used to be an inline <script> that edited the badge's DOM as soon as the
 * HTML was parsed — before React hydrated. React then found markup that did
 * not match what the server had rendered (text inside spans the server left
 * empty) and threw hydration error #418 on every homepage load: Lighthouse
 * logged it, and React discards and re-renders the mismatched tree on the
 * client, which is main-thread work on the one page where speed matters most.
 *
 * Here the first client render is identical to the server render (the
 * fallback, because `now` starts null on both sides), and the clock appears in
 * an effect, after hydration. No mismatch is possible.
 *
 * Only three plain values cross into this component. Importing the content
 * layer here would ship all of it — schemas and every page's prose — to every
 * visitor's browser.
 *
 * The badge is absolutely positioned, so the fallback growing into the
 * three-line live view moves nothing else on the page.
 */
export function LiveStatusClient({ day, night, currency }: { day: string; night: string; currency: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 30_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  /*
   * The fallback and the live line share one box of fixed height below `lg`.
   * On a phone this card sits in the flow above the headline, so a live line
   * even one pixel taller than the fallback would push the H1 down after
   * hydration: a layout shift on the page's most important block. From `lg`
   * up the card floats over the photograph and may grow freely.
   */
  const line = "mt-1 flex h-7 items-center gap-x-2.5 whitespace-nowrap lg:mt-1.5 lg:block lg:h-auto";

  if (!now) {
    // Server-rendered and always true: nothing is asserted as "now" until the
    // visitor's clock has actually been read.
    return (
      <p className={`${line} text-sm text-ink-muted`}>
        24h/24 · {day} à {night} {currency}
      </p>
    );
  }

  const hours = now.getHours();
  // Published rule: 07h00-20h00 is the day rate, weekends included. Public
  // holidays (night rate) are deliberately not computed — see LiveStatus.
  const isNight = hours < 7 || hours >= 20;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <p className={line}>
      <span className="text-xl font-black leading-none tabular-nums text-primary lg:block lg:text-3xl">
        {pad(hours)}h{pad(now.getMinutes())}
      </span>
      <span className="text-xs font-bold uppercase tracking-wide text-ink-muted lg:mt-1.5 lg:block">
        <span className="lg:hidden">{isNight ? "Tarif nuit" : "Tarif jour"}</span>
        <span className="hidden lg:inline">{isNight ? "Tarif de nuit" : "Tarif de journée"}</span>
      </span>
      <span className="text-lg font-black leading-none tabular-nums text-call-ink lg:mt-1 lg:block lg:text-xl">
        {isNight ? night : day} {currency}
      </span>
    </p>
  );
}
