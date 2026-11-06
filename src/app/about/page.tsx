import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Gem, Clock, Headphones, ArrowRight, Sun, Briefcase, Champagne, Check } from "@/components/icons";
import { PageHero, CtaBanner } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { SectionImage } from "@/components/VehicleArt";
import { sectionImage } from "@/data/media";
import { SERVICES } from "@/data/services";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = { title: "About", description: `Established in ${BRAND.established}, Superluxe Chauffeurs combines a distinguished fleet with discreet, professional chauffeurs across London and the UK.` };

const audiences = [
  { icon: Sun, title: "Leisure", text: "Effortless travel for personal shopping, dining and exploring the city, at your own pace." },
  { icon: Briefcase, title: "Business", text: "Discreet, punctual travel for corporate leaders and executives, from one meeting to a full roadshow." },
  { icon: Champagne, title: "Memorable Days", text: "A layer of prestige for weddings, galas and life's milestones, with every detail looked after." },
];

const values = [
  { icon: ShieldCheck, title: "Discretion", text: "Your privacy and schedule, respected on every journey." },
  { icon: Gem, title: "Refinement", text: "Immaculate vehicles and attention to every detail." },
  { icon: Clock, title: "Reliability", text: "Punctual, professional and dependable, always." },
  { icon: Headphones, title: "Hospitality", text: "Genuine care from first enquiry to final destination." },
];

const chauffeurPoints = [
  "Trained to anticipate your needs before they arise",
  "Dedicated personal drivers for long-term assignments",
  "Female chauffeurs available on request",
  "The same standard on a city transfer or a week-long roadshow",
];

const journey = [
  { title: "Tell us your plans", text: "Book online, send an enquiry or call us with your journey, timings and preferred vehicle." },
  { title: "We tailor the details", text: "We confirm your vehicle, route and any special requests, so that nothing is left to chance." },
  { title: "Your chauffeur arrives", text: "An immaculate vehicle and a professional chauffeur, ready for you on time." },
  { title: "Travel in comfort", text: "Sit back and enjoy a journey defined by privacy, comfort and serenity." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Superluxe" eyebrow="Our Story" lead="Quiet luxury, uncompromising service. A chauffeur experience built around you." crumbs={[["Home", "/"], ["About"]]} image="/assets/images/sections/about-hero.webp" />

      <section className="py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <span className="eyebrow">Who We Are · Est. {BRAND.established}</span>
            <h2 className="h-serif text-3xl md:text-5xl leading-tight mt-4 mb-6">A standard of service worth arriving for</h2>
            <div className="space-y-4 text-muted text-[16px]">
              <p>Superluxe Chauffeurs has been dedicated to private travel since {BRAND.established}, combining a distinguished fleet with discreet, professional chauffeurs across London and the UK.</p>
              <p>We believe that true luxury is found in the details. We stand for more than transportation: we bring together safety, elegance and personal attention, so that every journey is defined by comfort, privacy and reliability.</p>
              <p>Whether you need a vehicle for leisure, high-level business or a special day, our approach stays the same: absolute excellence.</p>
            </div>
            <Link href="/services" className="btn btn-outline mt-8">Explore Our Services <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal><div className="relative rounded overflow-hidden aspect-[4/3] lg:aspect-[4/5] border border-line"><SectionImage src={sectionImage("about")} alt="A Superluxe chauffeur with a client" label="Brand photography" /></div></Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-gold text-black text-center">
        <div className="container-x max-w-[900px]">
          <Reveal>
            <span className="text-[11px] sm:text-[12px] font-black tracking-[0.3em] sm:tracking-[0.42em] uppercase">Our Philosophy</span>
            <blockquote className="h-serif text-3xl md:text-5xl leading-tight mt-5">&ldquo;Best service and genuine care for our customers is not an option. It is our mandate.&rdquo;</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Who We Serve" title="Established to cater to the discerning" sub="We are positioned to look after every kind of client and every kind of journey." />
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map(({ icon: Icon, title, text }) => (
              <Reveal key={title}><div className="card p-8 h-full border-t-2 border-t-gold"><Icon className="text-gold mb-5" size={30} /><h3 className="h-serif text-2xl mb-3">{title}</h3><p className="text-muted text-[15px]">{text}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-bg-2">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal><div className="relative rounded overflow-hidden aspect-[4/3] border border-line"><SectionImage src={sectionImage("experience")} alt="The Superluxe chauffeur experience" label="Brand photography" /></div></Reveal>
          <Reveal>
            <span className="eyebrow">Our Chauffeurs</span>
            <h2 className="h-serif text-3xl md:text-5xl leading-tight mt-4 mb-6">The people behind every journey</h2>
            <p className="text-muted text-[16px] mb-6">A great vehicle is only part of the experience. Our chauffeurs set the tone from the moment you meet them, with calm professionalism and care for your comfort and privacy.</p>
            <ul className="space-y-3">
              {chauffeurPoints.map((p) => <li key={p} className="flex items-start gap-3 text-[15px] text-white/95"><Check size={18} className="text-gold shrink-0 mt-0.5" />{p}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHead eyebrow="What We Value" title="The Superluxe standard" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <Reveal key={title}><div className="card p-8 h-full"><Icon className="text-gold mb-5" size={30} /><h3 className="h-serif text-2xl mb-2">{title}</h3><p className="text-muted text-[15px]">{text}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-bg-2">
        <div className="container-x">
          <SectionHead eyebrow="How It Works" title="From first call to final destination" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {journey.map((step, i) => (
              <li key={step.title} className="list-none">
                <Reveal className="border-t border-gold/40 pt-6">
                  <span className="h-serif text-4xl text-gold">{i + 1}</span>
                  <h3 className="h-serif text-2xl mt-3 mb-2">{step.title}</h3>
                  <p className="text-muted text-[15px]">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <span className="eyebrow">What We Do</span>
            <h2 className="h-serif text-3xl md:text-5xl leading-tight mt-4 mb-5">A service for every occasion</h2>
            <p className="text-muted text-[16px] mb-7">From a single airport transfer to a long-term personal driver, we shape each service around you.</p>
            <Link href="/fleet" className="btn btn-gold">View Our Fleet <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal>
            <div className="border-t border-line">
              {SERVICES.map((s) => (
                <Link key={s.id} href={`/services/${s.id}`} className="flex items-center justify-between gap-4 py-4 border-b border-line group">
                  <span className="h-serif text-xl text-white group-hover:text-gold transition-colors">{s.name}</span>
                  <ArrowRight size={16} className="text-gold shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
