/**
 * Génère les icônes du site à partir du motif à trois bandes du logo.
 * Usage : node scripts/generate-icons.mjs  (à relancer si le motif change)
 * Sorties : src/app/icon.svg, src/app/apple-icon.png, public/icons/*.png
 * (favicon.ico : convert public/icons/icon-32.png public/icons/icon-16.png src/app/favicon.ico)
 */
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const stripes = (x0, y0, h, w, gap, slant) =>
  ["#00007e", "#323232", "#bcbcbc"]
    .map((c, i) => {
      const x = x0 + i * (w + gap);
      return `<polygon points="${x + slant},${y0} ${x + slant + w},${y0} ${x + w},${y0 + h} ${x},${y0 + h}" fill="${c}"/>`;
    })
    .join("");

const icon = (
  bg = "#ffffff",
  radius = 12,
  pad = 0,
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="${radius}" fill="${bg}"/>
${stripes(8 + pad, 10 + pad, 44 - pad * 2, 10 - pad / 3, 4 - pad / 6, 10 - pad / 3)}
</svg>`;

await writeFile("src/app/icon.svg", icon());
const png = (svg, size, out) => sharp(Buffer.from(svg)).resize(size, size).png().toFile(out);
await png(icon("#ffffff", 0), 180, "src/app/apple-icon.png");
await png(icon(), 192, "public/icons/icon-192.png");
await png(icon(), 512, "public/icons/icon-512.png");
await png(icon("#ffffff", 0, 9), 512, "public/icons/icon-maskable-512.png");
await png(icon(), 32, "public/icons/icon-32.png");
await png(icon(), 16, "public/icons/icon-16.png");
console.log("Icônes générées");
