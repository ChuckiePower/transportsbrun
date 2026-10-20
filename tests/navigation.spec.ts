import { expect, test } from "@playwright/test";
import { pages } from "./helpers";

test("lien d'évitement vers le contenu", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Aller au contenu" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("#contenu")).toBeFocused();
});

test("menu mobile : ouverture, aria-expanded, Échap, retour du focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  // Quand le menu est ouvert, Radix masque le reste de la page (aria-hidden) :
  // on cible donc le déclencheur par sa structure plutôt que par son rôle.
  const trigger = page.locator("header button[aria-haspopup='dialog']");
  await expect(trigger).toHaveAccessibleName("Menu");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Notre équipement" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await dialog.getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(dialog).toBeHidden();
});

test("barre d'appel mobile : liens tel: et devis", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/notre-histoire");
  // Barre masquée tant que les boutons du hero sont à l'écran : on vérifie les liens directement
  const bar = page.locator("nav.mobile-bar");
  await expect(bar.locator('a[href^="tel:"]')).toHaveAttribute("href", "tel:+33389733463");
  await expect(bar.locator("a")).toHaveCount(2);
  await expect(bar.locator("a").last()).toHaveAttribute("href", "/contact#devis");
});

test("visionneuse : clavier, compteur, légende et retour du focus", async ({ page }) => {
  await page.goto("/transport-plateaux-camion-grue-haut-rhin-alsace");
  const gallery = page.getByRole("list", { name: /Galerie : transport plateau/ });
  const first = gallery.getByRole("button").first();
  await first.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toContainText("Photo 1 /");
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading")).toContainText("Photo 2 /");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByRole("heading")).toContainText(/Photo (\d+) \/ \1/);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(gallery.getByRole("button").last()).toBeFocused();
});

test("carte : rien n'est chargé avant le clic", async ({ page }) => {
  const thirdParty: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1")) thirdParty.push(r.url());
  });
  await page.goto("/contact");
  await page.waitForLoadState("networkidle");
  expect(thirdParty).toEqual([]);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Afficher la carte" }).click();
  await expect(page.locator("iframe[src*='openstreetmap.org']")).toHaveCount(1);
});

test("redirections 301 (slash final, index.php)", async ({ request }) => {
  for (const [from, to] of [
    ["/notre-histoire/", "/notre-histoire"],
    ["/index.php/contact", "/contact"],
    ["/index.php", "/"],
  ]) {
    const res = await request.get(from!, { maxRedirects: 0 });
    expect(res.status(), from).toBe(301);
    expect(new URL(res.headers()["location"]!, "http://x").pathname).toBe(to);
  }
});

test("sans JavaScript : tout le contenu est visible (aucun état « avant révélation »)", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ["/", "/transport-plateaux-camion-grue-haut-rhin-alsace"]) {
    await page.goto(path);
    const hidden = await page.evaluate(
      () =>
        [
          ...document.querySelectorAll<HTMLElement>(
            "[data-reveal], [data-reveal-photo], .hero-in, .hero-word",
          ),
        ].filter((el) => getComputedStyle(el).opacity !== "1").length,
    );
    expect(hidden, path).toBe(0);
    // Galerie : toutes les vignettes sont affichées, sans bouton « Voir les … photos »
    if (path !== "/") {
      const gallery = page.getByRole("list", { name: /Galerie/ });
      await expect(gallery.getByRole("listitem").last()).toBeVisible();
      await expect(page.getByRole("button", { name: /Voir les \d+ photos/ })).toBeHidden();
    }
  }
  await context.close();
});

test("mouvement réduit : contenus immédiatement visibles, sans déplacement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const moving = await page.evaluate(
    () =>
      [
        ...document.querySelectorAll<HTMLElement>(
          "[data-reveal], [data-reveal-photo], .hero-in, .hero-word",
        ),
      ].filter((el) => {
        const s = getComputedStyle(el);
        return (
          s.opacity !== "1" ||
          (s.transform !== "none" && s.transform !== "matrix(1, 0, 0, 1, 0, 0)")
        );
      }).length,
  );
  expect(moving).toBe(0);
  const marquee = await page
    .locator(".marquee-track")
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(marquee).toBe("none");

  // Compteur, itinéraire, carte et route : état final direct, rien de masqué ni d'animé
  const finals = await page.evaluate(() => {
    const reels = [...document.querySelectorAll<HTMLElement>("[data-odometer] .odo-reel")];
    const clipped = [
      ...document.querySelectorAll<HTMLElement>(
        "[data-itinerary] .route-seg, [data-itinerary] .route-stop, .map-routes, .home-road-drawn",
      ),
    ].filter((el) => {
      const s = getComputedStyle(el);
      return s.clipPath !== "none" || s.opacity !== "1" || s.animationName !== "none";
    }).length;
    return {
      reelsAtValue: reels.every((r) => {
        const d = Number(r.style.getPropertyValue("--d"));
        const m = new DOMMatrix(getComputedStyle(r).transform);
        return d === 0 || m.m42 < 0;
      }),
      reels: reels.length,
      clipped,
    };
  });
  expect(finals.reels).toBeGreaterThan(0);
  expect(finals.reelsAtValue).toBe(true);
  expect(finals.clipped).toBe(0);
});

