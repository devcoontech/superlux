import { Reveal } from "./Reveal";
export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="text-center max-w-[720px] mx-auto mb-12 lg:mb-14">
      <span className="eyebrow inline-block mb-4">{eyebrow}</span>
      <h2 className="h-serif text-[34px] md:text-[46px] leading-[1.15]">{title}</h2>
      {sub && <p className="lead mt-4">{sub}</p>}
    </Reveal>
  );
}
