# GEO / AI Search Readiness Audit — urgencemedicale.lhakem3chine.workers.dev

Audited: 2026-08-26. Live fetches via raw HTTP (curl) and the repo's render tool against the production Cloudflare Workers deployment. All quoted passages below are verbatim from live HTML, byte-level UTF-8 checked (the audit tool's own `extracted_text` field mojibakes accented characters — that is a tooling artifact, not a site defect; confirmed by inspecting raw response bytes, e.g. `Fi\xc3\xa8vre` = correct UTF-8 for "Fièvre").

## GEO Health Score: 57/100 (Developing)

| Dimension | Weight | Score | Why |
|---|---|---|---|
| Citability | 25% | 68 | Strong 2-sentence answer-first openings on 4/5 sampled pages; `/tarifs` opening omits the actual number; FAQ answers are well-shaped but the ONM-registration fact they promise is a placeholder |
| Structural Readability | 20% | 72 | Clean single-H1 SSR HTML, breadcrumbs, `<details>` FAQ; body section headers are topic-labeled, not question-phrased |
| Multi-Modal Content | 15% | 40 | Text + one HTML price table only; no video/image-based citable assets found in what was sampled (not exhaustively checked) |
| Authority & Brand Signals | 20% | 22 | Zero external mentions (per brief); and the one authority element the site does have — named, ONM-registered physician — is undermined by a live `[À CONFIRMER]` placeholder in both visible copy and JSON-LD |
| Technical Accessibility | 20% | 78 | robots.txt wildcard-allows all crawlers, confirmed full SSR (no JS required), valid JSON-LD on every page sampled; docked for an unresolved canonical/sitemap domain mismatch |

Multi-Modal and Authority scores are conservative estimates — image alt-text and any video/social assets were not exhaustively checked in this pass (see "Not verified").

---

## 1. AI Crawler Accessibility

`robots.txt` (fetched live, 200 OK):

```
User-Agent: *
Allow: /
Disallow: /admin

Sitemap: https://www.urgencemedicale.ma/sitemap.xml
```

**Verdict: fully open.** There are no bot-specific rules at all — GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended are all covered by the wildcard `Allow: /` and none is singled out for blocking. This is as good as robots.txt gets for AI visibility; there is nothing to fix here.

