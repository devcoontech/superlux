import Link from "next/link";
import { ArrowRight, Phone } from "@/components/icons";
import { Reveal } from "./Reveal";
import { Placeholder } from "./VehicleArt";
import { QueryForm } from "./QueryForm";
import { BRAND } from "@/data/brand";

export function PageHero({ title, eyebrow, lead, crumbs, image }: { title: string; eyebrow: string; lead?: string; crumbs: [string, string?][]; image?: string }) {
  return (
    <section className={`relative pt-[154px] border-b border-line overflow-hidden ${image ? "pb-24 lg:pb-32" : "pb-[70px]"}`}>
      {image
        ? <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover object-[center_62%]" />
        : <div className="absolute inset-0 opacity-50"><Placeholder label="" /></div>}
      <div className="absolute inset-0" style={{ background: image ? "linear-gradient(90deg,rgba(6,6,7,.9),rgba(6,6,7,.62) 50%,rgba(6,6,7,.25)),linear-gradient(180deg,rgba(6,6,7,.6),transparent 40%,rgba(6,6,7,.75))" : "linear-gradient(180deg,rgba(6,6,7,.8),var(--bg))" }} />
      <div className="container-x relative">
        <nav className={`flex gap-2 items-center text-[12.5px] mb-4 ${image ? "text-white/90" : "text-muted-2"}`} aria-label="Breadcrumb">
          {crumbs.map((c, i) => i < crumbs.length - 1 ? <span key={i}>{c[1] ? <Link href={c[1]} className="hover:text-gold">{c[0]}</Link> : <span>{c[0]}</span>}<span className="text-gold mx-2">/</span></span> : <span key={i} className={image ? "text-white" : "text-muted"}>{c[0]}</span>)}
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h-serif font-black text-5xl md:text-7xl mt-4 leading-[1.05]">{title}</h1>
        {lead && <p className="lead max-w-[640px] mt-5">{lead}</p>}
      </div>
    </section>
  );
}

export function CtaBanner({ showForm = true }: { showForm?: boolean }) {
  return (
    <section className="relative section overflow-hidden">
      <img src="/assets/images/sections/cta-bg.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(6,6,7,.85),rgba(6,6,7,.55) 55%,rgba(6,6,7,.3))" }} />
      <div className={`container-x relative ${showForm ? "grid lg:grid-cols-[1fr_minmax(0,500px)] gap-10 lg:gap-16 items-center" : "text-center"}`}>
        <Reveal>
          <span className="eyebrow">Book Your Chauffeur</span>
          <h2 className={`h-serif text-[38px] md:text-[56px] leading-[1.1] mt-4 mb-5 ${showForm ? "" : "max-w-[820px] mx-auto"}`}>Your journey deserves <span className="text-gold">the extraordinary</span>.</h2>
          <p className={`lead mb-8 ${showForm ? "max-w-[480px]" : "max-w-[560px] mx-auto"}`}>Reserve online in a few steps, or call our team and we&apos;ll arrange everything for you.</p>
          <div className={`flex flex-col sm:flex-row gap-3 ${showForm ? "" : "justify-center"}`}>
            <Link href="/book" className="btn btn-gold">Book Your Chauffeur <ArrowRight size={15} /></Link>
            <a href={BRAND.phoneHref} className="btn btn-outline"><Phone size={15} /> {BRAND.phone}</a>
          </div>
        </Reveal>
        {showForm && <div className="rounded-lg border border-white/15 bg-[#0e0e0e] p-6 lg:p-8"><QueryForm /></div>}
      </div>
    </section>
  );
}

export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <>
      <PageHero title={title} eyebrow="Legal" crumbs={[["Home", "/"], [title]]} />
      <section className="py-20 lg:py-28"><div className="container-x max-w-[820px]">
        <div className="text-muted space-y-4 text-[15px]">
          <p>Our full {title.toLowerCase()} will be published here shortly. If you have any questions in the meantime, please <Link href="/contact" className="text-gold">contact our team</Link>.</p>
        </div>
      </div></section>
    </>
  );
}
