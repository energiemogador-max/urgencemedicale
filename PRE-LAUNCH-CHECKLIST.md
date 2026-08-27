# Pre-launch checklist

Everything here needs a human decision or a real-world action. None of it can
be done from the codebase.

Ordered by what blocks launch.

---

## 1. Remove the preview `noindex` — BLOCKS LAUNCH

`public/_headers` currently sends `X-Robots-Tag: noindex, nofollow` on every
URL. That is deliberate: the site is on a public `*.workers.dev` preview host
while the real domain is unregistered, and without it Google could index the
preview and split ranking signals against the real site later.

**Delete that block the moment the site is live on the real domain.** If it
ships to production, nothing ranks — ever.

---

## 2. Register the domain — BLOCKS LAUNCH

`SITE_URL` in `src/lib/site.ts` is `https://www.urgencemedicale.ma`. Every
canonical, hreflang, sitemap entry and JSON-LD `@id` derives from it.

⚠️ **Spelling conflict, unresolved.** The vehicle livery and the hero artwork
both read **`urgencemedical.ma`** (no trailing "e"). The site is coded for
**`urgencemedicale.ma`** (with the "e"), confirmed by the operator. As it
stands the printed assets advertise a domain the site does not use. Either
re-print the assets or change `SITE_URL` — but do not launch with both.

---

## 3. Replace every `[À CONFIRMER]` placeholder — BLOCKS LAUNCH

These render publicly right now, and one of them is a medical credential.

| Field | Where it shows | File |
|---|---|---|
| Ordre National des Médecins number | Trust block on **all 130 pages**, plus `Physician` JSON-LD | `content/doctors.ts` |
| Postal code | `/contact`, plus `PostalAddress` JSON-LD site-wide | `content/business.ts` |
| Nearest hospital/clinic | All **19** quartier pages | `content/geo.ts` |

The Ordre number is the urgent one — see §5.

---

## 4. Verify the business coordinates

`content/business.ts` carries `geo.lat/lng` as a best-effort estimate for Hay
Essalam, Casablanca. They were never verified against a map. A wrong pin on a
home-visit service actively misleads.

---

## 5. Publish a real named doctor — the single highest-value action

The competitor audit found that **not one of the seven competitor sites names
a single doctor.** They all use aggregates: "+340 médecins mobilisés",
"350+ médecins à disposition", "Plus 50 médecins à votre écoute". No names, no
Ordre numbers, no individual credentials anywhere in this market.

In a YMYL medical vertical that is the largest available differentiator, and
it is currently unexploited because the field is a placeholder. One real
doctor, named, with a verifiable Ordre number and a photograph, puts the site
somewhere no competitor stands.

Needs: full name, Ordre National des Médecins registration number, specialty,
short bio, and their consent to be listed.

---

## 6. Reconsider the 3-minute response promise

Currently displayed in the trust block on all 130 pages and in the FAQ.

Competitors claim: ~10 min (medecin-domicile-casablanca.ma), 10–15 min
(sosmedecincasa.com), under 20 min (docteurcasablanca.ma).

At 3 minutes we are 3–7× faster than the entire market. Against that field it
reads as implausible rather than impressive — and it is a commitment that has
to be honoured on every call, at 3am, in Casablanca traffic. Recommend
replacing with a defensible figure, or qualifying it per quartier.

---

## 7. Google Business Profile + reviews

The local pack sits above organic results for these queries and no code
change reaches it. Needs a verified GBP with a real address, correct NAP
matching the site exactly, and sustained review velocity. The strongest
competitor has ~89 Google reviews; this business has none.

---

## 8. Confirm the service claims

The homepage service strip advertises **urgences médicales, consultations à
domicile, soins infirmiers, suivi personnalisé**, and the hero says **partout
au Maroc** — all confirmed by the operator. Two follow-ups:

- The site only has content for 16 cities. "Partout au Maroc" is broader than
  what the pages support; either add coverage or soften the claim.
- Nursing care and medical transport have no pages of their own despite being
  advertised. Both are worth real pages if genuinely offered.

---

## 9. Legal / regulatory

Flagged in the original brief and never resolved: whether the operator may
lawfully market medical consultations and take a margin in Morocco. A lawyer,
before launch — not after.

---

## 10. Stock photograph

The hero photograph is a stock/AI image, confirmed by the operator. It is
deliberately placed away from the named-doctor credentials and its alt text
does not claim to depict a specific person. **Do not caption it as a member of
the practice, and do not move it beside the Ordre number.** Replacing it with
a photograph of a real doctor at the practice would be a straight upgrade to
both trust and E-E-A-T.

---

## 11. Arabic version

Three competitors ship Arabic (`medecin-a-domicile.ma`, `sosmedecincasa.com`,
`sosmedecinmaroc.com`). This site is French-only. The hreflang scaffolding
already emits `fr-MA` + `x-default` and has a documented slot for `ar-MA`, so
this is a translation project, not an engineering one.

---

## 12. Analytics — Phase 7, not yet built

There is currently no way to know that a call happened or which page produced
it. The conversion here is a phone tap, which standard analytics cannot see.
Note that adding a GA4 tag will require allow-listing its domain in the CSP
in `public/_headers`.
