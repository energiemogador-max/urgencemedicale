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
  phoneDisplay: "06 04 22 77 30",
  phoneHref: "+212604227730",
  // Not separately provided — defaulting to the same number as the call line
  // (changed to 06 04 22 77 30 by the operator on 2026-10-20).
  whatsappNumber: "+212604227730",
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
  // Opens Google's "write a review" form for the listing above (its Place ID,
  // ChIJiwP9VGgtpg0RhFe-Z5Pjxx4, read from the listing on 2026-10-14). Turns
  // on the dashboard's "Demander un avis" WhatsApp button after each finished
  // visit, and the "leave a review" links on the site.
  reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJiwP9VGgtpg0RhFe-Z5Pjxx4",
  // Read on the listing by the operator (Maps result pasted 2026-10-14):
  // 5.0 stars, 3 reviews. Update by hand when it changes; null hides the badge.
  googleRating: { value: 5, count: 3, checkedOn: "2026-10-14" },
  // Second establishment, confirmed by the operator 2026-10-14: Google
  // listing "Urgence medicale", Knowledge Graph id /g/11zfhwtr46, Place ID
  // ChIJx2vrIuXCJSoRduFlh24EZpk, pin 33.06533, -7.9076696. The area is where
  // that pin falls (OpenStreetMap reverse geocoding); no street address has
  // been supplied, so none is shown.
  otherLocations: [
    {
      id: "berrechid",
      area: {
        fr: "Zaouiat Sidi Ben Hamdoun, province de Berrechid",
        en: "Zaouiat Sidi Ben Hamdoun, Berrechid Province",
        ar: "زاوية سيدي بن حمدون، إقليم برشيد",
      },
      locality: "Zaouiat Sidi Ben Hamdoun",
      region: "Casablanca-Settat",
      geo: { lat: "33.0653", lng: "-7.9077" },
      profileUrl: "https://www.google.com/maps?cid=11053527208191975798",
      reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJx2vrIuXCJSoRduFlh24EZpk",
    },
  ],
};
