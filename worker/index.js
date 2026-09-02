/**
 * Worker entry point.
 *
 * The site is a static export; everything except the two /api and /admin paths
 * below falls straight through to the assets binding.
 *
 * WHY THIS EXISTS: the conversion on this site is a phone tap. The visitor
 * leaves the browser and dials, which every analytics product records as a
 * bounce. Cloudflare Web Analytics is cookie-less by design and has no
 * custom-event API at all, so taps are recorded here instead.
 *
 * The operator's stated need is sharper than analytics: they want to check
 * whether calls that were placed were actually answered. That means the tap
 * record has to be a DURABLE, TIMESTAMPED LIST they can read back and compare
 * against the phone log — not a counter, and not a stream that ages out. So a
 * tap writes a row to D1 when the binding exists, and always logs a line.
 *
 * SAFETY: this Worker sits in front of an emergency medical service. Every
 * unknown path falls through to ASSETS, and every tracking branch is wrapped
 * so a failure inside it can never take the site down. A broken counter must
 * never become a broken phone number.
 */

const TRACK_PATH = "/api/track";
const STATS_PATH = "/admin/stats";

/** Conversions — a tap on the number or on WhatsApp. */
const CONVERSIONS = new Set(["call", "whatsapp"]);
/** Presence — arrival and the 30s heartbeat. */
const PRESENCE = new Set(["view", "ping"]);

const SCHEMA = `CREATE TABLE IF NOT EXISTS taps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  at TEXT NOT NULL,
  event TEXT NOT NULL,
  page TEXT,
  visitor TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  timezone TEXT,
  isp TEXT,
  device TEXT,
  source TEXT,
  referer TEXT
)`;

/**
 * Location, free, from Cloudflare's edge.
 *
 * `request.cf` carries city-level geo on every request at no cost and with no
 * third-party script — this is the part Firebase or a analytics vendor would
 * charge for and would need a client-side SDK to approximate. Deliberately NOT
 * stored: the IP address, and the latitude/longitude (which are a city
 * centroid anyway, so they add precision this log has no business keeping).
 */
function geoOf(request) {
  const cf = request.cf ?? {};
  return {
    country: request.headers.get("cf-ipcountry") ?? cf.country ?? null,
    city: cf.city ?? null,
    region: cf.region ?? null,
    timezone: cf.timezone ?? null,
    isp: cf.asOrganization ?? null,
  };
}

/** Rough device class, so "mobile at 2am" is distinguishable from a desktop browse. */
function deviceOf(request) {
  const ua = request.headers.get("user-agent") ?? "";
  if (/iPhone|Android.*Mobile|Windows Phone/i.test(ua)) return "mobile";
  if (/iPad|Android/i.test(ua)) return "tablet";
  if (!ua) return null;
  return "desktop";
}

/** Where the visitor came from, collapsed to something readable. */
function sourceOf(referer) {
  if (!referer) return "direct";
  try {
    const host = new URL(referer).hostname.replace(/^www\./, "");
    if (host.endsWith("urgencemedicale.ma")) return "interne";
    if (/google\./.test(host)) return "Google";
    if (/bing\./.test(host)) return "Bing";
    if (/facebook|instagram|fb\./.test(host)) return "Facebook/Instagram";
    if (/whatsapp/.test(host)) return "WhatsApp";
    return host;
  } catch {
    return "direct";
  }
}

/**
 * Push the tap into the Firebase Realtime Database the admin dashboard reads.
 *
 * Done server-side, from the Worker, on purpose: the public pages must never
 * load the Firebase SDK. The dashboard (public/admin/) is the only place that
 * does, and it is a separate document, so the emergency pages stay at zero
 * bytes of it.
 *
 * FIREBASE_DB_URL is a Worker variable, not a secret — a Realtime Database URL
 * is public by design. What protects the data is the database rules: reads
 * require an authenticated staff account, writes are open so this Worker can
 * post without carrying a credential.
 */
function dbUrl(env, path) {
  return `${env.FIREBASE_DB_URL.replace(/\/$/, "")}/${path}.json`;
}

/** POST — append under a generated key (Firebase push()). */
async function dbPush(env, path, value) {
  const res = await fetch(dbUrl(env, path), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(value),
  });
  return res.ok;
}

/** PATCH — merge fields without disturbing the rest (Firebase update()). */
async function dbUpdate(env, path, fields) {
  const res = await fetch(dbUrl(env, path), {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(fields),
  });
  return res.ok;
}

async function pushToFirebase(env, row) {
  if (!env.FIREBASE_DB_URL) return false;
  return dbPush(env, "taps", row);
}

