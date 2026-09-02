/**
 * Service worker for the installed dashboard.
 *
 * Scope is /admin/ only — it must never intercept the public site, which is
 * an emergency service where a stale cached page could show a wrong phone
 * number. Caching here is a network-first shell so the app opens instantly
 * and still works on a weak connection in a stairwell.
 *
 * Firebase traffic is deliberately never cached: the dashboard is live data
 * and a cached balance is a wrong balance.
 */
const CACHE = "um-admin-v1";
const SHELL = [
  "/admin/",
  "/admin/index.html",
  "/admin/manifest.json",
  "/admin/data.js",
  "/admin/firebase-config.js",
  "/admin/icon-192.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Only our own /admin/ assets. Everything else — Firebase, the SDK, the
  // public site — goes straight to the network, untouched.
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/admin/")) return;
  if (e.request.method !== "GET") return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || caches.match("/admin/")))
  );
});
