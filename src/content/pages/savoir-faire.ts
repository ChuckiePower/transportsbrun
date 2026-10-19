import { pid } from "@/content/gallery";
import { fr } from "@/lib/typo";
import type { PageMeta } from "./types";

export const savoirFairePage = {
  meta: {
    title: fr`Transport routier par plateau, Haut-Rhin`,
    description: fr`Transport routier de marchandises par plateau dans le Haut-Rhin (Alsace) : charges lourdes, service personnalisé, matériel contrôlé, conseiller ADR.`,
    ogPhoto: "flotte/flotte-nuit",
    ogTitle: fr`Un savoir-faire adapté à vos besoins`,
  } satisfies PageMeta,

  hero: {
    eyebrow: "Savoir-faire",
    title: fr`Transports Brun, un savoir-faire adapté à vos besoins`,
    lead: fr`Transports Brun réalise un ensemble de transport de marchandises sur tous les produits, charges lourdes et/ou pondéreuses.`,
    photo: pid("flotte/flotte-nuit"),
  },

  intro: {
    title: fr`Transport routier de marchandises par plateau dans le Haut-Rhin`,
    paragraphs: [
      fr`Notre équipe familiale vous garantit la qualité de ses services tout au long de ses déplacements. Nous nous engageons à assurer un transport répondant à vos besoins pour un partenariat de qualité, et à vous livrer dans les plus brefs délais.`,
      fr`Afin de satisfaire au mieux nos clients, nous réalisons différents types de services sur réseau routier : le transport de marchandises, plateau et grue.`,
    ],
    photo: pid("flotte/quatre-tracteurs"),
  },

  ecology: {
    eyebrow: fr`Engagement écoresponsable`,
    title: fr`Moins de kilomètres inutiles, des camions mieux remplis`,
    text: fr`De plus, notre entreprise, sensible à l'écologie et consciente de l'impact du transport routier sur les problèmes environnementaux actuels, participe à l'amélioration de son empreinte carbone par l'augmentation du taux de remplissage des camions et par la réduction de kilométrages inutiles. Un engagement écoresponsable qui nous tient à cœur.`,
    levers: [
      { title: fr`Taux de remplissage`, text: fr`Augmenter le taux de remplissage des camions.` },
      { title: fr`Kilomètres à vide`, text: fr`Réduire les kilométrages inutiles.` },
    ],
  },

  method: {
    title: fr`Un service personnalisé`,
    paragraphs: [
      fr`Chez Transports Brun, nous organisons le transport de toutes vos marchandises en adaptant nos méthodes de transport en fonction de vos besoins.`,
      fr`Un service personnalisé où professionnalisme et réactivité constituent un gage de qualité. En effet, notre entreprise familiale vous assure un transport en accord avec vos besoins en matière de coûts et de délais. Tous nos chauffeurs sont ponctuels, rigoureux et respectueux.`,
    ],
  },

  safety: {
    eyebrow: fr`Sécurité`,
    title: fr`Matériel contrôlé, rapport ADR annuel`,
    text: fr`Notre matériel et tous nos éléments de sécurité sont contrôlés régulièrement. De plus, chaque année, un conseiller ADR, conseiller à la sécurité externe du transport des matières dangereuses par route, réalise un rapport obligatoire de visite.`,
    points: [
      {
        title: fr`Contrôles réguliers`,
        text: fr`Matériel et éléments de sécurité contrôlés régulièrement.`,
      },
      {
        title: fr`Conseiller ADR`,
        text: fr`Rapport obligatoire de visite réalisé chaque année par un conseiller à la sécurité externe.`,
      },
    ],
    photo: pid("grue/camion-grue-scania-stabilisateurs"),
  },

  closing: fr`Optez pour le transport routier de marchandises par plateau dans le Haut-Rhin (Alsace). Solutions fiables pour vos besoins en logistique spécialisée.`,
};
