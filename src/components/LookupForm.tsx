"use client";
import { useState } from "react";
import { Search, AlertTriangle, Check, Info } from "@/components/icons";
import { bookingService } from "@/services/bookingService";

const input = "bg-bg-2 border border-line rounded px-4 py-3 text-[14.5px] focus:border-gold focus:outline-none w-full";

export function LookupForm() {
  const [status, setStatus] = useState<null | "found" | "notfound" | "invalid">(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const ref = String(f.get("ref") || ""); const email = String(f.get("email") || "");
    if (!ref || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setStatus("invalid"); return; }
    setLoading(true); const r = await bookingService.lookup(ref, email); setLoading(false); setStatus(r.status);
  };
  return (
    <div>
      <form onSubmit={onSubmit} noValidate>
        <label className="flex flex-col gap-2 mb-4"><span className="text-[12.5px]">Booking reference <span className="text-gold">*</span></span><input name="ref" className={input} placeholder="e.g. SLX-XXXXXX" /></label>
        <label className="flex flex-col gap-2 mb-4"><span className="text-[12.5px]">Email address <span className="text-gold">*</span></span><input name="email" type="email" className={input} /></label>
        <button className="btn btn-gold" disabled={loading}><Search size={15} /> {loading ? "Searching…" : "Find My Booking"}</button>
      </form>
      {status === "found" && <div className="card p-7 mt-7"><div className="flex justify-between items-center flex-wrap gap-3 mb-4"><h3 className="h-serif text-xl">Booking found</h3><span className="text-[#3fb27f] text-xs font-semibold inline-flex items-center gap-1.5"><Check size={14} /> Confirmed</span></div><p className="text-muted text-sm">Your booking is confirmed. To request a change or cancellation, please contact our team.</p></div>}
      {status === "notfound" && <div className="flex gap-3 p-4 rounded border border-[#e0a53a]/40 text-[#ecd9b4] text-[13px] mt-7"><AlertTriangle size={18} className="shrink-0 mt-0.5" /><div><b>Booking not found.</b> Please check your reference and try again.</div></div>}
      {status === "invalid" && <div className="flex gap-3 p-4 rounded border border-[#e0a53a]/40 text-[#ecd9b4] text-[13px] mt-7"><AlertTriangle size={18} className="shrink-0 mt-0.5" /><div><b>Invalid details.</b> The reference and email don't match. Please check them and try again.</div></div>}
    </div>
  );
}
