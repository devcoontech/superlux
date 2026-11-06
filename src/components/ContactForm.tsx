"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "@/components/icons";
import { SERVICES } from "@/data/services";
import { Select } from "./Pickers";
import { enquiryService } from "@/services/enquiryService";
import { analyticsService } from "@/services/analyticsService";

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), "Other / Not sure"].map((n) => ({ value: n, label: n }));
const input = "bg-bg-2 border border-line rounded px-4 py-3 text-[14.5px] focus:border-gold focus:outline-none w-full";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || ""); const consent = f.get("consent");
    if (!f.get("name") || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !f.get("phone") || !consent) { setErr("Please complete the required fields and provide consent."); return; }
    setErr(null); setName(String(f.get("name")));
    await enquiryService.submit({ name: String(f.get("name")), email, phone: String(f.get("phone")), consent: true });
    analyticsService.track("quote_submitted"); setSent(true);
  };
  if (sent) return (
    <div className="text-center py-10"><div className="w-20 h-20 rounded-full bg-[rgba(63,178,127,.1)] border border-[rgba(63,178,127,.4)] flex items-center justify-center mx-auto mb-6 text-[#3fb27f]"><CheckCircle size={38} /></div>
      <h2 className="h-serif text-2xl mb-2.5">Enquiry received</h2><p className="text-muted max-w-[420px] mx-auto">Thank you, {name}. We&apos;ve received your enquiry and our team will be in touch.</p>
      <Link href="/" className="btn btn-gold mt-7">Return Home <ArrowRight size={15} /></Link></div>
  );
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2 mb-4"><span className="field-label">Full name <span className="text-gold">*</span></span><input name="name" className={input} /></label>
        <label className="flex flex-col gap-2 mb-4"><span className="field-label">Email <span className="text-gold">*</span></span><input name="email" type="email" className={input} /></label>
        <label className="flex flex-col gap-2 mb-4"><span className="field-label">Phone <span className="text-gold">*</span></span><input name="phone" className={input} /></label>
        <label className="flex flex-col gap-2 mb-4"><span className="field-label">Service type</span><Select name="service" options={SERVICE_OPTIONS} ariaLabel="Service type" className={input} /></label>
      </div>
      <label className="flex flex-col gap-2 mb-4"><span className="field-label">Special requests</span><textarea name="notes" rows={4} className={input} /></label>
      <label className="flex items-start gap-3 mb-4"><input type="checkbox" name="consent" className="mt-1" /><span className="text-muted text-sm">I consent to Superluxe processing my data to respond to this enquiry, per the <Link href="/privacy" className="text-gold">privacy policy</Link>. <span className="text-gold">*</span></span></label>
      {err && <p className="text-[#d9534f] text-[13px] mb-4">{err}</p>}
      <button className="btn btn-gold">Send Enquiry <ArrowRight size={15} /></button>
    </form>
  );
}
