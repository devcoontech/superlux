"use client";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, Clock } from "@/components/icons";

// Native select, date and time popups are drawn by the browser and can't follow the theme, so the site uses these instead.
// Panels align to the nearest [data-picker-anchor] ancestor when the trigger sits inside a larger field box.

const panel = "fixed z-[400] rounded-lg border border-white/15 bg-[#101010] shadow-[0_24px_50px_-20px_#000] text-white";
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseIso = (s: string) => new Date(`${s}T00:00:00`);

// Scrolls only the list itself; scrollIntoView can also move the page behind a fixed panel.
function scrollWithin(el: HTMLElement | null | undefined, center = false) {
  const box = el?.parentElement; if (!el || !box) return;
  if (center) { box.scrollTop = el.offsetTop - box.clientHeight / 2 + el.offsetHeight / 2; return; }
  if (el.offsetTop < box.scrollTop) box.scrollTop = el.offsetTop;
  else if (el.offsetTop + el.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = el.offsetTop + el.offsetHeight - box.clientHeight;
}

function usePopover<T extends HTMLElement>(matchWidth = true) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<T>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const place = useCallback(() => {
    const t = triggerRef.current, p = popRef.current;
    if (!t || !p) return;
    const r = (t.closest("[data-picker-anchor]") || t).getBoundingClientRect();
    if (matchWidth) p.style.minWidth = `${r.width}px`;
    const h = p.offsetHeight, w = p.offsetWidth, below = window.innerHeight - r.bottom;
    p.style.top = `${below < h + 12 && r.top > below ? Math.max(8, r.top - h - 6) : r.bottom + 6}px`;
    p.style.left = `${Math.max(8, Math.min(r.left, window.innerWidth - w - 8))}px`;
    p.style.visibility = "visible";
  }, [matchWidth]);

  const close = useCallback((refocus = false) => { setOpen(false); if (refocus) triggerRef.current?.focus(); }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    const onDown = (e: PointerEvent) => {
      const n = e.target as Node;
      if (!triggerRef.current?.contains(n) && !popRef.current?.contains(n)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); close(true); } };
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, place, close]);

  const portal = (content: ReactNode, props: { className?: string; role?: string; label?: string; id?: string; onKeyDown?: (e: KeyboardEvent) => void } = {}) =>
    open ? createPortal(
      <div ref={popRef} id={props.id} role={props.role} aria-label={props.label} onKeyDown={props.onKeyDown} style={{ visibility: "hidden", top: 0, left: 0 }} className={`${panel} ${props.className || ""}`}>{content}</div>,
      document.body,
    ) : null;

  return { open, setOpen, close, place, triggerRef, popRef, portal };
}

// Tabbing out of a portalled panel would jump to the end of the page, so Tab closes it and returns to the field.
const tabCloses = (close: (refocus?: boolean) => void) => (e: KeyboardEvent) => { if (e.key === "Tab") { e.preventDefault(); close(true); } };

const trigger = "flex items-center justify-between gap-2 text-left cursor-pointer aria-expanded:border-gold";

export type SelectOption = { value: string; label: string };

