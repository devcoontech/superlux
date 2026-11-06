"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { analyticsService } from "@/services/analyticsService";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem("slx_cookie")) { const t = setTimeout(() => setShow(true), 1000); return () => clearTimeout(t); } } catch {}
  }, []);
  const decide = (v: string) => { try { localStorage.setItem("slx_cookie", v); } catch {}; if (v === "all") analyticsService.grantConsent(); setShow(false); };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-[125] bg-black/95 backdrop-blur border-t border-[rgba(255,215,0,.28)] p-5" role="dialog" aria-label="Cookie consent">
      <div className="container-x flex items-center gap-6 flex-wrap">
        <p className="text-[13px] text-muted flex-1 min-w-[260px]">We use cookies to enhance your experience and analyse traffic. Analytics and marketing scripts load only after consent. See our <Link href="/privacy" className="text-gold">Privacy Policy</Link>.</p>
        <div className="flex gap-2.5 flex-wrap">
          <button className="btn btn-outline text-xs !py-2.5" onClick={() => decide("reject")}>Reject optional</button>
          <button className="btn btn-gold text-xs !py-2.5" onClick={() => decide("all")}>Accept all</button>
        </div>
      </div>
    </div>
  );
}
