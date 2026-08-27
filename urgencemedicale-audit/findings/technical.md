# Technical SEO Audit — urgencemedicale.lhakem3chine.workers.dev

Audited: 2026-08-27
Scope: `https://urgencemedicale.lhakem3chine.workers.dev` (Next.js 15 static export, `output: "export"`, served from Cloudflare Workers static assets — confirmed via `wrangler.jsonc` `"assets": { "directory": "./out", "not_found_handling": "404-page" }` and `next.config.ts` `output: "export"`).

**PRE-LAUNCH CAVEAT (read first):** This is a preview URL on `*.workers.dev`. The production domain `urgencemedicale.ma` (with `www.` prefix, per `src/lib/site.ts` `SITE_URL = "https://www.urgencemedicale.ma"`) has not been purchased yet. Every canonical, hreflang tag, and the `robots.txt` `Sitemap:` line already point at `www.urgencemedicale.ma`, not the workers.dev host that's actually serving the content. Per the task brief this is treated as a known pre-launch state, not a bug — but it has real indexing implications, captured under Critical #2 below, that need action before or at launch.

Technical score: **72/100** — solid static-export fundamentals (SSR-complete HTML, valid structured data, correct 404 handling, immutable static-asset caching, full internal link graph with no orphans) held back by a complete absence of security response headers, no HTTP→HTTPS enforcement on the tested host, and the unresolvable canonical/sitemap host pointing at a domain that doesn't exist yet.

---

## Critical

**1. No security headers present at all — verified on every response tested.**
Headers actually returned by `https://urgencemedicale.lhakem3chine.workers.dev/` (homepage), `/robots.txt`, `/medecin-a-domicile/casablanca/maarif`, and `/pediatre-a-domicile/casablanca`:
```
Date, Content-Type, Transfer-Encoding/Content-Length, Connection,
CF-Cache-Status, Cache-Control, Nel, Report-To, Content-Encoding (zstd, homepage only),
Server: cloudflare, CF-RAY, alt-svc
```
None of `Strict-Transport-Security`, `X-Content-Type-Options`, `Content-Security-Policy`, `Referrer-Policy`, `X-Frame-Options`, or `Permissions-Policy` are present on any tested URL. `public/_headers` (repo root) confirms why — it only defines three rules:
```
/icon                → Content-Type: image/png; Cache-Control: public, max-age=86400
/opengraph-image      → Content-Type: image/png; Cache-Control: public, max-age=86400
/_next/static/*       → Cache-Control: public, max-age=31536000, immutable
```
There is no catch-all `/*` block for security headers. Recommendation: add a `/*` rule to `public/_headers` (or Cloudflare Transform Rules) setting at minimum `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a baseline `Content-Security-Policy`.

**2. Canonical/hreflang/sitemap all declare a host (`www.urgencemedicale.ma`) that isn't live, while the actual crawlable content sits on an unrestricted `*.workers.dev` host.**
- `robots.txt` served from the workers.dev host: `Allow: /`, `Disallow: /admin`, `Sitemap: https://www.urgencemedicale.ma/sitemap.xml` — nothing blocks crawling of the workers.dev host itself.
- `sitemap_discovery.py` confirmed the declared sitemap URL fails safety/host validation (`"error": "URL safety validation failed", "cross_host": true`) — i.e., the declared sitemap is not reachable from where it's declared. It only found a valid sitemap via the `common_path` fallback at `https://urgencemedicale.lhakem3chine.workers.dev/sitemap.xml` (200, `kind: urlset`, `valid: true`).
- Canonicals verified on 3 pages all point off-host: homepage → `https://www.urgencemedicale.ma`, `/medecin-a-domicile/casablanca/maarif` → `https://www.urgencemedicale.ma/medecin-a-domicile/casablanca/maarif`, `/pediatre-a-domicile/casablanca` → `https://www.urgencemedicale.ma/pediatre-a-domicile/casablanca`.

Implication: if this workers.dev URL is ever crawled or linked externally before launch (nothing currently prevents it — no auth wall, no noindex, permissive robots.txt), Google may index the workers.dev copy with a canonical pointing at a domain that returns nothing yet, or may simply drop the canonical target and index the workers.dev URL directly. Either way it creates a duplicate/competing URL to clean up post-launch. Recommendation before sharing this URL publicly or letting it get crawled: put the workers.dev preview behind Cloudflare Access or add a preview-only `X-Robots-Tag: noindex` response header (host-scoped, never shipped to the production domain).

---

## High

