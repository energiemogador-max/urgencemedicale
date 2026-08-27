import type { Pricing } from "./schema";

/**
 * Operator-supplied (2026-08-27): 500 MAD in the daytime and at the weekend,
 * 700 MAD at night and on public holidays.
 *
 * Note the grouping is not the obvious one — the weekend sits with the
 * daytime rate, not with the night rate, and public holidays sit with nights.
 * That is deliberate and comes from the operator; don't "tidy" it into a
 * day/night/weekend split, which is what an earlier draft assumed.
 *
 * These are consultation rates only. Nursing acts, oxygen therapy, home
 * hospitalisation and medical transfers are priced per intervention and are
 * quoted on the phone — no page may reuse these figures for them.
 */
export const pricing: Pricing = {
  currency: "MAD",
  tiers: [
    {
      slug: "jour-weekend",
      label: "Consultation en journée et le week-end",
      window: "07h00 - 20h00, samedi et dimanche inclus",
      amountMad: "500",
    },
    {
      slug: "nuit-ferie",
      label: "Consultation de nuit et jours fériés",
      window: "20h00 - 07h00, et jours fériés",
      amountMad: "700",
    },
  ],
};
