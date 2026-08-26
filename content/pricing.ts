import { todo } from "./schema";
import type { Pricing } from "./schema";

/**
 * Real day/night/weekend price tiers, published in a table on /tarifs
 * (Phase 5 — nobody in this market publishes real prices). Amounts are hard
 * placeholders — never invented; fill each `todo(...)` with the real MAD amount.
 */
export const pricing: Pricing = {
  currency: "MAD",
  tiers: [
    {
      slug: "jour",
      label: "Consultation en journée",
      window: "07h00 - 20h00",
      amountMad: todo("day-tier price in MAD, plain number"),
    },
    {
      slug: "nuit",
      label: "Consultation de nuit",
      window: "20h00 - 07h00",
      amountMad: todo("night-tier price in MAD, plain number"),
    },
    {
      slug: "weekend",
      label: "Consultation weekend / jours fériés",
      window: "Samedi, dimanche et jours fériés",
      amountMad: todo("weekend/holiday-tier price in MAD, plain number"),
    },
  ],
};