**3. No HTTP→HTTPS redirect on the tested host.** `curl -v http://urgencemedicale.lhakem3chine.workers.dev/` connects on port 80 and returns a full `200 OK` HTML response in cleartext — no `Location` redirect to `https://`. Combined with the missing HSTS header (#1), there is currently nothing forcing HTTPS on this host. This is almost certainly a workers.dev-preview characteristic rather than app config (no HTTPS-redirect logic exists in the Next.js app either way, since it's a static export), but it must be explicitly verified once the custom domain is attached to the Cloudflare zone — check "Always Use HTTPS" / edge certificate settings and add HSTS at that point.

**4. Trailing-slash redirects use `307 Temporary Redirect`, not `301`/`308` (permanent).** Verified on two URLs:
- `GET /medecin-a-domicile/casablanca/maarif/` → `307 Temporary Redirect`, `Location: /medecin-a-domicile/casablanca/maarif`
- `GET /medecin-a-domicile/casablanca/` → `307 Temporary Redirect`, `Location: /medecin-a-domicile/casablanca`
This is Cloudflare Workers static-assets' platform default behavior (not app code — there's no redirect logic in the Next.js source), but a `307` sends a weaker permanence signal to crawlers than a `301`/`308` for what is, in fact, a permanent URL-normalization rule. Worth checking whether Wrangler/Workers assets expose a config knob for this; if not, low-cost to fix with a one-line Worker redirect rule, low priority to actually act on given Google treats both as consolidation signals in practice.

---

## Medium

**5. `www.` is hardcoded as the canonical host, but the apex-vs-www decision hasn't been enforced anywhere yet.** `SITE_URL = "https://www.urgencemedicale.ma"` in `src/lib/site.ts` drives every canonical, hreflang, OG URL, and the robots.txt sitemap line. Because the domain isn't registered, there's no way to test today whether `urgencemedicale.ma` (apex) redirects to `www.urgencemedicale.ma`. This must be configured as a Cloudflare zone-level 301 redirect (or DNS-only apex handling) at launch and re-verified — a missed apex→www redirect would let both hosts serve live content with the same self-referencing-canonical pages fighting each other.

**6. Domain/brand spelling mismatch flagged directly in the source comments.** `src/lib/site.ts`: *"the operator's vehicle livery and hero artwork read 'urgencemedical.ma' (no trailing e). They confirmed the site should keep this spelling, so the printed assets are the ones that will need updating."* This is a real off-site risk: users who search or type the printed spelling (`urgencemedical.ma`) from the van/hero artwork will not land on the site unless that variant is also registered and redirected. Flagging so it's tracked as a pre-launch action item (register the misspelled variant + 301 to canonical, or fix the print assets).

**7. Secondary navigation and long-tail link grids have tight mobile tap targets.** Verified from source (not device-tested):
- `SiteHeader` top-level nav links and dropdown items (`src/components/SiteHeader.tsx`) use `px-2.5 py-1.5` on `text-sm` — roughly 10px/6px padding around ~16-18px text, estimated rendered height ~32–36px CSS px. This clears WCAG 2.5.8's 24px floor but is below the 44–48px Apple/Material recommendation.
- `LinkGrid` (`src/components/ui.tsx`), used for quartier lists on every city-hub page (e.g., the "Quartiers couverts à Casablanca" section) and reused in footer-style lists, renders plain unpadded inline `<Link>` text in a 2-column grid with only `gap-y-2` (8px) vertical spacing between rows.
- By contrast, the primary CTAs are correctly sized: `CallButton`/`WhatsAppButton` use `py-3` (12px) padding with 44px (`h-11 w-11`) icon circles, and the header's `tel:` link uses `py-1.5`/`px-3-4` with an 8px icon circle — these meet or approach the 44px guidance. So the primary conversion actions are fine; it's the secondary/long-tail navigation that's tight.

**8. `sitemap.xml` `<lastmod>` is identical across all 130 URLs.** Every entry carries the same build-time timestamp (e.g. `2026-08-27T13:46:46.371Z`, from `new Date()` evaluated once in `src/app/sitemap.ts`), rather than each page's actual last-content-change date. This is common for static-export sitemaps but gives crawlers zero signal about which of the 130 pages actually changed between deploys.

---

## Low

**9. Homepage hero ships two `fetchPriority="high"` images plus a separate `<link rel=preload>`.** `Hero.tsx` sets `fetchPriority="high"` on both its own logo `<img>` and the doctor photo `<img>`, while the page `<head>` already carries a distinct `<link rel="preload" as="image" imageSrcSet="/images/mark-96.webp 96w, /images/mark-192.webp 192w">` for the *header's* logo (a third, separate image asset). Three competing high-priority image requests on first paint is a minor inefficiency, though observed file sizes are small enough (`/icon` = 1,256 bytes, `/opengraph-image` = 35,386 bytes) that it's unlikely to meaningfully hurt LCP; the actual hero photo's file size was not measured (see Not verified).

**10. `robots.txt` disallows `/admin`, a route that doesn't currently exist.** `curl -o /dev/null -w '%{http_code}' https://…/admin` → `404`. Harmless, forward-looking hygiene, not a defect.

