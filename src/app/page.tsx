import Link from "next/link";
import { ArrowRight, Gem, ShieldCheck, Zap, Headphones } from "@/components/icons";
import { FLEET, VEHICLE_TYPES, vehImage, vehiclesOfType } from "@/data/fleet";
import { HeroSearch } from "@/components/HeroSearch";
import { Carousel } from "@/components/Carousel";
import { ServiceCard } from "@/components/ServiceCard";
import { HomeAbout } from "@/components/HomeAbout";
import { SERVICES } from "@/data/services";
import { AIRPORTS } from "@/data/airports";
import { VehicleCard } from "@/components/VehicleCard";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { AirportCard } from "@/components/AirportCard";
import { HeroVideo } from "@/components/HeroVideo";
import { BrandScroller } from "@/components/BrandScroller";
import { CtaBanner } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BookingStepsSection } from "@/components/DetailSections";

const byPhoto = [...FLEET.filter((v) => !v.poa)].sort((a, b) => (vehImage(b.id) ? 1 : 0) - (vehImage(a.id) ? 1 : 0));

const trust = [[Gem, "Premium Fleet", "World-class vehicles"], [ShieldCheck, "Trusted Service", "Professional chauffeurs"], [Zap, "Flexible Hire", "Hourly, daily & more"], [Headphones, "Dedicated Support", "Here when you need us"]] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[86svh] flex items-center overflow-hidden pt-[112px] pb-[150px] lg:pb-[140px]">
        <HeroVideo />
        <div className="absolute inset-0 hero-scrim" />
        <div className="container-x relative w-full">
          <div className="max-w-[640px]">
            <Reveal><span className="eyebrow">Premium Chauffeur Hire in the UK</span></Reveal>
            <Reveal><h1 className="h-serif not-italic font-black text-[38px] sm:text-6xl lg:text-[76px] mt-5 leading-[1.06]">Arrive in a class<br /><span className="italic font-normal">of your own<span className="text-gold">.</span></span></h1></Reveal>
            <Reveal><p className="text-white/90 text-[17px] md:text-lg leading-relaxed max-w-[520px] mt-6">Experience exceptional chauffeur-driven travel with Superluxe. From executive journeys to special occasions, discover comfort, refinement and a service designed around you.</p></Reveal>
            <Reveal><div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/book" className="btn btn-gold">Book Your Chauffeur <ArrowRight size={16} /></Link>
              <Link href="/fleet" className="btn btn-outline">Explore Our Fleet</Link>
            </div></Reveal>
          </div>
        </div>
      </section>

      {/* Booking widget */}
      <section className="relative z-10 pb-10 lg:pb-12">
        <div className="container-x">
          <div className="relative -mt-[96px]"><HeroSearch /></div>
        </div>
      </section>

      <BrandScroller />

      {/* Brand benefits */}
      <section className="bg-[#050505] border-y border-line" aria-label="Why Superluxe">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 py-10 lg:py-12">
          {trust.map(([Ic, t, s], i) => (
            <div key={t} className={`flex items-start gap-3.5 ${i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}`}>
              <Ic size={24} className="text-gold shrink-0 mt-0.5" />
              <div className="min-w-0"><b className="block text-[15px] leading-snug font-semibold text-white">{t}</b><span className="block text-[13.5px] leading-snug text-muted mt-1">{s}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Chauffeur services */}
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Chauffeur Services" title="Service for every occasion" />
          <Carousel label="Chauffeur services" autoPlay>{SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} index={i} />)}</Carousel>
        </div>
      </section>

      {/* Vehicle categories */}
      <section className="section bg-bg-2">
        <div className="container-x">
          <SectionHead eyebrow="Choose Your Class" title="Travel your way" sub="From discreet executive saloons to group travel, start with the class of car that suits your journey." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {VEHICLE_TYPES.map((t) => (
              <Reveal key={t.id} className="h-full">
                <Link href={`/fleet?type=${t.id}`} className="group h-full flex flex-col overflow-hidden rounded-lg bg-bg border border-line hover:border-gold/40 transition-colors">
                  <div className="aspect-[4/3] overflow-hidden"><img src={t.image} alt={`${t.name} in the Superluxe fleet`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
                  <div className="flex items-start justify-between gap-3 p-4 lg:p-5 flex-1">
                    <div className="min-w-0">
                      <h3 className="h-serif text-[19px] lg:text-[22px] leading-snug">{t.name}</h3>
                      <p className="text-muted text-[13.5px] mt-1">{t.tagline} · {vehiclesOfType(t.id).length} cars</p>
                    </div>
                    <ArrowRight size={18} className="hidden sm:block text-gold shrink-0 mt-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Airport transfers */}
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Airport Transfers" title="Seamless airport travel" sub="Private, flight-aware transfers to and from London's airports." />
          <Carousel label="Airports we cover">{AIRPORTS.map((a) => <AirportCard key={a.id} a={a} />)}</Carousel>
        </div>
      </section>

      <div className="bg-bg-2"><BookingStepsSection title="Book in four simple steps" bookHref="/book" /></div>

      {/* Luxury fleet */}
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Our Luxury Fleet" title="A fleet of excellence" sub="From executive saloons to the most prestigious marques." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{byPhoto.slice(0, 6).map((v) => <Reveal key={v.id} className="h-full"><VehicleCard v={v} quickView /></Reveal>)}</div>
          <div className="text-center mt-12"><Link href="/fleet" className="btn btn-outline">View Full Fleet <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <div className="bg-bg-2"><HomeAbout /></div>

      {/* FAQ */}
      <section className="section"><FaqAccordion /></section>
      <CtaBanner />
    </>
  );
}
