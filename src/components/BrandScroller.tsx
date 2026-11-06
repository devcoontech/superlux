import Link from "next/link";
import { MANUFACTURERS } from "@/data/fleet";
import { BrandLogo } from "./BrandLogo";

// Auto-scrolling strip of full-colour manufacturer logos on white. Clicking a logo filters the fleet.
// Each half of the track holds the logos twice so it is wider than any screen; the loop slides one half.
const HALF = [...MANUFACTURERS, ...MANUFACTURERS];

export function BrandScroller() {
  return (
    <section className="marquee bg-white py-4 lg:py-5" aria-label="The marques we chauffeur">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center shrink-0">
            {HALF.map((m, i) => {
              const repeat = copy === 1 || i >= MANUFACTURERS.length;
              return (
              <li key={`${m.slug}-${i}`} aria-hidden={repeat || undefined} className="shrink-0 px-8 lg:px-12">
                <Link href={`/fleet?brand=${m.slug}`} title={`View ${m.name} vehicles`} tabIndex={repeat ? -1 : undefined} className="h-16 flex items-center justify-center opacity-90 hover:opacity-100 transition-[opacity,transform] duration-300 hover:scale-105">
                  <BrandLogo src={m.logo} name={m.name} height={Math.round(m.logoHeight * 0.62)} />
                </Link>
              </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
