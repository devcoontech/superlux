/**
 * Slot availability — DEMONSTRATION DATA ONLY. Deterministic and clearly simulated.
 * Kept separate & configurable so a real backend availability API can replace
 * daySlots() later. The company must validate availability before taking payment.
 * Slots are per vehicle: each car has its own diary, and cars whose availability
 * can't be confirmed instantly offer their open slots on request only.
 */
import { getVehicle } from "@/data/fleet";

export type SlotState = "available" | "booked" | "manual";
const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
function hash(s: string) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h; }

export const slotService = {
  demo: true,
  hours: HOURS,
  daySlots(dateStr: string, vehicleId = ""): { time: string; state: SlotState }[] {
    const v = getVehicle(vehicleId);
    const onRequestOnly = !!v && (!!v.poa || v.avail === "followup" || v.avail === "quote");
    return HOURS.map((h) => {
      const t = (h < 10 ? "0" + h : "" + h) + ":00";
      const hs = hash(`${vehicleId}|${dateStr}@${t}`);
      let state: SlotState = "available";
      if (hs % 6 === 0) state = "booked";
      else if (onRequestOnly || hs % 5 === 0) state = "manual";
      return { time: t, state };
    });
  },
  slotState(dateStr: string, timeStr: string, vehicleId = ""): SlotState {
    return this.daySlots(dateStr, vehicleId).find((x) => x.time === timeStr)?.state ?? "available";
  },
};
export const fmtDate = (d: Date) => {
  const y = d.getFullYear(), m = d.getMonth() + 1, da = d.getDate();
  return `${y}-${m < 10 ? "0" + m : m}-${da < 10 ? "0" + da : da}`;
};