**11. URLs are case-sensitive (standard static-host behavior).** `/Medecin-A-Domicile/Casablanca` → `404`. Not a bug — all internal links observed in source consistently use lowercase slugs — but worth a quick check that no external/marketing material links with mixed case.

---

## Passing / Verified Good

- **Sitemap count and structure:** `sitemap.xml` returns 130 `<loc>` entries (`grep -c '<loc>'` = 130), 0 duplicates, valid `urlset` XML per `sitemap_discovery.py` (`"kind": "urlset", "valid": true`). Matches the claimed 130-URL, content-graph-generated sitemap. Breakdown by path prefix confirms all page types present: `medecin-a-domicile` (35), `ecg-domicile` (17), `fievre-enfant-nuit` (17), `prise-de-sang-domicile` (17), `cardiologue/generaliste/geriatre/pediatre/urgentiste-a-domicile` (7 each), plus 1 each of home, a-propos, certificat-medical, contact, contre-visite-medicale, nos-medecins, reserver, suivi-post-hospitalisation, tarifs. Priorities are meaningfully tiered (home=1, city hubs=0.9 ×16, quartier/specialty-hub/situation=0.8 ×30, city-specialty=0.7 ×30, situation-city=0.6 ×48, corporate=0.5 ×5) rather than decorative.
- **Canonicals:** self-referencing and absolute on all 3 tested pages (homepage, `/medecin-a-domicile/casablanca/maarif`, `/pediatre-a-domicile/casablanca`), each exactly matching the page's own path under `SITE_URL`.
- **Hreflang:** `fr-MA` and `x-default` both present and self-referencing (identical URL to canonical) on all 3 tested pages — correct for a genuinely single-locale site; no return-tag conflicts possible since there's only one URL in the cluster. Will need real reciprocal validation once an `ar-MA` variant is added (`src/lib/seo.ts` comments confirm this is anticipated).
- **404 handling:** real HTTP `404` status (not a soft-404) — confirmed via `wrangler.jsonc`'s `"not_found_handling": "404-page"` and a live `curl` returning `404 Not Found` with the exported `404.html` body for `/nonexistent-page-xyz-123`.
- **Static asset caching:** `/_next/static/css/3f9fe436a8846ff9.css` and `/_next/static/chunks/webpack-881b7de8f494205d.js` both return `Cache-Control: public, max-age=31536000, immutable` as claimed.
- **Icon/OG image content-type pinning:** `/icon` → `Content-Type: image/png` (1,256 bytes); `/opengraph-image` → `Content-Type: image/png` (35,386 bytes) — both as declared in `public/_headers`.
- **Indexability / no noindex:** no `noindex`, `robots:`, or `nofollow` directives found anywhere in `src/` (grep, zero matches), and no `<meta name="robots">` tag in rendered HTML — default index/follow.
- **No orphan pages:** every page type is reachable within ~2 clicks of the homepage. `SiteFooter.tsx` links to every specialty hub, city hub, and situation page from literally every page. `SiteHeader.tsx` mirrors this via CSS-only (`<details>/<summary>`, no JS) dropdown nav. `CityHubPage.tsx` links to its quartiers and city-specialty pages; `SpecialtyHubPage.tsx` links to its city-specialty pages and other specialty hubs; `SituationPage.tsx` links to its situation-city pages and other situations. All links are real `<a href>` (Next `<Link>` in a static export), so this graph is intact for JS-disabled crawlers too.
- **JS rendering — pure SSR, no CSR dependency:** `render_page.py` on all 3 tested pages returned `"mode_used": "raw"`, `"is_spa": false`, `"redirect_chain": []`, `"console_errors": []` — full content is present on the raw HTML response, no headless rendering was needed. Zero `"use client"` components exist anywhere in `src/` — the only JS shipped is Next's own framework runtime (e.g. the 3,330-byte `webpack-*.js` chunk, loaded `async` with `fetchPriority="low"`, cached immutable). The header dropdown nav uses native `<details>/<summary>` rather than JS state. This minimizes main-thread work and INP risk by construction, though no field/lab INP data was actually measured.
- **Structured data:** JSON-LD present and schema-valid (`"valid": true`, no errors) on all 3 tested pages — homepage (2 blocks), `/medecin-a-domicile/casablanca/maarif` (`BreadcrumbList`, `City`, `GeoCoordinates`, `ListItem`, `MedicalBusiness`, `Place`, plus `FAQPage`/`Question`/`Answer`), `/pediatre-a-domicile/casablanca` (`BreadcrumbList`, `City`, `ListItem`, `MedicalBusiness`, plus `FAQPage`/`Question`/`Answer`).
- **Mobile viewport:** correct `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present (set once in `RootLayout`, applies to every page).
- **CLS-relevant image handling:** every `<img>` inspected (header logo, hero logo, hero photo) carries explicit `width`/`height` attributes; the hero photo's container also reserves `min-h-[280px] lg:min-h-[520px]` independent of image load state.
- **No page-level horizontal overflow found in source:** the `/tarifs` pricing table is wrapped in `overflow-x-auto` (scrolls within its own box, not the page); no fixed large-px-width rules found in `globals.css`; the H1 uses fluid `clamp()` sizing.
- **Fonts:** `next/font` (`Archivo`) with `display: "swap"` and `<link rel=preload as=font crossorigin>` for the woff2 files in `<head>` — reduces invisible-text risk and blocking on the text LCP path.
- **reserver page has no client-side form dependency:** `/reserver` is a call/WhatsApp-only page (verified from source) — no broken-without-JS form to worry about.

---

## Not Verified (ran out of turns before completing)

- **No Lighthouse / PageSpeed Insights / CrUX field data was collected.** All Core Web Vitals commentary above (#9 and the LCP/CLS/INP "Passing" notes) is inferred from HTML/CSS/JS source inspection only, not measured. Actual LCP/INP/CLS numbers, and the real file size of the hero doctor photo, are unknown.
- **IndexNow protocol** (Bing/Yandex/Naver key file, submission behavior) was not checked at all.
- Only 2 deep pages (`/medecin-a-domicile/casablanca/maarif`, `/pediatre-a-domicile/casablanca`) plus the homepage were tested directly; the other ~127 sitemap URLs were not individually fetched for canonical/hreflang/status-code correctness (spot-checked via the content-graph source instead, e.g. `sitemap.ts`, `CityHubPage.tsx`, `SpecialtyHubPage.tsx`, `SituationPage.tsx`).
- No real mobile device or browser viewport emulation was run (no screenshots captured in this session); tap-target and overflow findings (#7, and the "no horizontal overflow found" note) are estimated from Tailwind class inspection, not rendered/measured.
- Did not check `X-Robots-Tag` HTTP header specifically (only checked in-HTML `<meta name="robots">` and grepped source) — unlikely given the CMS-less static export, but not explicitly curl-tested per-page beyond the 3 sampled URLs.
- Did not test redirect/DNS behavior for the actual production domain (`urgencemedicale.ma` / `www.urgencemedicale.ma`) since it isn't registered yet — apex↔www redirect (#5) and HTTPS/HSTS enforcement (#3) can only be verified once the domain is live on the Cloudflare zone.
- `Content-Encoding: zstd` was observed on the homepage response; did not verify compression is consistently applied across all page types/asset types.

---

## Key File References

- `C:\Users\asus\Documents\GitHub\urgencemedicale\public\_headers` — only header rules in the repo (icon/OG content-type, `/_next/static/*` immutable caching); no security-header block.
- `C:\Users\asus\Documents\GitHub\urgencemedicale\src\app\robots.ts` — generates `Allow: /`, `Disallow: /admin`, `Sitemap: ${SITE_URL}/sitemap.xml`.
- `C:\Users\asus\Documents\GitHub\urgencemedicale\src\app\sitemap.ts` — content-graph-driven sitemap generator, 130 entries, tiered priorities, shared `lastModified = new Date()` for all entries.
- `C:\Users\asus\Documents\GitHub\urgencemedicale\src\lib\seo.ts` — single `pageMetadata()` helper producing self-referencing canonical + `fr-MA`/`x-default` hreflang + OpenGraph/Twitter tags for every page.
- `C:\Users\asus\Documents\GitHub\urgencemedicale\src\lib\site.ts` — `SITE_URL = "https://www.urgencemedicale.ma"` (hardcoded www host; contains the "urgencemedical.ma" printed-asset spelling-mismatch note).
- `C:\Users\asus\Documents\GitHub\urgencemedicale\wrangler.jsonc` — confirms static-assets-only Worker, `not_found_handling: "404-page"`.
- `C:\Users\asus\Documents\GitHub\urgencemedicale\next.config.ts` — confirms `output: "export"`, `images.unoptimized: true`.
- `C:\Users\asus\Documents\GitHub\urgencemedicale\src\components\SiteHeader.tsx`, `SiteFooter.tsx`, `src\components\templates\CityHubPage.tsx`, `SpecialtyHubPage.tsx`, `SituationPage.tsx` — internal link graph (orphan-page and crawl-depth analysis).
- `C:\Users\asus\Documents\GitHub\urgencemedicale\src\components\Hero.tsx`, `CallButton.tsx`, `WhatsAppButton.tsx`, `src\components\ui.tsx` — mobile tap-target and CWV (fetchPriority/CLS) source review.
- `C:\Users\asus\Documents\GitHub\urgencemedicale\urgencemedicale-audit\home-render.json` — pre-existing raw-fetch capture of the homepage (headers, structured data) referenced above.
