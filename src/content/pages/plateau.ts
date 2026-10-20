import { pid } from "@/content/gallery";
import { fr } from "@/lib/typo";
import type { PageMeta } from "./types";

export const plateauPage = {
  meta: {
    title: fr`Transport plateau, camion-grue – Haut-Rhin`,
    description: fr`Transport par plateau et camion-grue dans le Haut-Rhin (Alsace) : charges hors normes, convois exceptionnels cat. 1 et 2, ADR. Une logistique flexible.`,
    ogPhoto: "grue/camion-grue-volvo-levage-module",
    ogTitle: fr`Transport plateau et camion-grue dans le Haut-Rhin`,
  } satisfies PageMeta,

  hero: {
    eyebrow: fr`Transport plateau / grue · Haut-Rhin (Alsace)`,
    title: fr`Transport plateau et camion-grue`,
    lead: fr`Le transport plateau est essentiel pour le déplacement sécurisé de marchandises industrielles de grandes dimensions, d'un site à un autre, que ce soit de chantier en chantier ou d'usine à usine.`,
    photo: pid("plateau/plateau-daf-zone-stockage"),
    focal: "62% 50%",
  },

  intro: fr`Chez Transports Brun, nous comprenons l'importance de la fiabilité et de la flexibilité pour le transport de vos biens.`,

  advantages: {
    title: fr`Avantages de notre service de transport plateau`,
    items: [
      {
        title: fr`Capacité de transport de charges hors normes`,
        text: fr`Nos équipements spécialisés permettent le transport de charges larges, longues ou très lourdes qui ne rentrent pas dans les dimensions standard.`,
      },
      {
        title: fr`Expertise en convois exceptionnels`,
        text: fr`Nos chauffeurs sont hautement qualifiés et possèdent les agréments de catégorie 1 et 2 pour les convois exceptionnels, ce qui nous rend capables de gérer vos transports exceptionnels, tant au niveau régional que national.`,
      },
      {
        title: fr`Accès à des zones réglementées`,
        text: fr`Nos camions et équipements sont conçus pour accéder à des sites avec des restrictions de hauteur, facilitant ainsi le déplacement en zones urbaines ou autres environnements réglementés.`,
      },
      {
        title: fr`Accès référencés au sein des centrales nucléaires`,
        text: fr`Nos camions et chauffeurs sont agréés à pouvoir se rendre dans les accès réglementés au sein des centrales nucléaires.`,
      },
      {
        title: "ADR",
        subtitle: fr`Accord relatif au transport international des marchandises dangereuses par route`,
        text: fr`Nos chauffeurs et nos camions sont qualifiés pour effectuer des transports d'ADR de base et colisage.`,
      },
    ],
  },

  fleet: {
    title: fr`Équipements et flotte`,
    paragraphs: [
      fr`Notre parc de véhicules comprend des camions grue et une variété de remorques et semi-remorques, chacune adaptée pour répondre aux différents besoins de chargement et de livraison de nos clients. Cette flexibilité nous permet d'offrir des solutions sur mesure pour chaque projet.`,
      fr`Nos camions grues sont équipés pour répondre à tous vos besoins en matière de levage, garantissant un placement précis et sécurisé de vos charges, même dans les environnements les plus exigeants.`,
    ],
    specsTitle: fr`Caractéristiques du camion-grue`,
    photo: pid("grue/camion-grue-volvo-fm"),
  },

  quality: {
    title: fr`Engagement envers la qualité et la sécurité`,
    text: fr`La sécurité de vos marchandises est notre priorité absolue. Chez Transports Brun, chaque mission est exécutée avec le plus haut niveau de professionnalisme et dans le respect total des normes de sécurité.`,
    network: fr`**En tant que membre actif du Groupement France Plateau**, Transports Brun bénéficie d'un réseau étendu de ressources et d'expertise, garantissant que vos besoins de transport sont gérés avec la plus grande efficacité et professionnalisme.`,
    contact: fr`Pour en savoir plus sur nos services de transport plateau et camion grue, ou pour discuter de vos besoins spécifiques, n'hésitez pas à nous contacter. Situés au cœur de l'Alsace, nous sommes prêts à répondre à tous vos besoins de transport en France et à l'étranger.`,
    tagline: fr`Faites confiance aux Transports Brun, pour un savoir-faire adapté à vos marchandises`,
  },

  gallery: {
    title: fr`Nos transports plateau et grue en images`,
  },
};
