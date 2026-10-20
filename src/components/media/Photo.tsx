import Image, { type ImageProps } from "next/image";
import { photo, type PhotoId } from "@/content/gallery";
import { blurBackground } from "@/lib/placeholder";

type Props = Omit<
  ImageProps,
  "src" | "alt" | "width" | "height" | "placeholder" | "blurDataURL"
> & {
  id: PhotoId;
  /** alt="" quand l'image est purement décorative (le texte est déjà présent à côté) */
  decorative?: boolean;
};

/**
 * Photo de la photothèque : dimensions et texte alternatif viennent de src/content/gallery.ts.
 * L'aperçu flou (data-URI, ~2,5 Ko répété dans le HTML et la charge RSC) est réservé aux photos
 * préchargées du haut de page ; ailleurs, le fond crème du cadre sert d'attente (images en lazy).
 */
export function Photo({
  id,
  decorative = false,
  sizes = "100vw",
  quality = 75,
  style,
  ...rest
}: Props) {
  const p = photo(id);
  return (
    <Image
      // Sans blurDataURL : next/image est un composant client, ses props sont sérialisées
      src={{ src: p.image.src, width: p.image.width, height: p.image.height }}
      alt={decorative ? "" : p.alt}
      sizes={sizes}
      quality={quality}
      style={{ ...(rest.preload ? blurBackground(p.image) : undefined), ...style }}
      {...rest}
    />
  );
}
