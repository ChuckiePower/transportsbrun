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
  const items = photos(ids).map((p) => ({ id: p.id, image: p.image, alt: p.alt }));
  return <Gallery items={items} label={label} layout={layout} initial={initial} />;
}
