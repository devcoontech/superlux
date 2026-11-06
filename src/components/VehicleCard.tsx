"use client";
import Link from "next/link";
import { ArrowRight, Users, Luggage, Briefcase } from "@/components/icons";
import type { Vehicle } from "@/data/fleet";
import { VehicleArt, VehicleMedia } from "./VehicleArt";
import { AVAIL_META } from "@/lib/format";
import { useVehicleModal } from "@/store/vehicleModal";

const shell = "group card !rounded-lg h-full overflow-hidden flex flex-col hover:border-gold/40 transition-colors";
const media = "transition-transform duration-700 group-hover:scale-[1.04]";
const category = "text-[11px] font-bold tracking-[0.16em] uppercase text-gold";
const action = "flex-1 !px-2 !tracking-[0.1em] h-12 !py-0";

export function VehicleCard({ v, quickView = false }: { v: Vehicle; quickView?: boolean }) {
  const openModal = useVehicleModal((s) => s.open);
  if (v.poa) return (
    <article className={shell}>
      <div className="relative aspect-[3/2] overflow-hidden"><VehicleArt body="poa" /></div>
      <div className="p-5 lg:p-6 flex flex-col flex-1">
        <span className={category}>{v.cat}</span>
        <h3 className="h-serif text-[23px] leading-snug mt-1.5">{v.name} <span className="text-gold h-serif">— POA</span></h3>
        <p className="text-muted text-[14.5px] leading-relaxed mt-3 mb-5 flex-1">{v.desc}</p>
        <Link href="/contact?vehicle=other" className="btn btn-gold w-full h-12 !py-0">Request a Quote <ArrowRight size={15} /></Link>
      </div>
    </article>
  );
  const am = AVAIL_META[v.avail];
  const specs = [[Users, `${v.pax} pax`], [Luggage, `${v.lgBags} large`], [Briefcase, `${v.smBags} small`]] as const;
  return (
    <article className={shell}>
      <div className="relative aspect-[3/2] overflow-hidden shrink-0">
        {quickView
          ? <button type="button" onClick={() => openModal(v.id)} aria-label={`View ${v.name} details`} className="block w-full h-full"><VehicleMedia v={v} className={media} /></button>
          : <Link href={`/fleet/${v.id}`} aria-label={`View ${v.name} details`} className="block w-full h-full"><VehicleMedia v={v} className={media} /></Link>}
      </div>
      <div className="p-5 lg:p-6 flex flex-col flex-1">
        <span className={category}>{v.cat}</span>
        <h3 className="h-serif text-[23px] leading-snug mt-1.5"><Link href={`/fleet/${v.id}`} className="hover:text-gold transition-colors">{v.name}</Link></h3>
        <p className="text-muted text-[14.5px] leading-relaxed mt-3 flex-1">{v.desc}</p>
        <div className="grid grid-cols-3 border-y border-line my-4 divide-x divide-line">
          {specs.map(([Icon, label]) => <span key={label} className="flex items-center justify-center gap-1.5 py-2.5 text-[13px] text-white/90 whitespace-nowrap"><Icon size={14} className="text-gold shrink-0" />{label}</span>)}
        </div>
        <span className={`text-[12.5px] font-semibold mb-4 ${am.cls}`}>{am.label}</span>
        <div className="flex gap-2.5">
          {quickView
            ? <button type="button" onClick={() => openModal(v.id)} className={`btn btn-ghost ${action}`}>View Details</button>
            : <Link href={`/fleet/${v.id}`} className={`btn btn-ghost ${action}`}>View Details</Link>}
          <Link href={`/book?vehicle=${v.id}`} className={`btn btn-gold ${action}`}>Book Now</Link>
        </div>
      </div>
    </article>
  );
}
