# Core Web Vitals Audit — urgencemedicale.lhakem3chine.workers.dev

Audited: 2026-08-27
Tool: Lighthouse 13.4.1 CLI (local Chrome 152, headless), `--form-factor=mobile`,
`--only-categories=performance`, default Lighthouse simulated mobile throttling
(RTT 150ms, ~1.6 Mbps down / 675 Kbps up, request latency 562.5ms, **CPU 4x
slowdown**) — Lighthouse's standard "throttled mobile / Slow-4G-class" profile.
Emulated device: Moto G Power-class, 412×823 CSS px, DPR 1.75.

**CrUX/PSI field data could not be retrieved**: the site has no configured Google API
key in this environment, so `pagespeed_check.py` fell back to the anonymous PSI quota,
which was already exhausted (`PSI rate limit exceeded (240 QPM / 25,000 QPD)`). All
numbers below are **lab data from a direct Lighthouse CLI run against the live site**,
not estimates. Real field INP/LCP distributions are listed under "Not verified."

Raw reports: `lh-home.json`, `lh-maarif.json`, `lh-tarifs.json` in the session scratchpad
(452KB/504KB/366KB Lighthouse JSON, generated this session).

## 1. Scorecard

| Page | Perf score | FCP | LCP | Speed Index | TBT (INP proxy) | CLS |
|---|---|---|---|---|---|---|
| `/` | 73 | 1.60s | **3.48s** | 4.22s | **620ms** | 0.000 |
| `/medecin-a-domicile/casablanca/maarif` | 74 | 1.71s | **2.91s** | 2.77s | **824ms** | 0.003 |
| `/tarifs` | 74 | 1.61s | **3.17s** | 3.34s | **698ms** | 0.002 |

Brief targets: LCP < 1.8s, INP < 200ms, CLS < 0.05, critical-path JS < 80kB.

| Metric | Target | Home | Maarif | Tarifs | Verdict |
|---|---|---|---|---|---|
| LCP | <1.8s | 3.48s | 2.91s | 3.17s | **FAIL on all 3**, 62–93% over budget. Also misses Google's own 2.5s "good" field threshold on all 3; lands in the "needs improvement" bucket, not "poor" (>4.0s). |
| INP (TBT proxy) | <200ms | 620ms | 824ms | 698ms | **FAIL on all 3**, 3.5–4× over budget. Lab TBT this high is a strong signal that real-world INP during the first few seconds of interaction (e.g., tapping the phone-call CTA right after load) will land in "poor" (>500ms), but this is inferred, not measured — see "Not verified." |
| CLS | <0.05 | 0.000 | 0.003 | 0.002 | **PASS on all 3**, comfortably under both the brief's 0.05 and Google's 0.1 "good" threshold. |
| Critical-path JS | <80kB | 107.4 KiB | 108.5 KiB | 108.6 KiB | **FAIL on all 3**, 34–36% over budget (transferred/compressed bytes). |

Lighthouse `max-potential-fid` (legacy, informative only, not a CWV metric — reported
here only because Lighthouse still emits it): 398ms / 539ms / 478ms. Not used in the
verdicts above; INP is the real interactivity metric and TBT is its lab proxy per the
brief's own instructions.

## 2. What the LCP element actually is

This is the single most important finding of the audit and it contradicts the
assumption in the brief.

**Homepage (`/`): the LCP element is NOT the hero.** Lighthouse's `lcp-discovery-insight`
and `lcp-breakdown-insight` audits identify the LCP node as the **sticky-header logo
mark**, not the big hero logo or the doctor cutout:

```
selector: div.sticky > div.mx-auto > a.flex > img.h-11
snippet: <img src="/images/mark-96.webp" srcset="/images/mark-96.webp 96w,
          /images/mark-192.webp 192w" sizes="44px" width="96" height="85" ...>
```

Breakdown for that element: TTFB 834ms + resourceLoadDelay 67ms + resourceLoadDuration
374ms + **elementRenderDelay 1840ms** ≈ 3.48s total.

Cross-checking the live HTML `<head>` confirms *why* this happens and why it matters:

