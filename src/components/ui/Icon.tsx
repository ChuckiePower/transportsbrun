import { cn } from "@/lib/cn";
import { ICON_SPRITE, type IconName, type VehicleName } from "./icon-sprite";

export type { IconName, VehicleName };

/**
 * Icône d'interface (Lucide + icônes maison) servie depuis le sprite public/icons.svg :
 * une balise <use> par icône au lieu du tracé complet répété dans chaque page.
 * Décorative par défaut (aria-hidden) ; passer `title` pour une icône porteuse de sens.
 */
export function Icon({
  name,
  title,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  title?: string;
  className?: string;
  strokeWidth?: number;
}) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className={cn("shrink-0", className)}
      {...a11y}
    >
      <use href={`${ICON_SPRITE}#${name}`} />
    </svg>
  );
}

/**
 * Silhouette de véhicule de la flotte (vue de profil, grille 48, trait 1,75, bouts arrondis).
 * Remplace les pictogrammes génériques partout où l'on parle de véhicules.
 */
export function VehicleIcon({
  name,
  title,
  className,
  strokeWidth = 1.75,
}: {
  name: VehicleName;
  title?: string;
  className?: string;
  strokeWidth?: number;
}) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className={cn("shrink-0", className)}
      {...a11y}
    >
      <use href={`${ICON_SPRITE}#v-${name}`} />
    </svg>
  );
}
