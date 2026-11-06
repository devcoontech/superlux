import Link from "next/link";
import { ArrowRight, Briefcase, Champagne, Clock, Gem, MapPin, Plane, Presentation, Route, type IconType } from "@/components/icons";
import type { ServiceItem } from "@/data/services";
import { serviceImage, sectionImage } from "@/data/media";

const ICONS: Record<string, IconType> = { Plane, Route, Clock, Briefcase, Champagne, Gem, Presentation, MapPin };

export function ServiceCard({ s, index }: { s: ServiceItem; index?: number }) {
  const Icon = ICONS[s.icon] || Route;
  return (
    <Link href={`/services/${s.id}`} className="group h-full flex flex-col rounded-lg overflow-hidden bg-bg-2 border border-line hover:border-gold/40 transition-colors">
      <div className="aspect-[16/10] overflow-hidden shrink-0">
        <img src={serviceImage(s.id) || sectionImage("about") || ""} alt={s.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-col flex-1 p-5 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon size={24} className="text-gold" />
          {index !== undefined && <span className="h-serif text-[17px] text-white/55" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
        </div>
        <h3 className="h-serif not-italic uppercase text-[20px] leading-snug tracking-wide text-white">{s.name}</h3>
        <p className="text-gold-soft text-[14.5px] leading-snug mt-2">{s.tagline}</p>
        <p className="text-muted text-[15px] leading-relaxed mt-3 flex-1">{s.blurb}</p>
        <span className="text-gold text-[12px] font-bold uppercase tracking-[0.14em] inline-flex items-center gap-2.5 mt-5">View Service <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}
