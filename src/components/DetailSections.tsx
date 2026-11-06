import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Wrench, ClipboardCheck, SprayBottle, HeartHandshake, type IconType } from "@/components/icons";
import { BOOKING_STEPS, STANDARDS } from "@/data/vehicleDetails";
import { FLEET, getVehicle } from "@/data/fleet";
import { BRAND } from "@/data/brand";
import { Carousel } from "./Carousel";
import { FaqItem } from "./FaqItem";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { VehicleCard } from "./VehicleCard";

// Shared building blocks of the fleet, service and airport detail pages.

export function DetailHero({ title, eyebrow, lead, image, crumbs, primary, secondary }: {
  title: string; eyebrow: string; lead: string; image: string; crumbs: [string, string?][];
  primary: { label: string; href: string }; secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative min-h-[72svh] flex items-end overflow-hidden pt-[130px] pb-14 lg:pb-20">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(6,6,7,.9),rgba(6,6,7,.55) 50%,rgba(6,6,7,.2)),linear-gradient(180deg,rgba(6,6,7,.6),transparent 30%,rgba(6,6,7,.75) 80%,var(--bg))" }} />
      <div className="container-x relative w-full">
        <nav className="flex flex-wrap items-center text-[13px] text-white/90 mb-5" aria-label="Breadcrumb">
          {crumbs.map(([label, href], i) => (
            <span key={label}>
              {href ? <Link href={href} className="hover:text-gold">{label}</Link> : <span>{label}</span>}
              {i < crumbs.length - 1 && <span className="text-gold mx-2">/</span>}
            </span>
          ))}
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h-serif font-black text-4xl md:text-6xl mt-4 leading-[1.08] max-w-[800px]">{title}</h1>
        <p className="lead max-w-[620px] mt-5">{lead}</p>
        <div className="flex flex-wrap gap-3.5 mt-8">
          <Link href={primary.href} className="btn btn-gold">{primary.label} <ArrowRight size={15} /></Link>
          {secondary && <Link href={secondary.href} className="btn btn-outline">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid({ features, cta }: { features: [IconType, string, string][]; cta: { label: string; href: string } }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-x">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map(([Icon, name, text]) => (
            <Reveal key={name}>
              <div className="card !rounded-lg h-full p-5 lg:p-6">
                <Icon size={26} className="text-gold mb-4" />
                <h2 className="text-[12px] font-black uppercase tracking-[0.14em] text-white mb-2">{name}</h2>
                <p className="text-muted text-[14px] leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10"><Link href={cta.href} className="btn btn-gold">{cta.label} <ArrowRight size={15} /></Link></div>
      </div>
    </section>
  );
}

export function SplitSection({ eyebrow, title, image, imageAlt, children, flip = false, tinted = false }: { eyebrow: string; title: string; image: string; imageAlt: string; children: ReactNode; flip?: boolean; tinted?: boolean }) {
  return (
    <section className={`py-20 lg:py-28 ${tinted ? "bg-bg-2" : ""}`}>
      <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal className={flip ? "lg:order-2" : ""}><div className="relative rounded-lg overflow-hidden aspect-[4/3] border border-line"><img src={image} alt={imageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover" /></div></Reveal>
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h-serif text-3xl md:text-5xl leading-tight mt-4 mb-6">{title}</h2>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function GlanceCard({ title, rows, footer }: { title: string; rows: [string, ReactNode][]; footer?: ReactNode }) {
  return (
    <div className="card !rounded-lg border-t-2 border-t-gold p-6 lg:p-7">
      <h3 className="h-serif text-2xl mb-3">{title}</h3>
      <dl>
        {rows.map(([k, val]) => <div key={k} className="flex justify-between gap-4 py-3 border-b border-line last:border-b-0 text-sm"><dt className="text-muted">{k}</dt><dd className="text-right font-medium text-white">{val}</dd></div>)}
      </dl>
      {footer}
    </div>
  );
}

const STANDARD_ICONS: IconType[] = [Wrench, ClipboardCheck, SprayBottle, HeartHandshake];
export function StandardsSection() {
  return (
    <section className="py-20 lg:py-28 bg-bg-2">
      <div className="container-x">
        <SectionHead eyebrow="Our Standards" title="Vehicle condition and care" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDARDS.map((s, i) => {
            const Icon = STANDARD_ICONS[i];
            return <Reveal key={s.title}><div className="card !bg-bg-3 !rounded-lg h-full p-7"><Icon size={26} className="text-gold mb-4" /><h3 className="h-serif text-xl mb-2">{s.title}</h3><p className="text-muted text-[15px]">{s.text}</p></div></Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

export function BookingStepsSection({ title, bookHref }: { title: string; bookHref: string }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHead eyebrow="How It Works" title={title} sub="Choose your car, pick a time it's available and leave the driving to us." />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BOOKING_STEPS.map((s, i) => (
            <li key={s.title} className="list-none">
              <Reveal className="border-t border-gold/40 pt-6">
                <span className="h-serif text-4xl text-gold">{i + 1}</span>
                <h3 className="h-serif text-2xl mt-3 mb-2">{s.title}</h3>
                <p className="text-muted text-[15px]">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="text-center mt-12 flex flex-wrap justify-center gap-3.5">
          <Link href={bookHref} className="btn btn-gold">Book Your Ride <ArrowRight size={15} /></Link>
          <a href={BRAND.phoneHref} className="btn btn-outline">Call {BRAND.phone}</a>
        </div>
      </div>
    </section>
  );
}

export function FleetCarouselSection({ eyebrow, title, sub, ids, tinted = true }: { eyebrow: string; title: string; sub?: string; ids?: string[]; tinted?: boolean }) {
  const vehicles = ids ? ids.map(getVehicle).filter((v): v is NonNullable<typeof v> => !!v) : FLEET.filter((v) => !v.poa);
  return (
    <section className={`py-20 lg:py-28 ${tinted ? "bg-bg-2" : ""}`}>
      <div className="container-x">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        <Carousel label="Vehicles in our fleet">{vehicles.map((v) => <VehicleCard key={v.id} v={v} />)}</Carousel>
        <div className="text-center mt-10"><Link href="/fleet" className="btn btn-outline">View Full Fleet <ArrowRight size={15} /></Link></div>
      </div>
    </section>
  );
}

export function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x max-w-[860px]">
        <SectionHead eyebrow="FAQs" title="Frequently asked questions" />
        <div className="border-t border-line">{faqs.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} open={i === 0} />)}</div>
      </div>
    </section>
  );
}
