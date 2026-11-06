import { FLEET, getVehicle } from "@/data/fleet";
import { PRICING } from "@/data/pricing";

/**
 * Frontend pricing abstraction. Mirrors the client formula:
 *   Final = (OperationalHours × VehicleHourlyRate) + max(0, Miles − 100) × £2
 * Rates are ILLUSTRATIVE placeholders. The live implementation must call the
 * real pricing API so booking, CRM quotes and chatbot stay consistent (PRC-11).
 */
export interface PriceInput { vehicleId: string; hours: number; miles: number; extras?: string[]; }
export interface PriceBreakdown {
  mode: "price" | "quote";
  illustrative?: boolean;
  rate?: number; hours?: number; miles?: number; includedMiles?: number;
  base?: number; extraMiles?: number; mileage?: number;
  extrasList?: { id: string; name: string; price: number }[]; extrasTotal?: number;
  total?: number;
}

export const pricingService = {
  rateFor(id: string): number | null {
    return getVehicle(id)?.rate ?? null;
  },
  estimate({ vehicleId, hours, miles, extras = [] }: PriceInput): PriceBreakdown {
    const rate = this.rateFor(vehicleId);
    if (rate == null) return { mode: "quote" };
    const base = hours * rate;
    const extraMiles = Math.max(0, miles - PRICING.includedMiles);
    const mileage = extraMiles * PRICING.perMileOver;
    const extrasList = extras
      .map((eid) => PRICING.extras.find((x) => x.id === eid))
      .filter(Boolean) as { id: string; name: string; price: number }[];
    const extrasTotal = extrasList.reduce((s, e) => s + e.price, 0);
    return {
      mode: "price", illustrative: true, rate, hours, miles,
      includedMiles: PRICING.includedMiles, base, extraMiles, mileage,
      extrasList, extrasTotal, total: base + mileage + extrasTotal,
    };
  },
  /** Overtime: 15-min grace, then charged per half-hour unit. Rounding configurable. */
  overtime(rate: number, overrunMins: number, roundUp = true): number {
    if (overrunMins <= PRICING.overtimeGraceMins) return 0;
    const units = overrunMins / PRICING.overtimeUnitMins;
    const u = roundUp ? Math.ceil(units) : Math.round(units);
    return u * (rate / 2);
  },
};
export { FLEET };
