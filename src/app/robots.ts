import type { MetadataRoute } from "next";
import { BRAND } from "@/data/brand";
// SEO-01: allow standard + AI search crawlers; list the sitemap. Booking steps excluded by route.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/book"] }],
    sitemap: `${BRAND.domain}/sitemap.xml`,
  };
}
