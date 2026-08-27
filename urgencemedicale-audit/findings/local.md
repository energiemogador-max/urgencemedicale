# Local SEO Audit — urgencemedicale.lhakem3chine.workers.dev

Audited: 2026-08-27. Method: direct fetch of live pages (homepage, /contact,
/medecin-a-domicile/casablanca, /medecin-a-domicile/casablanca/maarif,
/medecin-a-domicile/agadir) plus direct read of the Next.js source/content
repo (`content/business.ts`, `content/geo.ts`, `content/drafts/*`,
`src/lib/schema-org/*`, `src/components/templates/*`, `src/lib/site.ts`).
Source access lets this audit confirm root causes (e.g. hardcoded
`SITE_URL`), not just symptoms.

Business type: **Service-Area Business (SAB)** — home-visit doctors, no
patient-facing premises. Industry vertical: **Healthcare** (home-visit
medical / house-call doctor service; closest Google-supported schema
analogue is generic `MedicalBusiness`, since no "house call doctor" subtype
exists).

---

## Local SEO Score: 25 / 100 (Critical)

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| GBP Signals | 25% | 2 / 25 | No GBP exists. Nothing to score beyond on-page CTAs GBP would eventually mirror. |
| Reviews & Reputation | 20% | 1 / 20 | Zero reviews anywhere (no `aggregateRating`, no review widget). Cannot exist without GBP. |
| Local On-Page SEO | 20% | 12 / 20 | Genuinely strong architecture and unique per-location content (see below) — held back by placeholder data and the canonical/domain problem. |
| NAP Consistency & Citations | 15% | 4 / 15 | Internally consistent NAP, but a live placeholder postal code and zero external citations. |
| Local Schema Markup | 10% | 6 / 10 | Technically more sophisticated than the entire competitive set (see below) but ships placeholder values in required/identifier fields. |
| Local Link & Authority Signals | 10% | 0.5 / 10 | No backlinks, no citations, not yet on a resolvable production domain. |

