import { expect, test } from "@playwright/test";

/**
 * Préproduction : tout hôte autre que celui de SITE_URL (ici 127.0.0.1) est non indexable.
 * Production : simulée par l'en-tête X-Forwarded-Host posé par le reverse proxy.
 */
const PROD = { "x-forwarded-host": "transports-brun.com" };

test.describe("Indexation selon l'hôte", () => {
  test("préproduction : X-Robots-Tag noindex sur les pages et robots.txt en Disallow", async ({
    request,
  }) => {
    for (const path of ["/", "/contact", "/notre-equipement"]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()["x-robots-tag"], path).toBe("noindex, nofollow");
    }
    const robots = await request.get("/robots.txt");
    expect(robots.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    const body = await robots.text();
    expect(body).toContain("Disallow: /");
    expect(body).not.toMatch(/Allow:\s*\/\s*$/m);
    expect(body).not.toContain("Sitemap");
  });

  test("production : aucun X-Robots-Tag, robots.txt normal, canonical sur le domaine final", async ({
    request,
  }) => {
    const res = await request.get("/notre-histoire", { headers: PROD });
    expect(res.status()).toBe(200);
    expect(res.headers()["x-robots-tag"]).toBeUndefined();
    const html = await res.text();
    expect(html).toContain(
      '<link rel="canonical" href="https://transports-brun.com/notre-histoire"',
    );

    const robots = await request.get("/robots.txt", { headers: PROD });
    expect(robots.headers()["x-robots-tag"]).toBeUndefined();
    const body = await robots.text();
    expect(body).toMatch(/Allow: \//);
    expect(body).toContain("Disallow: /api/");
    expect(body).toContain("Sitemap: https://transports-brun.com/sitemap.xml");
  });
});

const indexable = [
  { path: "/", breadcrumb: false, service: false, faq: true },
  { path: "/notre-histoire", breadcrumb: true, service: false, faq: false },
  { path: "/transport-routier-haut-rhin-alsace", breadcrumb: true, service: false, faq: false },
  {
    path: "/transport-plateaux-camion-grue-haut-rhin-alsace",
    breadcrumb: true,
    service: true,
    faq: true,
  },
  {
    path: "/transports-de-marchandises-et-btp-haut-rhin-alsace",
    breadcrumb: true,
    service: true,
    faq: true,
  },
  { path: "/notre-equipement", breadcrumb: true, service: false, faq: false },
  { path: "/contact", breadcrumb: true, service: false, faq: false },
];

function ldTypes(o: unknown): string[] {
  if (Array.isArray(o)) return o.flatMap(ldTypes);
  if (o && typeof o === "object") {
    const t = (o as Record<string, unknown>)["@type"];
    return [...(typeof t === "string" ? [t] : []), ...Object.values(o).flatMap(ldTypes)];
  }
  return [];
}

test("balisage : un seul H1, title et description uniques, image OG, JSON-LD sans avis", async ({
  request,
}) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const p of indexable) {
    const html = await (await request.get(p.path)).text();
    expect(html.match(/<h1[\s>]/g)?.length, p.path).toBe(1);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    expect(title && !titles.has(title), `${p.path} title`).toBeTruthy();
    expect(description && !descriptions.has(description), `${p.path} description`).toBeTruthy();
    titles.add(title);
    descriptions.add(description);
    expect(html, p.path).toContain('property="og:image"');

    const types = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .map((m) => JSON.parse(m[1]!))
      .flatMap(ldTypes);
    expect(types, p.path).toContain("LocalBusiness");
    expect(types.includes("BreadcrumbList"), `${p.path} BreadcrumbList`).toBe(p.breadcrumb);
    expect(types.includes("Service"), `${p.path} Service`).toBe(p.service);
    expect(types.includes("FAQPage"), `${p.path} FAQPage`).toBe(p.faq);
    // Avis repris de Google : jamais balisés sur le site
    expect(types, p.path).not.toContain("Review");
    expect(html, p.path).not.toContain("aggregateRating");
  }
});

test("sitemap : pages indexables seulement, sans les pages légales", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(locs).toHaveLength(indexable.length);
  expect(xml).not.toContain("mentions-legales");
  expect(xml).not.toContain("politiques-de-confidentialites");
});
