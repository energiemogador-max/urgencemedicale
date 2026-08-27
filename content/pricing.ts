import type { Pricing } from "./schema";

/**
 * PREVIEW STATE (2026-08-27): operator gave one flat consultation price
 * (500 MAD), applied here to all three tiers. Night/weekend surcharges are
 * standard in this market and worth revisiting with the operator — flag,
 * don't invent a markup number they never gave.
 */
export const pricing: Pricing = {
  currency: "MAD",
  tiers: [
    {
      slug: "jour",
      label: "Consultation en journée",
      window: "07h00 - 20h00",
      amountMad: "500",
    },
    {
      slug: "nuit",
      label: "Consultation de nuit",
      window: "20h00 - 07h00",
      amountMad: "500",
    },
    {
      slug: "weekend",
      label: "Consultation weekend / jours fériés",
      window: "Samedi, dimanche et jours fériés",
      amountMad: "500",
    },
  ],
};
