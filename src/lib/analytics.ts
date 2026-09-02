/**
 * Phase 7 — conversion tracking.
 *
 * Two pieces, deliberately separate:
 *
 * 1. Cloudflare Web Analytics for pageviews. Chosen over GA4 because it sets
 *    no cookies, so the site needs no consent banner — which matters both
 *    under Morocco's law 09-08 and because an interstitial on a page someone
 *    opened at 2am to find a doctor costs real calls.
 *
 * 2. First-party tap tracking for the actual conversion. Cloudflare Web
 *    Analytics has no custom-event API, and the conversion here is a phone
 *    tap: the visitor leaves the browser entirely, which every analytics
 *    product records as a bounce. `worker/index.js` answers the beacon.
 *
 * The token is operator-supplied and NOT invented. Unlike the Ordre numbers
 * this does not gate the build — analytics missing is an inconvenience, a
 * fabricated credential is a lie — so an unset token simply omits the script
 * and the site works exactly as before.
 */

/**
 * Cloudflare Web Analytics beacon token.
 *
 * Get it from: Cloudflare dashboard → Analytics & Logs → Web Analytics →
 * Add a site → urgencemedicale.ma. Copy the value of `token` from the
 * snippet it shows. It is a public identifier, safe to commit — it only
 * identifies which site the pageview belongs to.
 */
export const CF_BEACON_TOKEN = "";

export function hasWebAnalytics(): boolean {
  return CF_BEACON_TOKEN.trim().length > 0;
}

/** Origins the beacon needs, mirrored into the CSP in public/_headers. */
export const CF_ANALYTICS_ORIGINS = {
  script: "https://static.cloudflareinsights.com",
  connect: "https://cloudflareinsights.com",
} as const;

/**
 * The tap tracker, as a string because it ships as an inline <script>.
 *
 * Inline and dependency-free on purpose: it must run before the React bundle
 * has loaded. Someone who lands on the page and taps the number immediately
 * is the most valuable visitor on the site, and waiting for hydration would
 * miss exactly them.
 *
 * It uses a capturing listener on `document` so it sees the click no matter
 * which component rendered the link, and `sendBeacon`, which is the only
 * request type the browser guarantees to finish once the page is being torn
 * down by the dialler opening.
 */
export const TAP_TRACKING_SCRIPT = `
(function(){
  try {
    if (!navigator.sendBeacon) return;

    /* A short per-browser id, kept in localStorage. It is NOT a tracking
       cookie: it is random, never leaves this site, and exists so the call
       log can tell "one person tapped three times" apart from "three people
       called". Without it a single hesitant visitor looks like three leads,
       which is exactly the number that would be argued about. */
    var vid;
    try {
      vid = localStorage.getItem("um_v");
      if (!vid) { vid = Math.random().toString(36).slice(2, 10); localStorage.setItem("um_v", vid); }
    } catch (e) { vid = "nostore"; }

    document.addEventListener("click", function(ev){
      try {
        var a = ev.target && ev.target.closest && ev.target.closest("a[href]");
        if (!a) return;
        var href = a.getAttribute("href") || "";
        var event = href.indexOf("tel:") === 0 ? "call"
                  : href.indexOf("wa.me") > -1 ? "whatsapp"
                  : null;
        if (!event) return;
        navigator.sendBeacon(
          "/api/track?e=" + event +
          "&p=" + encodeURIComponent(location.pathname) +
          "&v=" + encodeURIComponent(vid)
        );
      } catch (e) {}
    }, true);
  } catch (e) {}
})();
`.trim();
