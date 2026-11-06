/**
 * AI chat abstraction (CHT-01..). The live assistant must answer only from an
 * approved knowledge base, obtain prices only from pricingService, never claim a
 * booking/availability is confirmed, and hand off to staff. Demo replies only.
 */
export const chatService = {
  disclosure: "You're chatting with an AI assistant. It won't confirm bookings or prices.",
  async reply(message: string): Promise<string> {
    const l = message.toLowerCase();
    if (l.includes("airport")) return "We serve Heathrow, Gatwick, Stansted, Luton and London City. Shall I start an airport transfer for you?";
    if (/(quote|price|cost)/.test(l)) return "I can't calculate prices here — pricing comes only from the live engine. I can help you submit a quote request.";
    if (/(confirm|booking)/.test(l)) return "I can't confirm bookings or availability — that's only done by the booking engine. You can check an existing booking on the Manage Booking page.";
    if (/(vehicle|car|fleet)/.test(l)) return "Our fleet ranges from the Mercedes E-Class to Rolls-Royce and Bentley. See the Fleet page.";
    return "Thanks for your message. I answer only from Superluxe's approved information.";
  },
};
