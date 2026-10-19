/**
 * Génère le sprite d'icônes du site : public/icons.svg (+ src/components/ui/icon-sprite.ts).
 * - Icônes d'interface : Lucide (trait arrondi, grille 24), rendues une fois ici ;
 * - icônes maison (grille 24) : camion-grue, plateau, hauteur restreinte, centrale, Facebook ;
 * - silhouettes de véhicules (grille 48, vue de profil, trait arrondi) : préfixe « v- ».
 * Le trait (couleur, épaisseur, bouts arrondis) est porté par le <svg> qui référence l'icône.
 * Usage : node scripts/build-icons.mjs (à relancer après tout ajout d'icône).
 */
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as L from "lucide-react";

const lucide = {
  arrowRight: L.ArrowRight,
  arrowUpRight: L.ArrowUpRight,
  arrowDown: L.ArrowDown,
  badge: L.BadgeCheck,
  bricks: L.BrickWall,
  calendar: L.Calendar,
  check: L.Check,
  chevronLeft: L.ChevronLeft,
  chevronRight: L.ChevronRight,
  alert: L.CircleAlert,
  clipboard: L.ClipboardList,
  clock: L.Clock,
  container: L.Container,
  external: L.ExternalLink,
  flame: L.Flame,
  globe: L.Globe,
  hardHat: L.HardHat,
  family: L.HeartHandshake,
  layers: L.Layers,
  leaf: L.Leaf,
  loader: L.LoaderCircle,
  locate: L.LocateFixed,
  mail: L.Mail,
  map: L.Map,
  pin: L.MapPin,
  expand: L.Maximize2,
  menu: L.Menu,
  mountain: L.Mountain,
  navigation: L.Navigation,
  package: L.Package,
  phone: L.Phone,
  phoneCall: L.PhoneCall,
  plus: L.Plus,
  quote: L.Quote,
  route: L.Route,
  ruler: L.Ruler,
  shield: L.ShieldCheck,
  star: L.Star,
  truck: L.Truck,
  users: L.Users,
  warehouse: L.Warehouse,
  close: L.X,
};

/** Icônes maison, grille 24 (mêmes règles que Lucide) */
const custom24 = {
  crane: `<path d="M2 17v-5h4.5l2 3H21v2"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M10 12.5 19 4"/><path d="M19 4v5"/><path d="M17.5 9.5h3"/>`,
  flatbed: `<path d="M2 15h14"/><path d="M16 15V9h3l3 3v3h-2"/><circle cx="6" cy="17.5" r="2"/><circle cx="18" cy="17.5" r="2"/><rect x="4" y="9" width="9" height="4" rx="1"/>`,
  // Hauteur restreinte : deux barres et une cote verticale
  height: `<path d="M4 4h16"/><path d="M4 20h16"/><path d="M12 7.5v9"/><path d="m9.5 10 2.5-2.5 2.5 2.5"/><path d="m9.5 14 2.5 2.5 2.5-2.5"/>`,
  // Centrale : deux tours de refroidissement et leur panache
  plant: `<path d="M3 21h18"/><path d="M5 21c1.4-3.6 1.4-7.4 0-11h6c-1.4 3.6-1.4 7.4 0 11"/><path d="M13 21c1-2.6 1-5.4 0-8h5c-1 2.6-1 5.4 0 8"/><path d="M7 7c0-1.6 2-1.6 2-3.2"/><path d="M15 10c0-1.4 1.6-1.4 1.6-2.8"/>`,
  facebook: `<path fill="currentColor" stroke="none" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>`,
};

/*
 * Silhouettes de véhicules, grille 48, vue de profil, cabine à droite (le camion roule vers la droite).
 * Roues de rayon 3 posées sur y = 39 ; tracteur commun aux semi-remorques.
 */
