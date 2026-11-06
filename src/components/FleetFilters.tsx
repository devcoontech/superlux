"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "@/components/icons";
import { Select } from "./Pickers";
import { MANUFACTURERS, VEHICLE_TYPES } from "@/data/fleet";
import { BrandLogo } from "./BrandLogo";

export interface FleetQuery { brand?: string; type?: string; pax?: string; sort?: string; search?: string }

export const fleetHref = (q: FleetQuery) => {
  const p = new URLSearchParams();
  Object.entries(q).forEach(([k, val]) => { if (val) p.set(k, val); });
  const s = p.toString();
  return s ? `/fleet?${s}` : "/fleet";
};

const selectClass = "w-full bg-bg-3 border border-white/15 rounded-lg h-11 px-3.5 text-[14px] text-white focus:border-gold focus:outline-none";
const PAX_OPTIONS = [{ value: "", label: "Any number" }, { value: "4", label: "4 or more" }, { value: "6", label: "6 or more" }, { value: "10", label: "10 or more" }];
const SORT_OPTIONS = [{ value: "", label: "Recommended" }, { value: "rate-asc", label: "Hourly rate: low to high" }, { value: "rate-desc", label: "Hourly rate: high to low" }, { value: "pax-desc", label: "Most passengers" }];

export function FleetFilters({ query, count }: { query: FleetQuery; count: number }) {
  const router = useRouter();
  const set = (patch: FleetQuery) => router.replace(fleetHref({ ...query, ...patch }), { scroll: false });
  const filtered = !!(query.brand || query.type || query.pax);
  const pill = (active: boolean) => `inline-flex items-center text-[13.5px] font-semibold px-4 h-10 rounded-full border transition-colors ${active ? "bg-gold text-black border-gold" : "border-white/20 text-white hover:border-gold hover:text-gold"}`;

  return (
    <div className="card !rounded-lg p-5 lg:p-7 mb-8">
      <div className="flex items-center gap-2.5 mb-5"><SlidersHorizontal size={17} className="text-gold" /><span className="label-caps">Filter the fleet</span></div>

      <span className="field-label block mb-2.5">Vehicle type</span>
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href={fleetHref({ ...query, type: undefined })} scroll={false} aria-current={!query.type ? "true" : undefined} className={pill(!query.type)}>All Types</Link>
        {VEHICLE_TYPES.map((t) => <Link key={t.id} href={fleetHref({ ...query, type: t.id })} scroll={false} aria-current={query.type === t.id ? "true" : undefined} className={pill(query.type === t.id)}>{t.name}</Link>)}
      </div>

      <span className="field-label block mb-2.5">Brand</span>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
        <Link href={fleetHref({ ...query, brand: undefined })} scroll={false} aria-current={!query.brand ? "true" : undefined} className={`h-[86px] rounded-lg bg-white flex items-center justify-center text-[12px] font-black uppercase tracking-[0.18em] text-[#222] border-2 transition-colors ${!query.brand ? "border-gold" : "border-transparent hover:border-gold/60"}`}>All</Link>
        {MANUFACTURERS.map((m) => (
          <Link key={m.slug} href={fleetHref({ ...query, brand: m.slug })} scroll={false} title={`${m.name} (${m.count})`} aria-current={query.brand === m.slug ? "true" : undefined} className={`h-[86px] rounded-lg bg-white flex flex-col items-center justify-center gap-1 px-1 border-2 transition-colors ${query.brand === m.slug ? "border-gold" : "border-transparent hover:border-gold/60"}`}>
            <span className="h-12 flex items-center overflow-hidden"><BrandLogo src={m.logo} name={m.name} height={Math.round(m.logoHeight * 0.68)} /></span>
            <span className="text-[11px] leading-none text-[#222]">{m.name}</span>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-[220px_220px_1fr] gap-4 items-end pt-5 border-t border-line">
        <label className="block"><span className="field-label block mb-2">Passengers</span>
          <Select value={query.pax || ""} onChange={(v) => set({ pax: v || undefined })} options={PAX_OPTIONS} ariaLabel="Passengers" className={selectClass} />
        </label>
        <label className="block"><span className="field-label block mb-2">Sort by</span>
          <Select value={query.sort || ""} onChange={(v) => set({ sort: v || undefined })} options={SORT_OPTIONS} ariaLabel="Sort by" className={selectClass} />
        </label>
        <div className="flex items-center justify-between lg:justify-end gap-5 sm:col-span-2 lg:col-span-1 h-11" aria-live="polite">
          <span className="text-[15px] text-white"><b className="text-gold">{count}</b> {count === 1 ? "vehicle" : "vehicles"}</span>
          {filtered && <Link href={fleetHref({ search: query.search, sort: query.sort })} scroll={false} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white hover:text-gold"><X size={15} /> Clear filters</Link>}
        </div>
      </div>
    </div>
  );
}