/**
 * Presence and session history, mirroring the Nova Style model.
 *
 *   online_visitors/{vid}      one row per person, overwritten by the
 *                              heartbeat. "Who is here now" = rows whose
 *                              lastSeen is recent; the dashboard decides the
 *                              cutoff, so no server-side expiry is needed.
 *   sessions/{YYYY-MM-DD}/{sid} one row per visit, bucketed by day. Bucketing
 *                              by date is what makes "today / 7 days / 30
 *                              days" a cheap read instead of a full scan.
 *
 * `view` writes both and seeds startedAt; `ping` only refreshes liveness and
 * duration, so a reload cannot rewrite when the visit began.
 */
async function recordPresence(env, ev, row) {
  if (!env.FIREBASE_DB_URL) return false;
  const now = Date.now();
  const day = row.at.slice(0, 10);

  const live = {
    visitorId: row.visitor,
    sessionId: row.session,
    page: row.page,
    device: row.device,
    browser: row.browser,
    city: row.city,
    region: row.region,
    country: row.country,
    source: row.source,
    lastSeen: now,
  };
  if (ev === "view") live.arrivalAt = now;

  const tasks = [dbUpdate(env, `online_visitors/${row.visitor}`, live)];

  if (ev === "view") {
    tasks.push(
      dbUpdate(env, `sessions/${day}/${row.session}`, {
        visitorId: row.visitor,
        startedAt: now,
        lastSeen: now,
        page: row.page,
        device: row.device,
        browser: row.browser,
        city: row.city,
        region: row.region,
        country: row.country,
        source: row.source,
        screenW: row.screenW,
      })
    );
  } else {
    tasks.push(dbUpdate(env, `sessions/${day}/${row.session}`, { lastSeen: now }));
  }

  const results = await Promise.all(tasks);
  return results.every(Boolean);
}

