/**
 * Foire aux questions : réponses tirées uniquement des textes du site actuel.
 * Utilisée en accordéon (accueil, pages de service) et en JSON-LD FAQPage.
 */
import { mainPhone, site } from "@/content/site";
import { fr } from "@/lib/typo";

export type Faq = { id: string; q: string; a: string };

export const faqs: Faq[] = [
  {
    id: "charges",
    q: fr`Quels types de charges transportez-vous ?`,
    a: fr`Transports Brun réalise un ensemble de transport de marchandises sur tous les produits, charges lourdes et/ou pondéreuses : murs préfabriqués utilisés pour la construction d'hôpitaux ou d'Ehpad, sable et gravier, modules, treillis ou encore cuves de vendange. Nos équipements spécialisés permettent aussi le transport de charges larges, longues ou très lourdes qui ne rentrent pas dans les dimensions standard.`,
  },
  {
    id: "convois",
    q: fr`Faites-vous des convois exceptionnels ?`,
    a: fr`Oui. Nos chauffeurs sont hautement qualifiés et possèdent les agréments de catégorie 1 et 2 pour les convois exceptionnels, ce qui nous rend capables de gérer vos transports exceptionnels, tant au niveau régional que national.`,
  },
  {
    id: "zone",
    q: fr`Intervenez-vous en dehors de l'Alsace ?`,
    a: fr`Oui. Situés au cœur de l'Alsace, nous réalisons un service régional, national et international : nos chauffeurs peuvent se déplacer dans toute la France et nous sommes prêts à répondre à vos besoins de transport à l'étranger.`,
  },
  {
    id: "adr",
    q: fr`Transportez-vous des matières dangereuses ?`,
    a: fr`Oui. Nos chauffeurs et nos camions sont qualifiés pour effectuer des transports d'ADR de base et colisage. De plus, un conseiller ADR réalise chaque année un rapport obligatoire de visite.`,
  },
  {
    id: "prix",
    q: fr`Comment le prix est-il calculé ?`,
    a: fr`Le prix du transport varie en fonction de la nature de la charge, du temps de transport ainsi que du type de route empruntée. Décrivez votre transport dans le formulaire de devis : nous vous contacterons dans les plus brefs délais.`,
  },
  {
    id: "contact",
    q: fr`Où êtes-vous et quand joindre l'équipe ?`,
    a: fr`Nous sommes au ${site.address.street}, ${site.address.postalCode} ${site.address.city} (Haut-Rhin). L'équipe est joignable ${site.hours.sentence}, au ${mainPhone.display}.`,
  },
];

/** Version courte (3 questions) pour le bas des pages de service */
export const faqFor = {
  plateau: ["convois", "zone", "prix"],
  marchandises: ["charges", "adr", "prix"],
} as const;

export function pickFaqs(ids: readonly string[]): Faq[] {
  return ids.map((id) => faqs.find((f) => f.id === id)!).filter(Boolean);
}
