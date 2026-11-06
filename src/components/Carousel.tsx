"use client";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";

// Native horizontal scrolling (swipe, trackpad, keyboard) with arrows, position dots and optional auto-scroll.
export function Carousel({ children, label, autoPlay = false, interval = 4000 }: { children: ReactNode; label: string; autoPlay?: boolean; interval?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const count = Children.count(children);
  const [index, setIndex] = useState(0);
  const [stops, setStops] = useState(count);

  const stepWidth = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return el && first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : 1;
  };

  const measure = useCallback(() => {
    const el = track.current; if (!el) return;
    const step = stepWidth();
    setStops(Math.max(1, count - Math.round(el.clientWidth / step) + 1));
    setIndex(Math.round(el.scrollLeft / step));
  }, [count]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = useCallback((i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current?.scrollTo({ left: i * stepWidth(), behavior: reduce ? "auto" : "smooth" });
  }, []);

  // Reads the live position: state lags behind while a scroll is still in progress.
  const move = useCallback((by: 1 | -1) => {
    const el = track.current; if (!el) return;
    const step = stepWidth();
    const total = Math.max(1, count - Math.round(el.clientWidth / step) + 1);
    goTo((Math.round(el.scrollLeft / step) + by + total) % total);
  }, [count, goTo]);

  useEffect(() => {
    if (!autoPlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => { if (!paused.current && !document.hidden) move(1); }, interval);
    return () => window.clearInterval(timer);
  }, [autoPlay, interval, move]);

  const arrow = `hidden md:flex absolute top-[38%] -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/30 bg-black/70 text-white items-center justify-center transition-colors hover:border-gold hover:text-gold`;
  const hold = { onMouseEnter: () => { paused.current = true; }, onMouseLeave: () => { paused.current = false; }, onFocusCapture: () => { paused.current = true; }, onBlurCapture: () => { paused.current = false; }, onTouchStart: () => { paused.current = true; } };

  return (
    <div {...hold}>
      <div className="relative">
        <button type="button" aria-label={`Previous: ${label}`} onClick={() => move(-1)} className={`${arrow} left-1 lg:-left-[50px]`}><ChevronLeft size={20} /></button>
        <div ref={track} onScroll={measure} className="flex gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={label}>
          {Children.map(children, (child) => <div className="snap-start shrink-0 w-[86%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">{child}</div>)}
        </div>
        <button type="button" aria-label={`Next: ${label}`} onClick={() => move(1)} className={`${arrow} right-1 lg:-right-[50px]`}><ChevronRight size={20} /></button>
      </div>
      {stops > 1 && (
        <div className="flex justify-center mt-8">
          {Array.from({ length: stops }, (_, i) => (
            <button key={i} type="button" aria-label={`Go to position ${i + 1} of ${stops}`} aria-current={i === index ? "true" : undefined} onClick={() => goTo(i)} className="w-6 h-6 flex items-center justify-center">
              <span className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-gold" : "bg-white/35"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
