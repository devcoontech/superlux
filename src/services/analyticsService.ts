/**
 * Consent-gated analytics event layer (ANL-01, WEB-13). Events only fire after
 * consent; no real events are sent in the demo.
 */
export type AnalyticsEvent =
  | "page_view" | "quote_submitted" | "booking_started" | "booking_step_completed"
  | "payment_completed" | "booking_completed" | "chat_started";

let consented = false;
export const analyticsService = {
  grantConsent() { consented = true; },
  revokeConsent() { consented = false; },
  track(event: AnalyticsEvent, _payload?: Record<string, unknown>) {
    if (!consented) return;
    // TODO: push to dataLayer / GA. Demo: no-op.
  },
};
