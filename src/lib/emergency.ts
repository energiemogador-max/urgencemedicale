/**
 * Morocco's public emergency numbers — the one source for every place the site
 * tells someone to call the emergency services instead of us.
 *
 * Verified 2026-09-16 against the sources in EMERGENCY_SOURCES, read directly:
 *  - French embassy page: "Police : 19 ou 112", "Gendarmerie : 177",
 *    "Protection civile (pompiers, ambulance) : 15", "SAMU : 141",
 *    Centre antipoison "+212 (0) 801 00 01 80".
 *  - La Vie éco: CAPM on "0 801 000 180 et 05 37 68 64 64", "24h/24 et 7j/7",
 *    with a physician ("médecin répondeur") answering.
 *
 * Deliberately NOT claimed, because no source read says so: that 112 is a
 * mobile-only number, that 19 is landline-only, or that any call is free.
 * The CAPM's own contact page lists a different switchboard number and says
 * nothing about 24/7, so it is not cited.
 *
 * WHY THEY ARE PUBLISHED
 *
 * The site used to say "contactez les secours" without a number. On a medical
 * site that is the one sentence where a number matters most: someone reading
 * it may be in the situation it describes.
 *
 * Links to these numbers carry data-tap="secours", which the visitor tracker
 * deliberately ignores: a tap on 141 is not a call to this service, and
 * counting it would inflate "Appels site" with exactly the calls we tell
 * people to make elsewhere.
 */
export const EMERGENCY_NUMBERS = {
  samu: { number: "141", display: "141", label: "SAMU" },
  protectionCivile: { number: "15", display: "15", label: "Protection civile" },
  police: { number: "19", display: "19", label: "Police" },
  police112: { number: "112", display: "112", label: "Police" },
  gendarmerie: { number: "177", display: "177", label: "Gendarmerie royale" },
  antiPoison: {
    number: "0801000180",
    display: "0801 000 180",
    label: "Centre Anti-Poison et de Pharmacovigilance du Maroc",
    /** Second line given by the same source. */
    alternate: { number: "0537686464", display: "05 37 68 64 64" },
  },
} as const;

/** Where each number was checked. Shown on /numeros-urgence-maroc. */
export const EMERGENCY_SOURCES: { label: string; url: string }[] = [
  { label: "Ambassade de France au Maroc — En cas d'urgence", url: "https://ma.diplomatie.gouv.fr/fr/urgence" },
  {
    label: "La Vie éco — Le « médecin répondeur » du Centre antipoison du Maroc",
    url: "https://www.lavieeco.com/influences/le-medecin-repondeur-du-centre-antipoison-du-maroc-17480/",
  },
];

/** "le 141 (SAMU) ou le 15 (Protection civile)" — for prose and FAQ answers. */
export function secoursPhrase(): string {
  const { samu, protectionCivile } = EMERGENCY_NUMBERS;
  return `le ${samu.number} (${samu.label}) ou le ${protectionCivile.number} (${protectionCivile.label})`;
}
