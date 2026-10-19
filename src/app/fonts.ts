import localFont from "next/font/local";

/** Titres : Barlow Condensed (grotesque condensée, OFL), auto-hébergée */
export const fontDisplay = localFont({
  // Une seule graisse (700) : une requête de police en moins au premier affichage
  src: [
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
  adjustFontFallback: "Arial",
});

/** Texte courant : Source Sans 3 variable (OFL), auto-hébergée */
export const fontSans = localFont({
  src: "../fonts/source-sans-3-latin-wght-normal.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-source-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});
