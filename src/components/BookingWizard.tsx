"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, ArrowUpDown, Briefcase, Check, CheckCircle, ChevronDown, ChevronLeft, Clock, Gem, Info, Luggage, MapPin, Minus, Pencil, Phone, Plane, Plus, Presentation, Route, Champagne, Users, type IconType } from "@/components/icons";
import { useBooking, type BookingState } from "@/store/booking";
import { FLEET, VEHICLE_TYPES, getVehicle, type Vehicle } from "@/data/fleet";
import { SERVICES } from "@/data/services";
import { AIRPORTS } from "@/data/airports";
import { BRAND } from "@/data/brand";
import { PRICING } from "@/data/pricing";
import { pricingService } from "@/services/pricingService";
import { availabilityService } from "@/services/availabilityService";
import { paymentService } from "@/services/paymentService";
import { bookingService } from "@/services/bookingService";
import { analyticsService } from "@/services/analyticsService";
import { EMAIL_REQUIRED, type BookingDraft } from "@/schemas/booking";
import { gbp, AVAIL_META } from "@/lib/format";
import { slotService } from "@/services/slotService";
import { BookingCalendar } from "./BookingCalendar";
import { Autocomplete, DatePicker, TimePicker } from "./Pickers";
import { VehicleMedia } from "./VehicleArt";

const STEPS = ["Vehicle", "Journey", "Extras", "Your Details", "Review"];
const LAST = STEPS.length;
const AIRPORT_OPTIONS = AIRPORTS.map((a) => `${a.name} Airport (${a.code})`);
const SERVICE_ICONS: Record<string, IconType> = { "airport-transfers": Plane, "point-to-point": Route, "hourly-hire": Clock, corporate: Briefcase, events: Champagne, weddings: Gem, roadshows: Presentation };

const input = "w-full bg-bg-3 border border-white/15 rounded-lg px-4 h-12 text-[15px] text-white placeholder:text-muted-2 focus:border-gold focus:outline-none";
const textarea = "w-full bg-bg-3 border border-white/15 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-muted-2 focus:border-gold focus:outline-none";
const selected = (on: boolean) => (on ? "border-gold bg-gold/[0.07]" : "border-white/15 bg-bg-3 hover:border-white/40");

type Errors = Record<string, string>;
const isHourly = (b: BookingState) => b.service === "hourly-hire";
const isReturn = (b: BookingState) => b.journeyType === "return" && !isHourly(b);

function journeyErrors(b: BookingState): Errors {
  const e: Errors = {};
  if (!b.service) e.service = "Please choose a service.";
  if (!b.pickup.trim()) e.pickup = "Please enter your pick-up location.";
  if (!isHourly(b) && !b.dest.trim()) e.dest = "Please enter your drop-off location.";
  if (!b.date || !b.time) e.when = "Please choose a date and pick-up time.";
  if (isReturn(b)) {
    if (!b.returnDate || !b.returnTime) e.ret = "Please choose your return date and time.";
    else if (b.date && `${b.returnDate}T${b.returnTime}` <= `${b.date}T${b.time || "00:00"}`) e.ret = "Your return must be after your pick-up.";
  }
  return e;
}
function stepErrors(b: BookingState): Errors {
  switch (b.step) {
    case 1: return b.vehicle ? {} : { vehicle: "Please choose a vehicle to continue." };
    case 2: return journeyErrors(b);
    case 4: {
      const e: Errors = {};
      if (!b.name.trim()) e.name = "Please enter the lead passenger's name.";
      const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email);
      if (EMAIL_REQUIRED ? !emailOk : b.email && !emailOk) e.email = "Please enter a valid email address.";
      if (!b.phone.trim()) e.phone = "Please enter a mobile number.";
      return e;
    }
    case 5: return b.consent ? {} : { consent: "Please give your consent so that we can process this booking." };
    default: return {};
  }
}

