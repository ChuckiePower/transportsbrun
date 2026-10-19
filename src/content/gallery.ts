/**
 * Photothèque : toutes les photos réelles de Transports Brun utilisées sur le site.
 *
 * - Les fichiers vivent dans content/photos/<thème>/ ; les largeurs/hauteurs et le flou
 *   de chargement (blurDataURL) sont lus automatiquement à la compilation (import statique).
 * - Remplacer une photo par son original haute définition : écraser le fichier en gardant
 *   le même nom, puis relancer le build. Rien d'autre à modifier.
 * - Ajouter une photo : déposer le fichier, ajouter un import + une entrée ci-dessous
 *   (avec un texte alternatif qui DÉCRIT la photo), puis la référencer dans un groupe.
 */
import type { StaticImageData } from "next/image";
import { fr } from "@/lib/typo";

import img00 from "@photos/grue/camion-grue-volvo-levage-module.jpg";
import img01 from "@photos/grue/camion-grue-vignoble.jpg";
import img02 from "@photos/grue/bras-de-grue-deploye.jpg";
import img03 from "@photos/grue/camion-grue-scania-gros-plan.jpg";
import img04 from "@photos/grue/camion-grue-scania-stabilisateurs.jpg";
import img05 from "@photos/grue/camion-grue-chantier-structure.jpg";
import img06 from "@photos/grue/camion-grue-volvo-fm.jpg";
import img07 from "@photos/grue/camion-grue-batiment-historique.jpg";
import img08 from "@photos/grue/camion-grue-levage-centre-ville.jpg";
import img09 from "@photos/plateau/plateau-renault-armatures.webp";
import img10 from "@photos/plateau/plateau-man-voie-rapide.jpg";
import img11 from "@photos/plateau/porte-engins-man-ville.jpg";
import img12 from "@photos/plateau/camions-nuit-arc-de-triomphe.jpg";
import img13 from "@photos/plateau/plateau-daf-zone-stockage.jpg";
import img14 from "@photos/plateau/porte-engins-man-gris.jpg";
import img15 from "@photos/plateau/porte-engins-pelle-volvo.jpg";
import img16 from "@photos/plateau/plateau-route-mouillee.jpg";
import img17 from "@photos/plateau/plateau-man-coucher-soleil.jpg";
import img18 from "@photos/plateau/module-sur-plateau.jpg";
import img19 from "@photos/plateau/plateau-chantier-grue-a-tour.jpg";
import img20 from "@photos/plateau/plateau-chargement-mixte.jpg";
import img21 from "@photos/plateau/charge-longue-nuit.jpg";
import img22 from "@photos/plateau/plateau-bottes-de-paille.jpg";
import img23 from "@photos/plateau/poutres-beton-chantier.jpg";
import img24 from "@photos/plateau/convoi-exceptionnel-module-arriere.jpg";
import img25 from "@photos/plateau/scania-plateau-caisses-bois.jpg";
import img26 from "@photos/plateau/chargement-module-grue.jpg";
import img27 from "@photos/plateau/convoi-exceptionnel-man-conteneur.jpg";
import img28 from "@photos/plateau/plateau-treillis-soudes.jpg";
import img29 from "@photos/plateau/renault-caisses-palettes.jpg";
import img30 from "@photos/plateau/man-plateau-jaune-chemin.jpg";
import img31 from "@photos/plateau/volvo-fh-caisses-grillagees.jpg";
import img32 from "@photos/plateau/volvo-fh-caisses-coucher-soleil.jpg";
import img33 from "@photos/plateau/volvo-bleu-plateau-givre.jpg";
import img34 from "@photos/plateau/volvo-bleu-face-givre.jpg";
import img35 from "@photos/plateau/dechargement-poutrelles-acier.jpg";
import img36 from "@photos/plateau/levage-poutrelle-chantier.jpg";
import img37 from "@photos/marchandises/renault-tautliner-parking.jpg";
import img38 from "@photos/marchandises/porteur-man-village.jpg";
import img39 from "@photos/marchandises/porteur-bache-quai.jpg";
import img40 from "@photos/marchandises/volvo-tautliner-ouvert.jpg";
import img41 from "@photos/marchandises/renault-t-semi-remorque.jpg";
import img42 from "@photos/marchandises/volvo-bleu-tautliner.jpg";
import img43 from "@photos/marchandises/scania-fourgon-entrepot.jpg";
import img44 from "@photos/marchandises/convoi-exceptionnel-cuve.jpg";
import img45 from "@photos/marchandises/murs-prefabriques-scania.jpg";
import img46 from "@photos/marchandises/scania-conteneur-foret.jpg";
import img47 from "@photos/marchandises/structure-metallique-centrale.jpg";
import img48 from "@photos/marchandises/cuve-levage-grue.jpg";
import img49 from "@photos/marchandises/benne-man-granulats.jpg";
import img50 from "@photos/marchandises/renault-tautliner-cloture.jpg";
import img51 from "@photos/marchandises/volvo-bleu-tautliner-neige.jpg";
import img52 from "@photos/marchandises/bache-logo-transports-brun.jpg";
import img53 from "@photos/marchandises/renault-t-tautliner-ciel-bleu.jpg";
import img54 from "@photos/marchandises/man-tgx-gris-tautliner.jpg";
import img55 from "@photos/equipement/remorque-trax-cadres-beton.jpg";
import img56 from "@photos/equipement/remorque-trax-chargee.jpg";
import img57 from "@photos/equipement/remorque-trax-rampes.jpg";
import img58 from "@photos/equipement/remorque-trax-vue-arriere.jpg";
import img59 from "@photos/equipement/tautliner-hayon.jpg";
import img60 from "@photos/flotte/flotte-alignee.jpg";
import img61 from "@photos/flotte/daf-xg-montagnes.jpg";
import img62 from "@photos/flotte/daf-passerelle-dunlop.jpg";
import img63 from "@photos/flotte/flotte-nuit.jpg";
import img64 from "@photos/flotte/quatre-tracteurs.jpg";
import img65 from "@photos/flotte/man-tgx-enseigne.jpg";
import img66 from "@photos/flotte/daf-xg-decoration-noire.jpg";
import img67 from "@photos/flotte/daf-xg-livree.jpg";
import img68 from "@photos/flotte/quatre-tracteurs-ciel-bleu.jpg";
import img69 from "@photos/flotte/volvo-fh-crepuscule.jpg";
import img70 from "@photos/flotte/trois-tracteurs-caisses-grillagees.jpg";
import img71 from "@photos/flotte/volvo-fh-blanc.jpg";
import img72 from "@photos/flotte/deux-man-tgx.jpg";
import img73 from "@photos/flotte/volvo-bleu-neige.jpg";
import img74 from "@photos/flotte/man-tgx-blanc.jpg";
import img75 from "@photos/flotte/iveco-s-way.jpg";
import img76 from "@photos/flotte/flotte-alignee-soir.jpg";
import img77 from "@photos/flotte/daf-volvo-man.jpg";
import img78 from "@photos/flotte/flotte-panorama.jpg";
import img79 from "@photos/flotte/trois-tracteurs-contre-plongee.jpg";
import img80 from "@photos/flotte/deux-volvo-fh.jpg";
import img81 from "@photos/flotte/volvo-fh-460-face.jpg";
import img82 from "@photos/flotte/volvo-bleu-sol-mouille.jpg";
import img83 from "@photos/flotte/renault-t-face.jpg";
import img84 from "@photos/flotte/volvo-fh-reflet.jpg";
import img85 from "@photos/flotte/volvo-fh-portes-ouvertes.jpg";
import img86 from "@photos/flotte/volvo-fh-460-cabine.jpg";
import img87 from "@photos/divers/scania-plateau-crepuscule-assombri.jpg";
import img88 from "@photos/divers/man-fourgon-assombri.jpg";

