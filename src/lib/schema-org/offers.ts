import type { OfferLeaf, WithContext } from "schema-dts";
import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { paths } from "@/lib/urls";
import { BUSINESS_ID } from "./business";

/**
 * One Offer + PriceSpecification per real price tier (day/night/weekend) —
 * never "contactez-nous". Publishing real prices is a genuine edge here: of
 * the competitors checked, only one publishes a figure at all and none ship
 * any structured data.
 *
 * `price`/`priceCurrency` are repeated flat on the Offer as well as inside
 * priceSpecification. The nested form alone is valid schema.org but several
 * consumers (Google's rich-results parsing included) look for the flat
 * properties, so omitting them loses the benefit for no reason.
 */
export function buildOffers(): WithContext<OfferLeaf>[] {
  return content.pricing.tiers.map((tier) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    // Anchored on the pricing page, not on BUSINESS_ID — that constant already
    // ends in "#business", so appending another fragment produced an invalid
    // two-fragment URI (".../#business#offer-jour").
    "@id": `${SITE_URL}${paths.tarifs()}#offer-${tier.slug}`,
    name: tier.label,
    price: Number(tier.amountMad),
    priceCurrency: content.pricing.currency,
    availability: "https://schema.org/InStock",
    seller: { "@id": BUSINESS_ID },
    priceSpecification: {
      "@type": "PriceSpecification",
      price: Number(tier.amountMad),
      priceCurrency: content.pricing.currency,
      description: tier.window,
    },
  }));
}
