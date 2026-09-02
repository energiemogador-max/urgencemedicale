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
 * The visitor tracker, as a string because it ships as an inline <script>.
 *
 * Records three things: arrival (view), liveness (ping every 30s while the
 * tab is visible and the person active), and the conversion (call /
 * whatsapp). Everything goes to /api/track on this origin, so the public
 * Content-Security-Policy stays `connect-src 'self'` — no third-party
 * origin is added to the emergency pages, and the database URL is never
 * exposed to the browser. The Worker enriches each beacon with the city
 * and region Cloudflare already knows.
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
    var send = function(params){
      var url = "/api/track?" + params;
      if (navigator.sendBeacon) { navigator.sendBeacon(url); return; }
      try { fetch(url, { keepalive: true, mode: "no-cors" }); } catch (e) {}
    };

    /* Visitor id: localStorage, so the same person across tabs and days is one
       visitor. Session id: sessionStorage, so each visit is counted separately.
       Neither is a tracking cookie — random, first-party, never leaves this
       site. They exist so "one person hesitating" and "three people calling"
       are distinguishable, which is the number that gets argued about. */
    var vid, sid;
    try {
      vid = localStorage.getItem("um_v");
      if (!vid) { vid = "v_" + Math.random().toString(36).slice(2, 11); localStorage.setItem("um_v", vid); }
      sid = sessionStorage.getItem("um_s");
      if (!sid) { sid = "s_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); sessionStorage.setItem("um_s", sid); }
    } catch (e) { vid = "nostore"; sid = "nostore"; }

    var dev = /iPad/.test(navigator.userAgent) ? "tablette"
            : /Mobi|Android/.test(navigator.userAgent) ? "mobile" : "ordinateur";
    var ua = navigator.userAgent;
    var br = ua.indexOf("Edg") > -1 ? "Edge"
           : (ua.indexOf("Chrome") > -1 ? "Chrome"
           : (ua.indexOf("Firefox") > -1 ? "Firefox"
           : (ua.indexOf("Safari") > -1 ? "Safari" : "Autre")));

    var base = function(ev){
      return "e=" + ev +
             "&p=" + encodeURIComponent(location.pathname) +
             "&v=" + encodeURIComponent(vid) +
             "&s=" + encodeURIComponent(sid) +
             "&d=" + dev + "&b=" + br +
             "&w=" + (screen.width || 0);
    };

    /* Arrival. The Worker adds city/region from Cloudflare's edge — the page
       cannot know that, and asking a geo-IP service would mean a third-party
       request on an emergency page. */
    send(base("view"));

    /* Heartbeat, so time-on-site and "who is here now" are real. Only while
       the tab is visible and the person is active: a forgotten background tab
       must not inflate the numbers. */
    var lastActive = Date.now();
    ["mousemove","scroll","keydown","touchstart","click"].forEach(function(ev){
      window.addEventListener(ev, function(){ lastActive = Date.now(); }, { passive: true });
    });
    setInterval(function(){
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastActive > 5 * 60 * 1000) return;
      send(base("ping"));
    }, 30000);
    document.addEventListener("visibilitychange", function(){
      if (document.visibilityState === "visible") { lastActive = Date.now(); send(base("ping")); }
    });

    /* The conversion itself. Capturing listener on document so it fires no
       matter which component rendered the link, and sendBeacon because it is
       the only request the browser guarantees to finish while the page is
       being torn down by the dialler opening. */
    document.addEventListener("click", function(ev){
      try {
        var a = ev.target && ev.target.closest && ev.target.closest("a[href]");
        if (!a) return;
        var href = a.getAttribute("href") || "";
        var event = href.indexOf("tel:") === 0 ? "call"
                  : href.indexOf("wa.me") > -1 ? "whatsapp"
                  : null;
        if (!event) return;
        send(base(event));
      } catch (e) {}
    }, true);
  } catch (e) {}
})();
`.trim();