type Entry = { image: StaticImageData; alt: string };

const library = {
  "grue/camion-grue-volvo-levage-module": {
    image: img00,
    alt: fr`Camion-grue Volvo FM de Transports Brun soulevant un module préfabriqué sur une zone d'activité`,
  },
  "grue/camion-grue-vignoble": {
    image: img01,
    alt: fr`Bras de grue déployé au-dessus d'un vignoble, le camion-grue stationné en contrebas`,
  },
  "grue/bras-de-grue-deploye": {
    image: img02,
    alt: fr`Bras articulé d'un camion-grue Scania déployé sur une aire de stationnement`,
  },
  "grue/camion-grue-scania-gros-plan": {
    image: img03,
    alt: fr`Grue repliée sur un porteur Scania de Transports Brun, vue rapprochée`,
  },
  "grue/camion-grue-scania-stabilisateurs": {
    image: img04,
    alt: fr`Camion-grue Scania calé sur ses stabilisateurs, grue en extension`,
  },
  "grue/camion-grue-chantier-structure": {
    image: img05,
    alt: fr`Camion-grue déchargeant une structure métallique en treillis sur un terrain de chantier, au coucher du soleil`,
  },
  "grue/camion-grue-volvo-fm": {
    image: img06,
    alt: fr`Camion-grue Volvo FM, grue dressée, sur une aire de stationnement au petit matin`,
  },
  "grue/camion-grue-batiment-historique": {
    image: img07,
    alt: fr`Camion-grue Scania intervenant devant un bâtiment historique en rénovation, sous échafaudage`,
  },
  "grue/camion-grue-levage-centre-ville": {
    image: img08,
    alt: fr`Camion-grue Scania en levage le long d'un immeuble, en centre-ville`,
  },
  "plateau/plateau-renault-armatures": {
    image: img09,
    alt: fr`Tracteur Renault T attelé à une semi-remorque plateau chargée d'armatures métalliques, devant un entrepôt`,
  },
  "plateau/plateau-man-voie-rapide": {
    image: img10,
    alt: fr`Tracteur MAN gris et semi-remorque plateau sur une voie rapide`,
  },
  "plateau/porte-engins-man-ville": {
    image: img11,
    alt: fr`Tracteur MAN attelé à une semi-remorque surbaissée orange, dans une rue pavée en ville`,
  },
  "plateau/camions-nuit-arc-de-triomphe": {
    image: img12,
    alt: fr`Deux camions de Transports Brun de nuit devant l'Arc de Triomphe, à Paris`,
  },
  "plateau/plateau-daf-zone-stockage": {
    image: img13,
    alt: fr`Tracteur DAF et semi-remorque plateau sur une zone de stockage de matériaux`,
  },
  "plateau/porte-engins-man-gris": {
    image: img14,
    alt: fr`Tracteur MAN gris et porte-engins chargé de matériel de chantier`,
  },
  "plateau/porte-engins-pelle-volvo": {
    image: img15,
    alt: fr`Pelle sur chenilles Volvo chargée sur une semi-remorque porte-engins tractée par un DAF de Transports Brun`,
  },
  "plateau/plateau-route-mouillee": {
    image: img16,
    alt: fr`Camion à plateau, feux allumés, sur une route mouillée en fin de journée`,
  },
  "plateau/plateau-man-coucher-soleil": {
    image: img17,
    alt: fr`Tracteur MAN et semi-remorque plateau au bord d'une route, au coucher du soleil`,
  },
  "plateau/module-sur-plateau": {
    image: img18,
    alt: fr`Module préfabriqué ouvert chargé sur une semi-remorque plateau tractée par un Renault`,
  },
  "plateau/plateau-chantier-grue-a-tour": {
    image: img19,
    alt: fr`Déchargement d'un plateau Renault par une grue à tour sur un chantier de construction`,
  },
  "plateau/plateau-chargement-mixte": {
    image: img20,
    alt: fr`Semi-remorque plateau chargée de palettes et d'éléments métalliques, au bord d'une route`,
  },
  "plateau/charge-longue-nuit": {
    image: img21,
    alt: fr`Tracteur Renault T de nuit avec une charge longue balisée rouge et blanc sur le plateau`,
  },
  "plateau/plateau-bottes-de-paille": {
    image: img22,
    alt: fr`Camion Scania transportant des bottes de paille sur plateau, dans la brume`,
  },
  "plateau/poutres-beton-chantier": {
    image: img23,
    alt: fr`Semi-remorque plateau chargée de poutres en béton sur un chantier`,
  },
  "plateau/convoi-exceptionnel-module-arriere": {
    image: img24,
    alt: fr`Vue arrière d'un plateau chargé d'un module, panneau « convoi exceptionnel » en place`,
  },
  "plateau/scania-plateau-caisses-bois": {
    image: img25,
    alt: fr`Tracteur Scania et plateau chargé de caisses en bois, vue de face`,
  },
  "plateau/chargement-module-grue": {
    image: img26,
    alt: fr`Chargement à la grue d'un module préfabriqué sur une semi-remorque plateau`,
  },
  "plateau/convoi-exceptionnel-man-conteneur": {
    image: img27,
    alt: fr`Tracteur MAN en convoi exceptionnel transportant un conteneur et un engin de levage jaune`,
  },
  "plateau/plateau-treillis-soudes": {
    image: img28,
    alt: fr`Tracteur MAN et semi-remorque plateau chargée de panneaux de treillis soudés`,
  },
  "plateau/renault-caisses-palettes": {
    image: img29,
    alt: fr`Camion Renault feux allumés entre des piles de caisses-palettes en bois et en grillage`,
  },
  "plateau/man-plateau-jaune-chemin": {
    image: img30,
    alt: fr`Tracteur MAN attelé à une semi-remorque plateau jaune sur un chemin de campagne`,
  },
  "plateau/volvo-fh-caisses-grillagees": {
    image: img31,
    alt: fr`Tracteur Volvo FH et semi-remorque chargée de caisses grillagées, un second camion en arrière-plan`,
  },
  "plateau/volvo-fh-caisses-coucher-soleil": {
    image: img32,
    alt: fr`Tracteur Volvo FH et semi-remorque chargée de caisses grillagées, au coucher du soleil`,
  },
  "plateau/volvo-bleu-plateau-givre": {
    image: img33,
    alt: fr`Tracteur Volvo FH bleu et jaune avec un plateau chargé, dans un champ givré`,
  },
  "plateau/volvo-bleu-face-givre": {
    image: img34,
    alt: fr`Tracteur Volvo FH bleu et jaune vu de face sur un chemin givré`,
  },
  "plateau/dechargement-poutrelles-acier": {
    image: img35,
    alt: fr`Déchargement à la grue de poutrelles en acier depuis un plateau`,
  },
  "plateau/levage-poutrelle-chantier": {
    image: img36,
    alt: fr`Levage d'une poutrelle métallique depuis un plateau, sur un terrain en gravier`,
  },
  "marchandises/renault-tautliner-parking": {
    image: img37,
    alt: fr`Tracteur Renault T et semi-remorque bâchée Transports Brun sur une aire de stationnement`,
  },
  "marchandises/porteur-man-village": {
    image: img38,
    alt: fr`Porteur MAN bâché dans une rue de village fleurie`,
  },
  "marchandises/porteur-bache-quai": {
    image: img39,
    alt: fr`Porteur bâché, rideau latéral ouvert, sous l'auvent d'un quai de chargement`,
  },
  "marchandises/volvo-tautliner-ouvert": {
    image: img40,
    alt: fr`Semi-remorque tautliner ouverte sur le côté, tractée par un Volvo FH, sur une aire de chargement`,
  },
  "marchandises/renault-t-semi-remorque": {
    image: img41,
    alt: fr`Tracteur Renault T attelé à une semi-remorque, le long d'un bâtiment en bois`,
  },
  "marchandises/volvo-bleu-tautliner": {
    image: img42,
    alt: fr`Tracteur Volvo FH bleu et jaune avec une semi-remorque bâchée`,
  },
  "marchandises/scania-fourgon-entrepot": {
    image: img43,
    alt: fr`Tracteur Scania et semi-remorque fourgon devant un entrepôt, au crépuscule`,
  },
  "marchandises/convoi-exceptionnel-cuve": {
    image: img44,
    alt: fr`Convoi exceptionnel : cuve métallique levée à la grue au-dessus d'une semi-remorque Renault`,
  },
  "marchandises/murs-prefabriques-scania": {
    image: img45,
    alt: fr`Tracteur Scania transportant des murs préfabriqués en béton`,
  },
  "marchandises/scania-conteneur-foret": {
    image: img46,
    alt: fr`Tracteur Scania tirant un conteneur maritime rouge sur une route forestière`,
  },
  "marchandises/structure-metallique-centrale": {
    image: img47,
    alt: fr`Semi-remorque chargée d'une structure métallique, tours de refroidissement d'une centrale en arrière-plan`,
  },
  "marchandises/cuve-levage-grue": {
    image: img48,
    alt: fr`Grande cuve métallique soulevée par une grue au-dessus d'une semi-remorque Renault`,
  },
  "marchandises/benne-man-granulats": {
    image: img49,
    alt: fr`Camion benne MAN sur un site de granulats, chargeuse en arrière-plan`,
  },
  "marchandises/renault-tautliner-cloture": {
    image: img50,
    alt: fr`Tracteur Renault T et semi-remorque bâchée le long d'une clôture`,
  },
  "marchandises/volvo-bleu-tautliner-neige": {
    image: img51,
    alt: fr`Tracteur Volvo FH bleu et jaune avec une semi-remorque bâchée, dans la neige`,
  },
  "marchandises/bache-logo-transports-brun": {
    image: img52,
    alt: fr`Bâche latérale d'une semi-remorque floquée du logo Transports Brun`,
  },
  "marchandises/renault-t-tautliner-ciel-bleu": {
    image: img53,
    alt: fr`Tracteur Renault T et semi-remorque bâchée blanche sous un ciel bleu`,
  },
  "marchandises/man-tgx-gris-tautliner": {
    image: img54,
    alt: fr`Tracteur MAN TGX gris et semi-remorque bâchée`,
  },
  "equipement/remorque-trax-cadres-beton": {
    image: img55,
    alt: fr`Remorque Trax à rampes chargée de cadres en béton préfabriqués`,
  },
  "equipement/remorque-trax-chargee": {
    image: img56,
    alt: fr`Remorque Trax chargée d'éléments en béton, rampes abaissées`,
  },
  "equipement/remorque-trax-rampes": {
    image: img57,
    alt: fr`Rampes arrière d'une remorque Trax déployées sur un parking`,
  },
  "equipement/remorque-trax-vue-arriere": {
    image: img58,
    alt: fr`Vue arrière d'une remorque Trax chargée, rampes au sol`,
  },
  "equipement/tautliner-hayon": {
    image: img59,
    alt: fr`Arrière d'une semi-remorque tautliner Transports Brun équipée d'un hayon élévateur`,
  },
  "flotte/flotte-alignee": {
    image: img60,
    alt: fr`La flotte de tracteurs Transports Brun alignée sur un parc`,
  },
  "flotte/daf-xg-montagnes": {
    image: img61,
    alt: fr`Tracteur DAF XG aux couleurs de Transports Brun, montagnes en arrière-plan`,
  },
  "flotte/daf-passerelle-dunlop": {
    image: img62,
    alt: fr`Tracteur DAF de Transports Brun sous la passerelle Dunlop d'un circuit automobile`,
  },
  "flotte/flotte-nuit": {
    image: img63,
    alt: fr`Trois tracteurs de Transports Brun, feux allumés, à la tombée de la nuit`,
  },
  "flotte/quatre-tracteurs": {
    image: img64,
    alt: fr`Quatre tracteurs Volvo, DAF, MAN et Renault stationnés côte à côte`,
  },
  "flotte/man-tgx-enseigne": {
    image: img65,
    alt: fr`Tracteur MAN TGX de Transports Brun stationné devant l'enseigne de l'entreprise`,
  },
  "flotte/daf-xg-decoration-noire": {
    image: img66,
    alt: fr`Tracteur DAF XG blanc décoré du grand logo circulaire Transports Brun`,
  },
  "flotte/daf-xg-livree": {
    image: img67,
    alt: fr`Tracteur DAF XG aux couleurs de Transports Brun, d'autres camions de la flotte en arrière-plan`,
  },
  "flotte/quatre-tracteurs-ciel-bleu": {
    image: img68,
    alt: fr`Quatre tracteurs Transports Brun alignés sous un ciel bleu`,
  },
  "flotte/volvo-fh-crepuscule": {
    image: img69,
    alt: fr`Tracteur Volvo FH de Transports Brun, feux allumés, au crépuscule`,
  },
  "flotte/trois-tracteurs-caisses-grillagees": {
    image: img70,
    alt: fr`Trois tracteurs de Transports Brun avec des semi-remorques chargées de caisses grillagées`,
  },
  "flotte/volvo-fh-blanc": {
    image: img71,
    alt: fr`Tracteur Volvo FH blanc aux couleurs de Transports Brun sous un ciel nuageux`,
  },
  "flotte/deux-man-tgx": {
    image: img72,
    alt: fr`Deux tracteurs MAN TGX de Transports Brun stationnés côte à côte`,
  },
  "flotte/volvo-bleu-neige": { image: img73, alt: fr`Tracteur Volvo FH bleu recouvert de neige` },
  "flotte/man-tgx-blanc": {
    image: img74,
    alt: fr`Tracteur MAN TGX blanc de Transports Brun, vue de trois quarts`,
  },
  "flotte/iveco-s-way": {
    image: img75,
    alt: fr`Tracteur Iveco S-Way décoré du logo Transports Brun`,
  },
  "flotte/flotte-alignee-soir": {
    image: img76,
    alt: fr`Camions de Transports Brun alignés en fin de journée`,
  },
  "flotte/daf-volvo-man": {
    image: img77,
    alt: fr`Tracteurs DAF, Volvo et MAN de Transports Brun stationnés côte à côte`,
  },
  "flotte/flotte-panorama": {
    image: img78,
    alt: fr`Vue panoramique de la flotte de tracteurs Transports Brun sous un ciel couvert`,
  },
  "flotte/trois-tracteurs-contre-plongee": {
    image: img79,
    alt: fr`Trois tracteurs de Transports Brun photographiés en contre-plongée`,
  },
  "flotte/deux-volvo-fh": {
    image: img80,
    alt: fr`Deux tracteurs Volvo FH de Transports Brun devant un atelier`,
  },
  "flotte/volvo-fh-460-face": {
    image: img81,
    alt: fr`Tracteur Volvo FH 460 de Transports Brun vu de face`,
  },
  "flotte/volvo-bleu-sol-mouille": {
    image: img82,
    alt: fr`Tracteur Volvo FH bleu et jaune sur un sol mouillé`,
  },
  "flotte/renault-t-face": {
    image: img83,
    alt: fr`Tracteur Renault T blanc de Transports Brun vu de face`,
  },
  "flotte/volvo-fh-reflet": {
    image: img84,
    alt: fr`Tracteur Volvo FH portes ouvertes, se reflétant dans une flaque`,
  },
  "flotte/volvo-fh-portes-ouvertes": {
    image: img85,
    alt: fr`Tracteur Volvo FH de Transports Brun, portes ouvertes, en contre-plongée`,
  },
  "flotte/volvo-fh-460-cabine": {
    image: img86,
    alt: fr`Cabine d'un Volvo FH 460 aux couleurs de Transports Brun, vue de profil`,
  },
  "divers/scania-plateau-crepuscule-assombri": {
    image: img87,
    alt: fr`Tracteur Scania et plateau chargé, feux allumés au crépuscule (version assombrie du bandeau d'origine)`,
  },
  "divers/man-fourgon-assombri": {
    image: img88,
    alt: fr`Tracteur MAN et semi-remorque fourgon blanche (version assombrie du bandeau d'origine)`,
  },
} satisfies Record<string, Entry>;

