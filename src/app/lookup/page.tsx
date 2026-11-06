import type { Metadata } from "next";
import { LookupForm } from "@/components/LookupForm";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Manage Your Booking", description: "Retrieve your booking with your reference and email address." };

export default function LookupPage() {
  return (
    <>
      <PageHero title="Manage Your Booking" eyebrow="Booking Lookup" lead="Retrieve your booking with your reference and email address." crumbs={[["Home", "/"], ["Manage Booking"]]} />
      <section className="py-20 lg:py-28"><div className="container-x max-w-[720px]"><LookupForm /></div></section>
    </>
  );
}
