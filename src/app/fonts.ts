import localFont from "next/font/local";

/**
 * Titres, navigation, boutons : Plus Jakarta Sans variable (OFL), auto-hébergée.
 * Comme Inter et Overpass : sous-ensemble latin français, axe de graisse réduit aux graisses
 * utilisées, fonctions OpenType utiles seulement (Inter 48 → 26 Ko, Jakarta 27 → 18 Ko).
 * Préchargée et en « optional » : utilisée dès qu'elle est là au premier rendu (cas courant),
 * sinon la police de repli reste affichée pour cette page, sans échange. Avec « swap »,
 * l'échange tardif refaisait la césure du grand titre du hero (un mot passait à la ligne).
 */
export const fontDisplay = localFont({
  src: "../fonts/plus-jakarta-sans-latin-fr-500-800.woff2",
  weight: "500 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "optional",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});

/** Texte courant : Inter variable (OFL), auto-hébergée */
export const fontSans = localFont({
  src: "../fonts/inter-latin-fr-400-700.woff2",
  weight: "400 700",
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
