/**
 * Avis Google de la fiche Transports Brun, SAISIS À LA MAIN (aucun widget, aucune API Google,
 * aucun script externe). Tant que `reviews` est vide et `rating` nul, rien ne s'affiche.
 *
 * Règles d'honnêteté :
 * - texte reproduit tel quel, sans correction ; toute coupe signalée par « […] » ;
 * - chaque avis est daté (date de publication sur Google, AAAA-MM-JJ) ;
 * - auteur : prénom + initiale du nom (« Julien M. ») ;
 * - aucune donnée de démonstration ici : celles des tests sont dans tests/fixtures/reviews.ts.
 */
export type ReviewTopic = "plateau" | "grue" | "marchandises" | "convoi" | "adr" | "equipement";

export type GoogleReview = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Date de publication sur Google, AAAA-MM-JJ */
  date: string;
  /** Texte exact de l'avis ; coupe éventuelle signalée par « […] » */
  text: string;
  /** Lien direct vers l'avis (facultatif) */
  url?: string;
  /** Sujets abordés, pour afficher l'avis en bas de la page de service correspondante */
  topics?: ReviewTopic[];
};

export type ReviewsData = {
  /** Note globale affichée sur Google (ex. 4,9) */
  rating: number | null;
  /** Nombre d'avis sur Google */
  count: number | null;
  /** Date de mise à jour de ces chiffres, AAAA-MM-JJ */
  updatedAt: string | null;
  /** Lien vers la fiche Google (tous les avis) */
  profileUrl: string | null;
  /** Lien « Laisser un avis » */
  writeReviewUrl: string | null;
  /** Sélection de 3 à 6 avis */
  reviews: GoogleReview[];
};

// TODO(manu): renseigner la note, le nombre d'avis, les liens et 3 à 6 avis choisis sur la fiche Google
export const reviewsData: ReviewsData = {
  rating: null,
  count: null,
  updatedAt: null,
  profileUrl: null,
  writeReviewUrl: null,
  reviews: [],
};
