/**
 * Audit Lighthouse (profil mobile par défaut) de chaque page indexable.
 * Usage : node scripts/lighthouse.mjs [http://127.0.0.1:3000]
 * Écrit docs/lighthouse/scores.md (+ rapports HTML ignorés par git).
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

const BASE = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const pages = [
  "/",
  "/notre-histoire",
  "/transport-routier-haut-rhin-alsace",
  "/transport-plateaux-camion-grue-haut-rhin-alsace",
  "/transports-de-marchandises-et-btp-haut-rhin-alsace",
  "/notre-equipement",
  "/contact",
];
const chromePath =
  process.env.CHROME_PATH ??
  (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);

mkdirSync("docs/lighthouse", { recursive: true });
const chrome = await chromeLauncher.launch({
  chromePath,
  chromeFlags: [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    // LH_INSECURE=1 : certificat auto-signé (proxy Caddy local de test)
    ...(process.env.LH_INSECURE ? ["--ignore-certificate-errors"] : []),
  ],
});
const rows = [];
try {
  for (const p of pages) {
    const result = await lighthouse(BASE + p, {
      port: chrome.port,
      output: "html",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    const { categories, audits } = result.lhr;
    const score = (k) => Math.round((categories[k]?.score ?? 0) * 100);
    rows.push({
      page: p,
      perf: score("performance"),
      a11y: score("accessibility"),
      bp: score("best-practices"),
      seo: score("seo"),
      lcp: audits["largest-contentful-paint"].displayValue,
      cls: audits["cumulative-layout-shift"].displayValue,
      tbt: audits["total-blocking-time"].displayValue,
    });
    const name = p === "/" ? "accueil" : p.slice(1);
    writeFileSync(`docs/lighthouse/${name}.html`, result.report);
    console.log(rows.at(-1));
  }
} finally {
  await chrome.kill();
}

const md = [
  "# Scores Lighthouse (mobile, throttling simulé)",
  "",
  `Mesurés le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} sur ${BASE} (build de production local).`,
  "",
  "| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |",
  "|---|---|---|---|---|---|---|---|",
  ...rows.map(
    (r) =>
      `| \`${r.page}\` | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt} |`,
  ),
  "",
].join("\n");
writeFileSync("docs/lighthouse/scores.md", md);
console.log(md);
