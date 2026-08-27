# Structured Data Audit — urgencemedicale.lhakem3chine.workers.dev

Fetched live (raw HTML, non-SPA, server-rendered — confirmed `is_spa: false` on every page, so JSON-LD is present in the initial HTML, not injected client-side). All JSON-LD blocks quoted below were pulled via the renderer's `--json-ld-output` (bounded, parsed) artifact and cross-checked against visible accordion markup in the raw HTML.

Competitive context (verified by the requesting agent): no competitor in this market ships any JSON-LD at all. Structured data here is a real, uncontested differentiator — recommendations below are about de-risking and completing it, not abandoning it.

---

## 1. Detection matrix — @types per page and parse validity

| Page | Blocks | @types detected | `valid` |
|---|---|---|---|
| `/` | 2 | BreadcrumbList, City, GeoCoordinates, ListItem, **MedicalBusiness**, MedicalTherapy, OpeningHoursSpecification, PostalAddress / Answer, **FAQPage**, Question | true / true |
| `/nos-medecins` | 1 | BreadcrumbList, ListItem, **Physician**, PropertyValue | true |
| `/tarifs` | 2 | BreadcrumbList, ListItem, **Offer**, PriceSpecification / Answer, **FAQPage**, Question | true / true |
| `/medecin-a-domicile/casablanca/maarif` | 2 | BreadcrumbList, City, ListItem, **MedicalBusiness**, Place / Answer, **FAQPage**, Question | true / true |
| `/pediatre-a-domicile/casablanca` | 2 | BreadcrumbList, City, ListItem, **MedicalBusiness** / Answer, **FAQPage**, Question | true / true |
| `/fievre-enfant-nuit` | 2 | BreadcrumbList, ListItem / Answer, **FAQPage**, Question | true / true |

Every block parses as syntactically valid JSON-LD (no broken JSON, no missing `@context`/`@type`). `@context` is consistently `"https://schema.org"` and all URLs referenced inside the graphs (`item`, `@id`) are absolute. That baseline is solid. The problems below are semantic/completeness issues, not syntax breakage — a Rich Results Test run would not show hard parser errors, but would show missing-field warnings and, for the Physician block, a factual-integrity problem that isn't a "test" issue at all.

`/nos-medecins` is the only page in scope with no FAQPage block, which is correct — there is no visible FAQ accordion on that page (confirmed below).

---

## 2. Critical

### 2.1 Physician `identifier.value` ships a literal placeholder: `"[À CONFIRMER]"`

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://www.urgencemedicale.ma/nos-medecins#dr-seriani",
  "name": "Docteur Seriani",
  "medicalSpecialty": "PrimaryCare",
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "Ordre National des Médecins",
    "value": "[À CONFIRMER]"
  },
  "parentOrganization": { "@id": "https://www.urgencemedicale.ma/#business" }
}
```

This isn't a schema-validity failure — `PropertyValue.value` accepts any string, so it will pass Rich Results/Schema.org validators without a syntax complaint. The risk is factual, not technical:

- This is machine-readable data asserting a specific claim: "this named physician holds Ordre National des Médecins registration number X." Shipping `[À CONFIRMER]` in production is publishing a **false/placeholder credential claim in structured data**, not just a visible-copy typo. It's indexable, scrapeable, and could be surfaced by any consumer (AI answer engines, aggregators, future Google features) as if it were a real value.
- The on-page visible text (`/nos-medecins`) has the exact same placeholder ("Ordre National des Médecins n° [À CONFIRMER]"), so at least the structured data and visible copy are *consistent* with each other — this is not a schema/visible mismatch. But that consistency doesn't reduce the risk; it means the placeholder is doubly public.
- Practically: in a medical-services vertical, an unverifiable/fake-looking registration number is the kind of claim that erodes trust the moment a user or journalist checks it, and it's the single easiest thing on the whole site for a skeptical patient (or a competitor) to screenshot as "this site is making up credentials."
- **This must not ship to production** in its current form. Two acceptable paths: (a) get the real Ordre National des Médecins number from Dr. Seriani and populate it before this entity goes live, or (b) if it's not yet confirmed, drop the `identifier` property entirely (a Physician node is valid without it) rather than publish a bracketed placeholder. Do not let "we'll fix it later" ship — this is not cosmetic.

**Rank: Critical.**

### 2.2 Homepage `PostalAddress.postalCode` also ships a placeholder: `"[À CONFIRMER]"`

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "Hay Essalam, GH 2, Imm 4",
  "addressLocality": "Casablanca",
  "postalCode": "[À CONFIRMER]",
  "addressRegion": "Casablanca-Settat",
  "addressCountry": "MA"
}
```

