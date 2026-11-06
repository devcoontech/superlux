import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Luggage, Thermometer, Armchair, MonitorSmartphone, ShieldCheck, UserCheck, Clock, type IconType } from "@/components/icons";
import { FLEET, getVehicle, vehImage } from "@/data/fleet";
import { vehicleDetails } from "@/data/vehicleDetails";
import { sectionImage } from "@/data/media";
import { gbp, AVAIL_META } from "@/lib/format";
import { CtaBanner } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { BookingStepsSection, DetailHero, FaqSection, FeatureGrid, FleetCarouselSection, GlanceCard, SplitSection, StandardsSection } from "@/components/DetailSections";

export function generateStaticParams() { return FLEET.map((v) => ({ id: v.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const v = getVehicle(params.id);
  return { title: v ? (v.poa ? v.name : `${v.name} Chauffeur Hire London`) : "Vehicle", description: v?.desc };
}

export default function VehicleDetail({ params }: { params: { id: string } }) {
  const v = getVehicle(params.id);
  if (!v) notFound();
  const image = vehImage(v.id) || sectionImage("about")!;
  const crumbs: [string, string?][] = [["Home", "/"], ["Fleet", "/fleet"], [v.name]];

  if (v.poa) return (
    <>
      <DetailHero title={v.name} eyebrow={v.cat} lead={v.desc} image={image} crumbs={crumbs} primary={{ label: "Request Chauffeur Quote", href: "/contact?vehicle=other" }} />
      <section className="py-20 lg:py-24"><div className="container-x max-w-[760px] text-center">
        <h2 className="h-serif text-3xl md:text-5xl leading-tight mb-5">Tell us what you&apos;re looking for</h2>
        <p className="text-muted text-[16px] mb-8">Share the vehicle you have in mind, your dates and your journey. Our team will look to source a suitable vehicle and prepare a tailored quotation.</p>
        <Link href="/fleet" className="btn btn-outline">Browse the Fleet</Link>
      </div></section>
      <CtaBanner />
    </>
  );

  const d = vehicleDetails(v);
  const am = AVAIL_META[v.avail];
  const bookHref = `/book?vehicle=${v.id}`;
  const features: [IconType, string, string][] = [
    [Users, `Room for ${v.pax}`, `The ${v.name} comfortably seats up to ${v.pax} passengers in a relaxed, private cabin.`],
    [Luggage, "Luggage Space", `Room for ${v.lgBags} large and ${v.smBags} small bags, so your luggage travels with you.`],
    [Thermometer, "Climate Comfort", "Stay at a comfortable temperature throughout your journey, whatever the weather."],
    [Armchair, "Luxury Seating", "Premium seating and refined materials, designed for comfort on every journey."],
    [MonitorSmartphone, "Modern Technology", "Contemporary in-car technology that keeps the journey easy and enjoyable."],
    [ShieldCheck, "Advanced Safety", "Modern safety systems working in the background to protect everyone on board."],
    [UserCheck, "Professional Chauffeur", "A discreet, impeccably presented chauffeur who anticipates your needs."],
    [Clock, "Flexible Hire", "Book by the hour, point to point, or as an airport transfer."],
  ];
  const others = [...FLEET.filter((f) => f.body === v.body && f.id !== v.id && !f.poa), ...FLEET.filter((f) => f.body !== v.body && !f.poa)].slice(0, 6).map((f) => f.id);

  return (
    <>
      <DetailHero title={`${v.name} Chauffeur Hire London`} eyebrow={v.cat} lead={v.desc} image={image} crumbs={crumbs} primary={{ label: "Request Chauffeur Quote", href: `/contact?vehicle=${v.id}` }} secondary={{ label: "Book Your Ride", href: bookHref }} />
      <FeatureGrid features={features} cta={{ label: "Book Your Ride", href: bookHref }} />

      <SplitSection tinted eyebrow="The Experience" title={`${v.name} chauffeur service`} image={image} imageAlt={v.name}>
        <div className="space-y-4 text-muted text-[16px]">
          <p>Hire a chauffeur-driven {v.name} and let every journey be taken care of. {v.desc}</p>
          <p>{d.about}</p>
          <p>{d.suited} Our {v.name} chauffeur service is a popular choice for {d.bestFor}.</p>
        </div>
      </SplitSection>

      <section className="py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <span className="eyebrow">Inside the Cabin</span>
            <h2 className="h-serif text-3xl md:text-5xl leading-tight mt-4 mb-6">Interior and features</h2>
            <div className="space-y-4 text-muted text-[16px]">
              <p>{d.interior}</p>
              <p>Every client is different, so we shape the journey around you. Options such as child seats, meet and greet and additional waiting time can be added to your booking, or ask our team about anything else you need.</p>
            </div>
          </Reveal>
          <Reveal>
            <GlanceCard title="At a glance" rows={[["Category", v.cat], ["Passengers", `Up to ${v.pax}`], ["Large luggage", String(v.lgBags)], ["Small luggage", String(v.smBags)], ["Guide hourly rate", `${gbp(v.rate!)}/hr`], ["Availability", <span key="a" className={`font-semibold text-[13px] ${am.cls}`}>{am.label}</span>]]} />
          </Reveal>
        </div>
      </section>

      <StandardsSection />
      <BookingStepsSection title={`How to book a ${v.name} chauffeur`} bookHref={bookHref} />
      <FleetCarouselSection eyebrow="Also in Our Fleet" title="Other chauffeur models in London" ids={others} />
      <FaqSection faqs={d.faqs} />
      <CtaBanner />
    </>
  );
}