export type PhotoId = keyof typeof library;

export type Photo = Entry & { id: PhotoId };

export function photo(id: PhotoId): Photo {
  return { id, ...library[id] };
}

export function photos(ids: readonly PhotoId[]): Photo[] {
  return ids.map(photo);
}

/** Galerie de la page « Transport plateau / grue » (ordre de la galerie actuelle, + 3 photos de la page) */
export const plateauGallery = [
  "grue/bras-de-grue-deploye",
  "grue/camion-grue-scania-gros-plan",
  "grue/camion-grue-scania-stabilisateurs",
  "flotte/daf-xg-decoration-noire",
  "grue/camion-grue-chantier-structure",
  "flotte/man-tgx-enseigne",
  "plateau/porte-engins-man-ville",
  "plateau/camions-nuit-arc-de-triomphe",
  "plateau/plateau-daf-zone-stockage",
  "plateau/porte-engins-man-gris",
  "plateau/plateau-route-mouillee",
  "flotte/volvo-fh-crepuscule",
  "plateau/plateau-man-coucher-soleil",
  "grue/camion-grue-volvo-fm",
  "plateau/module-sur-plateau",
  "plateau/plateau-chantier-grue-a-tour",
  "plateau/plateau-chargement-mixte",
  "plateau/charge-longue-nuit",
  "plateau/plateau-bottes-de-paille",
  "plateau/poutres-beton-chantier",
  "plateau/convoi-exceptionnel-module-arriere",
  "plateau/scania-plateau-caisses-bois",
  "plateau/chargement-module-grue",
  "plateau/convoi-exceptionnel-man-conteneur",
  "plateau/plateau-treillis-soudes",
  "plateau/renault-caisses-palettes",
  "plateau/man-plateau-jaune-chemin",
  "flotte/trois-tracteurs-caisses-grillagees",
  "flotte/volvo-fh-blanc",
  "plateau/volvo-fh-caisses-grillagees",
  "plateau/volvo-fh-caisses-coucher-soleil",
  "flotte/deux-man-tgx",
  "plateau/volvo-bleu-plateau-givre",
  "plateau/volvo-bleu-face-givre",
  "plateau/dechargement-poutrelles-acier",
  "plateau/levage-poutrelle-chantier",
  "flotte/volvo-bleu-neige",
  "plateau/plateau-man-voie-rapide",
  "plateau/plateau-renault-armatures",
  "plateau/porte-engins-pelle-volvo",
] as const satisfies readonly PhotoId[];

