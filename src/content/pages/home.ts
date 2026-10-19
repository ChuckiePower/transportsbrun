import { pid } from "@/content/gallery";
import { fr } from "@/lib/typo";
import type { IconName } from "@/components/ui/Icon";
import type { PageMeta } from "./types";

export const homePage = {
  meta: {
    title: fr`Transports Brun – Transport plateau, grue et fret en Alsace`,
    absoluteTitle: true,
    description: fr`Transporteur routier familial à Saint-Hippolyte (Haut-Rhin) : transport plateau, camion-grue, charges lourdes et hors normes, convois exceptionnels, ADR.`,
    ogPhoto: "grue/camion-grue-volvo-levage-module",
    ogTitle: fr`Transport plateau, camion-grue et marchandises en Alsace`,
  } satisfies PageMeta,

  hero: {
    eyebrow: fr`Saint-Hippolyte · Haut-Rhin · Alsace`,
    title: fr`Transport plateau, camion-grue et charges hors normes en Alsace`,
    // Bénéfice, tiré du texte « Nos domaines d'expertise »
    lead: fr`Du quai d'expédition jusqu'au client, nous nous occupons de tout : transport plateau et grue, fret interurbain et marchandises, en France et à l'étranger.`,
    photo: pid("grue/camion-grue-volvo-levage-module"),
    focal: "38% 45%",
  },

  /** Bandeau défilant : savoir-faire cités sur le site */
  marquee: [
    "Transport plateau",
    "Camion-grue",
    fr`Convoi exceptionnel cat. 1 et 2`,
    "ADR de base et colisage",
    "Charges lourdes",
    "Fret interurbain",
    fr`France et étranger`,
    fr`Accès centrales nucléaires`,
    fr`Murs préfabriqués`,
    "Modules",
  ],

  services: {
    eyebrow: "Nos métiers",
    title: fr`Plusieurs savoir-faire, un seul interlocuteur`,
    lead: fr`La société Transports Brun possède plusieurs savoir-faire, notamment, le transport plateau.`,
  },

  transported: {
    eyebrow: "Ce que nous transportons",
    title: fr`Vos matériaux, vos machines, vos charges hors normes`,
    lead: fr`Un transport de marchandises sur tous les produits, charges lourdes et/ou pondéreuses, réalisé dans les règles.`,
  },

  why: {
    eyebrow: "Pourquoi Transports Brun",
    title: fr`Un transporteur de famille, fiable sur chaque mission`,
    lead: fr`L'entreprise Brun, c'est avant tout de l'engagement : un transport de marchandises réalisé dans les règles, où ponctualité et respect sont les maîtres mots.`,
    experience: {
      value: 25,
      label: fr`ans d'expérience dans le domaine du transport`,
      prefix: fr`Près de`,
      note: fr`Une société familiale née le 2 mars 2018, avec près de 25 ans d'expérience à sa tête.`,
    },
    cards: [
      {
        icon: "locate",
        title: "Chauffeurs localisables",
        text: fr`En cas de livraison tardive, vous serez toujours prévenu en avance, car nos chauffeurs sont localisables.`,
      },
      {
        icon: "ruler",
        title: fr`Convois exceptionnels cat. 1 et 2`,
        text: fr`Nos chauffeurs possèdent les agréments de catégorie 1 et 2 pour vos transports exceptionnels, en régional comme en national.`,
      },
      {
        icon: "flame",
        title: "ADR de base et colisage",
        text: fr`Chauffeurs et camions qualifiés ; chaque année, un conseiller ADR réalise le rapport obligatoire de visite.`,
      },
      {
        icon: "family",
        title: fr`Équipe familiale, relation de proximité`,
        text: fr`Un relationnel de proximité et une qualité de service pour toutes les prestations, sur courte ou longue distance.`,
      },
    ] satisfies { icon: IconName; title: string; text: string }[],
  },

  steps: {
    eyebrow: fr`Comment ça marche`,
    title: fr`Votre transport en trois étapes`,
    items: [
      { title: fr`Vous décrivez votre transport`, text: fr`Type de charge, lieux de chargement et de livraison, date souhaitée : décrivez votre besoin dans le formulaire de devis.` },
      { title: fr`Nous vous répondons`, text: fr`Nous prenons connaissance de votre demande et vous contactons dans les plus brefs délais.` },
      { title: fr`Nous organisons le transport`, text: fr`Du quai d'expédition jusqu'au client, dans le respect des législations et des réglementations en vigueur.` },
    ],
  },

  expertise: {
    photo: pid("marchandises/scania-conteneur-foret"),
  },

  story: {
    eyebrow: fr`L'entreprise Transports Brun`,
    title: "Notre histoire",
    paragraphs: [
      fr`Transports Brun est une société familiale de transport. Née le 2 mars 2018, cette entreprise en apparence jeune possède, à sa tête, près de 25 ans d'expérience dans le domaine du transport. L'entreprise Brun, c'est avant tout de l'engagement. Un relationnel de proximité et une qualité de service pour toutes les prestations sur courte ou longue distance.`,
      fr`Nos chauffeurs, réactifs et disponibles, peuvent se déplacer dans toute la France pour vous. Continuellement à votre écoute, nous nous adaptons à vos demandes et envies, pour répondre au mieux à vos exigences.`,
    ],
    quote: fr`Un transport de marchandises réalisé dans les règles, où ponctualité et respect sont les maîtres mots.`,
    linkLabel: "Lire notre histoire",
    mosaic: [
      pid("flotte/man-tgx-enseigne"),
      pid("flotte/daf-xg-decoration-noire"),
      pid("flotte/quatre-tracteurs-ciel-bleu"),
      pid("grue/camion-grue-batiment-historique"),
    ],
  },

  equipment: {
    eyebrow: fr`Notre équipement`,
    title: fr`Un parc adapté à chaque chargement`,
    lead: fr`Tracteurs, plateaux, openbox, tautliners, remorque Trax, remorques porte-béton et camion-grue avec remorque : un parc pensé pour répondre aux différents besoins de chargement et de livraison.`,
    linkLabel: fr`Voir notre équipement`,
    thumbs: [
      pid("plateau/convoi-exceptionnel-man-conteneur"),
      pid("equipement/remorque-trax-cadres-beton"),
      pid("grue/camion-grue-volvo-fm"),
    ],
  },

  faq: {
    eyebrow: "Questions fréquentes",
    title: fr`Vos questions, nos réponses`,
  },
};
