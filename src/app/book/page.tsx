import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/BookingWizard";

export const metadata: Metadata = { title: "Book Your Chauffeur", description: "Book your chauffeur online in five simple steps." };

export default function BookPage() {
  return (
    <>
      <section className="relative pt-[120px] pb-10 lg:pb-12 border-b border-line overflow-hidden">
        <img src="/assets/images/sections/cta-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-[center_40%]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(6,6,7,.88),rgba(6,6,7,.6) 60%,rgba(6,6,7,.35))" }} />
        <div className="container-x relative">
          <span className="eyebrow">Reservations</span>
          <h1 className="h-serif font-black text-4xl md:text-6xl mt-3 leading-[1.08]">Book Your Chauffeur</h1>
          <p className="lead max-w-[560px] mt-3">Five simple steps. Your details are saved as you go.</p>
        </div>
      </section>
      <section className="py-10 lg:py-14"><div className="container-x">
        <Suspense fallback={<p className="text-muted">Loading booking…</p>}><BookingWizard /></Suspense>
      </div></section>
    </>
  );
}
