// Full-colour manufacturer logo. Several are dark, so always place them on a light surface.
export function BrandLogo({ src, name, height = 64 }: { src: string; name: string; height?: number }) {
  return <img src={src} alt={`${name} logo`} loading="lazy" decoding="async" style={{ height, width: "auto", maxWidth: height * 2.4 }} className="block object-contain" />;
}