Same category of issue as 2.1: a syntactically-valid string that is factually a placeholder shipped inside the one MedicalBusiness node the whole site hangs off. Address data is exactly what NAP-consistency and local-pack signals key off; a garbage postal code sitting in the canonical business entity is a self-inflicted trust/consistency problem the moment anything cross-references it (Google Business Profile, directories). Fix before shipping, same as 2.1.

**Rank: Critical.**

---

## 3. High

### 3.1 The cross-page `@id` reuse pattern doesn't do what it appears designed to do

The homepage defines the full entity once:

```json
{
  "@type": "MedicalBusiness",
  "@id": "https://www.urgencemedicale.ma/#business",
  "name": "Urgence Médicale Casablanca",
  "telephone": "+212601991296",
  "address": { ... }, "geo": { ... }, "openingHoursSpecification": { ... },
  "medicalSpecialty": ["PrimaryCare","Pediatric","Geriatric","Cardiovascular","Emergency"],
  "areaServed": [ /* 16 cities */ ],
  "availableService": [ /* 5 MedicalTherapy entries */ ]
}
```

Every "spoke" page (Maarif, `/pediatre-a-domicile/casablanca`) re-emits a node with the **same** `@id` but only a sliver of properties, e.g. Maarif:

```json
{
  "@type": "MedicalBusiness",
  "@id": "https://www.urgencemedicale.ma/#business",
  "areaServed": [
    { "@type": "Place", "name": "Maarif", "containedInPlace": { "@type": "City", "name": "Casablanca" } }
  ]
}
```

and `/pediatre-a-domicile/casablanca`:

```json
{
  "@type": "MedicalBusiness",
  "@id": "https://www.urgencemedicale.ma/#business",
  "medicalSpecialty": ["Pediatric"],
  "areaServed": [ { "@type": "City", "name": "Casablanca" } ]
}
```

`@id` reuse only merges nodes **within a single JSON-LD graph on one document**. Google (and every other consumer) parses each URL's structured data independently — there is no cross-document graph merge in Rich Results processing or in Search indexing. The practical effect:

- On every spoke page, what Google actually sees for that page's MedicalBusiness node is a fragment with **no `name`, no `address`, no `telephone`** — the properties required/expected for a Local Business type. That's an incomplete entity declaration on that page, not a "pointer" to the richer homepage node.
- Worse, it's not just incomplete, it's **contradictory**: the pediatre-casablanca page asserts (under the identical `@id`) `medicalSpecialty: ["Pediatric"]` and `areaServed: ["Casablanca"]` only, while the homepage asserts the same `@id` has 5 specialties and 16 cities. Any tool that *does* attempt cross-page consolidation (e.g. a knowledge-graph builder, an AI crawler assembling entity data) will see one `@id` making mutually exclusive claims about its own specialties and service area depending on which page it was read from.
- This pattern reads as an attempt at DRY entity modeling that doesn't survive how JSON-LD is actually consumed across separate HTTP responses.

**Recommendation:** pick one of:
1. Repeat the **full** MedicalBusiness node (name, address, telephone, geo, openingHours) on every spoke page, with the page-specific `areaServed`/`medicalSpecialty` layered on top as *additions*, not replacements — i.e., always include the citywide values plus the local one, don't narrow silently.
2. Or, better for this content structure: stop asserting `MedicalBusiness` fragments on spoke pages at all. Model the spoke page as a `Service` (or `MedicalTherapy`, matching `availableService` already declared on the homepage) with `provider: {"@id": "https://www.urgencemedicale.ma/#business"}` and its own `areaServed`. This is schema-valid, doesn't require restating the business identity, and doesn't produce conflicting claims under one `@id`.

**Rank: High** — not a hard parser failure, but it undermines the stated goal ("fragments reuse a single business @id rather than duplicating the entity") and produces materially incomplete/contradictory data on every non-home page, which is most of the site's indexable URLs (city × specialty pages).

### 3.2 `Offer.@id` is a malformed URI (two fragment identifiers)

```json
"@id": "https://www.urgencemedicale.ma/#business#offer-jour"
```
(same pattern for `#offer-nuit`, `#offer-weekend`)

A URI has exactly one fragment component; everything after the first `#` is the fragment. `#business#offer-jour` is not "a reference scoped under `#business`" — it's a single opaque fragment string `business#offer-jour` that has no structural relationship to the `#business` id used everywhere else. This won't throw a JSON-LD parse error, but it's clearly a bug (the intent was almost certainly `https://www.urgencemedicale.ma/tarifs#offer-jour` or `.../#offer-jour`), and it means these Offer nodes are **not actually linked** to the business entity by ID the way the rest of the site's `@id` scheme implies — only by the separate `seller: {"@id": "https://www.urgencemedicale.ma/#business"}` reference, which is correctly formed. Fix the `@id` values themselves.

