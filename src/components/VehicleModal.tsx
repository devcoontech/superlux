"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Users, Luggage, Briefcase, ArrowRight } from "@/components/icons";
import { useVehicleModal } from "@/store/vehicleModal";
import { getVehicle } from "@/data/fleet";
import { VehicleMedia } from "./VehicleArt";
import { gbp, AVAIL_META } from "@/lib/format";

// Reusable vehicle-details modal — mounted once; opened by any vehicle card.
export function VehicleModal() {
  const { openId, close } = useVehicleModal();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const v = openId ? getVehicle(openId) : null;

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab" && cardRef.current) {
        const f = Array.from(cardRef.current.querySelectorAll<HTMLElement>('button,a[href],[tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [openId, close]);

  if (!openId || !v) return null;
  const am = AVAIL_META[v.avail];
  const book = () => { close(); router.push(`/book?vehicle=${v.id}`); };

  return (
    <div className="veh-modal" role="dialog" aria-modal="true" aria-label={`${v.name} details`}>
      <div className="veh-modal-backdrop" onClick={close} />
      <div className="veh-modal-card" role="document" ref={cardRef}>
        <button ref={closeRef} className="vm-close" aria-label="Close vehicle details" onClick={close}><X size={20} /></button>
        <div className="vm-media"><VehicleMedia v={v} /><span className="absolute top-3 left-3 z-[2] text-[10.5px] tracking-[0.14em] uppercase text-gold bg-black/70 border border-[rgba(255,215,0,.28)] px-2.5 py-1 rounded-full">{v.cat}</span></div>
        <div className="vm-body">
          <span className={`text-[11px] font-semibold ${am.cls}`}>{am.label}</span>
          <h2 className="vm-title">{v.name}</h2>
          <p className="vm-desc">{v.desc}</p>
          {!v.poa && (
            <div className="vm-specs">
              <div className="vm-spec"><Users size={20} className="text-gold shrink-0" /><div><b>{v.pax}</b><span>Passengers</span></div></div>
              <div className="vm-spec"><Luggage size={20} className="text-gold shrink-0" /><div><b>{v.lgBags}</b><span>Large bags</span></div></div>
              <div className="vm-spec"><Briefcase size={20} className="text-gold shrink-0" /><div><b>{v.smBags}</b><span>Small bags</span></div></div>
            </div>
          )}
          <div className="vm-price"><span className="text-muted text-[13px]">{v.poa ? "Pricing" : "Guide hourly rate"}</span><b>{v.poa ? "Price on Application" : `${gbp(v.rate!)}/hr`}</b></div>
          {v.poa
            ? <a href="/contact?vehicle=other" className="btn btn-gold w-full" onClick={close}>Request a Quote <ArrowRight size={15} /></a>
            : <button className="btn btn-gold w-full" onClick={book}>Book This Vehicle <ArrowRight size={15} /></button>}
          {!v.poa && <Link href={`/fleet/${v.id}`} onClick={close} className="btn btn-outline w-full mt-3">View More <ArrowRight size={15} /></Link>}
        </div>
      </div>
    </div>
  );
}
