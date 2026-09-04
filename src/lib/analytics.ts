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
 *    product records as a bounce.
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
 * Realtime Database endpoint the tracker writes to.
 *
 * Public by design: it is already in the admin page's Firebase SDK config, and
 * what protects the data is the database rules (writes open on the three
 * tracking nodes, reads staff-only), not this URL being secret. It must also
 * be allow-listed in `connect-src` in public/_headers.
 */
export const FIREBASE_DB_URL =
  "https://urgencemedicale-8b903-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * The visitor tracker, as a string because it ships as an inline <script>.
 *
 * IT WRITES TO FIREBASE DIRECTLY FROM THE BROWSER. That is not an oversight —
 * it is the point, and it is the model novastyle.ma has used all along.
 *
 * The previous version POSTed to /api/track and let the Worker do the write.
 * That worked from *.workers.dev and failed on urgencemedicale.ma with HTTP
 * 525 (SSL handshake failed) on every single request: a Worker's outgoing
 * fetch() inherits the SSL/TLS mode of the zone it runs on, so on the custom
 * domain Cloudflare refused the connection before it ever reached Google. The
 * Worker still answered 204, so the site looked healthy while the dashboard
 * stayed empty, and every view, heartbeat and tap since launch was discarded.
 *
 * Writing from the browser takes the Worker out of the path entirely, so no
 * zone-level setting can break it again.
 *
 * Two deliberate differences from Nova, both because this site is medical:
 *
 *  - Geolocation comes from /api/geo — Cloudflare's own edge data about the
 *    request that is already arriving — instead of Nova's three third-party
 *    geo-IP services. No visitor IP is handed to anyone, and the emergency
 *    pages keep making zero third-party requests.
 *  - It stays INLINE rather than a module, so the click listener is attached
 *    before hydration. Someone who lands and taps the number immediately is
 *    the most valuable visitor on the site; a deferred module would miss them.
 *
 * Node shapes match what public/admin/index.html already reads, so the
 * dashboard needed no changes:
 *   online_visitors/{vid}         PUT, refreshed by a 30s heartbeat
 *   sessions/{YYYY-MM-DD}/{sid}   PUT on arrival, PATCH on leave
 *   taps                          POST per tap-to-call / WhatsApp click
 */
