/**
 * « Ce que nous transportons » : exemples cités sur le site actuel (page Transport de
 * marchandises et page Transport plateau / grue). Chaque carte mène à la page de service
 * et propose un devis avec le type de demande présélectionné.
 */
import { pid } from "@/content/gallery";
import { quoteLink } from "@/lib/quote-schema";
import { fr } from "@/lib/typo";
import type { IconName } from "@/components/ui/Icon";

export type TransportedItem = {
  id: string;
  title: string;
  text: string;
  icon: IconName;
  /** Sans photo : affiché en carte horizontale (aucune photo ne montre un transport ADR) */
  photo?: ReturnType<typeof pid>;
  /** Point focal de la photo */
  focal?: string;
  serviceHref: string;
  quoteHref: string;
};

const MARCHANDISES = "/transports-de-marchandises-et-btp-haut-rhin-alsace";
const PLATEAU = "/transport-plateaux-camion-grue-haut-rhin-alsace";

export const transported: TransportedItem[] = [
  {
    id: "murs",
    title: fr`Murs préfabriqués`,
    text: fr`Utilisés pour la construction d'hôpitaux ou d'Ehpad.`,
    icon: "bricks",
    photo: pid("marchandises/murs-prefabriques-scania"),
    focal: "40% 55%",
    serviceHref: MARCHANDISES,
    quoteHref: quoteLink("transport-marchandises", "murs-prefabriques"),
  },
  {
    id: "sable",
    title: "Sable et gravier",
    text: fr`Vers vos chantiers, sur tous types de route.`,
    icon: "mountain",
    photo: pid("marchandises/benne-man-granulats"),
    focal: "45% 55%",
    serviceHref: MARCHANDISES,
    quoteHref: quoteLink("transport-marchandises", "sable-gravier"),
  },
  {
    id: "modules",
    title: "Modules",
    text: fr`Transport de modules, de chantier en chantier ou d'usine à usine.`,
    icon: "container",
    photo: pid("plateau/module-sur-plateau"),
    focal: "55% 50%",
    serviceHref: MARCHANDISES,
    quoteHref: quoteLink("transport-marchandises", "modules"),
  },
  {
    id: "treillis",
    title: "Treillis",
    text: fr`Transport de treillis vers vos chantiers.`,
    icon: "layers",
    photo: pid("plateau/plateau-treillis-soudes"),
    focal: "45% 55%",
    serviceHref: MARCHANDISES,
    quoteHref: quoteLink("transport-marchandises", "treillis"),
  },
  {
    id: "cuves",
    title: "Cuves de vendange",
    text: fr`Transport de cuves de vendange.`,
    icon: "package",
    photo: pid("marchandises/cuve-levage-grue"),
    focal: "45% 60%",
    serviceHref: MARCHANDISES,
    quoteHref: quoteLink("transport-marchandises", "cuves-de-vendange"),
  },
  {
    id: "hors-normes",
    title: "Charges hors normes",
    text: fr`Charges larges, longues ou très lourdes, en convoi exceptionnel cat. 1 et 2.`,
    icon: "ruler",
    photo: pid("plateau/porte-engins-pelle-volvo"),
    focal: "55% 60%",
    serviceHref: PLATEAU,
    quoteHref: quoteLink("convoi-exceptionnel", "charges-hors-normes"),
  },
  {
    id: "adr",
    title: "ADR de base et colisage",
    text: fr`Chauffeurs et camions qualifiés pour les marchandises dangereuses.`,
    icon: "flame",
    serviceHref: MARCHANDISES,
    quoteHref: quoteLink("adr", "adr-colisage"),
  },
];
