import { pid } from "@/content/gallery";
import { fr } from "@/lib/typo";
import type { PageMeta } from "./types";

export const histoirePage = {
  meta: {
    title: fr`Notre histoire – Transporteur familial`,
    description: fr`Transports Brun, société familiale de transport née le 2 mars 2018 à Saint-Hippolyte (Haut-Rhin), portée par près de 25 ans d'expérience du transport.`,
    ogPhoto: "flotte/flotte-alignee",
    ogTitle: fr`Notre histoire : une entreprise familiale de transport`,
  } satisfies PageMeta,

  hero: {
    eyebrow: fr`Entreprise familiale depuis 2018`,
    title: "Notre histoire",
    lead: fr`Transports Brun est une société familiale de transport. Née le 2 mars 2018, cette entreprise en apparence jeune possède, à sa tête, près de 25 ans d'expérience dans le domaine du transport.`,
    photo: pid("flotte/flotte-alignee"),
  },

  values: {
    title: fr`Des valeurs ancrées`,
    keywords: [
      "Professionnalisme",
      "Engagement",
      fr`Considération`,
      fr`Solidarité`,
      fr`Expérience`,
    ],
    paragraphs: [
      fr`Professionnalisme, engagement, considération, solidarité et expérience sont représentatifs des valeurs Brun. Aux Transports Brun, nous nous appliquons à donner le meilleur de nous-mêmes pour une satisfaction client totale.`,
      fr`L'entreprise Transports Brun, c'est avant tout de l'engagement. Un transport de marchandises réalisé dans les règles, où ponctualité et respect sont les maîtres mots. En cas de livraison tardive, vous serez toujours prévenu en avance, car nos chauffeurs sont localisables. De plus, notre société trouve des solutions simples et efficaces en cas de problème. Vous pourrez donc vous assurer d'un service irréprochable avec Transports Brun.`,
    ],
    quote: fr`Transports Brun, bien plus qu'un transporteur, des valeurs familiales enracinées`,
    photo: pid("flotte/daf-xg-montagnes"),
  },

  team: {
    title: fr`Découvrez notre équipe`,
    paragraphs: [
      fr`Nos chauffeurs, réactifs et disponibles, peuvent se déplacer dans toute la France pour vous. Continuellement à votre écoute, nous nous adaptons à vos demandes et envies, pour répondre au mieux à vos exigences.`,
      fr`Rigoureux et expérimentés, vous pouvez nous contacter en cas de besoin. Nous y répondrons dans les plus brefs délais.`,
    ],
    quote: fr`Transports Brun, une qualité née d'un savoir-faire.`,
    photo: pid("flotte/daf-passerelle-dunlop"),
  },
};
