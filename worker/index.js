/**
 * Worker entry point.
 *
 * This site is a static export, so 99.9% of requests are served straight from
 * the assets binding. The one exception is `/api/track`, which exists because
 * the conversion on this site is a phone tap — the visitor leaves the browser
 * and calls. No client-side analytics product sees that as anything but a
 * bounce, and Cloudflare Web Analytics (cookie-less, which is why it was
 * chosen) has no custom-event API at all.
 *
 * So taps are recorded here instead: the page fires a beacon, this Worker
 * logs one line, and `observability.enabled` in wrangler.jsonc puts that line
 * in Workers Logs where it can be queried per page. No third party, no
 * cookies, no consent banner, no extra vendor.
 *
 * SAFETY: this Worker sits in front of an emergency medical service. Every
 * path that is not exactly `/api/track` falls through to the assets binding,
 * and the tracking branch is wrapped so that a failure inside it can never
 * take the site down — a broken counter must never become a broken phone
 * number.
 */

const TRACK_PATH = "/api/track";

/** Events the page is allowed to report. Anything else is dropped. */
const ALLOWED_EVENTS = new Set(["call", "whatsapp"]);

export default {
  async fetch(request, env, ctx) {
    let url;
    try {
      url = new URL(request.url);
    } catch {
      return env.ASSETS.fetch(request);
    }

    if (url.pathname !== TRACK_PATH) {
      return env.ASSETS.fetch(request);
    }

    try {
      const event = url.searchParams.get("e") ?? "";
      // `p` is the page that produced the tap. Cap the length so a crafted
      // URL cannot write unbounded data into the logs.
      const page = (url.searchParams.get("p") ?? "").slice(0, 200);

      if (ALLOWED_EVENTS.has(event)) {
        console.log(
          JSON.stringify({
            type: "conversion",
            event,
            page,
            country: request.headers.get("cf-ipcountry") ?? null,
            referer: (request.headers.get("referer") ?? "").slice(0, 200) || null,
            at: new Date().toISOString(),
          })
        );
      }
    } catch (error) {
      // Never surface a tracking failure to the visitor.
      console.error("track failed", error instanceof Error ? error.message : String(error));
    }

    // 204 with no body: the beacon does not need a response, and this keeps
    // the request cheap. `no-store` so no intermediary ever caches a hit.
    return new Response(null, {
      status: 204,
      headers: { "cache-control": "no-store" },
    });
  },
};
