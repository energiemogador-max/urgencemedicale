import type { OfferLeaf, WithContext } from "schema-dts";
import { content } from "@/lib/content";
import { BUSINESS_ID } from "./business";

/** One Offer + PriceSpecification per real price tier (day/night/weekend) — never "contactez-nous". */
export function buildOffers(): WithContext<OfferLeaf>[] {
  return content.pricing.tiers.map((tier) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${BUSINESS_ID}#offer-${tier.slug}`,
    name: tier.label,
    seller: { "@id": BUSINESS_ID },
    priceSpecification: {
      "@type": "PriceSpecification",
      price: Number(tier.amountMad),
      priceCurrency: content.pricing.currency,
      description: tier.window,
    },
  }));
}
