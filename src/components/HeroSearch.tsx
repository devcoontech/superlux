"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Route, Plane, Clock, MapPin, Flag, Calendar, Car, Search, type IconType } from "@/components/icons";
import { Autocomplete, DatePicker, Select } from "./Pickers";
import { AIRPORTS } from "@/data/airports";
import { VEHICLE_TYPES } from "@/data/fleet";
import { useBooking, type BookingState } from "@/store/booking";

const TABS = [
  { id: "point-to-point", label: "Point-to-Point", icon: Route },
  { id: "airport-transfers", label: "Airport", icon: Plane },
  { id: "hourly-hire", label: "By the Hour", icon: Clock },
] as const;
const HOURS = [2, 3, 4, 6, 8, 10, 12];
const control = "w-full min-w-0 bg-transparent text-[15px] text-white outline-none focus-visible:outline-none placeholder:text-muted-2";

function Field({ label, icon: Icon, children }: { label: string; icon: IconType; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="block field-label mb-2">{label}</span>
      <span data-picker-anchor className="relative flex items-center gap-2.5 h-[52px] px-3.5 rounded-md bg-white/[0.04] border border-white/15 focus-within:border-gold transition-colors">
        <Icon size={17} className="text-gold shrink-0" />
        {children}
      </span>
    </label>
  );
}

const HOUR_OPTIONS = HOURS.map((h) => ({ value: String(h), label: `${h} hours` }));
const AIRPORT_OPTIONS = AIRPORTS.map((a) => `${a.name} Airport (${a.code})`);
const TYPE_OPTIONS = [{ value: "", label: "All types" }, ...VEHICLE_TYPES.map((t) => ({ value: t.id, label: t.name }))];

export function HeroSearch() {
  const router = useRouter();
  const setBooking = useBooking((s) => s.set);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("point-to-point");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [hours, setHours] = useState("2");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [minDate, setMinDate] = useState<string>();

  // Set after mount so the server and browser render the same markup.
  useEffect(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    setMinDate(local.toISOString().slice(0, 10));
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    // Journey details go to the session-only booking store, never the URL, and pre-fill the booking flow.
    const patch: Partial<BookingState> = { service: tab };
    if (pickup) patch.pickup = pickup;
    if (tab === "hourly-hire") patch.duration = Number(hours);
    else if (destination) {
      patch.dest = destination;
      if (tab === "airport-transfers") patch.airport = destination;
    }
    if (date) { patch.date = date; patch.time = ""; patch.slotState = ""; }
    setBooking(patch);
    router.push(`/fleet?search=1${type ? `&type=${type}` : ""}`);
  };

  return (
    <div id="search" className="scroll-mt-28 rounded-lg bg-[#121212] border border-white/10">
      <div className="flex border-b border-white/10 px-1 sm:px-3" role="group" aria-label="Journey type">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)} className={`relative flex-1 sm:flex-none inline-flex items-center justify-center gap-2 whitespace-nowrap px-1.5 sm:px-5 h-[54px] text-[13px] sm:text-[14.5px] font-semibold transition-colors ${tab === id ? "text-white" : "text-white/70 hover:text-white"}`}>
            <Icon size={16} className={`hidden sm:block ${tab === id ? "text-gold" : ""}`} /> {label}
            {tab === id && <span className="absolute inset-x-1.5 sm:inset-x-5 -bottom-px h-0.5 bg-gold" />}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1.25fr_1.25fr_1fr_1fr_auto] gap-4 items-end p-5 lg:p-6">
        <Field label="Pickup location" icon={MapPin}>
          <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Address or postcode" autoComplete="street-address" className={control} />
        </Field>
        {tab === "hourly-hire" ? (
          <Field label="Hours required" icon={Clock}>
            <Select value={hours} onChange={setHours} options={HOUR_OPTIONS} ariaLabel="Hours required" className={`${control} h-full`} />
          </Field>
        ) : (
          <Field label={tab === "airport-transfers" ? "Airport" : "Drop-off location"} icon={tab === "airport-transfers" ? Plane : Flag}>
            {tab === "airport-transfers"
              ? <Autocomplete value={destination} onChange={setDestination} suggestions={AIRPORT_OPTIONS} placeholder="e.g. Heathrow Terminal 5" className={control} />
              : <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Address or postcode" className={control} />}
          </Field>
        )}
        <Field label="Pickup date" icon={Calendar}>
          <DatePicker value={date} min={minDate} onChange={setDate} ariaLabel="Pickup date" showIcon={false} className={`${control} h-full`} />
        </Field>
        <Field label="Car type" icon={Car}>
          <Select value={type} onChange={setType} options={TYPE_OPTIONS} ariaLabel="Car type" className={`${control} h-full`} />
        </Field>
        <button type="submit" className="btn btn-gold h-[52px] !py-0 w-full xl:w-auto sm:col-span-2 lg:col-span-4 xl:col-span-1"><Search size={16} /> Search Cars</button>
      </form>
    </div>
  );
}
