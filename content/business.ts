import type { Business } from "./schema";

/**
 * Site-wide business facts, all operator-supplied.
 *
 * `geo.lat/lng` was reviewed and kept by the operator (2026-08-28).
 *
 * `defaultResponseTimeMinutes` is operator-supplied. It was a flat "3" until
 * 2026-08-28 — faster than anyone in this market advertises and impossible to
 * hold across Casablanca traffic. Now an honest 10–15 minute range, which is
 * still competitive (rivals claim 10–20) and can actually be met.
 */
export const business: Business = {
  legalName: "Urgence Médicale Casablanca",
  phoneDisplay: "06 01 99 12 96",
  phoneHref: "+212601991296",
  // Not separately provided — defaulting to the same number as the call line.
  whatsappNumber: "+212601991296",
  address: {
    street: "Hay Essalam, GH 2, Imm 4",
    city: "Casablanca",
    postalCode: "20260",
    region: "Casablanca-Settat",
  },
  // The pin of the operator's Google listing (2026-10-13, see `profiles`), in
  // Hay Essalam / Oulfa where the street address is. The previous point
  // (33.596, -7.546) sat about 12 km east, in a different district: name,
  // address and map pin must agree between the site and the listing.
  geo: {
    lat: "33.5548",
    lng: "-7.6777",
  },
  defaultResponseTimeMinutes: "10 à 15",
  hoursOpen: "24/7",
  // The Google listing the operator manages (2026-10-13): Maps place
  // "urgence medicale", Knowledge Graph id /g/11p1vxs9c3, CID
  // 2217991563743483780. The ?cid= form is Google's stable link to a place.
  // The links used before (share.google/2mBN…, /g/11zfhwtr46) pointed to a
  // different listing of the same name. Add Facebook/Instagram here as they
  // are created.
  profiles: ["https://www.google.com/maps?cid=2217991563743483780"],
  // Turns on the dashboard's "Demander un avis" WhatsApp button after each
  // finished visit, and the "leave a review" link on the site. Points to the
  // same listing until the operator supplies its "Demander des avis" link
  // (Business Profile → Demander des avis), which opens the review form
  // directly; the share.google link used before reviewed the other listing.
  reviewUrl: "https://www.google.com/maps?cid=2217991563743483780",
  // The listing's rating and review count, read by the operator, e.g.
  // { value: 4.8, count: 23, checkedOn: "2026-10-13" }. null hides the badge.
  googleRating: null,
};
