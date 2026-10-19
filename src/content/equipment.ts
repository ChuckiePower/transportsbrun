/**
 * Parc de véhicules (page « Notre équipement » et teaser de l'accueil).
 * Composition reprise mot pour mot du site actuel ; seule la présentation change.
 */
import type { PhotoId } from "@/content/gallery";
import { fr } from "@/lib/typo";

/** Inventaire du parc, dans l'ordre du site actuel */
export const fleetInventory: { item: string; details?: string[] }[] = [
  { item: "Tracteurs" },
  {
    item: "Plateaux",
    details: [
      "3 normaux",
      fr`2 plateaux ranchers adaptables en porte-conteneur`,
      "1 plateau ridelles",
      "1 plateau ranchers",
      fr`2 plateaux (dont 1 à ranchers) surbaissés adaptables au transport de conteneurs 20′`,
    ],
  },
  { item: "Tautliners" },
  { item: "Openbox", details: [fr`dont une adaptable en porte-conteneur`] },
  { item: "Tautliners porte-bobine" },
  { item: "Tautliners avec hayon" },
  { item: "Remorque Trax" },
  { item: "Remorques porte-béton" },
  { item: "Camion-grue avec remorque" },
];

export const fleetCapabilities = {
  title: fr`Capacité convoi exceptionnel et ADR`,
  text: fr`Capacité pour du convoi exceptionnel (catégorie 1 et 2) et ADR.`,
};

export type EquipmentCategory = {
  id: string;
  title: string;
  /** Ce que le parc comprend dans cette catégorie (repris de l'inventaire) */
  composition: string[];
  photos: PhotoId[];
};

/**
 * Catégories visuelles. « Openbox », « Remorque Trax », « Camion tautliner » et
 * « Camion grue » reprennent les galeries actuelles ; « Plateaux » illustre la
 * ligne correspondante de l'inventaire avec des photos de la galerie plateau.
 */
export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "plateaux",
    title: "Plateaux",
    composition: [
      "3 plateaux normaux",
      fr`2 plateaux ranchers adaptables en porte-conteneur`,
      "1 plateau ridelles, 1 plateau ranchers",
      fr`2 plateaux surbaissés (dont 1 à ranchers) adaptables au transport de conteneurs 20′`,
    ],
    photos: [
      "plateau/plateau-man-voie-rapide",
      "plateau/plateau-daf-zone-stockage",
      "plateau/man-plateau-jaune-chemin",
      "plateau/plateau-man-coucher-soleil",
    ],
  },
  {
    id: "openbox",
    title: "Openbox",
    composition: [fr`Openbox, dont une adaptable en porte-conteneur`],
    photos: [
      "plateau/volvo-fh-caisses-grillagees",
      "plateau/convoi-exceptionnel-man-conteneur",
      "flotte/deux-man-tgx",
      "marchandises/cuve-levage-grue",
      "plateau/poutres-beton-chantier",
      "plateau/plateau-chargement-mixte",
    ],
  },
  {
    id: "remorque-trax",
    title: "Remorque Trax",
    composition: ["Remorque Trax"],
    photos: [
      "equipement/remorque-trax-cadres-beton",
      "equipement/remorque-trax-chargee",
      "equipement/remorque-trax-rampes",
      "equipement/remorque-trax-vue-arriere",
    ],
  },
  {
    id: "tautliner",
    title: "Tautliner",
    composition: ["Tautliners", "Tautliners porte-bobine", "Tautliners avec hayon"],
    photos: [
      "marchandises/renault-tautliner-cloture",
      "marchandises/porteur-bache-quai",
      "marchandises/volvo-tautliner-ouvert",
      "equipement/tautliner-hayon",
    ],
  },
  {
    id: "camion-grue",
    title: "Camion-grue",
    composition: ["Camion-grue avec remorque"],
    photos: [
      "grue/camion-grue-volvo-fm",
      "grue/camion-grue-volvo-levage-module",
      "grue/camion-grue-batiment-historique",
      "grue/camion-grue-levage-centre-ville",
    ],
  },
];

/** Caractéristiques du camion-grue (page plateau / grue) */
export const craneSpecs: {
  name: string;
  rows: { label: string; value: string; unit: string }[];
}[] = [
  {
    name: "Porteur",
    rows: [
      { label: "Longueur de plateau", value: "6", unit: "m" },
      { label: "Hauteur", value: "1,3", unit: "m" },
      { label: "Charge utile (C.U.)", value: "7", unit: "t" },
    ],
  },
  {
    name: "Remorque",
    rows: [
      { label: "Longueur de plateau", value: "6,5", unit: "m" },
      { label: "Hauteur", value: "1", unit: "m" },
      { label: "Charge utile (C.U.)", value: "9", unit: "t" },
    ],
  },
];
