import { expect, test } from "@playwright/test";

/**
 * Parcours mobile sur un téléphone d'entrée de gamme simulé : processeur ralenti ×4 (CDP).
 * L'interface doit rester utilisable : barre d'appel après le hero, menu, devis en 2 étapes.
 */
test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

test("mobile, CPU ×4 : accueil → barre d'appel → devis en 2 étapes", async ({ page }) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Barre d'appel : absente au premier écran, présente une fois les boutons du hero dépassés
  const bar = page.locator("nav.mobile-bar");
  await expect(bar).toBeHidden();
  await page.mouse.wheel(0, 1400);
  await expect(bar.getByRole("link", { name: /Devis/ })).toBeVisible({ timeout: 10_000 });

  await bar.getByRole("link", { name: /Devis/ }).click();
  await expect(page).toHaveURL(/\/contact/);
  const form = page.locator("#devis");
  await form.getByLabel("Type de demande").selectOption("Transport plateau");
  await form.getByLabel("Lieu de chargement").fill("Colmar");
  await form.getByLabel("Lieu de livraison").fill("Mulhouse");
  await expect(
    form.locator("[aria-hidden='true']").filter({ hasText: "Livraison" }).first(),
  ).toContainText("Mulhouse");
  await page.getByRole("button", { name: /Suivant/ }).click();
  await expect(page.getByRole("heading", { name: "Vos coordonnées" })).toBeFocused();
  await expect(form.getByRole("region", { name: "Bon de transport" })).toContainText("Colmar");
  expect(errors).toEqual([]);
});
