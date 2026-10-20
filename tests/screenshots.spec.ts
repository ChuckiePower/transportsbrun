import { mkdirSync } from "node:fs";
import { test } from "@playwright/test";
import { pages } from "./helpers";

/**
 * Captures pleine page à 375, 768 et 1440 px dans docs/screenshots/final/
 * (ou SCREENSHOTS_DIR ; les captures « avant » de l'audit sont dans docs/screenshots/avant/).
 * Mouvement réduit : les contenus sont dans leur état final, sans attendre les animations.
 * Les éléments flottants (barre d'appel mobile, pastille devis) sont masqués pour ne pas
 * se superposer au contenu dans une capture pleine page.
 */
const widths = [375, 768, 1440];
const dir = process.env.SCREENSHOTS_DIR ?? "docs/screenshots/final";
mkdirSync(dir, { recursive: true });

for (const p of pages) {
  for (const width of widths) {
    test(`capture ${p.name} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 500 ? 812 : width < 1000 ? 1024 : 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(p.path, { waitUntil: "load" });
      // fait défiler la page pour déclencher le chargement différé des images
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 100));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await page
        .waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, {
          timeout: 30_000,
        })
        .catch(() => {});
      await page.addStyleTag({ content: ".mobile-bar, .float-cta { display: none !important; }" });
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${dir}/${p.name}-${width}.jpg`,
        fullPage: true,
        type: "jpeg",
        quality: 62,
      });
    });
  }
}
