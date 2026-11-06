"use client";
import { useState } from "react";
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Calendar as CalIcon, ArrowRight } from "@/components/icons";
import { useBooking } from "@/store/booking";
import { slotService, fmtDate, type SlotState } from "@/services/slotService";
import { getVehicle } from "@/data/fleet";
import { DatePicker, TimePicker } from "./Pickers";

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const input = "bg-bg-3 border border-white/15 rounded px-4 py-3 text-[14.5px] focus:border-gold focus:outline-none w-full";

export function BookingCalendar() {
  const b = useBooking();
  const vehicle = getVehicle(b.vehicle);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const sel = b.date ? new Date(b.date + "T00:00:00") : null;
  const [view, setView] = useState(() => (sel ? { y: sel.getFullYear(), m: sel.getMonth() } : { y: today.getFullYear(), m: today.getMonth() }));
  const [enquiry, setEnquiry] = useState<{ date: string; time: string } | null>(null);

  const monthName = new Date(view.y, view.m, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const startDow = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const prevDisabled = view.y < today.getFullYear() || (view.y === today.getFullYear() && view.m <= today.getMonth());

  const pickDate = (ds: string) => b.set({ date: ds, time: "", slotState: "" });
  const pickSlot = (t: string, st: SlotState) => {
    if (st === "booked") { setEnquiry({ date: b.date, time: t }); return; }
    b.set({ time: t, slotState: st });
  };

  if (enquiry) return <SlotEnquiry info={enquiry} onBack={() => setEnquiry(null)} />;

  return (
    <div className="cal-wrap">
      <div className="cal">
        <div className="flex items-center justify-between mb-3">
          <button type="button" disabled={prevDisabled} onClick={() => setView((v) => ({ y: v.m === 0 ? v.y - 1 : v.y, m: v.m === 0 ? 11 : v.m - 1 }))} className="w-9 h-9 border border-line rounded text-gold flex items-center justify-center disabled:opacity-30" aria-label="Previous month"><ChevronLeft size={16} /></button>
          <b className="text-sm">{monthName}</b>
          <button type="button" onClick={() => setView((v) => ({ y: v.m === 11 ? v.y + 1 : v.y, m: v.m === 11 ? 0 : v.m + 1 }))} className="w-9 h-9 border border-line rounded text-gold flex items-center justify-center" aria-label="Next month"><ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1.5">{DOW.map((d) => <span key={d} className="text-center text-[10px] text-muted-2">{d}</span>)}</div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDow }).map((_, i) => <span key={"e" + i} />)}
          {Array.from({ length: days }).map((_, i) => {
            const d = i + 1; const dt = new Date(view.y, view.m, d); const ds = fmtDate(dt); const past = dt < today;
            return <button key={ds} type="button" disabled={past} onClick={() => pickDate(ds)} className={`cal-cell ${b.date === ds ? "sel" : ""}`} aria-label={ds}>{d}</button>;
          })}
        </div>
      </div>
      <div>
        {!b.date ? (
          <div className="min-h-[200px] flex flex-col items-center justify-center gap-3 text-muted border border-dashed border-white/20 rounded-lg text-center p-5"><CalIcon size={28} className="text-gold/50" /><span>Select a date to see available pickup times.</span></div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 mb-3">
              <b className="h-serif text-lg">{new Date(b.date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</b>
              {vehicle && <span className="text-[12.5px] text-muted text-right">Availability for the <span className="text-white">{vehicle.name}</span></span>}
            </div>
            <div className="flex gap-4 flex-wrap mb-3.5 text-[11.5px] text-muted">
              <span className="inline-flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm" style={{ background: "#3fb27f" }} /> Available</span>
              <span className="inline-flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm" style={{ background: "#e0a53a" }} /> On request</span>
              <span className="inline-flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm" style={{ background: "#7c7c7c" }} /> Booked</span>
            </div>
            <div className="slot-grid">
              {slotService.daySlots(b.date, b.vehicle).map((s) => {
                const seld = b.time === s.time;
                const cls = s.state === "booked" ? "booked" : seld ? "sel" : "";
                const label = s.state === "booked" ? "Booked" : s.state === "manual" ? "On request" : "Available";
                const col = s.state === "manual" ? "text-[#e0a53a]" : s.state === "available" ? "text-[#3fb27f]" : "text-muted-2";
                return <button key={s.time} type="button" onClick={() => pickSlot(s.time, s.state)} className={`slot ${cls} ${s.state === "manual" ? "border-[rgba(224,165,58,.4)]" : ""}`}><span className="text-sm font-semibold">{s.time}</span><small className={seld ? "text-black/70" : col}>{label}</small></button>;
              })}
            </div>
            {b.slotState === "manual" && <div className="flex gap-3 p-4 rounded border border-[#e0a53a]/40 text-[#ecd9b4] text-[13px] mt-4"><AlertTriangle size={18} className="shrink-0 mt-0.5" /><div>This time needs manual confirmation. You can continue, but it will be submitted as a request and no payment is taken until our team confirms.</div></div>}
          </>
        )}
      </div>
    </div>
  );
}

function SlotEnquiry({ info, onBack }: { info: { date: string; time: string }; onBack: () => void }) {
  const b = useBooking();
  const v = getVehicle(b.vehicle);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const [f, setF] = useState({ name: b.name, email: b.email, phone: b.phone, date: info.date, time: info.time, pickup: b.pickup, dest: b.dest, msg: "" });
  const up = (k: string, val: string) => setF((s) => ({ ...s, [k]: val }));
  if (done) return (
    <div className="text-center py-3">
      <div className="w-20 h-20 rounded-full bg-[rgba(63,178,127,.1)] border border-[rgba(63,178,127,.4)] flex items-center justify-center mx-auto mb-5 text-[#3fb27f]"><CheckCircle size={38} /></div>
      <h3 className="h-serif text-xl mb-2">Enquiry received</h3>
      <p className="text-muted max-w-[460px] mx-auto">Thank you, {f.name}. Our team will contact you to arrange your preferred time.</p>
      <button type="button" onClick={onBack} className="btn btn-outline mt-5">Choose another time</button>
    </div>
  );
  const submit = () => {
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email);
    if (!f.name || !emailOk || !f.phone || !f.date || !f.time) { setErr(true); return; }
    setDone(true);
  };
  return (
    <div>
      <div className="flex gap-3 p-4 rounded border border-[#e0a53a]/40 text-[#ecd9b4] text-[13px] mb-5"><AlertTriangle size={18} className="shrink-0 mt-0.5" /><div><b>Your selected time is currently unavailable.</b> Please submit your details and our team will contact you to discuss alternative arrangements.</div></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2"><span className="field-label">Full name <span className="text-gold">*</span></span><input className={input} value={f.name} onChange={(e) => up("name", e.target.value)} /></label>
        <label className="flex flex-col gap-2"><span className="field-label">Email <span className="text-gold">*</span></span><input type="email" className={input} value={f.email} onChange={(e) => up("email", e.target.value)} /></label>
        <label className="flex flex-col gap-2"><span className="field-label">Phone (with country code) <span className="text-gold">*</span></span><input className={input} value={f.phone} onChange={(e) => up("phone", e.target.value)} placeholder="+44..." /></label>
        <label className="flex flex-col gap-2"><span className="field-label">Selected vehicle</span><input className={input} value={v ? v.name : "To be advised"} readOnly /></label>
        <label className="flex flex-col gap-2"><span className="field-label">Requested date <span className="text-gold">*</span></span><DatePicker className={input} ariaLabel="Requested date" min={fmtDate(new Date())} value={f.date} onChange={(v) => up("date", v)} /></label>
        <label className="flex flex-col gap-2"><span className="field-label">Requested pickup time <span className="text-gold">*</span></span><TimePicker className={input} ariaLabel="Requested pickup time" value={f.time} onChange={(v) => up("time", v)} /></label>
        <label className="flex flex-col gap-2"><span className="field-label">Pickup address</span><input className={input} value={f.pickup} onChange={(e) => up("pickup", e.target.value)} /></label>
        <label className="flex flex-col gap-2"><span className="field-label">Drop-off address</span><input className={input} value={f.dest} onChange={(e) => up("dest", e.target.value)} /></label>
      </div>
      <label className="flex flex-col gap-2 mt-4"><span className="field-label">Additional requirements / message</span><textarea rows={3} className={input} value={f.msg} onChange={(e) => up("msg", e.target.value)} /></label>
      {err && <p className="text-[#d9534f] text-[13px] mt-3">Please complete name, a valid email, phone, date and time.</p>}
      <div className="flex gap-3 flex-wrap mt-4">
        <button type="button" onClick={submit} className="btn btn-gold">Submit Enquiry <ArrowRight size={15} /></button>
        <button type="button" onClick={onBack} className="btn btn-ghost">Back to calendar</button>
      </div>
    </div>
  );
}
