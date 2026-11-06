/** Transactional messaging (NTF-01..). Demo only — never claim emails were sent. */
export const notificationService = {
  async sendBookingConfirmation(_ref: string): Promise<{ demo: true }> { return { demo: true }; },
  async sendQuoteAcknowledgement(_id: string): Promise<{ demo: true }> { return { demo: true }; },
};
