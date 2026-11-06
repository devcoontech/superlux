"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Calendar, Clock, ArrowRight, Pencil } from "@/components/icons";
import { useBooking } from "@/store/booking";

// Shows what the visitor searched for. Waits for mount because the booking store lives in sessionStorage.
export function JourneySummary() {
  const b = useBooking();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const when = b.date ? new Date(`${b.date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : null;
  const hourly = b.service === "hourly-hire";
  if (!b.pickup && !b.dest && !when && !hourly) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 card border-t-2 border-t-gold p-5 mb-7">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-white min-w-0">
        <span className="label-caps !tracking-[0.2em]">Your journey</span>
        {b.pickup || (!hourly && b.dest) ? <span className="inline-flex items-center gap-2 min-w-0"><MapPin size={15} className="text-gold shrink-0" /><span className="break-words min-w-0">{b.pickup || "Pickup to confirm"}{!hourly && b.dest ? ` → ${b.dest}` : ""}</span></span> : null}
        {hourly && <span className="inline-flex items-center gap-2"><Clock size={15} className="text-gold shrink-0" />{b.duration} hours</span>}
        {when && <span className="inline-flex items-center gap-2"><Calendar size={15} className="text-gold shrink-0" />{when}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-5 text-[13px] font-semibold">
        <Link href="/#search" className="inline-flex items-center gap-1.5 text-white hover:text-gold"><Pencil size={13} /> Edit search</Link>
        <span className="text-muted font-normal inline-flex items-center gap-1.5">Choose a car to continue <ArrowRight size={13} className="text-gold" /></span>
      </div>
    </div>
  );
}
