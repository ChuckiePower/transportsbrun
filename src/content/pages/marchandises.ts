import { pid } from "@/content/gallery";
import { fr } from "@/lib/typo";
import type { PageMeta } from "./types";

export const marchandisesPage = {
  meta: {
    title: fr`Transport de marchandises, Haut-Rhin`,
    description: fr`Fret interurbain dans le Haut-Rhin (Alsace) : murs préfabriqués, sable, gravier, modules, treillis, cuves de vendange, ADR. Des solutions sur mesure.`,
    ogPhoto: "marchandises/renault-tautliner-parking",
    ogTitle: fr`Transport de marchandises dans le Haut-Rhin (Alsace)`,
  } satisfies PageMeta,

  hero: {
    eyebrow: fr`Fret interurbain · Haut-Rhin (Alsace)`,
    title: "Transport de marchandises",
    lead: fr`La société Transports Brun est une société de fret interurbain qui réalise des transports sur tous types de route.`,
    photo: pid("marchandises/renault-tautliner-parking"),
  },

  /** Points clés en haut de page (scannables) */
  keyPoints: [
    fr`Fret interurbain sur tous types de route`,
    fr`Matériaux livrés sur vos chantiers`,
    fr`Transport de produits dangereux : chauffeurs formés à l'ADR`,
    fr`Rapport annuel d'un conseiller ADR`,
  ],

  intro: {
    title: fr`Vous désirez faire transporter des matériaux vers vos chantiers ?`,
    text: fr`Transports Brun est l'entreprise idéale pour vous !`,
  },

  examples: {
    title: "Ce que nous transportons",
    lead: fr`Mur préfabriqué utilisé pour la construction d'hôpitaux ou d'Ehpad, transport de sable et/ou gravier, transport de modules, de treillis ou encore de cuves de vendange.`,
    items: [
      { label: fr`Murs préfabriqués`, detail: fr`pour la construction d'hôpitaux ou d'Ehpad` },
      { label: "Sable et gravier", detail: "" },
      { label: "Modules", detail: "" },
      { label: "Treillis", detail: "" },
      { label: "Cuves de vendange", detail: "" },
    ],
  },

  adr: {
    eyebrow: "ADR",
    title: fr`Transport de produits dangereux`,
    paragraphs: [
      fr`Notre infrastructure est autorisée à effectuer des transports de produits dangereux, grâce à la formation de nos chauffeurs à l'ADR. De plus, un conseiller ADR réalise un rapport annuel comme le prévoit la réglementation.`,
    ],
  },

  collaborate: fr`Vous souhaitez collaborer avec nous ? Nous sommes à votre disposition.`,

  priceNote: {
    title: "Note",
    text: fr`Le prix du transport varie en fonction de la nature de la charge, du temps de transport ainsi que du type de route empruntée.`,
    factors: [fr`Nature de la charge`, "Temps de transport", fr`Type de route empruntée`],
  },

  gallery: {
    title: fr`Nos transports de marchandises en images`,
  },
};