**Rank: High** (low effort, clear bug, undermines confidence in the rest of the `@id` scheme).

### 3.3 Offer price is nested in `priceSpecification` only — not exposed as flat `price`/`priceCurrency`

```json
{
  "@type": "Offer",
  "@id": "https://www.urgencemedicale.ma/#business#offer-jour",
  "name": "Consultation en journée",
  "seller": { "@id": "https://www.urgencemedicale.ma/#business" },
  "priceSpecification": {
    "@type": "PriceSpecification",
    "price": 500,
    "priceCurrency": "MAD",
    "description": "07h00 - 20h00"
  }
}
```

`Offer` is schema-valid without a Product/Service wrapper, so this isn't broken JSON-LD. But it is currently not eligible for any Google Rich Result on its own (standalone `Offer` isn't a supported rich-result surface; `Offer` only feeds rich results when it's the `offers` value of a `Product`, or similar for Service/Event pricing). If the goal is ever to make these prices machine-legible to Google's Product/Service pricing understanding, Google's own guidance expects `price` and `priceCurrency` **directly on the Offer**, not only nested inside `priceSpecification` — parsers that don't walk into `priceSpecification` will see an Offer with no price at all. Cheap fix: keep `priceSpecification` for the time-window `description`, but also set `price: 500` and `priceCurrency: "MAD"` directly on each Offer.

**Rank: Medium-High** (no visible harm today since standalone Offer isn't a rich-result trigger, but it's a completeness gap that costs nothing to close and future-proofs it).

---

## 4. Medium

### 4.1 `medicalSpecialty` enum values use bare strings; `dayOfWeek` uses full schema.org URLs — inconsistent, both technically valid

Homepage:
```json
"openingHoursSpecification": {
  "dayOfWeek": ["https://schema.org/Monday", ..., "https://schema.org/Sunday"],
  "opens": "00:00", "closes": "23:59"
},
"medicalSpecialty": ["PrimaryCare", "Pediatric", "Geriatric", "Cardiovascular", "Emergency"]
```
Both forms resolve correctly under `"@context": "https://schema.org"` (the enum members used — PrimaryCare, Pediatric, Geriatric, Cardiovascular, Emergency — are all genuine `MedicalSpecialty` enumeration members, correctly spelled). This is a style inconsistency, not an error. Recommend standardizing on the full `https://schema.org/...` IRI form everywhere for enum values, matching what's already done for `dayOfWeek`, to reduce ambiguity for any consumer with a stricter JSON-LD processor.

### 4.2 24/7 `openingHoursSpecification` modeled as a single object, not one entry per day (minor)

Using one `OpeningHoursSpecification` with `dayOfWeek` as an array of all 7 days and `opens: "00:00"`/`closes: "23:59"` is an accepted, widely-used convention for "open 24/7" and will validate fine — flagging only as a note, not a defect.

### 4.3 `City`/`Place` entities in `areaServed` carry only `name` — no disambiguation

16 cities on the homepage and the `Place` (Maarif) / `City` (Casablanca) on spoke pages have no `containedInPlace`/`addressCountry` (except Maarif → Casablanca, which does have `containedInPlace`). Plain `"name": "Fès"` etc. is valid but ambiguous at scale (there are places named similarly across Francophone Africa/Europe). Recommend adding `"containedInPlace": {"@type": "Country", "name": "Maroc"}` (or `addressCountry: "MA"`) to each City for disambiguation — low effort, meaningfully reduces entity ambiguity.

---

## 5. FAQPage — Info priority per current Google policy, but implementation quality is genuinely good

Per current guidance, Google retired FAQ rich results for all sites (May 7, 2026, superseding the 2023 gov/health-only restriction), so **FAQPage delivers no Google SERP feature on this site regardless of implementation quality**. Any benefit is confined to unconfirmed AI/GEO surfaces. Flagging as **Info**, not Critical/High, per that policy — but documenting the technical quality since the question was asked directly.

