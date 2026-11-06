import Link from "next/link";
import { Instagram, Mail, MapPin, WhatsApp, TikTok, Phone } from "@/components/icons";
import { Logo } from "./Logo";
import { SERVICES } from "@/data/services";
import { BRAND } from "@/data/brand";

const link = "block text-[14.5px] text-white/85 py-1.5 hover:text-gold transition-colors";

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-16 lg:pt-20">
      <div className="container-x">
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-x-6 gap-y-10 lg:gap-x-10 pb-12 lg:pb-14 border-b border-white/10">
          <div className="col-span-2 lg:col-span-1">
            <Logo height={44} />
            <p className="text-muted text-[14.5px] leading-relaxed my-5 max-w-[320px]">Exceptional chauffeur-driven travel across the UK. Discretion, comfort and refinement on every journey.</p>
            <div className="flex gap-2.5" aria-label="Social links">
              {([[BRAND.instagram, "Instagram", Instagram], [BRAND.tiktok, "TikTok", TikTok], [BRAND.whatsapp, "WhatsApp", WhatsApp]] as const).map(([href, label, Icon]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:text-gold hover:border-gold transition-colors"><Icon size={16} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="label-caps mb-4">Services</h4>
            {SERVICES.map((s) => <Link key={s.id} href={`/services/${s.id}`} className={link}>{s.name}</Link>)}
          </div>
          <div>
            <h4 className="label-caps mb-4">Explore</h4>
            {[["Our Fleet","/fleet"],["About Us","/about"],["FAQ","/faq"],["Book Now","/book"],["Manage Booking","/lookup"],["Contact / Quote","/contact"]].map(([l,h]) => <Link key={h} href={h} className={link}>{l}</Link>)}
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h4 className="label-caps mb-4">Contact</h4>
            <a href={BRAND.phoneHref} className="flex items-start gap-3 text-[16px] text-gold font-semibold py-1.5 hover:underline"><Phone size={16} className="shrink-0 mt-1" />{BRAND.phone}</a>
            <p className="flex items-start gap-3 text-[14.5px] text-white/85 py-1.5"><Mail size={16} className="text-gold shrink-0 mt-0.5" />{BRAND.email}</p>
            <p className="flex items-start gap-3 text-[14.5px] text-white/85 py-1.5"><MapPin size={16} className="text-gold shrink-0 mt-0.5" />{BRAND.address}</p>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 py-6">
          <p className="text-[13px] text-muted-2">© {new Date().getFullYear()} Superluxe Chauffeurs. All rights reserved. Pricing base: {BRAND.pricingBasePostcode}.</p>
          <div className="flex gap-5 flex-wrap">
            <Link href="/privacy" className="text-[13px] text-muted-2 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[13px] text-muted-2 hover:text-gold transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
