import localFont from "next/font/local";

/** Titres, navigation, boutons : Plus Jakarta Sans variable (OFL), auto-hébergée */
export const fontDisplay = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});

/** Texte courant : Inter variable (OFL), auto-hébergée */
export const fontSans = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});
