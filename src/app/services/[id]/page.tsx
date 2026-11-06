import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, UserCheck, Gem, Clock, Headphones, Star, MapPin, ShieldCheck, Medal, type IconType } from "@/components/icons";
import { SERVICES, EXTRA_SERVICE_PAGES, getService } from "@/data/services";
import { SERVICE_DETAILS } from "@/data/serviceDetails";
import { serviceImage, sectionImage } from "@/data/media";
import { CtaBanner } from "@/components/ui";
import { BookingStepsSection, DetailHero, FaqSection, FeatureGrid, FleetCarouselSection, SplitSection, StandardsSection } from "@/components/DetailSections";

export function generateStaticParams() { return [...SERVICES.map((s) => ({ id: s.id })), ...Object.keys(EXTRA_SERVICE_PAGES).map((id) => ({ id }))]; }
export function generateMetadata({ params }: { params: { id: string } }): Metadata { const s = getService(params.id); return { title: s ? s.name : "Service", description: s?.blurb }; }

const HIGHLIGHT_ICONS: IconType[] = [Star, Medal, MapPin, ShieldCheck];

export default function ServiceDetail({ params }: { params: { id: string } }) {
  const s = getService(params.id);
  const d = s && SERVICE_DETAILS[s.id];
  if (!s || !d) notFound();
  const image = serviceImage(s.id) || sectionImage("about")!;
  const bookHref = `/book?service=${s.id}`;
  const features: [IconType, string, string][] = [
    ...d.highlights.map(([name, text], i): [IconType, string, string] => [HIGHLIGHT_ICONS[i], name, text]),
    [UserCheck, "Professional Chauffeur", "A discreet, impeccably presented chauffeur who anticipates your needs."],
    [Gem, "Premium Fleet", "A choice of the world's finest marques, immaculately presented."],
    [Clock, "Flexible Booking", "Book online in a few steps, or talk your plans through with our team."],
    [Headphones, "Dedicated Support", "Attentive care for your booking and your journey."],
  ];
  return (
    <>
      <DetailHero title={s.name} eyebrow={s.tagline} lead={s.blurb} image={image} crumbs={[["Home", "/"], ["Services", "/services"], [s.name]]} primary={{ label: "Request Chauffeur Quote", href: "/contact" }} secondary={{ label: "Book This Service", href: bookHref }} />
      <FeatureGrid features={features} cta={{ label: "Book Your Ride", href: bookHref }} />
      <SplitSection tinted eyebrow="The Experience" title={`${s.name} with Superluxe`} image={image} imageAlt={s.name}>
        <div className="space-y-4 text-muted text-[16px] mb-7"><p>{d.intro}</p><p>{d.approach}</p></div>
        <span className="label-caps block mb-3">Ideal for</span>
        <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5">{d.idealFor.map((item) => <li key={item} className="flex items-start gap-2.5 text-[15px] text-white/95"><Check size={17} className="text-gold shrink-0 mt-1" />{item}</li>)}</ul>
      </SplitSection>
      <StandardsSection />
      <BookingStepsSection title={`How to book ${s.name.toLowerCase()}`} bookHref={bookHref} />
      <FleetCarouselSection eyebrow="Recommended Vehicles" title="Chosen for this service" ids={d.vehicles} />
      <FaqSection faqs={d.faqs} />
      <CtaBanner />
    </>
  );
}
