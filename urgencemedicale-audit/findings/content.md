# Content Quality & E-E-A-T Audit — urgencemedicale.lhakem3chine.workers.dev

**Scope:** Homepage, 2 city hubs (Casablanca, Agadir), 2 quartier pages (Maarif, Gauthier), 2 specialty hubs (pédiatre, cardiologue), 1 city×specialty spoke (pédiatre/Casablanca), 2 situation pages (fièvre-enfant-nuit, certificat-médical), 1 situation×city spoke (fièvre-enfant-nuit/Rabat), nos-médecins, tarifs, a-propos.

**Method:** Live pages fetched via headless renderer (raw HTML + trafilatura extraction + JSON-LD block detection), cross-checked against the site's own content-layer source (`content/*.ts`) in the repo, which is the direct data source for every page template. Every quote below was confirmed present in the live-rendered output and matches the source file verbatim.

**Encoding caveat:** the automated fetch tool returned French text with mojibake (e.g. "mÃ©decin" for "médecin"), consistent with a UTF‑8/Latin‑1 double-decode in the *fetch tool's* handling of this origin's `Content-Encoding: zstd` response, not necessarily a live rendering bug. All quotes below are given in corrected, accented French, verified against the source content file. Recommend a manual browser check to rule out this actually reaching real users — not confirmed either way. See "Not verified."

This is a YMYL (medical) site currently shipping from a codebase whose own comments label it **"PREVIEW STATE (2026-08-27)"** — several placeholder/unfilled fields are live in production rather than caught before launch.

---

## Critical

### 1. The only named doctor's Ordre National des Médecins number is a literal, unfilled placeholder — displayed publicly, sitewide

`content/doctors.ts` sets `ordreNumber: "[À CONFIRMER]"` for the site's sole doctor, Docteur Seriani. This isn't confined to one page: `src/lib/content.ts`'s `getTrustBlockProps()` feeds this value into `<TrustBlock>`, which the code's own comment says is rendered "near the top of every page (Phase 3 hard rule)" — confirmed in `SituationPage.tsx`, `QuartierPage.tsx`, and `SituationCityPage.tsx`, and it is live on **/nos-medecins**:

> "Docteur Seriani Médecin généraliste — Ordre National des Médecins n° [À CONFIRMER]"

For a home-visit medical service, the licensing-registry number is the single credential that lets a patient verify the person walking into their home is a real, licensed physician. Shipping the literal string "[À CONFIRMER]" ("to be confirmed") in that slot — next to a real name and phone number that make everything else look legitimate — is worse than omitting it: it presents an unverifiable credential as if it were populated. This is the highest-priority fix on the entire site (Google's YMYL guidance treats missing/fake credentials on medical sites as a trust-destroying signal, and per this skill's model Trustworthiness carries the largest E-E-A-T weight).

**Recommendation:** either get the real Ordre number from the operator before this goes further, or suppress the `ordreNumber` display entirely (show doctor name + "inscrit à l'Ordre National des Médecins" as a claim without a fabricated-looking placeholder number) until it's confirmed.

### 2. Specialty pages imply named specialists that don't exist on the site's own roster

**/pediatre-a-domicile** opens with:
> "Un pédiatre peut examiner votre enfant chez vous, sans les délais d'une salle d'attente ni le stress d'un déplacement quand il ne se sent pas bien."

**/cardiologue-a-domicile** opens with:
> "Un cardiologue peut se déplacer à domicile pour une consultation ou un suivi, y compris pour réaliser un électrocardiogramme sur place."

But **/nos-medecins** — the page whose own copy says "Chaque médecin qui se déplace chez vous est nommément identifié et inscrit à l'Ordre National des Médecins" (every doctor who comes to you is named and registered) — lists exactly one doctor, and `content/doctors.ts` confirms it: `specialtySlug: "generaliste"`. There is no named pédiatre, cardiologue, gériatre, or urgentiste anywhere on the site, despite four specialty hub pages (and their city spokes) implying one will show up. This is a direct claim/roster mismatch on a medical site — exactly the kind of unverifiable "expertise" claim Google's Sept 2025 QRG flags. It also contradicts the site's own trust pitch on /nos-medecins.