async function recordTap(env, row) {
  let sinks = [];
  try {
    if (await pushToFirebase(env, row)) sinks.push("firebase");
  } catch (error) {
    console.error("firebase push failed", error instanceof Error ? error.message : String(error));
  }
  if (!env.DB) return sinks.length ? sinks.join("+") : "log-only";
  await env.DB.prepare(SCHEMA).run();
  await env.DB.prepare(
    "INSERT INTO taps (at, event, page, visitor, country, city, region, timezone, isp, device, source, referer) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(
      row.at, row.event, row.page, row.visitor, row.country, row.city,
      row.region, row.timezone, row.isp, row.device, row.source, row.referer
    )
    .run();
  sinks.push("d1");
  return sinks.join("+");
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

/**
 * A plain HTML list of recent taps, so the operator can open one URL on a
 * phone and read it. Gated by a shared secret held as a Worker secret, never
 * in the repo; without ADMIN_KEY set the route does not exist at all. It sits
 * under /admin, which robots.txt already disallows.
 */
async function statsPage(env, url) {
  if (!env.ADMIN_KEY || url.searchParams.get("key") !== env.ADMIN_KEY) return null;
  if (!env.DB) {
    return new Response("No D1 database bound yet — taps are going to Workers Logs only.", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  await env.DB.prepare(SCHEMA).run();
  const { results } = await env.DB.prepare(
    "SELECT at, event, page, visitor, city, region, country, device, source FROM taps ORDER BY id DESC LIMIT 300"
  ).all();

  const rows = (results ?? [])
    .map(
      (r) =>
        `<tr><td>${esc(r.at)}</td><td>${esc(r.event)}</td><td>${esc(r.page)}</td>` +
        `<td>${esc([r.city, r.region, r.country].filter(Boolean).join(", "))}</td>` +
        `<td>${esc(r.device)}</td><td>${esc(r.source)}</td><td>${esc(r.visitor)}</td></tr>`
    )
    .join("");

  return new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Appels — ${results?.length ?? 0} derniers</title>
<style>body{font:15px system-ui;margin:0;padding:16px;background:#eef3f7;color:#0b1c33}
h1{font-size:18px}table{border-collapse:collapse;width:100%;background:#fff;font-size:14px}
th,td{border-bottom:1px solid #c9d9e6;padding:8px;text-align:left}th{background:#002454;color:#fff}
td:nth-child(2){font-weight:700}</style>
<h1>Derniers appels déclenchés depuis le site (${results?.length ?? 0})</h1>
<p>Chaque ligne = un visiteur qui a appuyé sur le numéro. Comparez avec le journal du téléphone.</p>
<table><tr><th>Date (UTC)</th><th>Type</th><th>Page</th><th>Localisation</th><th>Appareil</th><th>Source</th><th>Visiteur</th></tr>${rows}</table>`,
    { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } }
  );
}


/**
 * Single Content-Security-Policy for /admin.
 *
 * This MUST be applied here rather than in public/_headers. Cloudflare's
 * _headers ADDS a header when a more specific rule repeats one — it does not
 * replace it — so a `/admin/*` CSP alongside the site-wide `/*` CSP results in
 * two policies on the response. Browsers then enforce the INTERSECTION, and
 * the intersection of "allow gstatic" and "allow cloudflareinsights" permits
 * neither. Both the Firebase SDK and Cloudflare's own beacon were blocked.
 *
 * Serving it from the Worker means exactly one policy reaches the browser, and
 * the strict site-wide policy is left untouched for the public pages.
 */
const ADMIN_CSP = [
  "default-src 'self'",

  // script-src needs the database host as well as gstatic. Realtime Database
  // prefers a WebSocket, but when one is unavailable it falls back to long
  // polling, which works by INJECTING <script> tags pointing at the database
  // domain (the /.lp? requests). Without this the dashboard silently retries
  // forever on any network that blocks WebSockets.
  // static.cloudflareinsights.com is the beacon Cloudflare injects itself.
  "script-src 'self' 'unsafe-inline' https://www.gstatic.com https://static.cloudflareinsights.com " +
    "https://*.firebasedatabase.app https://*.firebaseio.com",

  // connect-src MUST list the wss: origins explicitly. CSP matches on scheme,
  // and an https: source does NOT authorise a wss: connection — that mismatch
  // is what blocked the socket and forced the long-polling fallback above.
  // gstatic is here only so devtools can fetch the SDK source maps.
  "connect-src 'self' " +
    "wss://*.firebasedatabase.app wss://*.firebaseio.com " +
    "https://*.firebasedatabase.app https://*.firebaseio.com " +
    "https://identitytoolkit.googleapis.com https://securetoken.googleapis.com " +
    "https://cloudflareinsights.com https://www.gstatic.com",

  // Realtime Database opens a hidden iframe to a regional shard host
  // (s-gke-euw1-*.firebasedatabase.app) during its connection handshake, and
  // Auth uses one on the authDomain for some flows. Without frame-src these
  // fall back to default-src 'self' and are blocked, which shows up as
  // reconnect churn even when the socket itself is fine.
  "frame-src 'self' https://*.firebasedatabase.app https://*.firebaseio.com " +
    "https://urgencemedicale-8b903.firebaseapp.com",

  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  // frame-ancestors stays 'none': nothing may embed the dashboard itself.
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

/** Serves an /admin asset with exactly one CSP, replacing whatever _headers set. */
async function serveAdmin(request, env) {
  const upstream = await env.ASSETS.fetch(request);
  const headers = new Headers(upstream.headers);
  headers.delete("content-security-policy");
  headers.set("content-security-policy", ADMIN_CSP);
  headers.set("x-robots-tag", "noindex, nofollow");
  headers.set("cache-control", "no-store");
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers });
}

export default {
  async fetch(request, env) {
    let url;
    try {
      url = new URL(request.url);
    } catch {
      return env.ASSETS.fetch(request);
    }

    if (url.pathname === STATS_PATH) {
      try {
        const page = await statsPage(env, url);
        if (page) return page;
      } catch (error) {
        console.error("stats failed", error instanceof Error ? error.message : String(error));
      }
      return env.ASSETS.fetch(request); // wrong/absent key: behave as if the route does not exist
    }

    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
      return serveAdmin(request, env);
    }

    if (url.pathname !== TRACK_PATH) return env.ASSETS.fetch(request);

    try {
      const event = url.searchParams.get("e") ?? "";
      if (CONVERSIONS.has(event) || PRESENCE.has(event)) {
        const referer = (request.headers.get("referer") ?? "").slice(0, 200) || null;
        const q = (k, n) => (url.searchParams.get(k) ?? "").slice(0, n);
        const row = {
          at: new Date().toISOString(),
          event,
          page: q("p", 200),
          visitor: q("v", 40),
          session: q("s", 40),
          ...geoOf(request),
          // The client reports its own device/browser; fall back to the
          // user-agent when it did not (very old browser, or JS partly blocked).
          device: q("d", 20) || deviceOf(request),
          browser: q("b", 20) || null,
          screenW: Number(q("w", 6)) || null,
          source: sourceOf(referer),
          referer,
        };

        if (PRESENCE.has(event)) {
          const ok = await recordPresence(env, event, row);
          // Pings are frequent; only log arrivals, or the log is unreadable.
          if (event === "view") console.log(`VIEW ${ok ? "stored" : "log-only"} ${JSON.stringify(row)}`);
        } else {
          const mode = await recordTap(env, row);
          // Stable prefix so this is one filter term in Workers Logs.
          console.log(`TAP ${mode} ${JSON.stringify(row)}`);
        }
      }
    } catch (error) {
      console.error("track failed", error instanceof Error ? error.message : String(error));
    }

    return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  },
};
