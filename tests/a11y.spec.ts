import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./helpers";

for (const p of pages) {
  for (const width of [375, 1440]) {
    test(`axe : ${p.name} (${width} px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(p.path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      const summary = results.violations.map(
        (v) => `${v.impact} ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target}`,
      );
      if (summary.length) console.log(`${p.path} @${width}\n  ${summary.join("\n  ")}`);
      expect(serious, summary.join("\n")).toEqual([]);
    });
  }
}