**Recommendation:** either add the real named specialists to `content/doctors.ts` before specialty pages go live, or rewrite specialty-page copy to say a generalist triages and refers, rather than implying an on-call specialist roster that doesn't exist.

### 3. Business postal code placeholder is baked into the homepage's site-wide JSON-LD (machine-readable, not just visual)

`content/business.ts`: `postalCode: "[À CONFIRMER]"`. `src/lib/schema-org/business.ts` (`buildMedicalBusiness()`, emitted once on the homepage per its own comment) puts this straight into schema.org markup:
```
address: {
  "@type": "PostalAddress",
  ...
  postalCode: business.address.postalCode,   // = "[À CONFIRMER]"
  ...
}
```
Confirmed live: the homepage's structured-data block includes `PostalAddress` in its type list. This means any crawler, LLM, or rich-result parser reading the homepage's `MedicalBusiness` entity gets a postal code field whose value is the literal string "[À CONFIRMER]" — invalid, and a bad look for a business claiming a real physical dispatch address in its own NAP data.

**Recommendation:** get a real postal code or omit the field from the schema until confirmed (a missing field is safer than a garbage one in structured data).

### 4. "Nearest hospitals" — the one piece of information that matters most in a medical emergency — is a placeholder on every quartier page

`content/geo.ts`: `nearestHospitals: ["[À CONFIRMER]"]` for all 19 Casablanca quartiers. Confirmed live on **/medecin-a-domicile/casablanca/maarif** under the heading "Hôpitaux et cliniques les plus proches":
> "[À CONFIRMER]"

This is not a cosmetic gap. A page whose explicit value proposition is fast home-visit dispatch, sitting directly next to the fièvre-enfant-nuit safety message that tells worried parents "si l'état de votre enfant vous inquiète fortement... contactez directement les services d'urgence," should not send a scared parent to a section titled "nearest hospitals" that says, literally, "to be confirmed."

**Recommendation:** highest-priority content gap to close before launch — this is local knowledge (real facility names) that should exist before any quartier page is public.

---

## Priority Answer 1 — Is /fievre-enfant-nuit free of medical advice?

**Yes — confirmed clean.** No temperature thresholds, no symptom checklist, no dosage guidance anywhere in the intro or body. It consistently routes to a human decision (the dispatcher on the phone, or emergency services), never to self-assessment. Full text, quoted directly:

> "Une fièvre qui grimpe chez un enfant en pleine nuit inquiète n'importe quel parent, surtout loin des horaires d'un cabinet. Un médecin généraliste ou pédiatre peut se déplacer à votre domicile pour l'examiner sur place, cette nuit même, sans attendre le lendemain."

> "La fièvre est l'un des motifs d'appel les plus fréquents la nuit, et l'un des plus difficiles à juger sans avis médical : un même chiffre sur le thermomètre peut être anodin chez un enfant qui joue et inquiétant chez un enfant abattu."

This last sentence is the closest the page comes to a "threshold," and it does the opposite of giving one — it explicitly tells the reader a number alone can't be judged, which is the safe framing.

The hard-requirement escalation language is present and correctly worded:

> "Cette solution à domicile n'est cependant pas adaptée à toutes les situations. Si l'état de votre enfant vous inquiète fortement ou semble se dégrader rapidement, le plus sûr est de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond peut vous aider à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable."