```html
<link rel="preload" as="image" imageSrcSet="/images/mark-96.webp 96w, ..." imageSizes="44px"/>                     <!-- NO fetchPriority -->
<link rel="preload" as="image" imageSrcSet="/images/logo-420.webp 420w, ..." fetchPriority="high"/>                 <!-- hero logo -->
<link rel="preload" as="image" imageSrcSet="/images/doctor-640.webp 640w, ..." fetchPriority="high"/>               <!-- doctor cutout -->
```

`lcp-discovery-insight`'s checklist explicitly flags `priorityHinted: false` for the
winning element — i.e. the two images the team deliberately marked
`fetchPriority="high"` (per the brief) are **not** the element Lighthouse measures as
LCP; the un-prioritized 44px header logo is. The 1.84s `elementRenderDelay` (the gap
between "resource ready" and "actually painted") lines up with the page's 620ms of
main-thread blocking time — the header logo's bytes arrive quickly, but paint is
gated behind JS hydration work.

**`/medecin-a-domicile/casablanca/maarif` and `/tarifs`: the LCP element is a text
node**, not an image — the intro paragraph directly under the H1:

```
selector: body.flex > div.flex-1 > main.mx-auto > p.mt-3
maarif snippet: "Un médecin généraliste se déplace à votre domicile à Maarif..."
tarifs snippet: "Le tarif applicable vous est annoncé au téléphone avant..."
```

Breakdown — maarif: TTFB 357ms + **elementRenderDelay 1071ms**. Tarifs: TTFB 268ms +
**elementRenderDelay 1477ms**. No `resourceLoadDelay`/`resourceLoadDuration` subparts
exist for these (it's a text node with no image to fetch) — the entire post-TTFB LCP
budget on these pages is main-thread paint delay, not network. This is the same root
cause as the homepage: JS hydration work (TBT 824ms / 698ms) blocking the browser from
painting text that is otherwise ready to render almost immediately after the HTML
arrives.

**Implication**: optimizing hero image compression/format further will do very little
for LCP on any of these 3 pages. The lever that actually moves LCP here is reducing
main-thread JS execution time (see §3 and §7).

## 3. JS: total shipped, and is it framework or app code

| Page | JS requests | Transfer (compressed) | Resource size (uncompressed) | Unused JS (Lighthouse est.) |
|---|---|---|---|---|
| `/` | 6 | 107.4 KiB | 351.2 KiB | 41 KiB (~38% of the two largest chunks) |
| `/medecin-a-domicile/.../maarif` | 6 | 108.5 KiB | 351.2 KiB | 21 KiB (~19–20%) |
| `/tarifs` | 6 | 108.6 KiB | 351.2 KiB | 21 KiB (~19–20%) |

Per-file breakdown (identical shared chunks on every page, confirmed byte-for-byte
across all 3 reports):

| File | Transfer | Resource |
|---|---|---|
| `webpack-881b7de8f494205d.js` | ~2.0–2.2 KiB | ~3.3 KiB |
| `4bd1b696-c023c6e3521b1417.js` | ~54.8–55.1 KiB | ~169.0 KiB |
| `255-cf15ac3efcf391d6.js` | ~45.6–45.9 KiB | ~169.8 KiB |
| `main-app-e318ac43286a8847.js` | ~0.5–0.7 KiB | ~0.5 KiB |
| `619-ba102abea3e3d0e4.js` | ~3.8–4.0 KiB | ~8.3 KiB |
| `page-<hash>.js` (route-specific) | **0.3–0.7 KiB** | 0.3–0.5 KiB |

- The site's claim of "~103 kB shared, all React/Next runtime" is **essentially
  confirmed**: the 5 shared chunks sum to ~106.5–108.3 KiB transferred, and the
  per-route chunk really is only a few hundred bytes (0.3–0.7 KiB, matching the
  "~200 bytes" claim). This is not marketing spin — it's accurate.
- All JS `<script>` tags in the served HTML have the `async` attribute (verified in
  raw HTML), so **nothing is classically parser/render-blocking**. But async ≠ free:
  once downloaded, this JS still runs on the main thread and is the direct cause of
  the 620–824ms TBT and the 1.0–1.8s LCP `elementRenderDelay` documented in §2. For
  the purposes of the brief's "critical-path JS" budget (JS needed before the page is
  usably interactive/paintable), it counts.
