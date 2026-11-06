import { BRAND } from "@/data/brand";
export const gbp = (n: number) =>
  BRAND.symbol + Number(n).toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export const AVAIL_META: Record<string, { cls: string; label: string }> = {
  confirmed: { cls: "text-[#3fb27f]", label: "Availability confirmed" },
  unconfirmed: { cls: "text-[#e0a53a]", label: "Subject to availability" },
  followup: { cls: "text-[#d9534f]", label: "On request — team will confirm" },
  quote: { cls: "text-[#5b8bd0]", label: "Quote required" },
};
