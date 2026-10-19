import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Pages indexables (les pages légales sont en noindex et donc exclues) */
const pages = [
  { path: "/", priority: 1 },
  { path: "/transport-plateaux-camion-grue-haut-rhin-alsace", priority: 0.9 },
  { path: "/transports-de-marchandises-et-btp-haut-rhin-alsace", priority: 0.9 },
  { path: "/transport-routier-haut-rhin-alsace", priority: 0.8 },
  { path: "/notre-equipement", priority: 0.8 },
  { path: "/notre-histoire", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
