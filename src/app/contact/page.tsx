import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, ArrowRight, WhatsApp, Instagram, TikTok } from "@/components/icons";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FaqItem } from "@/components/FaqItem";
import { PageHero, CtaBanner } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { SectionImage } from "@/components/VehicleArt";
import { sectionImage } from "@/data/media";
import { BRAND } from "@/data/brand";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = { title: "Contact & Quote", description: "Call, WhatsApp or send an enquiry to request a quotation from Superluxe Chauffeurs in London." };

const methods = [
  { icon: Phone, title: "Call us", text: "The quickest way to reach us about a journey or an urgent change.", value: BRAND.phone, href: BRAND.phoneHref, external: false },
  { icon: WhatsApp, title: "WhatsApp", text: "Message us with your plans and our team will reply there.", value: "Start a chat", href: BRAND.whatsapp, external: true },
  { icon: MapPin, title: "Find us", text: "Our London address is in the heart of Mayfair.", value: "Mayfair Place, W1J 8AJ", href: BRAND.mapsHref, external: true },
];

const nextSteps = [
  { title: "We review your enquiry", text: "Our team checks your journey details and vehicle preference." },
  { title: "You receive your quotation", text: "We come back to you with availability and a price for your journey." },
  { title: "We confirm your booking", text: "Once you are happy, we finalise your chauffeur and vehicle." },
];

const enquiryTypes = [
  { title: "Airport & private jet", text: "Terminal and private jet arrivals and departures.", include: "Flight number, terminal or FBO, and passenger and luggage numbers." },
  { title: "Corporate & roadshows", text: "Executive travel, multi-stop roadshows and business accounts.", include: "Your schedule, stops, number of travellers and company details." },
  { title: "Weddings & events", text: "Bespoke chauffeur services for weddings, galas and private occasions.", include: "Date, venues, timings and your preferred vehicle." },
  { title: "Music video & production", text: "High-impact vehicles for production crews and artists.", include: "Shoot dates, location, your brief and the vehicles you have in mind." },
  { title: "Personal drivers", text: "Dedicated long-term drivers, with female chauffeurs available on request.", include: "Start date, typical hours, duration and any specific requests." },
  { title: "Something bespoke", text: "Have a request that doesn't fit a category? We'd like to hear it.", include: "As much as you can tell us about what you are planning." },
];

const quickQuestions = ["Bookings", "Changes & cancellations", "Vehicles"].map((c) => FAQS[c][0]);

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact & Quote" eyebrow="Get in touch" lead="Request a quotation or ask us anything. We'll respond promptly." crumbs={[["Home", "/"], ["Contact"]]} image="/assets/images/sections/contact-hero.webp" />

      <section className="py-16 lg:py-20 border-b border-line">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {methods.map(({ icon: Icon, title, text, value, href, external }) => (
            <Reveal key={title}>
              <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="card p-7 h-full flex flex-col hover:border-gold/40 transition-colors">
                <Icon className="text-gold mb-4" size={26} />
                <h2 className="h-serif text-2xl mb-2">{title}</h2>
                <p className="text-muted text-[15px] mb-4 flex-1">{text}</p>
                <span className="text-gold font-bold text-[15px]">{value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="enquiry" className="py-20 lg:py-28 scroll-mt-20">
        <div className="container-x grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
          <div>
            <span className="eyebrow">Send an Enquiry</span>
            <h2 className="h-serif text-3xl md:text-5xl leading-tight mt-4 mb-3">Request a quotation</h2>
            <p className="text-muted text-[16px] mb-8">Share a few details below. The more you can tell us about your journey, the more accurate your quotation will be.</p>
            <Suspense><ContactForm /></Suspense>
          </div>
          <aside className="space-y-6">
            <div className="card border-t-2 border-t-gold p-7">
              <h3 className="h-serif text-2xl mb-5">What happens next</h3>
              <ol className="space-y-5">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full border border-gold/50 text-gold font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                    <div><b className="block text-[15px] font-semibold text-white mb-0.5">{s.title}</b><p className="text-muted text-sm">{s.text}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card p-7">
              <h3 className="h-serif text-2xl mb-3">Direct details</h3>
              <a href={BRAND.phoneHref} className="flex items-center gap-3 py-3 border-b border-line text-[15px] text-white hover:text-gold"><Phone size={16} className="text-gold shrink-0" />{BRAND.phone}</a>
              <div className="flex items-center gap-3 py-3 border-b border-line text-sm text-white/90"><Mail size={16} className="text-gold shrink-0" />{BRAND.email}</div>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 py-3 border-b border-line text-[15px] text-white hover:text-gold"><Instagram size={16} className="text-gold shrink-0" />Instagram</a>
              <a href={BRAND.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-3 py-3 border-b border-line text-[15px] text-white hover:text-gold"><TikTok size={16} className="text-gold shrink-0" />TikTok</a>
              <Link href="/book" className="btn btn-outline w-full mt-6">Start a full booking <ArrowRight size={15} /></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-bg-2">
        <div className="container-x">
          <SectionHead eyebrow="How We Can Help" title="Tell us what you're planning" sub="Whatever your occasion, these details help us give you the right answer quickly." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enquiryTypes.map((t) => (
              <Reveal key={t.title}>
                <div className="card !bg-bg-3 p-7 h-full">
                  <h3 className="h-serif text-2xl mb-2">{t.title}</h3>
                  <p className="text-muted text-[15px] mb-5">{t.text}</p>
                  <span className="text-gold text-[10.5px] font-black uppercase tracking-[0.2em]">Helpful to include</span>
                  <p className="text-white/95 text-sm mt-1.5">{t.include}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <span className="eyebrow">Where to Find Us</span>
            <h2 className="h-serif text-3xl md:text-5xl leading-tight mt-4 mb-5">Based in Mayfair, serving the UK</h2>
            <p className="text-muted text-[16px] mb-6">From our London base, we provide chauffeur-driven travel across the capital and throughout the UK, including airport transfers and multi-day itineraries.</p>
            <address className="not-italic flex items-start gap-3 text-[16px] text-white mb-7"><MapPin size={18} className="text-gold shrink-0 mt-1" />{BRAND.address}</address>
            <a href={BRAND.mapsHref} target="_blank" rel="noreferrer" className="btn btn-outline">Open in Google Maps <ArrowRight size={15} /></a>
          </Reveal>
          <Reveal><div className="relative rounded overflow-hidden aspect-[4/3] border border-line"><SectionImage src={sectionImage("experience")} alt="Superluxe chauffeur service in London" label="Brand photography" /></div></Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-bg-2">
        <div className="container-x max-w-[860px]">
          <SectionHead eyebrow="Common Questions" title="Quick answers" />
          <div className="border-t border-line">
            {quickQuestions.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
          <div className="text-center mt-10"><Link href="/faq" className="btn btn-outline">View All FAQs <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <CtaBanner showForm={false} />
    </>
  );
}
