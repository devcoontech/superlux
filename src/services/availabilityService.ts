import type { Vehicle, AvailabilityState } from "@/data/fleet";

/**
 * Capacity suitability is SEPARATE from booking availability (client requirement).
 * Unavailable vehicles are handled via a POA/contact workflow, never silently hidden.
 * The live implementation must call a real availability API (BKG-06 + client note).
 */
export const availabilityService = {
  suitable(v: Vehicle, pax: number, bags: number): boolean {
    if (v.poa) return true;
    const p = v.pax ?? 99;
    const b = (v.lgBags ?? 0) + (v.smBags ?? 0);
    return p >= pax && (b >= bags || v.pax == null);
  },
  state(v: Vehicle): AvailabilityState {
    // Demo: returns the static flag. Replace with live API call.
    return v.avail;
  },
  canPayNow(v: Vehicle): boolean {
    // Payment only permitted once availability & eligibility are confirmed.
    return v.avail === "confirmed" && !v.poa;
  },
};
