"use client";
import { useState } from "react";
import { Plus } from "@/components/icons";
import { FAQS } from "@/data/faqs";

export function FaqAccordion() {
  const cats = Object.keys(FAQS);
  const [cat, setCat] = useState(cats[0]);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="container-x grid lg:grid-cols-[280px_minmax(0,1fr)] gap-8 lg:gap-16 items-start">
      <div className="flex lg:flex-col gap-1 lg:gap-0 overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:sticky lg:top-[96px] border-b lg:border-b-0 border-line" role="group" aria-label="FAQ topics">
        {cats.map((c) => {
          const on = cat === c;
          return <button key={c} type="button" aria-pressed={on} onClick={() => { setCat(c); setOpen(0); }} className={`relative shrink-0 text-left whitespace-nowrap lg:whitespace-normal text-[15px] font-medium px-3 lg:px-0 lg:pl-4 py-3.5 lg:border-b lg:border-line transition-colors ${on ? "text-gold" : "text-white/85 hover:text-white"}`}>{c}{on && <span className="absolute inset-x-3 lg:inset-x-auto lg:left-0 bottom-0 lg:top-3 lg:bottom-3 h-0.5 lg:h-auto lg:w-0.5 bg-gold" />}</button>;
        })}
      </div>
      <div className="min-w-0 border-t border-line lg:border-t-0">
        {FAQS[cat].map((f, i) => {
          const on = open === i; const id = `faq-answer-${i}`;
          return (
            <div key={f.q} className={`border-b border-line ${i === 0 ? "lg:border-t" : ""}`}>
              <h3>
                <button type="button" className="w-full text-left flex justify-between items-center gap-5 py-5 lg:py-6" aria-expanded={on} aria-controls={id} onClick={() => setOpen(on ? null : i)}>
                  <span className={`h-serif text-[19px] md:text-[21px] leading-snug transition-colors ${on ? "text-gold" : "text-white"}`}>{f.q}</span>
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${on ? "border-gold text-gold rotate-45" : "border-white/25 text-white"}`}><Plus size={15} /></span>
                </button>
              </h3>
              <div id={id} className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <p className={`overflow-hidden text-muted text-[16px] leading-relaxed pr-11 ${on ? "" : "invisible"}`}><span className="block pb-6">{f.a}</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
