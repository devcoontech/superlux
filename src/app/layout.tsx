import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { VehicleModal } from "@/components/VehicleModal";
import { BRAND } from "@/data/brand";

// Fonts are loaded via a stylesheet link below. To use next/font/google instead
// (self-hosted, no layout shift), swap this for `Playfair_Display`/`Inter` imports
// and apply their `.variable` classNames to <html>. Both resolve the same CSS vars.

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  title: { default: "Superluxe Chauffeurs — Luxury Chauffeur Service UK", template: "%s — Superluxe Chauffeurs" },
  description: "Exceptional chauffeur-driven travel across the UK. Arrive in a class of your own.",
  openGraph: { type: "website", siteName: BRAND.name, title: "Superluxe Chauffeurs", description: "Luxury chauffeur service across the UK." },
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org", "@type": "LocalBusiness", name: BRAND.name,
  url: BRAND.domain, areaServed: "United Kingdom", priceRange: "£££",
  telephone: BRAND.phone, sameAs: [BRAND.instagram, BRAND.tiktok],
  address: { "@type": "PostalAddress", streetAddress: "Mayfair Place", addressLocality: "London", postalCode: "W1J 8AJ", addressCountry: "GB" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:ital,wght@0,300..900;1,300..600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
        <CookieBanner />
        <VehicleModal />
      </body>
    </html>
  );
}
