import Link from "next/link";
import { ArrowRight } from "@/components/icons";
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 pt-32 pb-16">
      <h1 className="h-serif text-[clamp(90px,20vw,200px)] text-gold leading-[.9]">404</h1>
      <p className="text-muted my-4 max-w-[420px]">The page you're looking for has taken a different route. Let's get you back on the road.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/" className="btn btn-gold">Return Home <ArrowRight size={15} /></Link>
        <Link href="/fleet" className="btn btn-outline">Explore the Fleet</Link>
      </div>
    </div>
  );
}
