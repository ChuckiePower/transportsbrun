/**
 * Les trois métiers mis en avant (cartes de l'accueil, bloc « Nos domaines d'expertise »,
 * maillage interne). Textes issus du site actuel.
 */
import type { PhotoId } from "@/content/gallery";
import { fr } from "@/lib/typo";

export type Service = {
  id: "camion-grue" | "plateau" | "marchandises";
  title: string;
  /** Titre court (vignettes) */
  short: string;
  summary: string;
  /** Une phrase pour les cartes */
  teaser: string;
  icon: "crane" | "flatbed" | "truck";
  href: string;
  linkLabel: string;
  photo: PhotoId;
  /** Point focal (object-position) pour les recadrages étroits */
  focal?: string;
};

export const services: Service[] = [
  {
    id: "camion-grue",
    title: "Camion-grue",
    short: "Camion-grue",
    summary: fr`Nos camions grues sont équipés pour répondre à tous vos besoins en matière de levage, garantissant un placement précis et sécurisé de vos charges, même dans les environnements les plus exigeants.`,
    teaser: fr`Des camions grues équipés pour un placement précis et sécurisé de vos charges, même dans les environnements les plus exigeants.`,
    icon: "crane",
    href: "/transport-plateaux-camion-grue-haut-rhin-alsace#flotte",
    linkLabel: "Le camion-grue",
    photo: "grue/camion-grue-vignoble",
  },
  {
    id: "plateau",
    title: "Transport plateaux",
    short: "Transport plateaux",
    summary: fr`Le transport plateau est essentiel pour le déplacement sécurisé de marchandises industrielles de grandes dimensions, d'un site à un autre, que ce soit de chantier en chantier ou d'usine à usine.`,
    teaser: fr`Le déplacement sécurisé de marchandises industrielles de grandes dimensions, de chantier en chantier ou d'usine à usine.`,
    icon: "flatbed",
    href: "/transport-plateaux-camion-grue-haut-rhin-alsace",
    linkLabel: "Le transport plateau",
    photo: "plateau/convoi-exceptionnel-man-conteneur",
    focal: "25% 50%",
  },
  {
    id: "marchandises",
    title: "Transport de marchandises",
    short: "Transport de marchandises",
    summary: fr`La société Transports Brun est une société de fret interurbain qui réalise des transports sur tous types de route. Vous désirez faire transporter des matériaux ou des marchandises ? Transports Brun est l'entreprise idéale pour vous !`,
    teaser: fr`Du fret interurbain sur tous types de route, pour vos matériaux et vos marchandises.`,
    icon: "truck",
    href: "/transports-de-marchandises-et-btp-haut-rhin-alsace",
    linkLabel: "Le transport de marchandises",
    photo: "marchandises/renault-tautliner-parking",
    focal: "80% 50%",
  },
];

/** Bloc commun « Nos domaines d'expertise » (présent sur toutes les pages du site actuel) */
export const expertise = {
  title: fr`Nos domaines d'expertise`,
  text: fr`Notre société transporte vos marchandises dans le monde entier. Nous réalisons donc un service régional, national et international. Nous nous occupons du produit, ou de la marchandise, du quai d'expédition, et ce, jusqu'au client. Le tout, dans le respect des législations et des réglementations en vigueur.`,
  scopes: ["Régional", "National", "International"],
};

/**
 * Bandeau de confiance : uniquement des faits présents sur le site actuel.
 * `detail` = précision affichée sous le libellé.
 */
export const trustFacts: { label: string; detail: string }[] = [
  { label: "Entreprise familiale", detail: fr`Créée le 2 mars 2018` },
  { label: fr`Près de 25 ans d'expérience`, detail: "dans le domaine du transport" },
  { label: "Convois exceptionnels", detail: fr`Agréments catégorie 1 et 2` },
  { label: "ADR", detail: "ADR de base et colisage" },
  { label: fr`Centrales nucléaires`, detail: fr`Accès référencés` },
  { label: "Groupement France Plateau", detail: "Membre actif" },
  { label: "Chauffeurs localisables", detail: fr`Prévenu en avance en cas de livraison tardive` },
];
