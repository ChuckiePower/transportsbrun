import { expect, test } from "@playwright/test";

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
  const bar = page.getByRole("navigation", { name: "Actions rapides" });
  await expect(bar.getByRole("link", { name: /Appeler/ })).toHaveAttribute(
    "href",
    "tel:+33389733463",
  );
  await expect(bar.getByRole("link", { name: /Devis/ })).toHaveAttribute("href", "/contact#devis");
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
