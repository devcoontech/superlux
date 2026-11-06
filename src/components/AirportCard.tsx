import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { Airport } from "@/data/airports";
import { airportImage } from "@/data/media";

export function AirportCard({ a }: { a: Airport }) {
  return (
    <Link href={`/airports/${a.id}`} className="group h-full flex flex-col rounded-lg overflow-hidden border bg-bg-2 border-line hover:border-gold/40 transition-colors">
      <div className="aspect-[16/10] overflow-hidden shrink-0">
        <img src={airportImage(a.id) || ""} alt={`${a.name} Airport`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-col flex-1 p-5 lg:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="h-serif not-italic uppercase text-[20px] leading-snug tracking-wide text-white">{a.name}</h3>
          <span className="shrink-0 border border-white/25 text-white rounded-sm px-2 py-0.5 text-[12px] font-bold tracking-[0.12em]">{a.code}</span>
        </div>
        <p className="text-gold-soft text-[14.5px] leading-snug mt-2">{a.location}</p>
        <p className="text-muted text-[15px] leading-relaxed mt-3 flex-1">{a.blurb}</p>
        <span className="text-gold text-[12px] font-bold uppercase tracking-[0.14em] inline-flex items-center gap-2.5 mt-5">View Airport <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}