- 107–109 KiB transferred is **34–36% over the 80kB budget** on every single page.
  Because per-page code is negligible, essentially all of the overage is framework
  runtime, not application logic — see §7 for the framework-floor discussion.
- Lighthouse's `unused-javascript` audit flags real, fixable waste inside the two
  biggest chunks: 41 KiB unused on the homepage (38% of `4bd1b696` + `255`), ~21 KiB
  unused on the two content pages (~19–20%). That gap between home and the other pages
  suggests something homepage-specific (probably the hero/interactive header) is
  pulling in code that isn't tree-shaken cleanly, and/or some Next.js runtime paths are
  loaded but unused on lighter pages. This portion (20–40 KiB) is legitimately
  actionable application-level waste, not unavoidable framework floor.

## 4. Image weight and responsive `srcset`

Only the homepage has real hero imagery; the two content pages carry only the 44px
header logo (8.8 KiB) plus two inline `data:image/svg+xml` icons (0 bytes over the
wire).

| Page | Image requests | Transfer |
|---|---|---|
| `/` | 3 real files (+1 inline SVG) | 166.9 KiB |
| maarif / tarifs | 1 real file (+2 inline SVG) | 8.8 KiB |

Homepage images actually served to the emulated 412×823 @ DPR 1.75 device:

| Asset | `sizes` | File served | Transfer |
|---|---|---|---|
| Header logo | `44px` | `mark-96.webp` (correct — smallest candidate) | 8.6–8.8 KiB |
| Hero logo | `(min-width:640px) 300px, 220px` | `logo-420.webp` (correct — smallest candidate) | 35.8–36.7 KiB |
| Doctor cutout | `(min-width:1024px) 46vw, 100vw` | **`doctor-1000.webp`**, not `doctor-640.webp` | 122.5–125.4 KiB |

The `srcSet`/`sizes` mechanism is working correctly (the browser is picking the
smallest candidate that satisfies the required CSS pixels for each element — no
oversized delivery bug). But the **doctor cutout's srcset only offers two steps,
640w and 1000w**. At this viewport (412 CSS px × 100vw × 1.75 DPR ≈ 721 physical px
needed), 640w is too small so the browser is forced up to 1000w — the single largest
asset on the whole site (122–125 KiB, ~38% of the homepage's total page weight of
367 KiB). A mid-size breakpoint (e.g. 750–800w, likely 70–85 KiB) would let
standard-DPR phones avoid the 1000w file. This is a real, fixable gap, not a
srcset bug — the mechanism is sound, the breakpoint set is just too coarse.

Only WebP is served (confirmed via file extensions and `Content-Type`); no AVIF
variant. AVIF is typically 15–30% smaller than WebP at equivalent visual quality and
would be worth testing specifically on the doctor cutout, given it's the single
heaviest asset on the site.

## 5. Font loading (self-hosted Archivo via `next/font`)

Retrieved and parsed the served CSS (`/_next/static/css/3f9fe436a8846ff9.css`):

- **16 `@font-face` rules** declared (weights 500/600/700/800/900 × 3 Unicode-range
  subsets, plus one metric-fallback rule), but only **3 unique `.woff2` files** back
  all of them — this is a **variable font**: each subset file is reused across all 5
  static weight declarations rather than shipping 5× duplicate files. That's good
  engineering, not bloat.
- Of those 3 files, only **2 are actually fetched** on a French-language page: 2
  requests / 66.7–67.0 KiB total (`1a4aa50920b5315c-s.p.woff2` 34.5–34.6 KiB,
  `23d669af23d19c95-s.p.woff2` 32.3–32.4 KiB — matches Lighthouse's `resource-summary`
  font total exactly on all 3 pages). The third subset file
  (`b06b356f834173cc-s.woff2`, Vietnamese-range Unicode) is declared but never
  downloaded because `unicode-range` correctly excludes it from matching French
  content — subsetting is working as intended.
- `font-display: swap` is set on every rule (verified via CSS text match) — text is
  guaranteed to paint in a fallback font rather than staying invisible (no FOIT risk).
  A brief FOUT re-flow on font swap is possible but bounded, and CLS results (§ above,
  0.000–0.003) show it isn't causing visible layout shift in practice, most likely
  because `next/font`'s automatic fallback-font metric adjustment (the
  `Archivo Fallback` `@font-face` seen in the CSS) is sized to match Archivo's metrics.