/** Galerie de la page « Transport de marchandises » (ordre de la galerie actuelle) */
export const marchandisesGallery = [
  "marchandises/porteur-man-village",
  "flotte/man-tgx-blanc",
  "flotte/daf-xg-livree",
  "flotte/iveco-s-way",
  "marchandises/porteur-bache-quai",
  "flotte/flotte-alignee-soir",
  "flotte/daf-volvo-man",
  "flotte/flotte-panorama",
  "marchandises/volvo-tautliner-ouvert",
  "flotte/trois-tracteurs-contre-plongee",
  "flotte/deux-volvo-fh",
  "flotte/volvo-fh-460-face",
  "flotte/volvo-bleu-sol-mouille",
  "marchandises/renault-t-semi-remorque",
  "flotte/renault-t-face",
  "marchandises/volvo-bleu-tautliner",
  "marchandises/scania-fourgon-entrepot",
  "marchandises/convoi-exceptionnel-cuve",
  "marchandises/murs-prefabriques-scania",
  "marchandises/scania-conteneur-foret",
  "marchandises/structure-metallique-centrale",
  "marchandises/cuve-levage-grue",
  "marchandises/benne-man-granulats",
  "marchandises/renault-tautliner-cloture",
  "flotte/volvo-fh-reflet",
  "flotte/volvo-fh-portes-ouvertes",
  "flotte/volvo-fh-460-cabine",
] as const satisfies readonly PhotoId[];

/** Mosaïque « Notre histoire » de l'accueil (galerie actuelle de l'accueil) */
export const homeMosaic = [
  "flotte/daf-xg-decoration-noire",
  "flotte/daf-xg-livree",
  "flotte/quatre-tracteurs-ciel-bleu",
  "marchandises/man-tgx-gris-tautliner",
  "marchandises/bache-logo-transports-brun",
  "plateau/porte-engins-pelle-volvo",
  "marchandises/renault-t-tautliner-ciel-bleu",
  "grue/camion-grue-batiment-historique",
  "grue/camion-grue-levage-centre-ville",
] as const satisfies readonly PhotoId[];

/** Identifiant de photo vérifié à la compilation : pid("grue/camion-grue-vignoble") */
export function pid(id: PhotoId): PhotoId {
  return id;
}
