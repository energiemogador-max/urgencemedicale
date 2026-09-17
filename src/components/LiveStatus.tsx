import { api } from "@/lib/locale-content";
import type { Locale } from "@/lib/i18n";
import { dict, type Dict } from "@/lib/dictionaries";

/**
 * Live service status: a compact badge in the hero.
 *
 * WHAT IT IS FOR
 *
 * It answers, without being asked, the two questions someone has at 02h00 with
 * a sick child: is anyone awake, and what will this cost.
 *
 * HOW THE CLOCK WORKS
 *
 * The server renders a line that is always true (open 24h/24, 500 to 700
 * MAD). A few lines of plain JavaScript, inline right after the badge,
 * replace it with the visitor's hour and the tariff for that hour. With
 * JavaScript off, the badge is still correct; it just doesn't know the hour.
 * Nothing is asserted as "now" until the visitor's clock has been read.
 *
 * WHY NOT A REACT CLIENT COMPONENT ANY MORE
 *
 * It was one (LiveStatusClient). That was the site's only client component,
 * and it cost every page the whole React runtime plus the RSC payload: on a
 * mid-range phone, Lighthouse (2026-09-17) measured 3.7s just parsing that
 * payload, for one clock. scripts/strip-runtime.ts now removes the runtime
 * from the exported HTML, so no page hydrates. That also makes this inline
 * script safe: the hydration error #418 an earlier inline version caused only
 * happened because React hydrated over the DOM it had edited.
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
 * LAYOUT
 *
 * Positioning belongs to the parent (Hero). On phones the badge sits in the
 * flow above the headline, so the fallback and the live line share one box of
 * fixed height: a live line even one pixel taller would push the H1 down. From
 * `lg` up the badge floats over the photograph and may grow.
 */

/* Class lists live here as plain strings so Tailwind generates them; the
   script below applies them. */
const LINE = "mt-1 flex h-7 items-center gap-x-2.5 whitespace-nowrap lg:mt-1.5 lg:block lg:h-auto";
const FALLBACK = `${LINE} text-sm text-ink-muted`;
const CLOCK = "text-xl font-black leading-none tabular-nums text-primary lg:block lg:text-3xl";
const PERIOD = "text-xs font-bold uppercase tracking-wide text-ink-muted lg:mt-1.5 lg:block";
const SHORT = "lg:hidden";
const LONG = "hidden lg:inline";
const PRICE = "text-lg font-black leading-none tabular-nums text-call-ink lg:mt-1 lg:block lg:text-xl";

const script = (t: Dict) => `(function(){
var els=document.querySelectorAll("[data-live-status]");if(!els.length)return;
function pad(n){return(n<10?"0":"")+n}
function span(cls,text){var s=document.createElement("span");s.className=cls;if(text!=null)s.textContent=text;return s}
function render(){var d=new Date(),h=d.getHours(),night=h<7||h>=20;
for(var i=0;i<els.length;i++){var el=els[i],x=el.dataset,p=span(${JSON.stringify(PERIOD)});
p.appendChild(span(${JSON.stringify(SHORT)},night?${JSON.stringify(t.liveStatus.nightShort)}:${JSON.stringify(t.liveStatus.dayShort)}));
p.appendChild(span(${JSON.stringify(LONG)},night?${JSON.stringify(t.liveStatus.nightLong)}:${JSON.stringify(t.liveStatus.dayLong)}));
el.className=${JSON.stringify(LINE)};el.textContent="";
el.appendChild(span(${JSON.stringify(CLOCK)},pad(h)+${JSON.stringify(t.liveStatus.clockSep)}+pad(d.getMinutes())));
el.appendChild(p);
el.appendChild(span(${JSON.stringify(PRICE)},(night?x.night:x.day)+" "+x.currency));}}
render();setInterval(render,30000);
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")render()});
})();`;

export function LiveStatus({ locale = "fr" }: { locale?: Locale }) {
  const { pricing } = api(locale).content;
  const t = dict(locale);
  const day = pricing.tiers.find((t) => t.slug === "jour-weekend")?.amountMad ?? "";
  const night = pricing.tiers.find((t) => t.slug === "nuit-ferie")?.amountMad ?? "";

  return (
    <div className="inline-block rounded-2xl bg-white px-4 py-2.5 shadow-2xl ring-1 ring-white/50 lg:px-5 lg:py-4">
      <p className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-whatsapp" />
        </span>
        <span className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-ink">{t.liveStatus.open}</span>
      </p>

      <p data-live-status="" data-day={day} data-night={night} data-currency={t.currency} className={FALLBACK}>
        {t.liveStatus.fallback(day, night, t.currency)}
      </p>
      <script dangerouslySetInnerHTML={{ __html: script(t) }} />
    </div>
  );
}
