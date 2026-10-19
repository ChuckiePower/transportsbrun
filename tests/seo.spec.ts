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
