/**
 * Membership pricing (PLAN.md item 11). Pending owner approval in docs/pricing-draft.md,
 * and must match Gymdesk → Memberships.
 */
export const plans = [
  { name: 'One student', price: 175 },
  { name: 'Family of two', price: 290 },
  { name: 'Family of three', price: 370 },
  { name: 'Family of four or more', price: 420 },
] as const;

export const pricingTerms = [
  'Month-to-month — no long-term contract',
  'No enrollment fee',
  'Your first class is free',
];