- Both actively-used font files are `<link rel="preload" as="font" crossorigin>`'d in
  `<head>`, ahead of the stylesheet — correct ordering to avoid a second round-trip
  after CSS parses.
- **Verdict: font loading is not a bottleneck.** No FOIT, no unnecessary subsets
  downloaded, correct preloading, no evidence of CLS from font swap. No action needed
  here — this is one part of the stack that is already close to best-practice.

## 6. Render-blocking resources and third parties

- **Third-party requests: 0 confirmed on all 3 pages** — Lighthouse's `resource-summary`
  reports `third-party: 0 reqs, 0.0 KiB` on every report. The brief's "zero
  third-party" claim holds.
- **Render-blocking JS: none.** Every `<script src>` in the served HTML carries the
  `async` attribute (verified directly in the raw HTML `<head>`), so no JS blocks
  first paint/parsing in the classic sense (it still blocks the main thread once
  loaded — see §2/§3).
- **One render-blocking resource remains: the stylesheet**, a standard
  (non-preloaded, non-inlined) `<link rel="stylesheet" href="/_next/static/css/
  3f9fe436a8846ff9.css">`, 7.3–7.5 KiB compressed on every page. Small in absolute
  terms and served over HTTP/3 (confirmed `alt-svc: h3` + Cloudflare `zstd` encoding
  in response headers), so its contribution to LCP delay is minor relative to the
  600–800ms of JS-driven main-thread blocking, but it is technically the only
  classic render-blocking request on the page. (Lighthouse 13's legacy
  `render-blocking-resources` audit ID has been removed/migrated to insight-based
  audits in this version and returned no data — this finding comes from direct HTML
  inspection, not that audit.)
- Head ordering is otherwise sensible: 2 font preloads → 3 image preloads (2 of them
  `fetchPriority=high`) → stylesheet → low-priority webpack preload → async scripts.

## 7. Prioritised recommendations

**P0 — highest leverage, addresses LCP + INP together on all 3 pages**

1. **Cut main-thread JS execution time.** TBT (620–824ms) and LCP
   `elementRenderDelay` (1.0–1.8s) are the same problem wearing two hats: the browser
   has content ready to paint/respond but is stuck running JS. This is the single
   highest-leverage fix available — it directly attacks both the INP proxy and LCP
   on every page, unlike image/font tuning which (per §2) isn't where the LCP time is
   actually going. Concretely: audit what `4bd1b696-*.js` and `255-*.js` are doing on
   `mount`/hydration (React DevTools Profiler or Chrome Performance panel with CPU
   throttling), defer any non-critical hydration (e.g. below-the-fold interactive
   widgets, analytics, anything not needed for the first paint or the primary CTA) via
   `next/dynamic` with `ssr:false`/`loading` states, and consider `startTransition`
   or islands-style partial hydration for non-essential client components.
2. **Reclaim the 41 KiB (home) / 21 KiB (content pages) of `unused-javascript`**
   Lighthouse flags inside the two largest shared chunks. This is real, fixable waste,
   not framework floor — a bundle analyzer (`@next/bundle-analyzer`) run against the
   `4bd1b696` and `255` chunks will show what's being pulled in but not used per-route.
3. **Investigate the LCP-element mismatch on the homepage.** Confirm with a full
   Chrome DevTools Performance trace (not simulated) whether the sticky-header logo
   is genuinely the LCP element in practice. If confirmed: either give it
   `fetchPriority="high"` too (cheap, but likely low-impact since its bytes already
   arrive quickly — the bottleneck is paint, not fetch, per the 1.84s
   `elementRenderDelay`), or — more likely to actually move the needle — fixing item
   (1) so paint isn't gated behind hydration. Re-run Lighthouse after (1)/(2) to see
   whether the hero doctor image becomes the new LCP candidate once paint isn't
   delayed; if so, re-evaluate the hero's own weight (item 4 below) at that point.

**P1 — moderate, cheap**

