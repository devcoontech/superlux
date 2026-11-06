/**
 * Payment abstraction. Live implementation uses Stripe hosted fields (PAY-01) —
 * card data is never processed or stored by this app. Additional methods
 * (Apple/Google Pay, PayPal, Klarna, OneLink) are subject to the client's
 * provider configuration and must not be claimed as available until confirmed.
 */
export type PayMode = "deposit" | "full" | "later";
export type PayMethod = "card" | "applepay" | "googlepay" | "paypal" | "klarna" | "onelink";

export const paymentService = {
  methods: [
    { id: "card" as const, label: "Card", note: "Visa · Mastercard · Amex (Stripe)" },
    { id: "applepay" as const, label: "Apple Pay", note: "subject to config" },
    { id: "googlepay" as const, label: "Google Pay", note: "subject to config" },
    { id: "paypal" as const, label: "PayPal", note: "subject to config" },
    { id: "klarna" as const, label: "Klarna", note: "subject to config" },
    { id: "onelink" as const, label: "OneLink", note: "subject to config" },
  ],
  async createIntent(): Promise<{ demo: true; clientSecret: null }> {
    // TODO: create a Stripe PaymentIntent server-side and mount hosted fields.
    return { demo: true, clientSecret: null };
  },
};