**Visible-parity check (Google's general structured-data requirement — content must be visible, not hidden-only): PASS on every page tested.**

Verified by diffing each page's FAQPage `mainEntity` questions against the visible `<details>/<summary>` accordion markup in the raw (non-JS) HTML:

| Page | JSON-LD questions | Visible accordion Q&A items (excluding 3 unrelated nav accordions: "Spécialités"/"Villes"/"Situations") | Match |
|---|---|---|---|
| `/` | 5 | 5 | Yes, verbatim |
| `/tarifs` | 5 (same 5 as home) | 5 | Yes, verbatim |
| `/medecin-a-domicile/casablanca/maarif` | 6 (5 generic + 1 Maarif-specific "délai d'intervention") | 6 | Yes, verbatim |
| `/pediatre-a-domicile/casablanca` | 6 (5 generic + 1 pediatric-specific) | 6 | Yes, verbatim |
| `/fievre-enfant-nuit` | 5 | 5 | Yes, verbatim |
| `/nos-medecins` | 0 (no FAQPage emitted) | 0 | Correct — no FAQ block on this page, and none is claimed in JSON-LD |

Sample spot-check (visible HTML, tarifs page, "Combien coûte" and "Ordre National" answers) matched the JSON-LD `acceptedAnswer.text` word-for-word. Question counts and page-specific questions (Maarif's delivery-time question, pediatric page's consultation-flow question) line up correctly with page context — this is not boilerplate FAQ copy-pasted blindly; it's genuinely page-relevant. Given FAQPage has zero Google SERP value now, the return on maintaining this is limited to whatever AI-crawler benefit is unconfirmed — but if it's kept for that reason, it's implemented correctly and safely (no hidden-content risk).

**Rank: Info.**

---

## 6. Missing opportunities

- **Service** (or reusing `MedicalTherapy`, already modeled under `availableService`): the spoke pages (`/medecin-a-domicile/casablanca/maarif`, `/pediatre-a-domicile/casablanca`) are the natural place to emit a `Service`/`MedicalTherapy` node with `provider` pointing at the business `@id` and its own `areaServed` — this also resolves the §3.1 `@id` conflict in one move.
- **MedicalClinic**: not applicable — this is an at-home/mobile service with no fixed patient-facing clinic location (`MedicalBusiness` is the correct, more general type; `MedicalClinic` implies a facility patients visit). Do not add.
- **AggregateRating / Review**: correctly absent. The site has no reviews yet — do not fabricate `AggregateRating`. Adding rating markup without genuine, verifiable reviews violates Google's structured-data policies (and is a worse trust risk than the Physician-ID placeholder, since review/rating manipulation is explicitly policed). Add this only once real reviews exist, ideally sourced from a verifiable third party (Google Business Profile) rather than self-hosted.
- **LocalBusiness subtype**: `MedicalBusiness` is already the right subtype; no change needed.
- **Organization / WebSite** (sitewide, not seen in scope): not tested directly (out of the 6 pages given), but worth checking separately — a sitewide `WebSite` node (with `SearchAction` if applicable) and confirming `Organization`/`MedicalBusiness` is the one entity referenced consistently in `<head>` across templates would reinforce the `@id` consolidation fix in §3.1.

---

## 7. Not verified

- Pages outside the 6 listed were not audited (other city/specialty combinations, e.g. other arrondissements or other cities in the 16-city `areaServed` list) — the `@id`-reuse defect in §3.1 should be assumed to repeat across all of them until spot-checked.
- `sameAs` / social profile linkage on the MedicalBusiness node was not present in the retrieved block and was not separately investigated.
- Whether `Physician.medicalSpecialty: "PrimaryCare"` for Dr. Seriani is consistent with how he's described in visible copy on other pages beyond `/nos-medecins` was not checked.
- No independent confirmation of the real Ordre National des Médecins number for Dr. Seriani — flagged in §2.1 as needing resolution before launch, not obtained during this audit.
- Sitewide `Organization`/`WebSite` root markup and any `<head>` `<link rel="canonical">` interplay with the `@id` scheme were not reviewed.

---

## Summary ranking

| # | Finding | Rank |
|---|---|---|
| 2.1 | Physician `identifier.value = "[À CONFIRMER]"` — placeholder credential claim in structured data | **Critical** |
| 2.2 | MedicalBusiness `postalCode = "[À CONFIRMER]"` | **Critical** |
| 3.1 | Cross-page `@id` reuse produces incomplete/contradictory MedicalBusiness fragments on every spoke page | **High** |
| 3.2 | `Offer.@id` malformed (double `#` fragment) | **High** |
| 3.3 | Offer price only in `priceSpecification`, not flat `price`/`priceCurrency` | **Medium-High** |
| 4.1 | Inconsistent enum-value style (bare string vs. full IRI) | Medium |
| 4.2 | Single-object 24/7 openingHoursSpecification | Medium (informational, valid) |
| 4.3 | `areaServed` City/Place entities lack country disambiguation | Medium |
| 5 | FAQPage — no Google SERP value post-retirement; visible parity confirmed correct where present | **Info** |
| 6 | Missing Service/MedicalTherapy linkage on spoke pages; AggregateRating correctly withheld (no reviews) | Opportunity (Medium) |

Bottom line: nothing here is unfixable, and the underlying instinct (single canonical business entity, page-specific fragments, FAQ parity discipline) is sound and already ahead of every competitor in this market, none of whom ship any JSON-LD. The two Critical items are placeholder values that must not go live as real data, and the High items are about making the `@id` scheme actually do what it's designed to do across separate page loads — none of these are large rewrites.