No dosage language appears anywhere (no "paracétamol," no mg/kg, no "toutes les 6 heures"). Diagnosis/treatment decisions are explicitly deferred to the doctor on site: "il examine l'enfant, pose ses questions aux parents et détermine lui-même la conduite à tenir." The /fievre-enfant-nuit/rabat spoke page carries the identical safe pattern (verified — see below). This is a genuinely well-executed hard constraint; it reads as the one part of the site that was deliberately engineered for safety (the source file's own comment block calls this page "the reference example: it never gives a temperature number or a red-flag symptom list").

**No safety violation found.** This is the one area of the audit that does not need a fix.

---

## Priority Answer 2 — Are spoke pages genuinely distinct, or mail-merged?

**Mixed.** The opening/geography content is genuinely unique per spoke; a recurring closing block is templated with only ~4 rotating variants reused verbatim across 16 cities.

### City hub pages — genuinely distinct (no issue found)
Casablanca vs. Agadir hubs open with real, non-interchangeable local facts:

> Casablanca: "Casablanca est la plus grande ville du Maroc et son centre économique, avec des distances et une circulation qui varient beaucoup d'un secteur à l'autre..."

> Agadir: "Reconstruite après le séisme de 1960 sur un plan moderne fait de larges boulevards, Agadir offre un profil d'accès différent des villes à médina historique..."

### Situation×city spokes (fièvre-enfant-nuit × 16 cities) — geography paragraph unique, closing paragraph templated

The opening paragraph is genuinely city-specific (Rabat's "capitale plus calme," Casablanca's "s'étend sur une surface considérable," etc. — real, non-swappable local color).

But the **process paragraph** reuses one sentence verbatim across at least 4 cities (confirmed by direct read of `content/drafts/situation-cities-fievre.ts`):

> Fès: "...Le médecin, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; sur place, c'est lui qui examine l'enfant et décide de la suite : traitement sur place, ordonnance, ou orientation vers un service hospitalier si nécessaire. Le service est joignable 24h/24 et 7j/7 dans toute l'agglomération de Fès."

> Kénitra: "...Le médecin, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; sur place, c'est lui qui examine l'enfant et décide de la suite : traitement sur place, ordonnance, ou orientation vers un service hospitalier si nécessaire. Ce service fonctionne 24h/24 et 7j/7 à Kénitra, week-ends et jours fériés compris."

Identical sentence also appears verbatim in the Meknès and El Jadida spokes, only the trailing city-name clause changes.

The **closing safety paragraph** is drawn from just 4 template variants, each reused word-for-word across 4 different cities:

> Casablanca, Témara, Tétouan, and El Jadida all carry this exact sentence, unchanged: "Si l'état de votre enfant vous inquiète fortement ou semble s'aggraver rapidement, contactez directement les services d'urgence plutôt que d'attendre le médecin. Dans le doute, appelez quand même : la personne qui répond peut vous aider à choisir entre une visite à domicile et une orientation vers les urgences."

> Tanger, Salé, Kénitra, and Meknès all carry a second identical variant, unchanged: "Si l'état de votre enfant vous inquiète fortement, mieux vaut contacter directement les services d'urgence que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à décider entre une visite à domicile et une orientation vers les urgences."

(Two more variants are each reused across Rabat/Agadir/Oujda/Bouskoura and Marrakech/Fès/Mohammedia/Dar Bouazza.)

**Assessment:** this is templated content, but it's the *safety* paragraph that's templated — arguably the right paragraph to standardize, since consistent, correct emergency-routing language is more important than novelty there. It is not disguised (word count minimums are enforced at build time per `content/thresholds.ts`, and the unique-geography paragraph does the real differentiation work). Still, 4-of-16 cities sharing a verbatim sentence, and 4-of-4 sharing a verbatim closing paragraph, is a genuine "mail-merge" pattern a human reviewer or an algorithmic near-duplicate detector would flag. Rank: **High**, not Critical, specifically because it doesn't compromise medical safety and the city-specific paragraph is real — but it should be varied further before scaling this pattern to the other geo-multiplied situations (prise-de-sang-domicile, ecg-domicile use the same generator pattern per `content/pages.ts`).

### City×specialty spokes — only one page sampled live
/pediatre-a-domicile/casablanca reads as genuinely unique and Casablanca-specific:
> "Casablanca concentre une population très nombreuse de jeunes familles, en particulier dans les quartiers résidentiels denses où se côtoient immeubles familiaux et lotissements récents."

A scan of the source draft file (`content/drafts/city-specialties-1.ts`) found no verbatim-repeated "Ordre National des Médecins" sentence of the kind found in the situation×city shard, which is a reasonable (though not conclusive) sign this shard was hand-varied more than the fièvre-enfant-nuit shard. **Not fully verified across all 30 city×specialty pages** — see "Not verified" below.

---

## Priority Answer 3 — Every "[À CONFIRMER]" occurrence found

| # | Field | Source file | Page type(s) affected | Live-confirmed? |
|---|---|---|---|---|
| 1 | `doctors[0].ordreNumber` | `content/doctors.ts:16` | Rendered via `<TrustBlock>` on **every page template** that includes it (situation, situation×city, quartier — confirmed in code; city hub / specialty hub / city×specialty use the same `getTrustBlockProps()` helper, so almost certainly all ~130 pages) **and** explicitly on /nos-medecins | Yes — /nos-medecins |
| 2 | `business.address.postalCode` | `content/business.ts:21` | Embedded in the sitewide `MedicalBusiness` JSON-LD graph, emitted on the homepage | Yes — homepage structured data includes `PostalAddress` |
| 3 | `quartiers[*].nearestHospitals` | `content/geo.ts:84` | All 19 Casablanca quartier pages (`/medecin-a-domicile/casablanca/{quartier}`) | Yes — /medecin-a-domicile/casablanca/maarif |

**Three distinct fields, effectively four page types** (sitewide trust block, homepage JSON-LD, all quartier pages, plus the doctor-roster page itself), currently live and public. All three are deliberate sentinel values by design (the source comments explain the team chose a visible placeholder over inventing a fake number/hospital/postcode, which is the right instinct) — but the deliberateness doesn't change that they are live in production on a medical site today.

---

## High

### 5. Single-doctor roster undermines authoritativeness across the whole specialty taxonomy
See Critical #2 — restated here because it also functions as an Expertise/Authoritativeness gap, not just a "missing data" issue: there is no author bio, credential detail (years of experience, medical school, hospital affiliations), or photo for the one doctor who is named. `content/doctors.ts`'s own comment confirms this is intentional minimalism ("no invented years of experience, languages, or education") — the right call versus fabricating, but it leaves Expertise signals close to zero until real bio content is supplied.

### 6. Templated closing paragraphs across geo-multiplied situation spokes (see Priority Answer 2)

---

## Medium

### 7. Enforced word-count minimums sit below typical YMYL topical-coverage floors
`content/thresholds.ts` enforces (at build time, which is a good practice) per-template minimums: `cityHub: 350`, `quartier: 300`, `specialtyHub: 350`, `citySpecialty: 250`, `situation: 450`, `situationCity: 220`. These are prose-only counts (excluding shared chrome), which is methodologically sound, but the situation pages — the site's YMYL cornerstone content on symptoms/certificates — sit at 450 words minimum, well under this skill's service/cornerstone-content floor and far under the ~1,500-word range typical of comprehensive medical topical coverage. The situation×city spokes at 220 words are thin even by product-page standards. In practice the sampled fievre-enfant-nuit body ran well above its floor (several hundred words more), but the *enforced minimum* itself invites thin pages once less-prioritized shards are filled in.

### 8. No visible author byline or "last reviewed" date on medical situation pages
/fievre-enfant-nuit and /certificat-medical carry no visible "rédigé par," "relu par," or "dernière mise à jour" line — despite the extensive Ordre-registration language addressing the doctor who *visits*, there's no editorial/medical-review attribution for the *page content itself*. `publication_date` came back `null` on the fetched homepage. For YMYL symptom content, a "reviewed by Dr. X, [date]" line is a standard, low-cost E-E-A-T signal this site doesn't yet have anywhere.

### 9. AI-citation readiness is structurally good but the credential signal it surfaces is broken
Every sampled page opens with a direct, answer-shaped lead sentence (confirmed pattern across homepage, city hubs, specialty hubs, situations, and spokes) and carries `FAQPage`/`Question`/`Answer` JSON-LD plus clean H1s and breadcrumbs — genuinely strong AEO/AI-citation structure. But an AI system extracting "is this a licensed provider" from the page will extract the literal string "[À CONFIRMER]" as the Ordre number, which is worse for citation trust than having no number field at all, since it reads as populated-but-invalid data rather than absent data.

---

## Low

### 10. Possible mojibake in live French text (unconfirmed — see caveat above)
If real, "mÃ©decin" instead of "médecin" on public pages would be a readability/trust problem for a Moroccan French-speaking audience. Recommend a manual browser spot-check on 2-3 pages before treating this as a real defect; it may be purely an artifact of this audit's fetch tooling (the origin serves `Content-Encoding: zstd`).

### 11. Aggressive response-time claim not flagged to visitors as approximate
`content/business.ts`'s own comment says the "3 minutes citywide" response time was "flagged to the operator as an unusually aggressive claim worth double-checking before launch" — and this number is what's shown live in the `<TrustBlock>` ("Intervention en 3 min") on every page. Not a placeholder, so not counted above, but worth surfacing: an unrealistic delivery promise is itself a trust risk once real dispatch data exists.

---

## E-E-A-T breakdown (this skill's internal weighting model, not Google's)

| Factor | Weight | Score | Why |
|---|---|---|---|
| Experience | 20% | 3/10 | No first-hand case studies, no patient-facing evidence of actual visits; intro/body content is well-written but generic-service-description in nature, not lived-experience narrative. |
| Expertise | 25% | 2/10 | One named doctor, no bio depth, no credential detail beyond a broken Ordre-number placeholder; specialty pages imply expertise (pédiatre, cardiologue) not backed by the roster. |
| Authoritativeness | 25% | 2/10 | No external citations, press mentions, or professional-body recognition found on any sampled page; single-doctor operation. |
| Trustworthiness | 30% | 3/10 | Real phone number and street address are present (good), but the credential number, postal code, and nearest-hospital fields are live placeholders — actively undermines the trust signals that are otherwise in place (transparent pricing shown before confirmation, 24/7 claim, named contact). |

**Weighted E-E-A-T score: ~2.5/10.** **Overall content quality score: 38/100** — well-engineered *structure* (schema markup, answer-first ledes, build-time content minimums, explicit no-medical-advice discipline) dragged down hard by live placeholder data in exactly the fields that matter most for YMYL trust, plus a claims/roster mismatch on specialty pages.

---

## Not verified (ran out of turns — do not treat as clean)

- 29 of the 30 city×specialty spoke pages (only pédiatre/Casablanca fetched live) — duplication risk across the full matrix not confirmed either way.
- The other 2 geo-multiplied situations (prise-de-sang-domicile, ecg-domicile) and their city spokes were not sampled live, though their draft bodies were read and appear to follow the same safe, non-diagnostic pattern as fièvre-enfant-nuit and certificat-medical.
- 17 of 19 Casablanca quartier pages (only Maarif, Gauthier sampled) — presumed to also carry the `nearestHospitals: ["[À CONFIRMER]"]` placeholder since it's a flat default in `content/geo.ts`, but not individually fetched.
- Formal readability metrics (Flesch/sentence-length distribution) were not computed; qualitative read of sampled French prose suggests moderate sentence length (commonly 25-40 words per sentence, some quite long/multi-clause) — plausibly demanding for a stressed 3am reader, but not scored numerically.
- Full JSON-LD payloads were not pulled (only top-level `@type` presence was checked via the render tool's structured-data summary) — the `Physician`/`PropertyValue` block seen on /nos-medecins was not opened to confirm it also embeds the "[À CONFIRMER]" Ordre string in machine-readable form; likely, given `ordreNumber` is the only identifier-shaped field in the doctor model, but not directly confirmed.
- Whether the mojibake seen in fetched text is a real live-site defect or purely a fetch-tool artifact was not resolved (see Low #10).
- /reserver, /contact, /generaliste-a-domicile, /geriatre-a-domicile, /urgentiste-a-domicile, /suivi-post-hospitalisation, /contre-visite-medicale, /prise-de-sang-domicile, /ecg-domicile and their city spokes were not sampled at all (outside the requested scope, flagging for completeness).

---

## Key file references (repo: `c:\Users\asus\Documents\GitHub\urgencemedicale`)

- `content/doctors.ts` — Ordre number placeholder
- `content/business.ts` — postal code placeholder, aggressive response-time note
- `content/geo.ts` — nearest-hospitals placeholder (19 quartiers)
- `content/thresholds.ts` — build-time word-count minimums
- `content/drafts/situations.ts` — fievre-enfant-nuit / certificat-medical safe-content source (confirmed no medical advice)
- `content/drafts/situation-cities-fievre.ts` — templated closing-paragraph evidence
- `content/drafts/city-specialties-1.ts`, `city-specialties-2.ts` — city×specialty spoke content
- `src/components/TrustBlock.tsx` — sitewide credential-display component
- `src/lib/content.ts` — `getTrustBlockProps()`, feeds placeholder into every page
- `src/lib/schema-org/business.ts` — homepage JSON-LD, embeds postal-code placeholder
- `src/components/templates/SituationPage.tsx`, `QuartierPage.tsx`, `SituationCityPage.tsx` — confirm TrustBlock/placeholder propagation
