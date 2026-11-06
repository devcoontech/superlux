"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Gem } from "@/components/icons";
import { Reveal } from "./Reveal";

const STEP_MS = 7000;
const STEPS = [
  { title: "A standard set since 2008", text: "Since 2008 we have been dedicated to private travel, bringing safety, elegance and personal attention together. True luxury is found in the details, and we look after every one of them.", images: ["/assets/images/sections/about.webp", "/assets/images/fleet/rolls-royce-phantom.webp"] },
  { title: "Chauffeurs who anticipate your needs", text: "Discreet, impeccably presented and trained to think ahead, our chauffeurs bring the same care to a short city transfer as they do to a week-long corporate roadshow.", images: ["/assets/images/services/corporate.webp", "/assets/images/sections/experience.webp"] },
  { title: "A fleet for every occasion", text: "From executive saloons to the world's most prestigious marques, choose the right vehicle for business, leisure and life's most memorable days, presented immaculately for your journey.", images: ["/assets/images/services/weddings.webp", "/assets/images/fleet/mercedes-v-class.webp"] },
];

export function HomeAbout() {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frame = "relative overflow-hidden rounded-lg bg-bg-2";
  const stack = (slot: 0 | 1) => STEPS.map((s, i) => (
    <img key={s.images[slot]} src={s.images[slot]} alt="" loading="lazy" decoding="async" className={`absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"}`} />
  ));

  return (
    <section ref={ref} className="section" aria-labelledby="home-about-title">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
        <Reveal className="flex items-end gap-4">
          <div className={`${frame} w-[60%] aspect-[3/4]`} aria-hidden="true">{stack(0)}</div>
          <div className={`${frame} w-[40%] aspect-[3/4]`} aria-hidden="true">{stack(1)}</div>
        </Reveal>

        <div>
          <Gem size={26} className="text-gold mb-4" />
          <span className="eyebrow block">About Superluxe</span>
          <h2 id="home-about-title" className="h-serif text-[34px] md:text-[46px] leading-[1.15] mt-4 mb-9">Travel elevated to an art</h2>

          <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <div key={s.title} className="grid grid-cols-[22px_1fr] gap-x-5 pb-6 last:pb-0">
                  <div className="flex flex-col items-center pt-[7px]">
                    {on
                      ? <span className="w-[20px] h-[20px] rounded-full border border-gold flex items-center justify-center shrink-0"><span className="w-2 h-2 rounded-full bg-gold" /></span>
                      : <span className="w-2 h-2 rounded-full bg-white/40 shrink-0 mt-1.5" />}
                    {on && (
                      <span className="relative flex-1 w-px mt-1.5 border-l border-dashed border-white/35">
                        <span key={active} className="absolute -left-px top-0 w-px bg-gold" onAnimationEnd={() => setActive((active + 1) % STEPS.length)} style={animate ? { animation: `step-fill ${STEP_MS}ms linear forwards`, animationPlayState: inView && !hovered ? "running" : "paused" } : { height: "100%" }} />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3><button type="button" aria-expanded={on} onClick={() => setActive(i)} className={`h-serif text-left text-[21px] md:text-[23px] leading-snug transition-colors hover:text-gold ${on ? "text-white" : "text-white/70"}`}>{s.title}</button></h3>
                    <div className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <p className="overflow-hidden text-muted text-[16px] leading-relaxed"><span className="block pt-2.5">{s.text}</span></p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/about" className="btn btn-outline mt-9">More About Us <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