export function Select({ value, defaultValue, onChange, options, name, placeholder = "Select", className = "", ariaLabel }: {
  value?: string; defaultValue?: string; onChange?: (v: string) => void; options: SelectOption[]; name?: string; placeholder?: string; className?: string; ariaLabel?: string;
}) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value ?? "");
  const current = value ?? inner;
  const { open, setOpen, close, triggerRef, popRef, portal } = usePopover<HTMLButtonElement>();
  const [active, setActive] = useState(0);
  const listId = useId();
  const selected = options.find((o) => o.value === current);

  useEffect(() => { if (open) setActive(Math.max(0, options.findIndex((o) => o.value === current))); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (open) scrollWithin(popRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)); }, [open, active, popRef]);

  const choose = (v: string) => { if (value === undefined) setInner(v); onChange?.(v); close(true); };
  const onKey = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); setOpen(true); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(options.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(options[active].value); }
    else if (e.key === "Tab") close();
  };

  return (
    <>
      <button ref={triggerRef} type="button" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined} aria-activedescendant={open ? `${listId}-${active}` : undefined} aria-label={ariaLabel}
        onClick={() => setOpen(!open)} onKeyDown={onKey} className={`${trigger} ${className}`}>
        <span className={`truncate ${selected ? "" : "text-muted-2"}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown size={15} className={`shrink-0 text-white/70 transition-transform duration-200 ${open ? "rotate-180 text-gold" : ""}`} />
      </button>
      {name && <input type="hidden" name={name} value={current} />}
      {portal(
        <ul className="relative py-1.5 max-h-[280px] overflow-y-auto pick-scroll">
          {options.map((o, i) => {
            const on = o.value === current;
            return (
              <li key={o.value} id={`${listId}-${i}`} data-index={i} role="option" aria-selected={on}
                onMouseDown={(e) => e.preventDefault()} onMouseEnter={() => setActive(i)} onClick={() => choose(o.value)}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-[14.5px] cursor-pointer transition-colors ${i === active ? "bg-white/[0.06]" : ""} ${on ? "text-gold" : "text-white/90"}`}>
                <span className="whitespace-nowrap">{o.label}</span>
                {on && <Check size={15} className="shrink-0" />}
              </li>
            );
          })}
        </ul>,
        { id: listId, role: "listbox", label: ariaLabel },
      )}
    </>
  );
}

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function DatePicker({ value, onChange, min, placeholder = "Select date", className = "", ariaLabel, showIcon = true }: {
  value: string; onChange: (v: string) => void; min?: string; placeholder?: string; className?: string; ariaLabel?: string; showIcon?: boolean;
}) {
  const { open, setOpen, close, triggerRef, popRef, portal } = usePopover<HTMLButtonElement>(false);
  const todayIso = iso(new Date());
  const start = value || (min && min > todayIso ? min : todayIso);
  const [view, setView] = useState(() => { const d = parseIso(start); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [focus, setFocus] = useState(start);

  useEffect(() => {
    if (!open) return;
    const d = parseIso(start);
    setView({ y: d.getFullYear(), m: d.getMonth() }); setFocus(start);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (open) popRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focus}"]`)?.focus({ preventScroll: true }); }, [open, focus, view, popRef]);

  const minView = min ? { y: parseIso(min).getFullYear(), m: parseIso(min).getMonth() } : null;
  const prevDisabled = !!minView && (view.y < minView.y || (view.y === minView.y && view.m <= minView.m));
  const shift = (n: number) => setView((v) => { const d = new Date(v.y, v.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const disabled = (ds: string) => !!min && ds < min;
  const choose = (ds: string) => { if (disabled(ds)) return; onChange(ds); close(true); };

  const moveFocus = (days: number) => {
    const d = parseIso(focus); d.setDate(d.getDate() + days);
    const ds = iso(d);
    if (disabled(ds)) return;
    setFocus(ds); setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const onGridKey = (e: KeyboardEvent) => {
    const step = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 } as Record<string, number>)[e.key];
    if (step) { e.preventDefault(); moveFocus(step); }
  };

  const first = new Date(view.y, view.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const label = value ? parseIso(value).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : placeholder;

  return (
    <>
      <button ref={triggerRef} type="button" aria-haspopup="dialog" aria-expanded={open} aria-label={ariaLabel ? `${ariaLabel}${value ? `: ${label}` : ""}` : undefined} onClick={() => setOpen(!open)} className={`${trigger} ${className}`}>
        <span className={`truncate ${value ? "" : "text-muted-2"}`}>{label}</span>
        {showIcon && <Calendar size={16} className="shrink-0 text-gold" />}
      </button>
      {portal(
        <div className="p-4 w-[300px]" onKeyDown={tabCloses(close)}>
          <div className="flex items-center justify-between mb-3">
            <button type="button" disabled={prevDisabled} onClick={() => shift(-1)} aria-label="Previous month" className="w-9 h-9 border border-line rounded text-gold flex items-center justify-center hover:border-gold/50 disabled:opacity-30 disabled:hover:border-line"><ChevronLeft size={16} /></button>
            <b className="h-serif text-[17px]" aria-live="polite">{first.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</b>
            <button type="button" onClick={() => shift(1)} aria-label="Next month" className="w-9 h-9 border border-line rounded text-gold flex items-center justify-center hover:border-gold/50"><ChevronRight size={16} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1.5">{DOW.map((d) => <span key={d} className="text-center text-[10.5px] font-semibold uppercase tracking-wider text-muted-2">{d}</span>)}</div>
          <div className="grid grid-cols-7 gap-1" role="grid" onKeyDown={onGridKey}>
            {Array.from({ length: lead }).map((_, i) => <span key={`e${i}`} />)}
            {Array.from({ length: days }).map((_, i) => {
              const ds = iso(new Date(view.y, view.m, i + 1));
              return (
                <button key={ds} type="button" data-date={ds} tabIndex={ds === focus ? 0 : -1} disabled={disabled(ds)} onClick={() => choose(ds)} aria-label={parseIso(ds).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} aria-pressed={ds === value}
                  className={`cal-cell ${ds === value ? "sel" : ""} ${ds === todayIso && ds !== value ? "!border-gold/40" : ""}`}>{i + 1}</button>
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-line">
            <button type="button" disabled={disabled(todayIso)} onClick={() => choose(todayIso)} className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold hover:underline disabled:opacity-30 disabled:no-underline">Today</button>
            <button type="button" onClick={() => close(true)} className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/70 hover:text-white">Close</button>
          </div>
        </div>,
        { role: "dialog", label: ariaLabel || "Choose a date" },
      )}
    </>
  );
}

const HOURS = Array.from({ length: 24 }, (_, i) => pad(i));

export function TimePicker({ value, onChange, placeholder = "Select time", className = "", ariaLabel, step = 5 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string; ariaLabel?: string; step?: number;
}) {
  const { open, setOpen, close, triggerRef, popRef, portal } = usePopover<HTMLButtonElement>(false);
  const minutes = Array.from({ length: 60 / step }, (_, i) => pad(i * step));
  const [h, m] = value ? value.split(":") : ["", ""];

  useEffect(() => {
    if (!open) return;
    const root = popRef.current; if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-on='true']").forEach((el) => scrollWithin(el, true));
    (root.querySelector<HTMLButtonElement>("[data-col='h'][data-on='true']") || root.querySelector<HTMLButtonElement>("[data-col='h']"))?.focus({ preventScroll: true });
  }, [open, popRef]);

  const col = (items: string[], current: string, kind: "h" | "m", pick: (v: string) => void, title: string) => (
    <div className="flex-1 min-w-0">
      <p className="text-center text-[10.5px] font-semibold uppercase tracking-wider text-muted-2 pb-2 border-b border-line">{title}</p>
      <div className="relative h-[216px] overflow-y-auto pick-scroll py-1.5 px-1.5 space-y-0.5" role="listbox" aria-label={title}>
        {items.map((v) => {
          const on = v === current;
          return <button key={v} type="button" role="option" aria-selected={on} data-col={kind} data-on={on} onClick={() => pick(v)}
            className={`w-full h-9 rounded text-[14.5px] tabular-nums transition-colors ${on ? "bg-gold text-black font-semibold" : "text-white/90 hover:bg-white/[0.06] hover:text-gold"}`}>{v}</button>;
        })}
      </div>
    </div>
  );

  return (
    <>
      <button ref={triggerRef} type="button" aria-haspopup="dialog" aria-expanded={open} aria-label={ariaLabel ? `${ariaLabel}${value ? `: ${value}` : ""}` : undefined} onClick={() => setOpen(!open)} className={`${trigger} ${className}`}>
        <span className={`tabular-nums ${value ? "" : "text-muted-2"}`}>{value || placeholder}</span>
        <Clock size={16} className="shrink-0 text-gold" />
      </button>
      {portal(
        <div className="w-[240px]" onKeyDown={tabCloses(close)}>
          <div className="flex divide-x divide-line pt-3">
            {col(HOURS, h, "h", (v) => onChange(`${v}:${m || "00"}`), "Hour")}
            {col(minutes, m, "m", (v) => { onChange(`${h || "09"}:${v}`); close(true); }, "Minute")}
          </div>
          <div className="flex justify-end px-4 py-3 border-t border-line">
            <button type="button" onClick={() => close(true)} className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold hover:underline">Done</button>
          </div>
        </div>,
        { role: "dialog", label: ariaLabel || "Choose a time" },
      )}
    </>
  );
}

export function Autocomplete({ value, onChange, suggestions, className = "", placeholder, autoComplete, inputRef }: {
  value: string; onChange: (v: string) => void; suggestions: string[]; className?: string; placeholder?: string; autoComplete?: string; inputRef?: RefObject<HTMLInputElement>;
}) {
  const { open, setOpen, close, place, triggerRef, popRef, portal } = usePopover<HTMLInputElement>();
  const [active, setActive] = useState(-1);
  const listId = useId();
  const q = value.trim().toLowerCase();
  const matches = suggestions.filter((s) => s.toLowerCase().includes(q) && s !== value);
  const show = open && matches.length > 0;

  useEffect(() => { setActive(-1); }, [value]);
  useLayoutEffect(() => { if (show) place(); }, [show, matches.length, place]);
  useEffect(() => { if (show && active >= 0) scrollWithin(popRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)); }, [show, active, popRef]);

  const choose = (v: string) => { onChange(v); close(); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((i) => Math.min(matches.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === "Enter" && show && active >= 0) { e.preventDefault(); choose(matches[active]); }
    else if (e.key === "Tab") close();
  };

  return (
    <>
      <input ref={(el) => { (triggerRef as { current: HTMLInputElement | null }).current = el; if (inputRef) (inputRef as { current: HTMLInputElement | null }).current = el; }}
        role="combobox" aria-autocomplete="list" aria-expanded={show} aria-controls={show ? listId : undefined} aria-activedescendant={show && active >= 0 ? `${listId}-${active}` : undefined}
        value={value} placeholder={placeholder} autoComplete={autoComplete || "off"} className={className}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKey} />
      {show && portal(
        <ul className="relative py-1.5 max-h-[260px] overflow-y-auto pick-scroll">
          {matches.map((s, i) => (
            <li key={s} id={`${listId}-${i}`} data-index={i} role="option" aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()} onMouseEnter={() => setActive(i)} onClick={() => choose(s)}
              className={`px-4 py-2.5 text-[14.5px] cursor-pointer transition-colors ${i === active ? "bg-white/[0.06] text-gold" : "text-white/90"}`}>{s}</li>
          ))}
        </ul>,
        { id: listId, role: "listbox" },
      )}
    </>
  );
}
