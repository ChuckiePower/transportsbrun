import localFont from "next/font/local";

/**
 * Titres, navigation, boutons : Plus Jakarta Sans variable (OFL), auto-hébergée.
 * Préchargée et en « optional » : utilisée dès qu'elle est là au premier rendu (cas courant),
 * sinon la police de repli reste affichée pour cette page, sans échange. Avec « swap »,
 * l'échange tardif refaisait la césure du grand titre du hero et décalait tout le bloc (CLS 0,19).
 */
export const fontDisplay = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "optional",
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

/**
 * Signalétique (eyebrows, chiffres, fiches techniques, plaques, numéros) : Overpass (OFL),
 * dessinée d'après la police des panneaux autoroutiers. Sous-ensemble latin français,
 * axe de graisse réduit à 600-800 (26 Ko). Non préchargée : textes courts, affichage en swap.
 */
export const fontSign = localFont({
  src: "../fonts/overpass-latin-600-800.woff2",
  weight: "600 800",
  style: "normal",
  variable: "--font-overpass",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});
