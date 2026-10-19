import type { Metadata } from "next";
import type { PageMeta } from "@/content/pages/types";
import { site } from "@/content/site";

/** Métadonnées d'une page : title, description, canonical, Open Graph, Twitter, robots */
export function pageMetadata(
  meta: Pick<PageMeta, "title" | "description" | "absoluteTitle" | "ogTitle">,
  path: string,
  options: { noindex?: boolean } = {},
): Metadata {
  const fullTitle = meta.absoluteTitle ? meta.title : `${meta.title} | ${site.name}`;
  return {
    title: meta.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: meta.description,
    },
    ...(options.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function absoluteUrl(path: string): string {
  return `${site.url}${path === "/" ? "" : path}`;
}
