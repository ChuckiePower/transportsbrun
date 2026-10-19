import { pid } from "@/content/gallery";
import { fr } from "@/lib/typo";
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
    lead: fr`Transports Brun, transporteur routier familial : transport plateau et grue, fret interurbain et transport de marchandises sur tous types de route, en France et à l'étranger.`,
    photo: pid("grue/camion-grue-volvo-levage-module"),
  },

  services: {
    eyebrow: "Nos métiers",
    title: fr`Plusieurs savoir-faire, un seul interlocuteur`,
    lead: fr`La société Transports Brun possède plusieurs savoir-faire, notamment, le transport plateau.`,
  },

  story: {
    eyebrow: fr`L'entreprise Transports Brun`,
    title: "Notre histoire",
    paragraphs: [
      fr`Transports Brun est une société familiale de transport. Née le 2 mars 2018, cette entreprise en apparence jeune possède, à sa tête, près de 25 ans d'expérience dans le domaine du transport. L'entreprise Brun, c'est avant tout de l'engagement. Un relationnel de proximité et une qualité de service pour toutes les prestations sur courte ou longue distance.`,
      fr`Un transport de marchandises réalisé dans les règles, où ponctualité et respect sont les maîtres mots.`,
      fr`Nos chauffeurs, réactifs et disponibles, peuvent se déplacer dans toute la France pour vous. Continuellement à votre écoute, nous nous adaptons à vos demandes et envies, pour répondre au mieux à vos exigences.`,
    ],
    linkLabel: "Lire notre histoire",
    photo: pid("flotte/man-tgx-enseigne"),
  },

  equipment: {
    eyebrow: fr`Notre équipement`,
    title: fr`Un parc adapté à chaque chargement`,
    lead: fr`Tracteurs, plateaux, openbox, tautliners, remorque Trax, remorques porte-béton et camion-grue avec remorque : un parc pensé pour répondre aux différents besoins de chargement et de livraison.`,
    linkLabel: fr`Voir tout l'équipement`,
  },
};
