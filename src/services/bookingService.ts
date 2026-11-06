import type { BookingDraft } from "@/schemas/booking";

/** Integration point for booking creation (BKG-14). Demo returns a fake reference. */
export const bookingService = {
  async create(draft: BookingDraft): Promise<{ ok: boolean; reference: string; demo: true }> {
    // TODO: POST to the real intake interface (API-01). Idempotent on the server.
    return { ok: true, reference: "SLX-" + Math.random().toString(36).slice(2, 7).toUpperCase(), demo: true };
  },
  async lookup(reference: string, email: string): Promise<{ status: "found" | "notfound" | "invalid"; demo: true }> {
    // TODO: read from CRM (BKG-16). Demo matches a sample reference only.
    if (reference.toUpperCase() === "SLX-100200") return { status: "found", demo: true };
    if (reference.toUpperCase() === "SLX-000000") return { status: "notfound", demo: true };
    return { status: "invalid", demo: true };
  },
};