const cab = `<path d="M35 34V22.5a2 2 0 0 1 2-2h5a2 2 0 0 1 1.9 1.4l1.6 5.1V32a2 2 0 0 1-2 2h-1"/><path d="M37.5 23h4.4l1.3 4.2h-5.7z"/><circle cx="40.5" cy="36" r="3"/><circle cx="31.5" cy="36" r="3"/><path d="M34.5 34h2.5"/>`;
const trailerWheels = `<circle cx="8.5" cy="36" r="3"/><circle cx="16" cy="36" r="3"/><path d="M26 31.5v4.5"/>`;
const vehicles = {
  tracteur: `<path d="M27 33V20.5a2.5 2.5 0 0 1 2.5-2.5h7.4a2.5 2.5 0 0 1 2.3 1.5l2.6 6.2c.1.3.2.6.2 1V31a2 2 0 0 1-2 2h-1.5"/><path d="M30 21h6.3l2.1 5H30z"/><path d="M6 31h18.5"/><path d="M9 28.5h9"/><circle cx="12" cy="36" r="3"/><circle cx="20" cy="36" r="3"/><circle cx="37" cy="36" r="3"/><path d="M25 18v-4"/>`,
  plateau: `${cab}<path d="M2 28.5h32v3H2z"/>${trailerWheels}`,
  openbox: `${cab}<path d="M2 28.5h32v3H2z"/><path d="M3 28.5V21.5"/><path d="M33 28.5V21.5"/><path d="M3 21.5h3.5"/><path d="M29.5 21.5H33"/><path d="M11.5 28.5v-7"/><path d="M18 28.5v-7"/><path d="M24.5 28.5v-7"/>${trailerWheels}`,
  tautliner: `${cab}<path d="M2 31.5h32"/><path d="M2 31.5V15.5a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v16"/><path d="M8 13.5v18"/><path d="M14 13.5v18"/><path d="M20 13.5v18"/><path d="M26 13.5v18"/>${trailerWheels}`,
  trax: `${cab}<path d="M34 27h-5l-3 4.5H10"/><path d="M10 31.5 4.5 22"/><path d="M12.5 31.5 7 22"/><path d="M4.5 22h2.5"/><circle cx="14" cy="36" r="3"/><circle cx="21" cy="36" r="3"/>`,
  "porte-beton": `${cab}<path d="M2 30.5h32"/><path d="M6 30.5 12 15h12l6 15.5"/><path d="M15 17v13.5"/><path d="M18 17v13.5"/><path d="M21 17v13.5"/>${trailerWheels}`,
  "camion-grue": `<path d="M33 33V22.5a2 2 0 0 1 2-2h6a2 2 0 0 1 1.9 1.4l1.6 5.1V31a2 2 0 0 1-2 2h-1"/><path d="M35.5 23h4.9l1.3 4.2h-6.2z"/><path d="M4 29.5h26v3H4z"/><path d="M29.5 29.5V19"/><path d="M27.5 19h4"/><path d="M29.5 19 8 10.5"/><path d="M8 10.5v6"/><path d="M8 16.5a1.6 1.6 0 1 0 1.6 1.6"/><circle cx="10" cy="36" r="3"/><circle cx="17.5" cy="36" r="3"/><circle cx="38.5" cy="36" r="3"/>`,
};

function lucideInner(Component) {
  const svg = renderToStaticMarkup(createElement(Component));
  return svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
}

const symbols = [];
for (const [name, Component] of Object.entries(lucide)) {
  symbols.push(`<symbol id="${name}" viewBox="0 0 24 24">${lucideInner(Component)}</symbol>`);
}
for (const [name, inner] of Object.entries(custom24)) {
  symbols.push(`<symbol id="${name}" viewBox="0 0 24 24">${inner}</symbol>`);
}
for (const [name, inner] of Object.entries(vehicles)) {
  symbols.push(`<symbol id="v-${name}" viewBox="0 0 48 48">${inner}</symbol>`);
}
const sprite = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>\n`;
writeFileSync("public/icons.svg", sprite);

const hash = createHash("sha256").update(sprite).digest("hex").slice(0, 10);
const iconNames = [...Object.keys(lucide), ...Object.keys(custom24)];
const ts = `// Fichier généré par scripts/build-icons.mjs : ne pas modifier à la main.
export const ICON_SPRITE = "/icons.svg?v=${hash}";
export const iconNames = ${JSON.stringify(iconNames)} as const;
export type IconName = (typeof iconNames)[number];
export const vehicleNames = ${JSON.stringify(Object.keys(vehicles))} as const;
export type VehicleName = (typeof vehicleNames)[number];
`;
writeFileSync("src/components/ui/icon-sprite.ts", ts);
console.log(`icons.svg : ${symbols.length} symboles, ${sprite.length} octets (v=${hash})`);