4. **Add a mid-size breakpoint to the doctor cutout's `srcset`** (e.g. 750w/800w
   alongside the existing 640w/1000w). At the tested viewport the 640w step is too
   small, forcing every standard/high-DPR mobile phone up to the 1000w file (122–125
   KiB, the single heaviest asset on the site, ~38% of the homepage's page weight).
   An intermediate size would likely cut this to ~70–85 KiB for most phones.
5. **Test AVIF for the doctor cutout specifically** — it's the one asset heavy enough
   (122–125 KiB) that a 15–30% format saving is worth the build-time cost; not worth
   doing site-wide given everything else is already small.

**No action needed (already solid, confirmed by direct measurement)**

- CLS: 0.000–0.003 on all 3 pages, well under both the 0.05 brief target and Google's
  0.1 threshold — the explicit `width`/`height` on every `<img>` is doing its job.
- Font loading: `font-display: swap`, correct subsetting (unused Vietnamese subset
  never fetched), correct preload ordering, variable-font file reuse across 5 weights,
  no measurable FOUT-driven CLS.
- Third parties: genuinely zero, confirmed by Lighthouse's own resource summary.
- Responsive image *selection* logic: correctly picking the smallest sufficient
  candidate everywhere it was checked; the doctor image issue (P1 #4) is a
  breakpoint-density gap, not a broken mechanism.

**Framework floor vs. fixable application code — being explicit**

Of the ~107–109 KiB of transferred JS per page:
- **~65–70 KiB is very likely an unavoidable Next.js 15 / React client-runtime floor**
  for any app-router page that ships client-side hydration at all (webpack runtime +
  React + Next.js router/hydration glue). Getting under 80 KiB by trimming this
  further would mean architectural changes — e.g. reducing how much of the tree is
  client components vs. server components, or reconsidering whether a full React
  hydration runtime is needed at all for a site that is otherwise a fully static
  export (an islands-architecture tool that ships near-zero JS by default, e.g. Astro,
  would trivially clear the 80 KiB budget for a site this content-heavy and
  interaction-light). That's a bigger call than a performance-audit line item, but it
  is the honest ceiling on "fix JS, hit 80 KiB" within the current Next.js
  architecture.
- **~20–41 KiB (the `unused-javascript` finding) is fixable application-level waste**
  within the current architecture — code-splitting and dead-code elimination inside
  the two large shared chunks can plausibly bring the shared bundle from ~107 KiB down
  toward ~70–85 KiB without changing frameworks. That gets close to, but may not fully
  clear, the 80 KiB target — the remaining gap is the framework floor described above.
- The **LCP `elementRenderDelay` problem (§2) is not primarily a framework floor
  issue** — 1.0–1.8 seconds of paint delay after content is ready is disproportionate
  even for a React hydration runtime this size under 4x CPU throttling, and strongly
  suggests avoidable main-thread contention (P0 items above) rather than an inherent
  Next.js tax.

## Not verified (out of scope for this lab-only pass)

- **Real INP** (requires field data / Chrome UX Report or RUM; TBT is a lab proxy
  only, used here per the brief's own fallback instruction). CrUX could not be queried
  in this environment (no Google API key configured; anonymous PSI quota was already
  exhausted at the time of this audit).
- **Real 28-day field LCP/CLS distributions and the 75th-percentile pass/fail
  verdict** Google actually uses — everything above is a single lab run per page, not
  a percentile over real Moroccan 4G traffic.
- **True on-device 4G performance in Morocco** — Lighthouse's simulated throttling
  (150ms RTT / ~1.6 Mbps) is a reasonable proxy but not a live network capture from
  Morocco; real carrier RTT/jitter could be worse.
- **DOM element count via Lighthouse's `dom-size` audit** — that audit ID returned no
  data in this Lighthouse 13.4.1 run (part of the same insight-based-audit migration
  that removed several legacy audit IDs, e.g. `render-blocking-resources`,
  `font-display`, `uses-responsive-images`, `modern-image-formats`,
  `third-party-summary` as scored audits — all returned empty in this version's JSON).
  As a rough proxy, raw HTML tag counts were: ~598 elements on `/`, ~377 on the maarif
  page — well under the ~1,500-element threshold associated with INP risk, but this is
  a manual approximation, not the Lighthouse audit.
- Pages beyond the 3 requested (other quartier pages, city hub pages) were not tested;
  results here should generalize to other quartier pages structurally (same shared JS,
  same template) but were not individually measured.
