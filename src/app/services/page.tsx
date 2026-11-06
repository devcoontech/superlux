import type { Metadata } from "next";
import { SERVICES, EXTRA_SERVICE_PAGES } from "@/data/services";
import { CtaBanner, PageHero } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = { title: "Our Services", description: "From airport transfers to weddings and corporate accounts — a complete chauffeur service." };
const all = [...SERVICES, EXTRA_SERVICE_PAGES["chauffeur-service-london"]];

export default function ServicesIndex() {
  return (
    <>
      <PageHero title="Our Services" eyebrow="Chauffeur-driven, every occasion" lead="From airport transfers to weddings and corporate accounts." crumbs={[["Home", "/"], ["Services"]]} image="/assets/images/services/corporate.webp" />
      <section className="py-20 lg:py-28"><div className="container-x">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {all.map((s) => <Reveal key={s.id} className="h-full"><ServiceCard s={s} /></Reveal>)}
        </div>
      </div></section>
      <CtaBanner />
    </>
  );
}
