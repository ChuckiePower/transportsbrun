import { photos, type PhotoId } from "@/content/gallery";
import { Gallery } from "./Gallery";

/** Galerie à partir d'identifiants de la photothèque (composant serveur) */
export function PhotoGallery({
  ids,
  label,
  layout,
  initial,
}: {
  ids: readonly PhotoId[];
  label: string;
  layout?: "masonry" | "grid";
  initial?: number;
}) {
  // Sans l'aperçu flou : il serait sérialisé pour chaque vignette (≈ 2,5 Ko × 2 par photo)
  const items = photos(ids).map((p) => ({
    id: p.id,
    image: { src: p.image.src, width: p.image.width, height: p.image.height },
    alt: p.alt,
  }));
  return <Gallery items={items} label={label} layout={layout} initial={initial} />;
}
