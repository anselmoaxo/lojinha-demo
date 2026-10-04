export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteIndexable, siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin/"] }, sitemap: siteUrl("/sitemap.xml") };
}
