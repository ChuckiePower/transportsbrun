import type { ReviewsData } from "../../src/content/reviews";

/**
 * DONNÉES DE DÉMONSTRATION, pour les tests uniquement : jamais publiées.
 * Utilisées par tests/reviews.spec.tsx et par un build lancé avec REVIEWS_FIXTURE=1
 * (alias @reviews-data dans next.config.ts), pour vérifier l'affichage des avis.
 */
export const reviewsData: ReviewsData = {
  rating: 4.8,
  count: 23,
  updatedAt: "2026-10-01",
  profileUrl: "https://example.com/fiche-google-demo",
  writeReviewUrl: "https://example.com/laisser-un-avis-demo",
  reviews: [
    {
      author: "Avis D.",
      rating: 5,
      date: "2026-09-12",
      text: "Avis de démonstration n° 1 : texte fictif utilisé seulement pour tester l'affichage des avis.",
      topics: ["grue"],
    },
    {
      author: "Test E.",
      rating: 5,
      date: "2026-08-03",
      text: "Avis de démonstration n° 2 : un texte un peu plus long pour vérifier le retour à la ligne et la coupe signalée […]",
      topics: ["marchandises"],
    },
    {
      author: "Exemple F.",
      rating: 4,
      date: "2026-06-21",
      text: "Avis de démonstration n° 3.",
      topics: ["plateau", "convoi"],
    },
  ],
};
