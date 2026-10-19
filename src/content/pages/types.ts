import type { PhotoId } from "@/content/gallery";

export type PageMeta = {
  /** Balise <title> (≤ 60 caractères, suffixe « | Transports Brun » compris) */
  title: string;
  /** true : le titre est utilisé tel quel, sans suffixe */
  absoluteTitle?: boolean;
  /** Meta description (≤ 155 caractères) */
  description: string;
  /** Photo utilisée pour l'image Open Graph générée */
  ogPhoto: PhotoId;
  /** Titre affiché sur l'image Open Graph */
  ogTitle: string;
};
