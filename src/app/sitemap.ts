export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { siteIndexable, siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];
  return [
    { url: siteUrl(), changeFrequency: "weekly", priority: 1 },
    { url: siteUrl("/produtos/"), changeFrequency: "weekly", priority: 0.9 },
    { url: siteUrl("/politica-de-privacidade/"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
