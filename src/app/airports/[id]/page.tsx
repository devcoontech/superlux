import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plane, UserCheck, Luggage, MapPin, Clock, ShieldCheck, Route, Headphones, type IconType } from "@/components/icons";
import { AIRPORTS, getAirport } from "@/data/airports";
import { airportImage } from "@/data/media";
import { CtaBanner } from "@/components/ui";
import { BookingStepsSection, DetailHero, FaqSection, FeatureGrid, FleetCarouselSection, GlanceCard, SplitSection } from "@/components/DetailSections";
import { AirportCard } from "@/components/AirportCard";
import { Carousel } from "@/components/Carousel";
import { SectionHead } from "@/components/SectionHead";

export function generateStaticParams() { return AIRPORTS.map((a) => ({ id: a.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const a = getAirport(params.id);
  return { title: a ? `${a.name} Airport Chauffeur Transfers` : "Airport Transfers", description: a ? `Private chauffeur transfers to and from ${a.name} Airport (${a.code}) with Superluxe Chauffeurs.` : undefined };
}

const BOOK_HREF = "/book?service=airport-transfers";

export default function AirportDetail({ params }: { params: { id: string } }) {
  const a = getAirport(params.id);
  if (!a) notFound();
  const image = airportImage(a.id)!;
  const features: [IconType, string, string][] = [
    [Plane, "Flight-Aware Planning", `Share your ${a.name} flight details and we plan your pick-up around your arrival.`],
    [UserCheck, "Meet and Greet", "Add a meet-and-greet service, so that your chauffeur is ready for you."],
    [Luggage, "Help with Luggage", "Your chauffeur looks after your bags from the kerb to the car."],
    [MapPin, "Door to Terminal", `A direct, private journey between your door and ${a.name} Airport.`],
    [Clock, "Departures Planned", "We plan your pick-up around your flight, so that you arrive with time to spare."],
    [ShieldCheck, "Discreet Service", "A private cabin to work, rest or take calls on the way."],
    [Route, "Any Destination", "Travel to central London, or further across the UK."],
    [Headphones, "Dedicated Support", "Attentive care for your booking and your journey."],
  ];
  const faqs = [
    { q: `Do you monitor flights at ${a.name}?`, a: "Share your flight number when you book, so that we can plan your pick-up around your arrival time." },
    { q: `Where will my chauffeur meet me at ${a.name}?`, a: "Your booking details confirm the meeting arrangements. If you would like a meet-and-greet service, add it when you book or tell our team." },
    { q: `How long does the journey from ${a.name} take?`, a: `${a.name} is ${a.distance.toLowerCase()} from central London. Journey times vary with traffic and time of day, so we plan each transfer around your flight and destination.` },
    { q: "Which vehicle should I choose?", a: "It depends on your party and luggage. Saloons suit one to three passengers, luxury SUVs offer more space, and people carriers keep larger groups together." },
    { q: "Can you collect me from a private terminal?", a: "We specialise in private jet arrivals, with vehicles positioned as close to the aircraft as the airport permits. Tell us your flight and operator when you enquire." },
  ];
  return (
    <>
      <DetailHero title={`${a.name} Airport Chauffeur Transfers`} eyebrow={`Airport Transfer · ${a.code}`} lead={`Private, flight-aware chauffeur transfers to and from ${a.name}, in a vehicle chosen to suit you.`} image={image} crumbs={[["Home", "/"], ["Services", "/services"], ["Airport Transfers", "/services/airport-transfers"], [a.name]]} primary={{ label: "Book Airport Transfer", href: BOOK_HREF }} secondary={{ label: "Request a Quote", href: "/contact" }} />
      <FeatureGrid features={features} cta={{ label: "Book Your Transfer", href: BOOK_HREF }} />

      <SplitSection tinted eyebrow="About the Airport" title={`Travelling through ${a.name}`} image={image} imageAlt={`${a.name} Airport`}>
        <div className="space-y-4 text-muted text-[16px] mb-7"><p>{a.about}</p><p>{a.tip}</p></div>
        <GlanceCard title="At a glance" rows={[["Airport code", a.code], ["Location", a.location], ["Terminals", a.terminals], ["From central London", a.distance]]} />
      </SplitSection>

      <BookingStepsSection title={`How to book your ${a.name} transfer`} bookHref={BOOK_HREF} />
      <FleetCarouselSection eyebrow="Our Fleet" title={`Choose your car for ${a.name}`} sub="Scroll through our vehicles and pick the right one for your party and luggage." />

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHead eyebrow="Other Airports" title="We also cover" />
          <Carousel label="Other airports we cover">{AIRPORTS.filter((o) => o.id !== a.id).map((o) => <AirportCard key={o.id} a={o} />)}</Carousel>
        </div>
      </section>

      <div className="bg-bg-2"><FaqSection faqs={faqs} /></div>
      <CtaBanner />
    </>
  );
}