The site is confirmed fully server-rendered: every page fetched (`is_spa: false`, `mode_used: raw`) returned complete content on a plain HTTP GET with no JavaScript execution needed — trafilatura/raw-mode extraction succeeded on the first pass every time. This removes the single most common AI-crawler blocker (CSR shells that GPTBot/ClaudeBot don't render). No action needed on this front.

**One unresolved risk (Critical, not yet verified as fixed or broken):** canonical tags, hreflang alternates, and the robots.txt `Sitemap:` line all point to `https://www.urgencemedicale.ma/...`, while the site that is actually live and crawlable today is `https://urgencemedicale.lhakem3chine.workers.dev`. Example, from `/fievre-enfant-nuit`:

```
canonical: https://www.urgencemedicale.ma/fievre-enfant-nuit
alternate fr-MA: https://www.urgencemedicale.ma/fievre-enfant-nuit
alternate x-default: https://www.urgencemedicale.ma/fievre-enfant-nuit
```

I did not verify whether `www.urgencemedicale.ma` currently resolves and serves this same content. If it does not yet resolve, every crawler that respects canonical signals (which includes AI crawlers, as they generally reuse standard SEO plumbing) is being pointed at a URL that may not exist — which can suppress citation of the only content that is actually reachable. **This should be checked before any other GEO work is prioritized**, since it potentially invalidates the value of everything else below.

Separately: Cloudflare deployments sometimes carry edge-level bot-management/"AI Scrapers and Crawlers" toggles independent of robots.txt. Those weren't checked (no dashboard access in this session) — robots.txt policy and a handful of successful anonymous fetches say the door is open, but that isn't proof against an edge rule that specifically fingerprints GPTBot/ClaudeBot user agents.

## 2. Passage-Level Citability — does the "answer-shaped" rule actually hold?

Sampled all five requested URLs directly from production HTML. **Verdict: yes, on 4 of 5, with one notable miss on the page that matters most for a common high-intent query.**

**`/fievre-enfant-nuit`** — H1 immediately followed by:
> "Une fièvre qui grimpe chez un enfant en pleine nuit inquiète n'importe quel parent, surtout loin des horaires d'un cabinet. Un médecin généraliste ou pédiatre peut se déplacer à votre domicile pour l'examiner sur place, cette nuit même, sans attendre le lendemain."

2 sentences, ~42 words, fully self-contained, directly answers the query. Good.

**`/certificat-medical`**:
> "Un certificat médical s'obtient auprès d'un médecin après un examen clinique, et ce médecin peut se déplacer chez vous pour le réaliser plutôt que de vous faire attendre un rendez-vous en cabinet. Le certificat est rédigé sur place une fois l'examen terminé, ou transmis dans les heures qui suivent selon le type de document demandé."

2 sentences, ~55 words. Good, extractable without any surrounding context.

**`/medecin-a-domicile/casablanca/maarif`**:
> "Un médecin généraliste se déplace à votre domicile à Maarif, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage, et le tarif est annoncé avant votre confirmation, sans surprise à son arrivée."

Good, and correctly localized (names the neighborhood in sentence one).

**`/pediatre-a-domicile`**:
> "Un pédiatre peut examiner votre enfant chez vous, sans les délais d'une salle d'attente ni le stress d'un déplacement quand il ne se sent pas bien. La consultation se déroule dans l'environnement familier de l'enfant, ce qui facilite souvent l'examen."

Good.

**`/tarifs` — the miss:**
> "Le tarif applicable vous est annoncé au téléphone avant que vous ne confirmiez la visite, et ne change pas à l'arrivée du médecin."

Only 1 sentence (~22 words), and it does not contain a price. For the highest-value query this page exists to answer ("combien coûte un médecin à domicile"), the opening passage answers *when/how* pricing is communicated, not *how much* it costs. The actual number (500 MAD) only appears three lines later, inside an HTML table. An AI engine extracting the first self-contained passage from this page would get a non-answer to the cost question. **This is the single highest-value copy fix available on the site**: lead with the number, e.g. "Une consultation à domicile coûte 500 MAD, que ce soit en journée, la nuit ou le week-end. Le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite."

On word count: all five openers land in the 22–55 word range, which is well inside the "40–60 words for the direct answer" guidance but well short of the 134–167-word "optimal citable passage" figure. In practice the second paragraph on every page extends the same answer to a self-contained ~120–180 word block (verified on `/fievre-enfant-nuit` and `/certificat-medical`), so the two-paragraph pair together lands in the optimal citation range even though the opening sentence alone is intentionally short. That's a reasonable structure, not a defect.

## 3. FAQ Structure

`FAQPage` JSON-LD plus visible `<details>/<summary>` blocks are present and schema-valid on every one of the 7 pages checked (5 requested + `/medecin-a-domicile/rabat` + `/nos-medecins`). The Q&A pairs themselves are exactly the shape AI engines favor: a one-word lead (Oui/Non) followed by one or two supporting sentences, e.g.:

> Q: "Combien coûte une consultation à domicile ?"
> A: "Les tarifs sont publiés sur le site : consultation en journée 500 MAD (07h00 - 20h00), consultation de nuit 500 MAD (20h00 - 07h00), consultation weekend / jours fériés 500 MAD (Samedi, dimanche et jours fériés). Le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite."

That's a strong, self-contained, citable answer to a genuinely common query.

**The catch:** across all 7 pages checked, the same 5 questions (night/weekend availability, price, ONM registration, "do I need to be an existing patient", emergency disclaimer) are repeated **verbatim, word-for-word**, with typically one page-specific question appended on top (e.g. Maarif adds "Quel est le délai d'intervention à Maarif ?", the pediatric page adds "Comment se déroule une consultation de pédiatre à domicile ?"). Across ~130 pages, that means the FAQ block is roughly 80–90% duplicate content site-wide. That's not harmful for consistency of core facts (price, ONM registration, safety disclaimer should be identical everywhere), but it means the FAQ block contributes little *unique* citable surface per page — differentiation has to come from the narrative body copy and the one page-specific question, not the FAQ block as a whole.

**The bigger problem: one of those five repeated answers is false as published.** The ONM-registration FAQ answer claims:

> "Oui. Chaque médecin qui se déplace est inscrit à l'Ordre National des Médecins. Son nom et son numéro d'inscription figurent sur la page Nos médecins."

But `/nos-medecins` itself shows, live:

> "Docteur Seriani — Médecin généraliste — Ordre National des Médecins n° **[À CONFIRMER]**"

And the same `[À CONFIRMER]` placeholder is baked into the `Physician` JSON-LD on that page:

```json
"identifier": {
  "@type": "PropertyValue",
  "propertyID": "Ordre National des Médecins",
  "value": "[À CONFIRMER]"
}
```

The identical `"Docteur Seriani — Ordre National des Médecins n° [À CONFIRMER]"` trust badge also appears, unchanged, on every one of the other 6 pages sampled (fievre-enfant-nuit, certificat-medical, maarif, tarifs, pediatre-a-domicile, rabat) — including the Rabat page, where the badge still reads "Casablanca" for a doctor whose location doesn't match the page's city. And the sitewide footer address is also unfinished: **"Hay Essalam, GH 2, Imm 4 [À CONFIRMER] Casablanca."**

This is a **Critical** finding, ranked above everything else in this report: the site's FAQ and structured data actively assert that the license number is "public and verifiable," then publish a placeholder in its place, sitewide, in both the copy a human reads and the JSON-LD an AI system would parse. If any answer engine extracts and quotes this Physician entity, it will surface a broken placeholder rather than a credibility signal. Effort to fix is low (this is a data-entry task — get the real ONM number and the real street number, then a global find/replace across the template), and it should be done before pursuing any other item in this report, because it undermines the one authority signal the site currently has.

## 4. Published Pricing — the real competitive edge

Verified: `/tarifs` publishes 500 MAD across three tiers (day/night/weekend), identically in visible HTML *and* in `Offer`/`PriceSpecification` JSON-LD (`price: 500, priceCurrency: "MAD"`), and the same three numbers are repeated consistently in the FAQ price answer on every page sampled. Visible copy and structured data agree — that consistency itself is a citability positive (no conflicting numbers for an AI system to reconcile).

Per the coordinator's independently verified market fact: only one competitor (docteurcasablanca.ma, also 500 DH) publishes a price at all in this vertical, and *no* competitor uses JSON-LD. That means for a query like "combien coûte un médecin à domicile au Maroc," this site is currently one of at most two sources on the French-language Moroccan web with an explicit number, and the *only* one that hands an AI crawler a machine-parseable, unambiguous `PriceSpecification` instead of requiring the model to infer a number from prose. That is a genuine, defensible AI-citation advantage specifically for cost-intent queries — arguably the single strongest GEO asset the site has, more valuable near-term than entity authority (which it doesn't have) or backlinks (which it doesn't have).

Two caveats worth acting on:
- As noted in §2, the number doesn't appear in `/tarifs`'s own opening passage — the page's strongest asset isn't in its most extractable position.
- Visible copy uses "MAD" exclusively; Moroccan French users and (per the coordinator) the one pricing competitor use the colloquial "DH." This is a minor lexical-matching gap, not a structural one — modern retrieval/embeddings handle MAD↔DH synonymy fine — but adding "(500 DH)" once alongside "500 MAD" in visible copy costs nothing and removes any residual risk.

## 5. Entity / Brand Signals

Per the brief, this is a brand-new business with zero external mentions — no Wikipedia, no Reddit, no YouTube, no backlinks. I did not independently re-verify this via search in this session, so treat the absence as reported rather than re-confirmed, but it's consistent with what a zero-Domain-Rating new `.workers.dev` deployment implies.

Honest read on what that means near-term: this is the dominant constraint on AI visibility, larger than any on-page fix. Google AI Overviews leans on established organic ranking and backlink authority to select sources — a brand-new domain with no Reddit/YouTube/Wikipedia presence (the three strongest brand-mention correlates with AI citation) has essentially no near-term path into AIO regardless of how well-structured the pages are. Retrieval/browsing-oriented engines (Perplexity, ChatGPT-with-browsing, Bing Copilot) are less authority-gated and more query-match-driven, so once the site is indexed under its real domain, narrow long-tail queries (specific neighborhood + specific situation + price, e.g. "médecin à domicile Maarif tarif nuit") have a real — if bounded — chance of surfacing it, simply because almost nothing else on the live web answers that exact combination directly. That's a legitimate near-term opportunity; broad head-term visibility ("médecin à domicile Maroc") is not realistic until the domain accrues some external signal.

## 6. llms.txt

Confirmed absent: `/llms.txt` returns a 200 that's actually the site's custom 404 page ("Cette page n'existe pas ou a été déplacée...").

**Genuine verdict, not a reflexive recommendation: low priority.** Reasoning:
- Google has stated it does not use llms.txt for AI Overviews or Search.
- There's no confirmed evidence that GPTBot, ClaudeBot, or PerplexityBot treat it as a crawl-priority or citation input either — it remains a voluntary, unstandardized convention adopted inconsistently.
- The site's actual crawl surface is already maximally open without it: robots.txt wildcard-allows everyone, every page is plain server-rendered HTML with no JS gate, a sitemap is declared, and valid JSON-LD is present on every page checked. llms.txt exists mainly to give crawlers a curated index/summary when a site is large or JS-heavy enough that crawl budget or rendering cost is a real constraint — at ~130 fully static pages, that problem doesn't exist here.

Adding it is a few hours of low-risk work and won't hurt anything, but it should not be positioned internally as something that will move AI-citation odds. The `[À CONFIRMER]` placeholders (§3) and the canonical domain question (§1) will affect citation far more than the presence or absence of this file.

## 7. French/Arabic Language Considerations

Confirmed: every page carries `hreflang="fr-MA"` and `hreflang="x-default"` alternates (both currently pointing to the same French URL), with no `ar-MA` alternate live. The site is French-only today.

Honest assessment: a meaningful share of real-world queries to AI assistants from Moroccan users happen in Darija/Moroccan Arabic or code-switched French-Arabic, which this site cannot capture at all right now — that's a genuine, bounded ceiling on addressable AI-answer surface, not a defect to "fix" quickly. The hreflang scaffolding being already in place (rather than needing to be retrofitted) is the right preparatory move; standing up an actual Arabic content set is a substantially larger content project than any item in this report and should be sequenced deliberately rather than rushed alongside the placeholder/domain fixes above.

---

## Ranked Recommendations

**Critical**
1. Replace every `[À CONFIRMER]` placeholder — physician ONM registration number (appears in visible copy on 6+ pages and in `Physician` JSON-LD on `/nos-medecins`) and the street-number gap in the sitewide footer address. Currently the site's FAQ explicitly promises a "public and verifiable" number and then shows a placeholder instead, sitewide, in both HTML and structured data. Effort: Low (data entry + find/replace).
2. Verify whether `www.urgencemedicale.ma` (the canonical/hreflang/sitemap target on every page) actually resolves and serves this content. If not, every crawler following canonical signals is being pointed at a URL that may not exist. Effort: Low to check, Medium to fix depending on DNS/deploy state.

**High**
3. Rewrite the `/tarifs` opening passage to lead with "500 MAD" instead of only describing when the price is communicated — this is the page most likely to be cited for the highest-value cost query in the vertical, and it's currently the one page where the answer-shaped rule under-delivers. Effort: Low.
4. Protect and reinforce the pricing/schema advantage identified in §4 (it's a genuine differentiator: near-zero competitor coverage on price + zero competitor JSON-LD). Don't let it get diluted; consider adding "(500 DH)" alongside "500 MAD" once in visible copy for lexical coverage. Effort: Low.

**Medium**
5. FAQ blocks are well-structured but ~80–90% duplicated verbatim across ~130 pages; the differentiated, page-specific question is currently limited to one per template. Expanding the page-specific question count would add unique citable surface without touching the (correctly) consistent core-fact answers. Effort: Medium.
6. Body section headers (e.g. "Accès et circulation à Maarif," "Repères à Maarif") are topic-labeled, not question-phrased; only the actual FAQ entries use question phrasing. Rephrasing section headers as questions is low-cost but likely modest impact given the content is already answer-first. Effort: Low.
7. Plan (don't rush) an Arabic/Darija content track — hreflang scaffolding is already correctly in place, but no content exists yet, and this is the real ceiling on addressable AI-query surface in this market. Effort: High.

**Low**
8. Add `/llms.txt` as a low-risk, low-priority nice-to-have — genuinely not a citation lever given Google's stated non-use and the site's already-open crawl surface, but cheap enough to add opportunistically. Effort: Low.
9. `Content-Type: text/html` response header has no explicit `charset=utf-8` parameter (relies solely on the in-HTML `<meta charSet="utf-8">`); low-risk since the meta tag is present early, but a header-level charset is the more robust fix. Effort: Low.

---

## Not Verified (ran out of turn budget — flag for follow-up)

- Whether `www.urgencemedicale.ma` currently resolves/redirects/serves the site (see Critical #2 — this should be the very next check).
- Cloudflare edge-level bot-management or "AI Scrapers and Crawlers" settings, which sit outside robots.txt and weren't checked (no dashboard access this session). Anonymous raw fetches succeeded for every URL tried, which is suggestive but not proof against a UA-specific edge rule.
- Independent re-confirmation of zero Wikipedia/Reddit/YouTube/LinkedIn mentions (taken as given from the brief).
- Full-site template-duplication rate — only 7 of ~130 pages were sampled (the 5 requested + `/medecin-a-domicile/rabat` + `/nos-medecins`; `/medecin-a-domicile/casablanca/gauthier` was fetched but not analyzed before the turn limit).
- Image alt-text quality and any video/social assets (Multi-Modal Content score above is conservative and based on absence of evidence, not confirmed absence).
- Live platform visibility checks (DataForSEO `ai_optimization_chat_gpt_scraper` / `ai_opt_llm_ment_search`) were not run — the platform-specific reasoning in §5 is directional/qualitative, not measured.

---

## Source Files

- Findings written to: `c:\Users\asus\Documents\GitHub\urgencemedicale\urgencemedicale-audit\findings\geo.md`
- Raw fetched HTML and extraction outputs used as evidence for this report are in the session scratchpad (not part of the repo): `C:\Users\asus\AppData\Local\Temp\claude\c--Users-asus-Documents-GitHub-urgencemedicale\bcd3facb-40b9-450a-a16d-b8e5bd2d87f2\scratchpad\` (`raw_*.html`, `out_*.txt`, `page_*.json`, `robots.json`, `llms.json`).
- Prior orchestrator artifact referenced: `c:\Users\asus\Documents\GitHub\urgencemedicale\urgencemedicale-audit\home-render.json`
