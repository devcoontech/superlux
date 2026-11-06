"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "@/components/icons";
import { SERVICES } from "@/data/services";
import { Select } from "./Pickers";
import { enquiryService } from "@/services/enquiryService";
import { analyticsService } from "@/services/analyticsService";

const SERVICE_OPTIONS = ["Not sure yet", ...SERVICES.map((s) => s.name)].map((n) => ({ value: n, label: n }));
const input = "bg-white/[0.04] border border-white/15 rounded-md px-3.5 text-[15px] text-white placeholder:text-muted-2 focus:border-gold focus:outline-none w-full";

export function QueryForm() {
  const [sentTo, setSentTo] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    if (!name || !phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !f.get("consent")) { setErr("Please complete the required fields and provide consent."); return; }
    setErr(null);
    await enquiryService.submit({ name, email, phone, notes: [f.get("service"), f.get("query")].filter(Boolean).join(" — "), consent: true });
    analyticsService.track("quote_submitted");
    setSentTo(name);
  };

  if (sentTo) return (
    <div className="text-center py-10" role="status">
      <CheckCircle size={40} className="text-gold mx-auto mb-4" />
      <h3 className="h-serif text-2xl mb-2">Thank you, {sentTo}</h3>
      <p className="text-muted text-[15px]">We&apos;ve received your query and our team will be in touch.</p>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="text-left">
      <h3 className="h-serif text-[26px] md:text-3xl leading-tight">Send us your query</h3>
      <p className="text-muted text-[15px] mt-1 mb-6">Tell us about your journey and we&apos;ll come back to you.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block"><span className="field-label block mb-2">Full name <span className="text-gold">*</span></span><input name="name" autoComplete="name" className={`${input} h-12`} /></label>
        <label className="block"><span className="field-label block mb-2">Phone <span className="text-gold">*</span></span><input name="phone" type="tel" autoComplete="tel" className={`${input} h-12`} /></label>
        <label className="block"><span className="field-label block mb-2">Email <span className="text-gold">*</span></span><input name="email" type="email" autoComplete="email" className={`${input} h-12`} /></label>
        <label className="block"><span className="field-label block mb-2">Service</span>
          <Select name="service" options={SERVICE_OPTIONS} ariaLabel="Service" className={`${input} h-12`} />
        </label>
      </div>
      <label className="block mt-4"><span className="field-label block mb-2">Your query</span><textarea name="query" rows={3} className={`${input} py-3`} placeholder="Dates, locations, passengers, preferred vehicle…" /></label>
      <label className="flex items-start gap-3 mt-4"><input type="checkbox" name="consent" className="mt-1 w-4 h-4 shrink-0" /><span className="text-muted text-[14px] leading-snug">I consent to Superluxe processing my data to respond to this query, per the <Link href="/privacy" className="text-gold underline underline-offset-2">privacy policy</Link>. <span className="text-gold">*</span></span></label>
      {err && <p className="text-[#ff8a85] text-[14px] mt-3" role="alert">{err}</p>}
      <button className="btn btn-gold w-full mt-5 h-[52px] !py-0">Send Query <ArrowRight size={15} /></button>
    </form>
  );
}