export const TAP_TRACKING_SCRIPT = `
(function(){
  try {
    var DB = ${JSON.stringify(FIREBASE_DB_URL)};

    /* The operator's own visits would otherwise dominate a small site's
       numbers. Set localStorage.um_is_admin = "1" in your own browser. */
    try { if (localStorage.getItem("um_is_admin") === "1") return; } catch (e) {}

    /* keepalive so a write started as the dialler opens still completes. */
    function send(path, method, value){
      try {
        return fetch(DB + "/" + path + ".json", {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
          keepalive: true
        }).catch(function(){});
      } catch (e) {}
    }
    var put = function(p, v){ return send(p, "PUT", v); };
    var patch = function(p, v){ return send(p, "PATCH", v); };
    var push = function(p, v){ return send(p, "POST", v); };

    /* Visitor id in localStorage: the same person across tabs and days is one
       visitor. Session id in sessionStorage: each visit counted separately. */
    var vid, sid;
    try {
      vid = localStorage.getItem("um_v");
      if (!vid) { vid = "v_" + Math.random().toString(36).slice(2, 11); localStorage.setItem("um_v", vid); }
      sid = sessionStorage.getItem("um_s");
      if (!sid) { sid = "s_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); sessionStorage.setItem("um_s", sid); }
    } catch (e) { vid = "v_nostore"; sid = "s_" + Date.now().toString(36); }

    var ua = navigator.userAgent;
    var dev = /iPad/.test(ua) ? "tablette" : /Mobi|Android/.test(ua) ? "mobile" : "ordinateur";
    var br = ua.indexOf("Edg") > -1 ? "Edge"
           : ua.indexOf("Chrome") > -1 ? "Chrome"
           : ua.indexOf("Firefox") > -1 ? "Firefox"
           : ua.indexOf("Safari") > -1 ? "Safari" : "Autre";

    var arrival = Date.now();
    var day = new Date().toISOString().slice(0, 10);
    var visPath = "online_visitors/" + vid;
    var sessPath = "sessions/" + day + "/" + sid;

    /* Acquisition channel, captured on the first page and locked for the whole
       visit — otherwise an internal click rewrites the source and every visit
       ends up looking Direct. */
    function classify(r){
      if (!r) return "Direct";
      if (r.indexOf("urgencemedicale.ma") > -1 || r.indexOf("workers.dev") > -1) return "__self__";
      if (r.indexOf("google") > -1) return "Google";
      if (r.indexOf("bing") > -1) return "Bing";
      if (r.indexOf("facebook") > -1 || r.indexOf("fb.") > -1) return "Facebook";
      if (r.indexOf("instagram") > -1) return "Instagram";
      if (r.indexOf("whatsapp") > -1 || r.indexOf("wa.me") > -1) return "WhatsApp";
      if (r.indexOf("tiktok") > -1) return "TikTok";
      if (r.indexOf("chatgpt") > -1 || r.indexOf("openai") > -1) return "ChatGPT";
      try { return new URL(r).hostname.replace("www.", ""); } catch (e) { return "Autre"; }
    }
    function source(){
      try { var v = sessionStorage.getItem("um_src"); if (v) return v; } catch (e) {}
      var c = classify(document.referrer);
      if (c === "__self__") c = "Direct";
      try { sessionStorage.setItem("um_src", c); } catch (e) {}
      return c;
    }
    var landing = location.pathname;
    try {
      var st = sessionStorage.getItem("um_landing");
      if (st) landing = st; else sessionStorage.setItem("um_landing", landing);
    } catch (e) {}

    /* City/country from our own edge, cached a day. Never awaited: a visitor
       who leaves before it resolves must still be counted. */
    var geo = null;
    try {
      var cg = JSON.parse(localStorage.getItem("um_geo") || "null");
      if (cg && Date.now() - cg.ts < 86400000) geo = cg.data;
    } catch (e) {}
    if (!geo) {
      fetch("/api/geo").then(function(r){ return r.json(); }).then(function(g){
        if (!g) return;
        geo = g;
        try { localStorage.setItem("um_geo", JSON.stringify({ ts: Date.now(), data: g })); } catch (e) {}
        beat();
        patch(sessPath, { city: g.city, region: g.region, country: g.country });
      }).catch(function(){});
    }

    var lastActive = Date.now();
    var IDLE = 5 * 60 * 1000, MAX_OPEN = 2 * 60 * 60 * 1000, hb = null;

    /* One row per visitor, overwritten by the heartbeat. A hidden, idle or
       long-abandoned tab stops writing, so it ages out of "en ligne
       maintenant" instead of haunting it. */
    function beat(){
      if (document.visibilityState === "hidden") return;
      if (Date.now() - lastActive > IDLE) return;
      if (Date.now() - arrival > MAX_OPEN) { put(visPath, null); if (hb) clearInterval(hb); return; }
      var p = {
        visitorId: vid, sessionId: sid, page: location.pathname,
        device: dev, browser: br, source: source(),
        arrivalAt: arrival, lastSeen: Date.now(),
        duration: Math.round((Date.now() - arrival) / 1000),
        screenW: screen.width || 0
      };
      if (geo) { p.city = geo.city; p.region = geo.region; p.country = geo.country; }
      put(visPath, p);
    }

    var srec = {
      visitorId: vid, startedAt: arrival, lastSeen: arrival, page: location.pathname,
      device: dev, browser: br, source: source(), screenW: screen.width || 0
    };
    if (geo) { srec.city = geo.city; srec.region = geo.region; srec.country = geo.country; }
    put(sessPath, srec);

    beat();
    hb = setInterval(beat, 30000);
    ["mousemove","scroll","keydown","touchstart","click"].forEach(function(ev){
      window.addEventListener(ev, function(){ lastActive = Date.now(); }, { passive: true });
    });
    document.addEventListener("visibilitychange", function(){
      if (document.visibilityState === "visible") { lastActive = Date.now(); beat(); }
      else patch(sessPath, { duration: Math.round((Date.now() - arrival) / 1000), endedAt: Date.now(), lastSeen: Date.now() });
    });

    /* Deepest scroll on this page, so a tap can be read against engagement. */
    var maxScroll = 0;
    window.addEventListener("scroll", function(){
      var d = document.documentElement;
      var denom = (d.scrollHeight || document.body.scrollHeight) - d.clientHeight;
      if (denom > 0) {
        var pct = Math.round(((d.scrollTop || document.body.scrollTop) / denom) * 100);
        if (pct > maxScroll) maxScroll = pct > 100 ? 100 : pct;
      }
    }, { passive: true });

    /* The conversion. Capturing listener on document so it fires whichever
       component rendered the link; data-tap names the surface. */
    document.addEventListener("click", function(ev){
      try {
        var a = ev.target && ev.target.closest && ev.target.closest("a[href]");
        if (!a) return;
        var href = a.getAttribute("href") || "";
        var event = href.indexOf("tel:") === 0 ? "call" : href.indexOf("wa.me") > -1 ? "whatsapp" : null;
        if (!event) return;
        var row = {
          at: new Date().toISOString(), event: event, page: location.pathname,
          visitor: vid, session: sid, device: dev, browser: br, screenW: screen.width || 0,
          cta: a.getAttribute("data-tap") || "autre",
          source: source(), landingPage: landing,
          secondsOnPage: Math.round((Date.now() - arrival) / 1000),
          scrollPct: maxScroll,
          referer: (document.referrer || "").slice(0, 200) || null
        };
        if (geo) { row.city = geo.city; row.region = geo.region; row.country = geo.country; }
        push("taps", row);
      } catch (e) {}
    }, true);
  } catch (e) {}
})();
`.trim();