**Read this score with one caveat above everything else:** these dimension
scores assume the domain/canonical issue (Critical #1 below) gets fixed.
As currently deployed, realized visibility is effectively **zero**
regardless of how good any individual dimension is, because every
canonical tag, hreflang, Open Graph URL, sitemap URL, and JSON-LD `@id` on
the live site points at a domain (`www.urgencemedicale.ma`) that does not
currently resolve (confirmed: DNS lookup fails, `curl` exit code 6 / could
not resolve host). Nothing else in this report matters until that's
resolved — a search engine that finds this content only has a canonical
pointer to a page that doesn't exist.

---

## NAP Consistency Audit

| Field | Header | Footer (every page) | /contact | JSON-LD (`MedicalBusiness`) | Consistent? |
|---|---|---|---|---|---|
| Name | "Urgence Médicale" (brand mark, not legal name — `SITE_NAME`, explicitly *not* a business fact per code comment) | "Urgence Médicale Casablanca" (`legalName`) | "Urgence Médicale Casablanca" | `"name": "Urgence Médicale Casablanca"` | **Minor mismatch.** Header uses a shortened marketing brand; footer/contact/schema use the full legal name. Fine for a logo lockup, but this exact pair needs to be the literal GBP "Business name" field once GBP is created — GBP name mismatches are a named NAP-consistency ranking factor. |
| Phone | 06 01 99 12 96 / `tel:+212601991296` | — (not shown in footer) | 06 01 99 12 96 / `tel:+212601991296` | `"telephone": "+212601991296"` | **Consistent.** Display format (local) + href/schema format (E.164 `+212...`) is exactly the correct Moroccan convention — no defect here. |
| Street | — | "Hay Essalam, GH 2, Imm 4" | "Hay Essalam, GH 2, Imm 4" | `"streetAddress": "Hay Essalam, GH 2, Imm 4"` | Consistent where shown. |
| Postal code | — | **`[À CONFIRMER]`** (literal string, renders visibly) | **`[À CONFIRMER]`** (literal string, renders visibly) | **`"postalCode": "[À CONFIRMER]"`** | **Consistent — and consistently wrong.** This is a live placeholder shipping to production on every page's footer, on /contact, and inside the site-wide `MedicalBusiness` JSON-LD, confirmed by direct fetch. |
| City / Region | — | Casablanca / Casablanca-Settat | Casablanca / Casablanca-Settat | `addressLocality: "Casablanca"`, `addressRegion: "Casablanca-Settat"` | Consistent. |
| Geo | — | — | — | `lat: 33.596, lng: -7.546` (3 decimal places) | Only source of geo; source code comment flags it explicitly as "approximate — not verified against a real map," a best-effort neighborhood estimate rather than a confirmed pin. |
| Ordre National des Médecins n° (practitioner credential, adjacent to NAP trust) | — | — | — | Rendered in `TrustBlock` on every page and in the `Physician` schema `identifier` value | **`[À CONFIRMER]`** placeholder, live in production, same issue class as the postal code but higher stakes (see Critical #2). |

**Root cause, not just a content gap:** `content/geo.ts` and
`content/business.ts` deliberately encode these as visible
`"[À CONFIRMER]"` sentinels rather than inventing values — the codebase has
a `todo()`/`isPlaceholder()` guard (`content/schema.ts`) that fails the
build if most fields are left blank, but `postalCode`, `geo`, and
`ordreNumber` were intentionally exempted from that guard and shipped as
visible placeholder strings instead. That's a defensible engineering
choice to avoid inventing facts, but it means these three fields are the
single fastest fix available — they're a data-collection task, not a
schema or code task.

---

## Local Schema Markup Validation

Type: `MedicalBusiness` (single site-wide node, `@id`-referenced fragments
on every city/quartier page rather than repeating the full graph). This is
a sound, above-average technical pattern — genuinely more sophisticated
than typical programmatic local-page builds — and, per the confirmed
competitive set, **no competitor in this market ships any JSON-LD at all**.
That's a real structural advantage once the data-quality issues below are
fixed.

**Required properties**
| Property | Status |
|---|---|
| `name` | Present, correct. |
| `address` | Present, but `postalCode` value is the literal placeholder string — technically populated, not technically valid. |

**Recommended properties**
| Property | Status |
|---|---|
| `geo` | Present, but 3 decimal places (~111m precision) vs. Google's 5-decimal recommendation (~1.1m), and self-flagged in source as an unverified estimate. Low priority to fix precisely for an SAB (Google does not display an exact pin for a profile with address hidden), but still worth correcting before any citation building, since data aggregators and Bing Places do use it. |
| `openingHoursSpecification` | Present and correctly modeled as 24/7 (Mon–Sun, 00:00–23:59). |
| `telephone` | Present, correct E.164 format. |
| `url` | **Missing.** No `url` property on the `MedicalBusiness` node (only the `@id`, which is not the same thing). Easy fix. |
| `priceRange` | **Missing**, despite real published prices existing (500 MAD day / night / weekend per the FAQ schema already on the homepage). Easy fix. |
| `aggregateRating` | Absent — correctly, since there are zero reviews. Nothing to fix here; don't fabricate one. |
| `image` | Missing. |

**SAB-specific — `areaServed`:** Modelled as a flat array of 16
`{"@type":"City","name":...}` entities on the homepage node, with
individual `Place`/`City`-scoped fragments (correctly nesting
`containedInPlace` for quartier → city) on each location page, all
referencing the same `@id` rather than duplicating the full business graph.
This is the right shape for a multi-city SAB. Gap: no `sameAs` links from
the city entities to Wikidata/Wikipedia, which is the industry-recommended
way to disambiguate a plain city name for Google's entity graph and for AI
answer engines — low cost to add, meaningful for AI-visibility citation
factors.

**Practitioner schema:** A `Physician` node exists in code
(`src/lib/schema-org/physician.ts`) with `identifier.propertyID: "Ordre
National des Médecins"` — a legitimate, well-formed pattern. Currently its
`identifier.value` would publish the literal `[À CONFIRMER]` string as a
professional credential identifier. Confirmed competitive fact: **no
competitor in this market names a single doctor or publishes an Ordre
number** — every competitor uses aggregate counts ("+340 médecins", "350+",
"50 médecins"). That makes a real, filled-in named-doctor + Ordre-number
pattern a genuine E-E-A-T differentiator nobody else in the market has —
reason to prioritize getting the real number, not to drop the feature.

**Modelling tension worth flagging:** publishing a full, specific-looking
street address in `PostalAddress` for a business whose whole model is "the
doctor comes to you" sits awkwardly next to the footer's "Le cabinet" ("the
practice") heading over that same address — visually implying a
walk-in-able premises. Schema.org doesn't require on-page display of the
address; Google's own SAB guidance is to hide the public address entirely
once GBP is configured as a service-area business. Recommend either
dropping the visible address from the footer/contact page or relabeling it
clearly as a correspondence-only address, and matching that choice in GBP
once created.

---

## GBP Readiness (No GBP Exists Yet)

| Checklist item | Status |
|---|---|
| GBP profile created | **Missing.** Confirmed no GBP exists. |
| Primary category selection | Not applicable yet — but this is the **#1-weighted local ranking factor** (Whitespark 2026, score 193) and wrong category is the **#1 negative factor** (score 176). No obvious exact-match Google category exists for "home-visit doctor" in most locales; needs manual verification of what's actually offered in Google's category list for Morocco at setup time — don't guess and ship the wrong one. |
| Service-area configuration | Site's own 16-city list (`content/geo.ts` `CITY_NAMES`) maps directly onto GBP's service-area field (limit: 20 areas) — ready to transcribe once GBP exists. |
| Address visibility setting | Must be set to hidden/service-area-only given the business model — see modelling tension above. |
| Verification (postcard/phone/video) | **Currently impossible.** Postcard/address verification requires a real, mail-deliverable, exact-match address — the site's own address record currently has a placeholder postal code. Fix the NAP placeholders before attempting GBP verification, not after. |
| Website URL field | Currently nothing to point it at with confidence — see Critical #1 (no resolvable production domain yet). |
| Maps embed / GBP widgets on-site | None present on any page reviewed. Not expected pre-GBP; add once verified. |
| Review widget / photo evidence on-site | None present — consistent with zero reviews. |

---

## Review Health Snapshot

- **Count: 0. Rating: none. Velocity: none.** No `aggregateRating`, no
  review UI anywhere on the site.
- Competitive gap is real but not the thing to panic about first:
  omnidoc.ma (~89 Google reviews, real ambulances, an app, 200+ cities
  claimed) is already well past Sterling Sky's "Magic 10" threshold and
  into steady prominence territory. A brand-new profile is not going to
  out-rank that on head terms ("médecin à domicile casablanca") in the
  local pack in the first several months, full stop — that's a realistic
  expectation to set, not a target to chase directly.
- What's actually actionable, in order: (1) get GBP live and verified —
  nothing below this is possible without it; (2) get to 10 reviews as fast
  as possible post-launch (the "Magic 10" threshold is the single highest-
  leverage move available to a new profile — bigger marginal effect than
  reviews 11–50 combined, per Sterling Sky); (3) then sustain velocity —
  Sterling Sky's "18-day rule" means a burst of reviews followed by silence
  loses the ranking benefit within about three weeks, so this needs to be
  an ongoing post-visit workflow (WhatsApp/SMS review link sent right after
  every visit), not a one-time push.
- Compete on the terrain review count doesn't dominate while it builds:
  long-tail quartier/specialty/situation pages (e.g. "pédiatre à domicile
  Maarif", "certificat médical à domicile") are won more on exact-match
  content relevance and proximity than on aggregate review count — this is
  exactly where the site's page depth (19 quartier pages, parity with the
  strongest quartier-page competitor at 25) should be pointed first.
- Real risk to flag before launch, not after: the site's "3 minutes"
  citywide response-time claim (see High #2 below) is a rating-average risk
  — a business's first reviews disproportionately anchor its long-term
  average, and a claim that isn't kept generates 1-star reviews faster than
  almost anything else in this vertical.

---

## Location Page Quality (Sampled: Casablanca hub, Casablanca/Maarif, Agadir hub)

- **Not templated/doorway content.** Read the actual quartier drafts
  (`content/drafts/quartiers.ts`): Maarif references Twin Center, avenue
  Zerktouni, the Marché de la Ferme; Sidi Maarouf references Technopark and
  boulevard Al Qods with distinct business-district traffic patterns;
  Derb Sultan references the old medina and Habous with distinct
  numbering/access issues. A doorway-page swap test (substitute one
  quartier's name for another) genuinely fails to work — the landmarks,
  traffic patterns, and access notes are real and different per quartier,
  not find-and-replace filler. This is meaningfully above the programmatic-
  SEO norm and is defensible against thin/doorway-content classification
  under the August 2025 Spam update and March 2025 Core E-E-A-T emphasis.
- **19 Casablanca quartier pages is parity, not a gap** against the
  strongest quartier-depth competitor (sosmedecincasa.com ~25,
  medecin-domicile-casablanca.ma ~15) — no action needed here; effort is
  better spent on data quality (below) than on adding more quartiers.
- **The one field that undermines all of the above:** "Hôpitaux et
  cliniques les plus proches" (nearest hospital/clinic) renders the literal
  placeholder **`[À CONFIRMER]`** on every one of the 19 quartier pages,
  confirmed on Maarif by direct fetch. This is precisely the kind of
  hyperlocal, high-trust fact (where does this service escalate to if my
  case is serious?) that's supposed to be this page type's differentiator,
  and it's currently empty on all of them.
- **Response time is not actually quartier-specific despite the page
  structure implying it:** every quartier's `responseTimeMinutes` is
  hardcoded to "3" regardless of that quartier's own documented traffic
  profile — several quartier access-notes paragraphs describe real
  congestion (Maarif, Bourgogne, Sidi Maarouf) that directly contradicts a
  uniform 3-minute promise sitting right next to that text on the same
  page. See High #2.
- **Agadir (no quartier pages)** renders cleanly at the city tier only —
  the "Quartiers couverts" section is conditionally hidden when a city has
  none, so there's no broken/empty section, and the Agadir body content
  (post-1960-earthquake reconstruction, corniche, Founty/Vallée des Oiseaux
  retiree population) is genuinely city-specific, not boilerplate.
- **Internal linking is sound.** Header/footer link every city, specialty,
  and situation from every page; quartier pages breadcrumb up to their city
  and cross-link to sibling quartiers. Max click depth from homepage to any
  quartier page is 2 (nav dropdown → city hub → quartier grid, or directly
  via footer → city → quartier). ~130 URLs total site-wide — appropriate
  scale, not spam-scale.

---

## Citation Presence

**Not independently verified this session** (no live citation search was
run against Yelp/BBB/PagesJaunes/etc. — see Limitations). What can be said
with confidence from the source/content review: no GBP exists, so there is
no primary citation source to propagate from yet, and it's reasonable to
assume zero live third-party citations currently exist.

One correction to the generic skill playbook for this specific market:
**Yelp and BBB (the generic Tier-1 US list) have minimal penetration in
Morocco** and shouldn't be the citation priority here. More relevant
equivalents once NAP is finalized: Google Business Profile (dominant — this
is essentially the whole game for Moroccan map-pack visibility), a
Facebook Page (very high local trust/usage for Moroccan SMBs), WhatsApp
Business profile (the site already leans on WhatsApp CTAs — good instinct,
extend it to a proper Business profile), Bing Places, Apple Business
Connect, PagesJaunes.ma, and — healthcare-specific — a MENA-relevant doctor
directory (e.g. Doctori.ma / Vezeeta) once the Ordre number is real and
verifiable.

---

## Morocco-Specific Factors

- **Phone formatting: done correctly.** Local display format ("06 01 99 12
  96") paired with E.164 in `tel:`/`wa.me` hrefs and in schema
  (`+212601991296`) is exactly the right convention — no action needed.
- **Language: French-only.** `lang="fr"`, and `hreflang` declares only
  `fr-MA` with `x-default` pointing at the same French content — no Arabic
  version. French is the correct primary register for this
  professional/medical service in Casablanca's target audience, so this is
  not urgent, but it's a real gap for Arabic/Darija voice search and AI
  Overview coverage in the broader Moroccan market. Low priority relative
  to everything above.
- **YMYL/regulatory angle specific to healthcare in Morocco:** publishing a
  placeholder Ordre National des Médecins number is not just a schema
  completeness issue — it's a licensed-professional credential claim on a
  medical site, which is exactly the category Google's E-E-A-T guidance
  weighs hardest and exactly the category most likely to draw real-world
  scrutiny if published as-is. Treat this fix as pre-launch-blocking, not
  as a backlog item.

---

## Top 10 Prioritized Actions

**Critical**
1. **Fix the canonical/domain problem before anything else.** `SITE_URL`
   is hardcoded to `https://www.urgencemedicale.ma`, and every canonical
   tag, hreflang, Open Graph URL, sitemap URL, and JSON-LD `@id` on the
   live site points there — but that domain does not currently resolve
   (confirmed DNS failure). If this workers.dev URL is crawled, indexed,
   or shared (the site's own OG comments note WhatsApp link-sharing is a
   major channel here) before the real domain is live, the canonical
   mismatch actively works against indexing either URL. Get the real
   domain resolving and hosting the same build before investing further
   effort in content or citations — nothing downstream matters until a
   search engine has one consistent URL to index.
2. **Replace the three live placeholder fields** — postal code, Ordre
   National des Médecins number, and the 19× "nearest hospital" fields —
   with real, verified values. These render as literal `[À CONFIRMER]`
   text in production HTML and JSON-LD today. The postal code blocks GBP
   postcard/address verification outright; the Ordre number is a
   YMYL/credential-trust issue, not just an SEO one; the hospital fields
   are the one piece of hyperlocal content that's supposed to differentiate
   the quartier pages and currently differentiates nothing.
3. **Verify or soften the "3 minutes" citywide response-time claim** before
   the phone line goes live. Every confirmed competitor claims 10–20
   minutes; a uniform claim 3–7x faster than the entire field, applied to
   every one of 19+ locations regardless of that location's own documented
   traffic, is very likely to generate broken-promise 1-star reviews from a
   business's very first patients — reviews that will anchor its long-term
   rating average. Already self-flagged as risky in the codebase's own
   comments; resolve it, don't just ship it.
4. **Create and verify Google Business Profile as a service-area
   business** — hide the address, list the existing 16-city service area
   (fits within GBP's 20-area limit), and get the primary category right
   (the single highest-weighted local ranking factor, and the single worst
   mistake if wrong). Nothing in GBP Signals, Reviews, or local-pack
   presence can start until this exists — it's gated behind #2 (address
   verification needs a real postal code).

**High**
5. **Resolve the "Le cabinet" framing.** Showing a full street address
   under a "the practice" heading on every page contradicts the SAB model
   and could draw walk-in patients to what may be a private dispatch
   address. Either drop the visible address or relabel it as
   correspondence-only, matching whatever visibility setting GBP ends up
   using.
6. **Build the review-generation SOP now, so it fires the moment GBP is
   verified.** Post-visit WhatsApp/SMS with a direct review link, sent
   after every single visit from day one. The realistic goal is the
   "Magic 10" threshold fast, then sustained monthly velocity (the 18-day
   rule) — not closing an 89-review gap against the market leader in the
   short term. In parallel, lean on the 19 quartier + specialty + situation
   pages for long-tail queries where review count matters less than
   content relevance.
7. **Add the missing recommended schema properties:** `url` on the
   `MedicalBusiness` node (currently absent), `priceRange` (real prices
   already exist elsewhere on-site — 500 MAD day/night/weekend — just not
   in schema), and `sameAs` Wikidata links on the 16 `areaServed` city
   entities.
8. **Improve geo precision** from 3 to 5 decimal places once the real
   address is confirmed — currently self-flagged in source as an
   unverified estimate, which is both a schema-quality issue and a real
   dispatch-accuracy risk for a business whose entire pitch is fast,
   precise home visits.

**Medium**
9. **Prioritize Morocco-relevant citations over the generic Tier-1 list**
   once NAP is finalized: GBP first, then Facebook Page, WhatsApp Business
   profile, Bing Places, Apple Business Connect, PagesJaunes.ma, and a
   MENA doctor directory (Doctori.ma/Vezeeta) once the Ordre number is
   real. Deprioritize Yelp/BBB — negligible reach in this market.
10. **Align the brand name shown in the header ("Urgence Médicale") with
    the legal name used everywhere else ("Urgence Médicale Casablanca")**
    so the exact string that goes into GBP's "Business name" field matches
    on-page branding and schema `name` with zero ambiguity — a named NAP-
    consistency ranking factor.

**Low**
- Consider an Arabic (`ar-MA`) variant for Darija/Arabic local and voice
  search reach — not urgent given the target audience, but a real gap in
  the broader Moroccan market.

---

## Limitations Disclaimer

- **No live citation search was run** against Yelp, BBB, PagesJaunes.ma,
  Facebook, or any Moroccan directory — citation-presence findings above
  are inferred from "no GBP exists yet," not independently confirmed
  absent/present per source. Treat as a to-do, not a verified negative.
- **No DataForSEO or other paid API was used** — no live local-pack
  position data, no independent GBP listing lookup, no proximity/ranking
  simulation. Proximity alone explains ~55% of ranking variance in
  independent ML studies and is entirely outside this site's control;
  nothing here should be read as a ranking guarantee.
- **Not fetched/reviewed this session:** /nos-medecins, /tarifs,
  /a-propos, /reserver, and the specialty/situation page templates beyond
  what's visible in shared components. The Casablanca city hub and Agadir
  hub were reviewed via source content and partial HTML fetch, not a
  full rendered-text uniqueness percentage calculation.
- **No Core Web Vitals, mobile-rendering, or accessibility audit** was
  performed — this is a local-signals audit only.
- **Encoding artifacts** (mojibake on accented characters, e.g. "Ã©" for
  "é") were observed in some raw HTML captures during this audit. Not
  confirmed whether this reflects an actual site-level charset/header bug
  or is an artifact of the fetch tooling's default decoding — flagged for
  manual verification against the live `Content-Type`/charset header
  rather than asserted as a real defect.
- **Competitor facts** (response-time claims, quartier-page counts, doctor-
  naming patterns, JSON-LD presence) were supplied as pre-verified inputs
  for this audit rather than independently re-checked in this session.
- Whitespark/Sterling Sky/BrightLocal figures cited above are drawn from
  the skill's reference library (`local-seo-signals.md`,
  `local-schema-types.md`), not re-verified against primary sources in
  this session.
