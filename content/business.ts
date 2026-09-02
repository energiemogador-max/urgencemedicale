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
  // Confirmed by the operator (2026-08-28) — keep as is.
  geo: {
    lat: "33.596",
    lng: "-7.546",
  },
  defaultResponseTimeMinutes: "10 à 15",
  hoursOpen: "24/7",
  // Google Business Profile (Knowledge Graph id /g/11zfhwtr46), supplied by
  // the operator 2026-09-02. Add Facebook/Instagram here as they are created.
  profiles: ["https://share.google/2mBNIVD81eAsxysgi"],
};
