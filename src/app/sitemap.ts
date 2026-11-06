import type { MetadataRoute } from "next";
import { BRAND } from "@/data/brand";
import { FLEET } from "@/data/fleet";
import { SERVICES, EXTRA_SERVICE_PAGES } from "@/data/services";
import { AIRPORTS } from "@/data/airports";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.domain;
  const routes = ["", "/fleet", "/services", "/about", "/faq", "/contact", "/lookup", "/privacy", "/terms"];
  const dyn = [
    ...FLEET.map((v) => `/fleet/${v.id}`),
    ...SERVICES.map((s) => `/services/${s.id}`),
    ...Object.keys(EXTRA_SERVICE_PAGES).map((id) => `/services/${id}`),
    ...AIRPORTS.map((a) => `/airports/${a.id}`),
  ];
  return [...routes, ...dyn].map((r) => ({ url: `${base}${r}`, lastModified: new Date() }));
}
