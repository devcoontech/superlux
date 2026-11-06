"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "@/components/icons";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/data/navigation";
import { EXTRA_SERVICE_PAGES, SERVICES } from "@/data/services";
import { FLEET } from "@/data/fleet";
import { AIRPORTS } from "@/data/airports";

type SubMenu = { all: { label: string; href: string }; groups: { title?: string; links: { label: string; href: string }[] }[] };

const SUB_MENUS: Record<string, SubMenu> = {
  "/fleet": {
    all: { label: "View Full Fleet", href: "/fleet" },
    groups: [{ links: FLEET.map((v) => ({ label: v.name, href: `/fleet/${v.id}` })) }],
  },
  "/services": {
    all: { label: "View All Services", href: "/services" },
    groups: [
      { title: "Services", links: [...SERVICES, ...Object.values(EXTRA_SERVICE_PAGES)].map((s) => ({ label: s.name, href: `/services/${s.id}` })) },
      { title: "Airports", links: AIRPORTS.map((a) => ({ label: `${a.name} Airport`, href: `/airports/${a.id}` })) },
    ],
  },
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDropdown(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { setDropdown(null); setOpen(false); setExpanded(null); }, [pathname]);

  const closeMobile = () => { setOpen(false); setExpanded(null); };
  const topLink = "relative text-[14px] font-medium transition-colors hover:text-gold";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[120] flex items-center border-b transition-all duration-300 ${scrolled ? "h-[72px] bg-black/90 backdrop-blur-md border-white/10" : "h-[88px] border-transparent"}`}>
        <div className="container-x w-full grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link href="/" aria-label="Superluxe home" className="justify-self-start"><Logo height={44} /></Link>
          <nav className={`hidden lg:flex items-center gap-0.5 rounded-full border px-2 py-1 transition-colors duration-300 ${scrolled ? "border-transparent" : "bg-black/35 border-white/20"}`} aria-label="Primary">
            {NAV_LINKS.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href) || (l.href === "/services" && pathname.startsWith("/airports"));
              const color = active ? "text-white" : "text-white/85";
              const underline = active && <span className="absolute left-3.5 right-1 bottom-1 h-px bg-gold" />;
              const menu = SUB_MENUS[l.href];
              if (!menu) return (
                <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={`${topLink} px-3.5 xl:px-4 py-2 ${color}`}>
                  {l.label}
                  {active && <span className="absolute left-3.5 right-3.5 xl:left-4 xl:right-4 bottom-1 h-px bg-gold" />}
                </Link>
              );
              const show = dropdown === l.href;
              return (
                <div key={l.href} className="relative flex items-center" onMouseEnter={() => setDropdown(l.href)} onMouseLeave={() => setDropdown(null)}>
                  <Link href={l.href} aria-current={active ? "page" : undefined} className={`${topLink} pl-3.5 pr-1 py-2 ${color}`}>{l.label}{underline}</Link>
                  <button type="button" aria-label={`Show ${l.label} pages`} aria-expanded={show} onClick={() => setDropdown(show ? null : l.href)} className="pr-2.5 py-2 text-white/85 hover:text-gold"><ChevronDown size={14} className={`transition-transform duration-200 ${show ? "rotate-180" : ""}`} /></button>
                  {show && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                      <div className="w-[500px] rounded-lg border border-white/15 bg-[#101010] p-5 shadow-[0_24px_50px_-20px_#000]">
                        <div className={menu.groups.length > 1 ? "grid grid-cols-2 gap-6" : ""}>
                          {menu.groups.map((g) => (
                            <div key={g.title || "links"}>
                              {g.title && <p className="label-caps !text-gold mb-2">{g.title}</p>}
                              <div className={menu.groups.length > 1 ? "" : "grid grid-cols-2 gap-x-6"}>
                                {g.links.map((s) => <Link key={s.href} href={s.href} onClick={() => setDropdown(null)} className={`block py-1.5 text-[14px] transition-colors hover:text-gold ${pathname === s.href ? "text-gold" : "text-white/90"}`}>{s.label}</Link>)}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Link href={menu.all.href} onClick={() => setDropdown(null)} className="block mt-3 pt-3 border-t border-white/10 text-[12px] font-bold uppercase tracking-[0.14em] text-gold hover:underline">{menu.all.label}</Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 justify-self-end">
            <Link href="/book" className="max-[359px]:hidden btn btn-gold !rounded-full !normal-case !tracking-normal !font-semibold !text-[13px] lg:!text-[14px] !px-3.5 lg:!px-6 !py-2 lg:!py-3">Book Now</Link>
            <button className="lg:hidden w-11 h-11 rounded-full border border-white/25 bg-black/40 flex items-center justify-center" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={20} /></button>
          </div>
        </div>
      </header>

      <div aria-hidden={!open} className={`fixed inset-0 z-[200] bg-bg transition-transform duration-500 ${open ? "translate-x-0 visible" : "translate-x-full invisible"} flex flex-col p-6 overflow-y-auto`}>
        <div className="flex items-center justify-between mb-8">
          <Logo height={38} />
          <button className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center" aria-label="Close menu" onClick={closeMobile}><X size={20} /></button>
        </div>
        <nav className="flex flex-col" aria-label="Mobile">
          {NAV_LINKS.map((l) => {
            const menu = SUB_MENUS[l.href];
            if (!menu) return <Link key={l.href} href={l.href} onClick={closeMobile} className="h-serif text-2xl py-3.5 border-b border-line">{l.label}</Link>;
            const on = expanded === l.href;
            return (
              <div key={l.href} className="border-b border-line">
                <button type="button" aria-expanded={on} onClick={() => setExpanded(on ? null : l.href)} className={`w-full flex items-center justify-between h-serif text-2xl py-3.5 text-left transition-colors ${on ? "text-gold" : "text-white"}`}>
                  {l.label}
                  <ChevronDown size={20} className={`transition-transform duration-300 ${on ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className={`overflow-hidden ${on ? "" : "invisible"}`}>
                    <div className="pb-4">
                      {menu.groups.map((g) => (
                        <div key={g.title || "links"} className="mb-2">
                          {g.title && <p className="label-caps !text-muted pt-2 pb-1">{g.title}</p>}
                          {g.links.map((s) => <Link key={s.href} href={s.href} onClick={closeMobile} className="block text-[16px] text-white/90 py-2 hover:text-gold">{s.label}</Link>)}
                        </div>
                      ))}
                      <Link href={menu.all.href} onClick={closeMobile} className="block pt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-gold">{menu.all.label}</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Link href="/lookup" onClick={closeMobile} className="h-serif text-2xl py-3.5 border-b border-line">Manage Booking</Link>
        </nav>
        <Link href="/book" className="btn btn-gold w-full mt-7" onClick={closeMobile}>Book Your Chauffeur</Link>
      </div>
    </>
  );
}
