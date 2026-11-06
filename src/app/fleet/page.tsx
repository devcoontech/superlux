import type { Metadata } from "next";
import Link from "next/link";
import { FLEET, MANUFACTURERS, VEHICLE_TYPES, brandOf } from "@/data/fleet";
import { VehicleCard } from "@/components/VehicleCard";
import { JourneySummary } from "@/components/JourneySummary";
import { FleetFilters, type FleetQuery } from "@/components/FleetFilters";
import { CtaBanner, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Our Fleet", description: "The finest marques, chauffeur-driven — executive, luxury and ultra-luxury vehicles." };

export default function FleetPage({ searchParams }: { searchParams?: FleetQuery }) {
  const q = searchParams || {};
  const activeBrand = MANUFACTURERS.find((m) => m.slug === q.brand);
  const activeType = VEHICLE_TYPES.find((t) => t.id === q.type);
  const minPax = Number(q.pax) || 0;

  const list = FLEET.filter((v) =>
    (!activeBrand || brandOf(v.id) === activeBrand.name) &&
    (!activeType || v.body === activeType.id) &&
    (!minPax || (v.pax ?? 0) >= minPax)
  );
  // Sorting leaves "Other Vehicle" (no rate or capacity) at the end.
  const sorted = q.sort ? [...list].sort((a, b) => {
    if (a.poa || b.poa) return a.poa ? 1 : -1;
    if (q.sort === "rate-asc") return a.rate! - b.rate!;
    if (q.sort === "rate-desc") return b.rate! - a.rate!;
    return b.pax! - a.pax!;
  }) : list;

  return (
    <>
      <PageHero title="Our Fleet" eyebrow="The finest marques, chauffeur-driven" lead="A curated collection of executive, luxury and ultra-luxury vehicles, ready for your journey." crumbs={[["Home", "/"], ["Fleet"]]} image="/assets/images/fleet/rolls-royce-phantom.webp" />
      <section className="py-16 lg:py-20"><div className="container-x">
        {q.search === "1" && <JourneySummary />}
        <FleetFilters query={{ brand: activeBrand?.slug, type: activeType?.id, pax: q.pax, sort: q.sort, search: q.search }} count={sorted.length} />
        {sorted.length > 0
          ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{sorted.map((v) => <Reveal key={v.id}><VehicleCard v={v} /></Reveal>)}</div>
          : <p className="text-muted text-center py-10">No vehicles match these filters. Try changing them, or <Link href="/contact" className="text-gold">ask us</Link> and we&apos;ll look to source one.</p>}
      </div></section>
      <CtaBanner />
    </>
  );
}