test("animations : compteur, itinéraire et carte partent de leur état initial puis arrivent à l'état final", async ({
  page,
}) => {
  await page.goto("/");
  const odo = page.locator("[data-odometer]").first();
  // Avant l'entrée dans l'écran : rouleaux à zéro
  expect(
    await odo.evaluate((el) =>
      [...el.querySelectorAll<HTMLElement>(".odo-reel")].every(
        (r) => new DOMMatrix(getComputedStyle(r).transform).m42 === 0,
      ),
    ),
  ).toBe(true);
  await odo.scrollIntoViewIfNeeded();
  await expect(odo).toHaveClass(/is-in/);
  await page.waitForTimeout(2200);
  expect(
    await odo.evaluate((el) =>
      [...el.querySelectorAll<HTMLElement>(".odo-reel")].every(
        (r) => new DOMMatrix(getComputedStyle(r).transform).m42 < 0,
      ),
    ),
  ).toBe(true);

  const route = page.locator("[data-itinerary]").first();
  await route.scrollIntoViewIfNeeded();
  await expect(route).toHaveClass(/is-in/);
  await page.waitForTimeout(1800);
  expect(
    await route.evaluate(
      (el) =>
        [...el.querySelectorAll<HTMLElement>(".route-stop")].filter(
          (s) => getComputedStyle(s).opacity === "1",
        ).length,
    ),
  ).toBe(3);
});

test("galerie repliée : « Voir les … photos » révèle la suite et y place le focus", async ({
  page,
}) => {
  await page.goto("/transports-de-marchandises-et-btp-haut-rhin-alsace");
  const gallery = page.getByRole("list", { name: /Galerie : transport de marchandises/ });
  await expect(gallery.getByRole("button", { name: /photo 12 sur/ })).toBeVisible();
  await expect(gallery.getByRole("button", { name: /photo 13 sur/ })).toBeHidden();
  await page.getByRole("button", { name: /Voir les \d+ photos/ }).click();
  await expect(gallery.getByRole("button", { name: /photo 13 sur/ })).toBeFocused();
});

test("pastille devis flottante (ordinateur) : après 600 px, jamais sur Contact", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const pill = page.getByRole("complementary", { name: "Devis rapide" });
  await expect(pill).toBeHidden();
  await page.mouse.wheel(0, 1400);
  await expect(pill).toBeVisible();
  await expect(pill.getByRole("link", { name: "Demander un devis" })).toHaveAttribute(
    "href",
    "/contact#devis",
  );

  await page.goto("/contact");
  await page.mouse.wheel(0, 1400);
  await page.waitForTimeout(400);
  await expect(page.getByRole("complementary", { name: "Devis rapide" })).toBeHidden();
});

test("barre d'appel mobile : absente au premier écran, 2 actions après les boutons du hero", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const bar = page.getByRole("navigation", { name: "Actions rapides" });
  // Les boutons du hero sont visibles : pas de doublon
  await expect(page.locator("[data-hero-cta]")).toBeInViewport();
  await expect(bar).toBeHidden();
  await page
    .locator("[data-hero-cta]")
    .evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().bottom + window.scrollY + 40));
  await expect(bar).toBeVisible();
  await expect(bar.getByRole("link")).toHaveCount(2);
  await expect(bar.getByRole("link", { name: /Appeler/ })).toBeVisible();
  await expect(bar.getByRole("link", { name: /Devis/ })).toBeVisible();
});

test("barre d'appel mobile masquée pendant la saisie", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/contact");
  const bar = page.getByRole("navigation", { name: "Actions rapides" });
  await page.getByLabel("Lieu de chargement").scrollIntoViewIfNeeded();
  await expect(bar).toBeVisible();
  await page.getByLabel("Lieu de chargement").focus();
  await expect(bar).toBeHidden();
  await page.getByLabel("Lieu de chargement").blur();
  await expect(bar).toBeVisible();
});

test("navigation : la pastille de page active suit le lien courant", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/notre-equipement");
  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  const link = nav.getByRole("link", { name: "Notre équipement" });
  await expect(link).toHaveAttribute("aria-current", "page");
  const pill = nav.locator("span[aria-hidden='true']").first();
  await expect
    .poll(async () => {
      const [a, p] = await Promise.all([link.boundingBox(), pill.boundingBox()]);
      return a && p ? Math.round(Math.abs(a.x - p.x)) : 999;
    })
    .toBeLessThan(2);
});

test("page Contact : 3 téléphones et 4 e-mails cliquables dans le panneau, lien Itinéraire", async ({
  page,
}) => {
  await page.goto("/contact");
  const panel = page.getByRole("complementary", { name: "Coordonnées" });
  const tels = await panel
    .locator("a[href^='tel:']")
    .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(tels).toEqual(["tel:+33389733463", "tel:+33788488725", "tel:+33617294086"]);
  const mails = await panel
    .locator("a[href^='mailto:']")
    .evaluateAll((as) =>
      as.map((a) => [a.getAttribute("href"), a.textContent?.replace(/\s/g, "")]),
    );
  expect(mails).toEqual([
    ["mailto:contact@transports-brun.com", "contact@transports-brun.com"],
    ["mailto:comptabilite@transports-brun.com", "comptabilite@transports-brun.com"],
    ["mailto:exploitation@transports-brun.com", "exploitation@transports-brun.com"],
    ["mailto:commercialtransportsbrun@gmail.com", "commercialtransportsbrun@gmail.com"],
  ]);
  await expect(panel.getByRole("link", { name: /Itinéraire/ })).toHaveAttribute(
    "href",
    /google\.com\/maps/,
  );
});

test("aucun défilement horizontal (375, 768, 1024 et 1440 px)", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages.map((p) => p.path)) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${path} @${width}`).toBeLessThanOrEqual(0);
    }
  }
});
