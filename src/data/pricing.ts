// Pricing configuration. ALL auto-prices are ILLUSTRATIVE until the client
// confirms real rates. Centralised so the booking engine, CRM quotes and the
// chatbot can share one source (PRC-11).
export const PRICING = {
  includedMiles: 100,
  perMileOver: 2, // £ per mile beyond included
  overtimeGraceMins: 15,
  overtimeUnitMins: 30, // charged per half-hour
  illustrative: true,
  extras: [
    { id: "child-seat", name: "Child seat", price: 15 },
    { id: "meet-greet", name: "Meet & greet", price: 25 },
    { id: "extra-wait", name: "Additional waiting (per 30 min)", price: 30 },
    { id: "champagne", name: "Champagne service", price: 45 },
  ],
} as const;
export type Extra = (typeof PRICING.extras)[number];
