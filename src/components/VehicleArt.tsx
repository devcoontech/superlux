import type { Vehicle, VehicleBody } from "@/data/fleet";
import { vehImage } from "@/data/fleet";

// Real supplied photo when available, else the styled placeholder SVG.
export function VehicleMedia({ v, className = "" }: { v: Vehicle; className?: string }) {
  const img = v.poa ? null : vehImage(v.id);
  if (img) return <img src={img} alt={v.name} loading="lazy" decoding="async" className={className} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
  return <VehicleArt body={v.poa ? "poa" : v.body} className={className} />;
}
export const hasPhoto = (v: Vehicle) => !v.poa && !!vehImage(v.id);

// Brand-styled placeholder silhouette (see ASSET-MAP.md). Varies by body type.
export function VehicleArt({ body, className = "" }: { body: VehicleBody; className?: string }) {
  const stroke = "rgba(255,215,0,.9)";
  const gold = "#FFD700";
  let shape: React.ReactNode = null;
  if (body === "saloon") shape = (
    <><path d="M48 140 L70 112 C84 96 108 90 140 90 L196 90 C214 90 236 100 252 116 L272 134" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" /><path d="M48 140 L272 140" stroke={stroke} strokeWidth="2.4" /><circle cx="98" cy="142" r="20" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /><circle cx="226" cy="142" r="20" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /></>
  );
  else if (body === "limo") shape = (
    <><path d="M38 142 L60 114 C76 96 100 90 132 90 L204 90 C222 90 246 100 266 118 L286 138" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" /><path d="M34 142 L286 142" stroke={stroke} strokeWidth="2.4" /><circle cx="92" cy="144" r="20" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /><circle cx="238" cy="144" r="20" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /></>
  );
  else if (body === "suv") shape = (
    <><path d="M46 138 L58 92 C62 82 72 78 86 78 L212 78 C230 78 250 92 264 110 L276 132" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" /><path d="M46 138 L276 138" stroke={stroke} strokeWidth="2.4" /><circle cx="96" cy="140" r="22" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /><circle cx="228" cy="140" r="22" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /></>
  );
  else if (body === "van") shape = (
    <><path d="M40 140 L48 74 C50 66 58 62 70 62 L210 62 C236 62 256 84 268 108 L278 140" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" /><path d="M40 140 L278 140" stroke={stroke} strokeWidth="2.4" /><circle cx="92" cy="142" r="21" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /><circle cx="232" cy="142" r="21" fill="#0c0c0e" stroke={gold} strokeWidth="2.4" /></>
  );
  else shape = (
    <><circle cx="160" cy="104" r="46" fill="none" stroke={stroke} strokeWidth="2" /><text x="160" y="120" textAnchor="middle" fontFamily="var(--font-serif),serif" fontSize="46" fill={gold}>?</text></>
  );
  return (
    <svg className={className} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block", background: "linear-gradient(135deg,#1a1a1d,#101012 60%,#141416)" }}>
      <ellipse cx="160" cy="168" rx="120" ry="12" fill="rgba(0,0,0,.4)" />
      {shape}
    </svg>
  );
}

export function Placeholder({ label = "Image placeholder", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`} style={{ background: "linear-gradient(135deg,#17171a,#0d0d0f 60%,#121214)" }} aria-hidden="true">
      <span className="relative z-10 text-center text-muted-2 text-xs tracking-wider px-3">{label}</span>
      <span className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 70% 20%,rgba(255,215,0,.08),transparent 60%)" }} />
    </div>
  );
}

// Real supplied section/service/airport photo, else the styled placeholder.
export function SectionImage({ src, alt, label, className = "" }: { src: string | null; alt: string; label?: string; className?: string }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
  return <Placeholder label={label || alt} />;
}
