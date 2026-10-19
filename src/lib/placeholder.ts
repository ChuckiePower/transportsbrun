import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";

/**
 * Aperçu flou pendant le chargement : la miniature (≈ 8 px) générée à la compilation
 * est simplement agrandie en arrière-plan de l'image. Même rendu qu'un flou, sans le
 * filtre SVG de next/image (coûteux en CPU quand une page compte 40 photos).
 * À réserver aux images en object-cover (l'arrière-plan est entièrement recouvert).
 */
export function blurBackground(image: StaticImageData): CSSProperties | undefined {
  if (!image.blurDataURL) return undefined;
  return {
    backgroundImage: `url("${image.blurDataURL}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
