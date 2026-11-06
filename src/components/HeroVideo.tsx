"use client";
import { useEffect, useRef, useState } from "react";
import { VehicleArt } from "./VehicleArt";

// Full-bleed hero video with poster + reduced-motion + error fallback (ASSET-MAP.md).
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the still poster frame, do not autoplay
    v.play?.().catch(() => {/* autoplay blocked: poster remains */});
  }, []);
  if (failed) return (
    <div className="absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(120% 90% at 78% 18%,rgba(255,215,0,.1),transparent 55%),linear-gradient(180deg,#0b0b0d,#070708 55%,#050506)" }}>
      <div className="absolute right-0 bottom-[8%] w-[min(58vw,820px)] opacity-90"><VehicleArt body="limo" /></div>
    </div>
  );
  return (
    <video ref={ref} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 42%" }}
      muted loop playsInline preload="metadata" poster="/assets/images/hero-poster.webp" onError={() => setFailed(true)} aria-hidden="true">
      <source src="/assets/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
