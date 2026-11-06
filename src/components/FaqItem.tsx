import { Plus } from "@/components/icons";

export function FaqItem({ q, a, open }: { q: string; a: string; open?: boolean }) {
  return (
    <details className="group border-b border-line" open={open}>
      <summary className="flex justify-between items-center gap-5 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden h-serif text-lg md:text-xl text-white hover:text-gold transition-colors">
        {q}
        <Plus size={18} className="text-gold shrink-0 transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <p className="text-muted text-[15px] leading-relaxed pb-6 pr-8">{a}</p>
    </details>
  );
}
