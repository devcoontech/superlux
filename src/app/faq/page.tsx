import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Search, Phone, WhatsApp, Check } from "@/components/icons";
import { FaqItem } from "@/components/FaqItem";
import { PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { FAQS, faqSlug } from "@/data/faqs";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about booking, vehicles, airport transfers, payments and changes with Superluxe Chauffeurs." };

const shortcuts = [
  { icon: CalendarCheck, title: "Ready to book?", text: "Choose your service and vehicle, then confirm your journey online.", label: "Start a booking", href: "/book" },
  { icon: Search, title: "Already booked?", text: "Use your reference and email to view your booking or request a change.", label: "Manage booking", href: "/lookup" },
  { icon: Phone, title: "Need a tailored quote?", text: "Tell us about your plans and our team will come back to you.", label: "Request a quote", href: "/contact" },
];

const checklist = [
  "Pick-up and drop-off locations, plus any stops",
  "Date and pick-up time",
  "Number of passengers and items of luggage",
  "Your preferred vehicle",
  "Hours required, for hourly hire",
  "Flight number and terminal, for airport journeys",
  "Who is travelling, if you are booking for someone else",
  "Any special requests, such as a female chauffeur",
];

export default function FaqPage() {
  const cats = Object.keys(FAQS);
  return (
    <>
      <PageHero title="FAQ" eyebrow="Help & Information" lead="Everything you need to know about booking and travelling with Superluxe, from choosing a vehicle to changing your plans." crumbs={[["Home", "/"], ["FAQ"]]} image="/assets/images/sections/faq-hero.webp" />

      <section className="py-16 lg:py-20 border-b border-line">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {shortcuts.map(({ icon: Icon, title, text, label, href }) => (
            <Reveal key={title}>
              <Link href={href} className="card p-7 h-full flex flex-col hover:border-gold/40 transition-colors">
                <Icon className="text-gold mb-4" size={26} />
                <h2 className="h-serif text-2xl mb-2">{title}</h2>
                <p className="text-muted text-[15px] mb-5 flex-1">{text}</p>
                <span className="text-gold text-[11px] font-black uppercase tracking-[0.22em] inline-flex items-center gap-1.5">{label} <ArrowRight size={14} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28">
            <span className="label-caps block mb-4">Browse by topic</span>
            <ul className="flex flex-wrap lg:block gap-2">
              {cats.map((c) => (
                <li key={c}>
                  <a href={`#${faqSlug(c)}`} className="block text-[15px] text-white/90 hover:text-gold transition-colors border border-line lg:border-0 lg:border-b rounded lg:rounded-none px-3 py-2 lg:px-0 lg:py-3">{c}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 min-w-0">
            {cats.map((c, i) => (
              <section key={c} id={faqSlug(c)} className="scroll-mt-28">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="h-serif text-3xl md:text-4xl mt-2 mb-4">{c}</h2>
                <div className="border-t border-line">
                  {FAQS[c].map((f, j) => <FaqItem key={f.q} q={f.q} a={f.a} open={i === 0 && j === 0} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-bg-2">
        <div className="container-x">
          <SectionHead eyebrow="Before You Book" title="What to have ready" sub="With these details to hand, we can give you an accurate quotation first time." />
          <ul className="grid sm:grid-cols-2 gap-x-10 max-w-[920px] mx-auto">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 py-4 border-b border-line text-[15px] text-white/95"><Check size={18} className="text-gold shrink-0 mt-0.5" />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-24 text-center">
        <div className="container-x max-w-[760px]">
          <Reveal>
            <span className="eyebrow">Still Have a Question?</span>
            <h2 className="h-serif text-3xl md:text-5xl mt-4 mb-4">Speak to our team</h2>
            <p className="lead mb-8">If you can&apos;t find the answer here, we&apos;re happy to help.</p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <a href={BRAND.phoneHref} className="btn btn-gold"><Phone size={15} /> {BRAND.phone}</a>
              <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline"><WhatsApp size={15} /> WhatsApp</a>
              <Link href="/contact" className="btn btn-outline">Send an enquiry</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
