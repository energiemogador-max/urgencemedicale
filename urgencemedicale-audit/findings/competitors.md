# Competitive analysis — 9 Moroccan médecin-à-domicile sites

Fetched live, 2026-08-27. Every cell below is something observed on the
competitor's own site, not inferred.

## The matrix

| Site | Published price | Named doctors | Arabic | Quartier pages | Stated response time | JSON-LD |
|---|---|---|---|---|---|---|
| omnidoc.ma | No | No — "+340 médecins" aggregate | No | No (34 cities) | — | not observed |
| medecin-a-domicile.ma | No | No — "50 médecins" aggregate | **Yes** (AR + 5 more) | No (19 cities) | — | not observed |
| docteurcasablanca.ma | **Yes — 500 DH** | No | No | No | < 20 min | not observed |
| sosmedecincasa.com | No | No | **Yes** (AR + 4 more) | **Yes — ~25** | 10–15 min | none found |
| home-doctor.ma | No | No | unclear | No | 24/7, no figure | not observed |
| medecin-domicile-casablanca.ma | No | No | No | **Yes — 15 listed** | ~10 min avg | none found |
| sosmedecinmaroc.com | No | No — "350+" aggregate | **Yes** (`?lang=ar`) | No (19 cities) | — | none found |
| myhealthassistance.ma | not fetched | — | — | — | — | — |
| soins-a-domicile.ma | not fetched | — | — | — | — | — |

## Three of the five planned differentiators do not survive contact

The project brief asserted that no competitor had quartier pages, Arabic
content, published prices, medical structured data, or E-E-A-T signals, and
called those "the five gaps … the strategy". Checked against the live sites:

**1. Quartier pages — NOT a gap.** `sosmedecincasa.com` has roughly 25
(Gauthier, Sidi Maarouf, Californie, Dar Bouazza, Palmier and ~20 more).
`medecin-domicile-casablanca.ma` has 15, organised into three zones
(Centre & Nord, Sud & Périphérie, Est & Ouest). Our 19 quartier pages are
competitive, not differentiating. Several of our slugs overlap theirs
directly: Maarif, Gauthier, Racine, Belvédère, Ain Sebaa, Bouskoura, Dar
Bouazza, Californie, Sidi Maarouf, CIL, Bernoussi.

**2. Arabic — NOT a gap, and we are behind.** Three competitors ship Arabic:
`medecin-a-domicile.ma` (switcher: AR/FR/EN/DE/IT/NL/ES),
`sosmedecincasa.com` (switcher incl. Moroccan Arabic), and
`sosmedecinmaroc.com` (a real `?lang=ar` version). We are French-only with
hreflang scaffolding but no Arabic content. This is now a deficit column, not
an advantage column.

**3. Published prices — NOT unique.** `docteurcasablanca.ma` publishes
"500dhs" for a home consultation — the identical figure we publish. We do
present it better (a three-tier table plus Offer/PriceSpecification schema
versus their keyword-stuffed repetition), but "nobody publishes prices" is
false.

## Two differentiators are real

**4. Medical structured data — real gap.** No JSON-LD was found on any
competitor examined. Our typed MedicalBusiness / Physician / Offer /
BreadcrumbList / FAQPage layer is genuinely unmatched in this set.

**5. Named, credentialed doctors — the strongest real gap.** This is the
striking finding: **not one competitor names a single doctor.** They all use
aggregate counts — "+340 médecins mobilisés", "350+ médecins à disposition",
"Plus 50 médecins à votre écoute". Zero names, zero Ordre National des
Médecins numbers, zero individual credentials, across all seven sites
examined.

For a YMYL medical vertical this is the highest-value opening on the board,
and it is the one the site is currently *failing to exploit*: our Ordre
number renders as the literal placeholder `[À CONFIRMER]` on every page.

## Response-time claims — our figure is an outlier

| Site | Claim |
|---|---|
| medecin-domicile-casablanca.ma | ~10 minutes average |
| sosmedecincasa.com | 10–15 minutes |
| docteurcasablanca.ma | under 20 minutes |
| **this site** | **3 minutes** |

Our 3-minute citywide promise is 3–7× faster than every competitor in the
market, displayed in the trust block on all 130 pages. Against a field
claiming 10–20 minutes it reads as implausible rather than impressive, and it
is an operational commitment the business would have to honour on every call.
This is a credibility liability, not an advantage.

## What actually decides top 3 in this vertical

Everything above is on-page, and on-page is now roughly at parity. The
observable differences between these sites are not technical:

- **omnidoc.ma** leads on operational surface area — ambulances,
  teleconsultation, home nursing, hospitalisation, 34 cities, a mobile app.
- The local pack sits above organic for the money queries here, and it is won
  with a verified Google Business Profile, review velocity, and NAP
  consistency — none of which the codebase can supply.
- Every competitor's primary CTA is a phone number, exactly as ours is.

So the technical build is necessary but not sufficient. The two levers that
remain genuinely available are (a) naming real credentialed doctors, which
nobody does, and (b) structured data, which nobody has.
