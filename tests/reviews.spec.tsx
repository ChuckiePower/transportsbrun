import { expect, test } from "@playwright/test";
import { renderToStaticMarkup } from "react-dom/server";
import { RatingBadge, ReviewAside, ReviewsSection } from "../src/components/reviews/Reviews";
import { reviewsData as published } from "../src/content/reviews";
import { reviewsData as fixture } from "./fixtures/reviews";

/**
 * Avis Google : rien n'est affiché tant que src/content/reviews.ts est vide ;
 * avec les données de démonstration (tests uniquement), la section s'affiche complète.
 */
test.describe("Avis clients", () => {
  test("données publiées vides : aucune section, aucune note", () => {
    expect(published.reviews).toEqual([]);
    expect(renderToStaticMarkup(<ReviewsSection data={published} />)).toBe("");
    expect(renderToStaticMarkup(<RatingBadge data={published} />)).toBe("");
    expect(renderToStaticMarkup(<ReviewAside data={published} topic="grue" />)).toBe("");
  });

  test("données de démonstration : note, avis datés, liens Google, mention de sélection", () => {
    const html = renderToStaticMarkup(<ReviewsSection data={fixture} />);
    expect(html).toContain("Ce que disent nos clients");
    expect(html).toContain("4,8");
    expect(html).toContain("23 avis");
    expect(html).toContain("Avis de démonstration n° 1");
    expect(html).toContain('dateTime="2026-09-12"');
    expect(html).toContain("septembre 2026");
    expect(html).toContain("Voir tous les avis sur Google");
    expect(html).toContain("Laisser un avis");
    expect(html).toContain("Sélection d&#x27;avis publiés sur notre fiche Google");
    // Pas de photo de profil, pas de balisage d'avis
    expect(html).not.toContain("<img");
    expect(html).not.toContain("schema.org");
    expect(html).not.toContain("aggregateRating");
  });

  test("encart de page de service : seulement un avis du même sujet", () => {
    expect(renderToStaticMarkup(<ReviewAside data={fixture} topic="grue" />)).toContain(
      "Avis de démonstration n° 1",
    );
    expect(renderToStaticMarkup(<ReviewAside data={fixture} topic="adr" />)).toBe("");
  });
});

test("accueil publié : la section d'avis est absente", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-reviews]")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Ce que disent nos clients" })).toHaveCount(0);
});
