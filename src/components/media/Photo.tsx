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
 * Photo de la photothèque : dimensions, flou de chargement et texte alternatif
 * viennent de src/content/gallery.ts.
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
      src={p.image}
      alt={decorative ? "" : p.alt}
      sizes={sizes}
      quality={quality}
      style={{ ...blurBackground(p.image), ...style }}
      {...rest}
    />
  );
}