// Route distance needs the maps integration, so point-to-point prices use a typical journey for now.
function estimate(b: BookingState, v: Vehicle, withExtras = true) {
  const trips = isReturn(b) ? 2 : 1;
  return pricingService.estimate({ vehicleId: v.id, hours: isHourly(b) ? Number(b.duration || 2) : 3 * trips, miles: isHourly(b) ? 40 : 85 * trips, extras: withExtras ? b.extras : [] });
}
const needsQuote = (b: BookingState) => { const v = getVehicle(b.vehicle); return !v || !!v.poa || v.avail === "quote" || v.avail === "followup" || b.slotState === "manual"; };
// A time picked for one car may be booked for another, so switching car re-checks it against the new car's diary.
function vehiclePatch(b: BookingState, vehicle: string): Partial<BookingState> {
  if (!b.date || !b.time) return { vehicle };
  const state = slotService.slotState(b.date, b.time, vehicle);
  return state === "booked" ? { vehicle, time: "", slotState: "" } : { vehicle, slotState: state };
}
const niceDate = (d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

export function BookingWizard() {
  const b = useBooking();
  const params = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  // Runs once. The vehicle comes first because pick-up times depend on it, so a link from a car
  // (fleet card, vehicle page, quick view) pre-selects it and opens straight on the journey step.
  useEffect(() => {
    setMounted(true);
    const s = useBooking.getState();
    const vehicle = params.get("vehicle"); const service = params.get("service");
    if (vehicle || service) {
      if (s.reference) s.reset();
      const current = useBooking.getState();
      const patch: Partial<BookingState> = {};
      if (vehicle && getVehicle(vehicle)) Object.assign(patch, vehiclePatch(current, vehicle));
      if (service) patch.service = SERVICES.some((x) => x.id === service) ? service : "point-to-point";
      const merged = { ...current, ...patch };
      patch.step = !merged.vehicle ? 1 : Object.keys(journeyErrors(merged)).length ? 2 : 3;
      current.set(patch);
    } else {
      // A saved session can be from an older flow: never resume past what has been completed.
      const furthest = !s.vehicle ? 1 : Object.keys(journeyErrors(s)).length ? 2 : LAST;
      if (s.step > furthest) s.set({ step: furthest });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstRender = useRef(true);
  useEffect(() => {
    if (!mounted) return;
    if (firstRender.current) { firstRender.current = false; return; }
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [b.step, b.reference, mounted]);

  if (!mounted) return <p className="text-muted">Loading booking…</p>;
  if (b.reference) return <Confirmation b={b} />;
  return (
    <div ref={top} className="scroll-mt-28">
      <Stepper b={b} />
      <div className="grid lg:grid-cols-[minmax(0,1fr)_370px] gap-6 lg:gap-8 items-start mt-6 lg:mt-8">
        <div className="lg:hidden"><details className="group card !rounded-lg"><summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden"><span className="label-caps !tracking-[0.18em]">Your booking</span><span className="inline-flex items-center gap-2 text-gold font-semibold"><SummaryPrice b={b} /><ChevronDown size={16} className="transition-transform group-open:rotate-180" /></span></summary><div className="px-4 pb-4"><SummaryBody b={b} /></div></details></div>
        <Panel key={b.step} b={b} />
        <aside className="hidden lg:block lg:sticky lg:top-[100px]"><div className="card !rounded-lg p-6"><h3 className="h-serif text-2xl mb-4">Your booking</h3><SummaryBody b={b} /></div></aside>
      </div>
    </div>
  );
}

function Stepper({ b }: { b: BookingState }) {
  return (
    <nav aria-label="Booking progress">
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between mb-2"><span className="h-serif text-xl">{STEPS[b.step - 1]}</span><span className="text-muted text-[13px]">Step {b.step} of {LAST}</span></div>
        <div className="h-1 rounded-full bg-white/15 overflow-hidden"><div className="h-full bg-gold transition-all duration-500" style={{ width: `${(b.step / LAST) * 100}%` }} /></div>
      </div>
      <ol className="hidden sm:flex items-center">
        {STEPS.map((label, i) => {
          const n = i + 1; const done = n < b.step; const on = n === b.step;
          const dot = <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 border-2 transition-colors ${on ? "bg-gold border-gold text-black" : done ? "border-gold text-gold" : "border-white/25 text-white/70"}`}>{done ? <Check size={15} /> : n}</span>;
          const text = <span className={`text-[14px] font-semibold whitespace-nowrap ${on ? "text-white" : done ? "text-white/90" : "text-white/60"}`}>{label}</span>;
          return (
            <li key={label} className={`flex items-center ${n < LAST ? "flex-1" : ""}`} aria-current={on ? "step" : undefined}>
              {done
                ? <button type="button" onClick={() => b.set({ step: n })} className="flex items-center gap-2.5 hover:opacity-80">{dot}{text}</button>
                : <span className="flex items-center gap-2.5">{dot}{text}</span>}
              {n < LAST && <span className={`flex-1 h-px mx-3 lg:mx-4 min-w-3 ${done ? "bg-gold" : "bg-white/20"}`} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Panel({ b }: { b: BookingState }) {
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const errors = stepErrors(b);
  const shown = tried ? errors : {};

  const next = async () => {
    if (Object.keys(errors).length) { setTried(true); return; }
    if (b.step < LAST) { b.set({ step: b.step + 1 }); return; }
    setBusy(true);
    const { step: _step, set: _set, reset: _reset, reference: _ref, ...draft } = b;
    const res = await bookingService.create(draft as unknown as BookingDraft);
    analyticsService.track("booking_completed");
    b.set({ reference: res.reference });
  };
  const quote = needsQuote(b);
  const label = b.step === LAST ? (quote ? "Submit Quote Request" : "Confirm Booking Request") : `Continue to ${STEPS[b.step]}`;

  return (
    <div className="min-w-0 rounded-lg border border-line bg-bg-2 p-5 sm:p-7 lg:p-9">
      {b.step === 1 && <StepVehicle b={b} e={shown} />}
      {b.step === 2 && <StepJourney b={b} e={shown} />}
      {b.step === 3 && <StepExtras b={b} />}
      {b.step === 4 && <StepDetails b={b} e={shown} />}
      {b.step === 5 && <StepReview b={b} e={shown} />}
      {tried && Object.keys(errors).length > 0 && <p role="alert" className="flex items-center gap-2 text-[#ff8a85] text-[14px] mt-6"><AlertCircle size={16} className="shrink-0" /> Please check the highlighted details above.</p>}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-7 pt-6 border-t border-line">
        {b.step > 1 ? <button type="button" className="btn btn-ghost" onClick={() => b.set({ step: b.step - 1 })}><ChevronLeft size={15} /> Back</button> : <span className="hidden sm:block" />}
        <button type="button" className="btn btn-gold disabled:opacity-60" disabled={busy} onClick={next}>{label} <ArrowRight size={15} /></button>
      </div>
    </div>
  );
}

function Head({ title, sub }: { title: string; sub: string }) {
  return <div className="mb-7"><h2 className="h-serif text-3xl leading-tight">{title}</h2><p className="text-muted text-[15px] mt-1.5">{sub}</p></div>;
}
function Err({ text }: { text?: string }) {
  return text ? <span role="alert" className="flex items-center gap-1.5 text-[#ff8a85] text-[13px]"><AlertCircle size={14} className="shrink-0" />{text}</span> : null;
}
function Field({ label, req, error, children }: { label: string; req?: boolean; error?: string; children: ReactNode }) {
  return <label className="flex flex-col gap-2 min-w-0"><span className="field-label">{label}{req && <span className="text-gold"> *</span>}</span>{children}<Err text={error} /></label>;
}
function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mb-7 last:mb-0"><h3 className="field-label mb-3">{title}</h3>{children}</section>;
}

function StepJourney({ b, e }: { b: BookingState; e: Errors }) {
  const [showStops, setShowStops] = useState(!!b.stops);
  const hourly = isHourly(b); const airport = b.service === "airport-transfers";
  const v = getVehicle(b.vehicle);
  return (
    <>
      <Head title="Where are you going?" sub="Tell us about your journey and when you'd like to travel." />
      {v && (
        <div className="flex items-center gap-4 rounded-lg border border-gold/30 bg-gold/[0.04] p-2.5 pr-4 mb-7">
          <div className="w-[96px] sm:w-[120px] aspect-[4/3] rounded-md overflow-hidden shrink-0"><VehicleMedia v={v} /></div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gold">Your vehicle</span>
            <p className="h-serif text-[19px] leading-snug text-white truncate">{v.name}</p>
            {!v.poa && <p className="text-muted text-[13px]">{v.pax} seats · {v.lgBags} large · {v.smBags} small bags</p>}
          </div>
          <button type="button" onClick={() => b.set({ step: 1 })} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:underline shrink-0"><Pencil size={13} /> Change</button>
        </div>
      )}
      <Section title="Service">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {SERVICES.map((s) => { const Icon = SERVICE_ICONS[s.id] || Route; const on = b.service === s.id;
            return <button key={s.id} type="button" aria-pressed={on} onClick={() => b.set({ service: s.id })} className={`flex items-center gap-2.5 rounded-lg border px-3 py-3 text-left transition-colors ${selected(on)}`}><Icon size={18} className="text-gold shrink-0" /><span className="text-[13.5px] font-semibold leading-tight text-white">{s.name}</span></button>; })}
        </div>
        <div className="mt-2"><Err text={e.service} /></div>
      </Section>

      {!hourly && (
        <Section title="Trip type">
          <div className="inline-flex rounded-lg border border-white/15 p-1 bg-bg-3">
            {([["one-way", "One way"], ["return", "Return"]] as const).map(([id, name]) => <button key={id} type="button" aria-pressed={b.journeyType === id} onClick={() => b.set({ journeyType: id })} className={`px-5 h-10 rounded-md text-[14px] font-semibold transition-colors ${b.journeyType === id ? "bg-gold text-black" : "text-white hover:text-gold"}`}>{name}</button>)}
          </div>
        </Section>
      )}

      <Section title="Route">
        <div className="space-y-3">
          <Field label="Pick-up location" req error={e.pickup}><Autocomplete className={input} suggestions={AIRPORT_OPTIONS} autoComplete="street-address" placeholder="Address, postcode or airport" value={b.pickup} onChange={(v) => b.set({ pickup: v })} /></Field>
          {!hourly && <div className="flex justify-end -my-1"><button type="button" onClick={() => b.set({ pickup: b.dest, dest: b.pickup })} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white hover:text-gold"><ArrowUpDown size={14} className="text-gold" /> Swap</button></div>}
          {!hourly && <Field label="Drop-off location" req error={e.dest}><Autocomplete className={input} suggestions={AIRPORT_OPTIONS} placeholder="Address, postcode or airport" value={b.dest} onChange={(v) => b.set({ dest: v })} /></Field>}
          {showStops
            ? <Field label="Stops on the way"><input className={input} placeholder="List any stops, in order" value={b.stops} onChange={(x) => b.set({ stops: x.target.value })} /></Field>
            : <button type="button" onClick={() => setShowStops(true)} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white hover:text-gold"><Plus size={15} className="text-gold" /> Add a stop</button>}
          {hourly && <div><span className="field-label block mb-2">Hours required</span><Counter label="Hours required" value={b.duration} min={2} max={24} onChange={(n) => b.set({ duration: n })} /></div>}
          {airport && <div className="grid sm:grid-cols-2 gap-3"><Field label="Flight number"><input className={input} placeholder="e.g. BA117" value={b.flight} onChange={(x) => b.set({ flight: x.target.value })} /></Field><Field label="Terminal"><input className={input} placeholder="e.g. Terminal 5" value={b.terminal} onChange={(x) => b.set({ terminal: x.target.value })} /></Field></div>}
        </div>
      </Section>

      <Section title="Pick-up date and time">
        <BookingCalendar />
        <div className="mt-2"><Err text={e.when} /></div>
      </Section>

      {isReturn(b) && (
        <Section title="Your return journey">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Return date" req><DatePicker min={b.date || undefined} className={input} ariaLabel="Return date" value={b.returnDate} onChange={(v) => b.set({ returnDate: v })} /></Field>
            <Field label="Return time" req><TimePicker className={input} ariaLabel="Return time" value={b.returnTime} onChange={(v) => b.set({ returnTime: v })} /></Field>
          </div>
          <div className="mt-2"><Err text={e.ret} /></div>
        </Section>
      )}
    </>
  );
}

function Counter({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const btn = "w-11 h-11 flex items-center justify-center text-gold hover:bg-white/5 disabled:opacity-30";
  return (
    <div className="inline-flex items-center rounded-lg border border-white/15 bg-bg-3">
      <button type="button" className={btn} aria-label={`Fewer: ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}><Minus size={16} /></button>
      <span className="w-9 text-center font-semibold text-white" aria-live="polite">{value}</span>
      <button type="button" className={btn} aria-label={`More: ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}><Plus size={16} /></button>
    </div>
  );
}

function StepVehicle({ b, e }: { b: BookingState; e: Errors }) {
  const bags = b.lgBags + b.smBags;
  const [type, setType] = useState("all");
  const suitable = FLEET.filter((v) => availabilityService.suitable(v, b.pax, bags));
  const shown = suitable.filter((v) => type === "all" || v.body === type);
  const hidden = FLEET.length - suitable.length;
  const chosen = getVehicle(b.vehicle);
  const tooSmall = chosen && !suitable.some((v) => v.id === chosen.id);
  const tab = (on: boolean) => `inline-flex items-center h-10 px-4 rounded-full border text-[13.5px] font-semibold whitespace-nowrap transition-colors ${on ? "bg-gold text-black border-gold" : "border-white/20 text-white hover:border-gold hover:text-gold"}`;
  return (
    <>
      <Head title="Choose your vehicle" sub="Tell us who's travelling, then pick your car. Pick-up times are shown for the car you choose." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg border border-line bg-bg-3 p-4 mb-6">
        {([["pax", "Passengers", 1, Users], ["lgBags", "Large bags", 0, Luggage], ["smBags", "Small bags", 0, Briefcase]] as const).map(([k, name, min, Icon]) => (
          <div key={k} className="flex sm:flex-col items-center sm:items-start justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-white"><Icon size={16} className="text-gold" />{name}</span>
            <Counter label={name} value={b[k]} min={min} max={16} onChange={(n) => b.set({ [k]: n } as Partial<BookingState>)} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 -mx-1 px-1" role="group" aria-label="Vehicle type">
        <button type="button" aria-pressed={type === "all"} onClick={() => setType("all")} className={tab(type === "all")}>All vehicles</button>
        {VEHICLE_TYPES.map((t) => <button key={t.id} type="button" aria-pressed={type === t.id} onClick={() => setType(t.id)} className={tab(type === t.id)}>{t.name}</button>)}
      </div>
      {tooSmall && <p className="flex items-start gap-2 text-[#ffd27a] text-[14px] mb-5"><Info size={16} className="shrink-0 mt-0.5" /> The {chosen!.name} may be too small for this party. Please choose another vehicle, or continue and our team will advise.</p>}
      <div className="grid sm:grid-cols-2 gap-4" role="group" aria-label="Vehicles">
        {shown.map((v) => {
          const on = b.vehicle === v.id; const am = AVAIL_META[v.avail];
          return (
            <button key={v.id} type="button" aria-pressed={on} onClick={() => b.set(vehiclePatch(b, v.id))} className={`group relative flex flex-col rounded-lg border overflow-hidden text-left transition-colors ${selected(on)}`}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <VehicleMedia v={v} className="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className={`absolute top-3 right-3 h-8 rounded-full flex items-center gap-1.5 px-3 text-[12px] font-bold uppercase tracking-[0.1em] ${on ? "bg-gold text-black" : "bg-black/60 text-white backdrop-blur-sm"}`}>{on ? <><Check size={14} /> Selected</> : "Select"}</span>
              </div>
              <div className="flex flex-col flex-1 p-4 sm:p-5">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gold">{v.cat}</span>
                <h4 className="h-serif text-[21px] leading-snug text-white mt-1">{v.name}</h4>
                {!v.poa && (
                  <div className="grid grid-cols-3 border-y border-line my-3.5 divide-x divide-line text-[13px] text-white/90">
                    <span className="flex items-center justify-center gap-1.5 py-2"><Users size={14} className="text-gold" />{v.pax} seats</span>
                    <span className="flex items-center justify-center gap-1.5 py-2"><Luggage size={14} className="text-gold" />{v.lgBags} large</span>
                    <span className="flex items-center justify-center gap-1.5 py-2"><Briefcase size={14} className="text-gold" />{v.smBags} small</span>
                  </div>
                )}
                <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                  <span className={`text-[12.5px] font-semibold ${am.cls}`}>{am.label}</span>
                  <span className="text-right shrink-0">{v.rate ? <><span className="block text-[11px] text-muted">From</span><b className="h-serif text-xl text-gold">{gbp(v.rate)}</b><span className="text-[12px] text-muted"> /hr</span></> : <b className="h-serif text-xl text-gold">POA</b>}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {shown.length === 0 && <p className="text-muted text-[14.5px] text-center py-8">No {VEHICLE_TYPES.find((t) => t.id === type)?.name.toLowerCase()} fit this party. Try another type, or <a href={BRAND.phoneHref} className="text-gold">call us</a> and we&apos;ll help.</p>}
      {hidden > 0 && <p className="flex items-center gap-2 text-muted text-[13.5px] mt-4"><Info size={15} className="text-gold shrink-0" />{hidden} {hidden === 1 ? "vehicle is" : "vehicles are"} hidden because {hidden === 1 ? "it is" : "they are"} too small for {b.pax} {b.pax === 1 ? "passenger" : "passengers"} and {bags} {bags === 1 ? "bag" : "bags"}.</p>}
      <div className="mt-3"><Err text={e.vehicle} /></div>
    </>
  );
}

function PriceRows({ b, v }: { b: BookingState; v: Vehicle }) {
  const est = estimate(b, v);
  const rows: [string, string][] = [[`${est.hours} hours × ${gbp(est.rate!)}/hr`, gbp(est.base!)]];
  if (est.extraMiles) rows.push([`Additional mileage (${est.extraMiles} miles)`, gbp(est.mileage!)]);
  est.extrasList?.forEach((x) => rows.push([x.name, gbp(x.price)]));
  return (
    <div className="rounded-lg border border-line bg-bg-3 overflow-hidden">
      {rows.map(([k, val]) => <div key={k} className="flex justify-between gap-4 px-5 py-3 border-b border-line text-[14px]"><span className="text-muted">{k}</span><span className="text-white font-medium">{val}</span></div>)}
      <div className="flex justify-between items-baseline gap-4 px-5 py-4"><span className="font-semibold text-white">Estimated total</span><b className="h-serif text-3xl text-gold">{gbp(est.total!)}</b></div>
    </div>
  );
}

function StepExtras({ b }: { b: BookingState }) {
  const v = getVehicle(b.vehicle);
  const quote = needsQuote(b);
  if (!v) return null;
  return (
    <>
      <Head title="Personalise your journey" sub="Add any extras, and check your estimated price." />
      <Section title="Optional extras">
        <div className="grid sm:grid-cols-2 gap-2.5">
          {PRICING.extras.map((x) => { const on = b.extras.includes(x.id);
            return <button key={x.id} type="button" aria-pressed={on} onClick={() => b.set({ extras: on ? b.extras.filter((y) => y !== x.id) : [...b.extras, x.id] })} className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${selected(on)}`}>
              <span className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${on ? "bg-gold border-gold text-black" : "border-white/40"}`}>{on && <Check size={13} />}</span>
              <span className="flex-1 text-[14.5px] font-semibold text-white">{x.name}</span>
              <span className="text-gold text-[14px] font-semibold">+{gbp(x.price)}</span>
            </button>; })}
        </div>
      </Section>
      <Section title="Special requests">
        <textarea rows={3} className={textarea} placeholder="Anything else we should know, such as a female chauffeur or accessibility needs" value={b.special} onChange={(x) => b.set({ special: x.target.value })} />
      </Section>
      <Section title="Your price">
        {quote || v.poa
          ? <p className="flex items-start gap-2.5 rounded-lg border border-gold/40 p-4 text-[14.5px] text-white"><Info size={18} className="text-gold shrink-0 mt-0.5" /><span>{v.poa ? "This vehicle is priced on application." : "Our team needs to confirm availability for this booking."} We&apos;ll send you a tailored quotation, and no payment is needed yet.</span></p>
          : <><PriceRows b={b} v={v} /><p className="text-muted text-[13px] mt-3">{isHourly(b) ? `Based on ${b.duration} hours of hire.` : `Based on a typical journey${isReturn(b) ? " each way" : ""}.`} Your final price is confirmed by our team.</p></>}
      </Section>
    </>
  );
}

function StepDetails({ b, e }: { b: BookingState; e: Errors }) {
  return (
    <>
      <Head title="Who's travelling?" sub="We'll use these details to confirm your booking." />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Lead passenger name" req error={e.name}><input className={input} autoComplete="name" value={b.name} onChange={(x) => b.set({ name: x.target.value })} /></Field>
        <Field label={`Email${EMAIL_REQUIRED ? "" : " (optional)"}`} req={EMAIL_REQUIRED} error={e.email}><input type="email" autoComplete="email" className={input} value={b.email} onChange={(x) => b.set({ email: x.target.value })} /></Field>
        <Field label="Mobile number" req error={e.phone}><input type="tel" autoComplete="tel" className={input} placeholder="+44" value={b.phone} onChange={(x) => b.set({ phone: x.target.value })} /></Field>
        <Field label="Company (optional)"><input className={input} autoComplete="organization" value={b.company} onChange={(x) => b.set({ company: x.target.value })} /></Field>
      </div>
      <div className="mt-4"><Field label="Notes for your chauffeur"><textarea rows={3} className={textarea} value={b.notes} onChange={(x) => b.set({ notes: x.target.value })} /></Field></div>
      <label className="flex items-center gap-2.5 mt-4"><input type="checkbox" checked={b.onBehalf} onChange={(x) => b.set({ onBehalf: x.target.checked })} /><span className="text-white/90 text-[14.5px]">I&apos;m booking on behalf of another passenger</span></label>
    </>
  );
}

function ReviewBlock({ title, step, b, children }: { title: string; step: number; b: BookingState; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-bg-3 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 mb-2"><h3 className="field-label">{title}</h3><button type="button" onClick={() => b.set({ step })} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:underline"><Pencil size={13} /> Edit</button></div>
      <div className="text-[14.5px] text-white/95 space-y-1 break-words">{children}</div>
    </div>
  );
}

function StepReview({ b, e }: { b: BookingState; e: Errors }) {
  const v = getVehicle(b.vehicle);
  const quote = needsQuote(b);
  const service = SERVICES.find((s) => s.id === b.service)?.name;
  const extras = b.extras.map((id) => PRICING.extras.find((x) => x.id === id)?.name).filter(Boolean).join(", ");
  return (
    <>
      <Head title="Review your booking" sub="Check everything looks right, then send us your request." />
      <div className="space-y-3 mb-7">
        <ReviewBlock title="Vehicle and passengers" step={1} b={b}>
          <p className="font-semibold">{v?.name}</p>
          <p>{b.pax} {b.pax === 1 ? "passenger" : "passengers"} · {b.lgBags} large · {b.smBags} small bags</p>
        </ReviewBlock>
        <ReviewBlock title="Journey" step={2} b={b}>
          <p className="font-semibold">{service}</p>
          <p>{b.pickup}{!isHourly(b) && ` → ${b.dest}`}</p>
          {b.stops && <p className="text-muted">Stops: {b.stops}</p>}
          <p>{niceDate(b.date)} at {b.time}{isHourly(b) && ` · ${b.duration} hours`}</p>
          {isReturn(b) && <p>Return: {niceDate(b.returnDate)} at {b.returnTime}</p>}
          {b.flight && <p className="text-muted">Flight {b.flight}{b.terminal && ` · ${b.terminal}`}</p>}
        </ReviewBlock>
        {(extras || b.special) && <ReviewBlock title="Extras and requests" step={3} b={b}>{extras && <p>{extras}</p>}{b.special && <p className="text-muted">{b.special}</p>}</ReviewBlock>}
        <ReviewBlock title="Your details" step={4} b={b}>
          <p className="font-semibold">{b.name}</p><p>{b.email} · {b.phone}</p>{b.company && <p>{b.company}</p>}
          {b.onBehalf && <p className="text-muted">Booking on behalf of another passenger</p>}
        </ReviewBlock>
      </div>
      {!quote && (
        <>
          <Section title="How would you like to pay?">
            <div className="grid sm:grid-cols-3 gap-2.5 mb-3">
              {([["deposit", "Pay a deposit"], ["full", "Pay in full"], ["later", "Pay later"]] as const).map(([k, name]) => <button key={k} type="button" aria-pressed={b.payMode === k} onClick={() => b.set({ payMode: k })} className={`rounded-lg border p-3.5 text-[14px] font-semibold text-white transition-colors ${selected(b.payMode === k)}`}>{name}</button>)}
            </div>
            <div className="flex flex-wrap gap-2">
              {paymentService.methods.map((m) => <button key={m.id} type="button" aria-pressed={b.payMethod === m.id} onClick={() => b.set({ payMethod: m.id })} className={`rounded-full border px-4 h-10 text-[13.5px] font-semibold text-white transition-colors ${selected(b.payMethod === m.id)}`}>{m.label}</button>)}
            </div>
            <p className="text-muted text-[13.5px] mt-3">You won&apos;t be charged now. Once our team confirms your booking, we&apos;ll send you a secure payment link.</p>
          </Section>
        </>
      )}
      {quote && <p className="flex items-start gap-2.5 rounded-lg border border-gold/40 p-4 text-[14.5px] text-white mb-7"><Info size={18} className="text-gold shrink-0 mt-0.5" /> We&apos;ll send this as a quote request, and no payment is needed yet.</p>}
      <label className="flex items-start gap-2.5"><input type="checkbox" className="mt-1" checked={b.consent} onChange={(x) => b.set({ consent: x.target.checked })} /><span className="text-white/90 text-[14.5px]">I consent to my data being processed for this booking, per the <Link href="/privacy" className="text-gold">privacy policy</Link>. <span className="text-gold">*</span></span></label>
      <div className="mt-2"><Err text={e.consent} /></div>
    </>
  );
}

function SummaryPrice({ b }: { b: BookingState }) {
  const v = getVehicle(b.vehicle);
  if (!v) return <span>Choose a vehicle</span>;
  if (needsQuote(b)) return <span>Quote</span>;
  return <span>{gbp(estimate(b, v).total!)}</span>;
}

function SummaryBody({ b }: { b: BookingState }) {
  const v = getVehicle(b.vehicle);
  const service = SERVICES.find((s) => s.id === b.service)?.name;
  const quote = needsQuote(b);
  return (
    <>
      {v && <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4"><VehicleMedia v={v} /></div>}
      {v && <p className="h-serif text-xl text-white mb-3">{v.name}</p>}
      {service && <p className="text-gold-soft text-[14px] mb-3">{service}</p>}
      {(b.pickup || b.dest) && (
        <ul className="relative space-y-3 mb-4 text-[14px] text-white">
          {b.pickup && <li className="flex items-start gap-2.5 min-w-0"><MapPin size={15} className="text-gold shrink-0 mt-0.5" /><span className="break-words min-w-0">{b.pickup}</span></li>}
          {b.dest && !isHourly(b) && <li className="flex items-start gap-2.5 min-w-0"><MapPin size={15} className="text-gold shrink-0 mt-0.5" /><span className="break-words min-w-0">{b.dest}</span></li>}
        </ul>
      )}
      {b.date && <p className="text-[14px] text-white/95 mb-1">{niceDate(b.date)}{b.time && ` at ${b.time}`}</p>}
      {isReturn(b) && b.returnDate && <p className="text-[14px] text-white/95 mb-1">Return: {niceDate(b.returnDate)}{b.returnTime && ` at ${b.returnTime}`}</p>}
      {isHourly(b) && <p className="text-[14px] text-white/95 mb-1">{b.duration} hours</p>}
      {v && <p className="text-muted text-[14px]">{b.pax} {b.pax === 1 ? "passenger" : "passengers"}</p>}
      {!v && !b.pickup && !service && <p className="text-muted text-[14px]">Your journey details will appear here as you go.</p>}
      <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-gold/30">
        <span className="text-[14px] text-muted">{quote && v ? "Pricing" : "Estimated total"}</span>
        <span className="h-serif text-3xl text-gold">{v ? (quote ? "Quote" : gbp(estimate(b, v).total!)) : "—"}</span>
      </div>
      {v && !quote && <p className="text-muted-2 text-[12.5px] mt-2">Your final price is confirmed by our team.</p>}
      <a href={BRAND.phoneHref} className="flex items-center gap-2 mt-4 pt-4 border-t border-line text-[14px] text-white hover:text-gold"><Phone size={15} className="text-gold" /> Need help? {BRAND.phone}</a>
    </>
  );
}

function Confirmation({ b }: { b: BookingState }) {
  const v = getVehicle(b.vehicle);
  const quote = needsQuote(b);
  const service = SERVICES.find((s) => s.id === b.service)?.name || "—";
  const rows: [string, string][] = [["Service", service], ["Vehicle", v?.name || "—"], ["Date and time", `${niceDate(b.date)} at ${b.time}`], ["Pick-up", b.pickup], ...(!isHourly(b) ? [["Drop-off", b.dest] as [string, string]] : []), ["Lead passenger", b.name], ["Payment", "No payment taken"]];
  return (
    <div className="max-w-[720px] mx-auto text-center rounded-lg border border-line bg-bg-2 p-6 sm:p-10" role="status">
      <CheckCircle size={52} className="text-gold mx-auto mb-5" />
      <h2 className="h-serif text-3xl md:text-4xl mb-3">{quote ? "Quote request received" : "Booking request received"}</h2>
      <p className="text-muted text-[16px] max-w-[520px] mx-auto">{quote ? "Thank you. Our team will prepare your tailored quotation and be in touch shortly." : "Thank you. Our team will be in touch to confirm your booking and send a secure payment link."}</p>
      <p className="label-caps mt-7 mb-1 !tracking-[0.2em]">Your reference</p>
      <p className="h-serif text-3xl text-gold tracking-wider">{b.reference}</p>
      <dl className="text-left rounded-lg border border-line bg-bg-3 mt-7 px-5">
        {rows.map(([k, val]) => <div key={k} className="flex justify-between gap-4 py-3 border-b border-line last:border-b-0 text-[14px]"><dt className="text-muted shrink-0">{k}</dt><dd className="text-white text-right break-words min-w-0">{val}</dd></div>)}
      </dl>
      <div className="mt-7 flex gap-3 justify-center flex-wrap">
        <Link href="/" className="btn btn-gold">Return Home</Link>
        <button type="button" className="btn btn-outline" onClick={() => b.reset()}>Start a New Booking</button>
      </div>
    </div>
  );
}
