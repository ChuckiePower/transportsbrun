import { mkdirSync } from "node:fs";
import { test } from "@playwright/test";
import { pages } from "./helpers";

/** Captures pleine page à 375, 768 et 1440 px dans docs/screenshots/ */
const widths = [375, 768, 1440];
mkdirSync("docs/screenshots", { recursive: true });

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
      await page.waitForTimeout(300);
      await page.screenshot({ path: `docs/screenshots/${p.name}-${width}.png`, fullPage: true });
    });
  }
}
