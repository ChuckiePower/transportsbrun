import { pid } from "@/content/gallery";
import { fr } from "@/lib/typo";
import type { PageMeta } from "./types";

export const equipementPage = {
  meta: {
    title: fr`Notre équipement – plateaux, grue, Trax`,
    description: fr`Le parc de Transports Brun : tracteurs, plateaux, openbox, tautliners, remorque Trax, porte-béton, camion-grue. Convoi exceptionnel cat. 1 et 2, ADR.`,
    ogPhoto: "marchandises/man-tgx-gris-tautliner",
    ogTitle: fr`Notre équipement : un parc adapté à vos marchandises`,
  } satisfies PageMeta,

  hero: {
    eyebrow: fr`Notre parc de véhicules`,
    title: fr`Notre équipement`,
    lead: fr`Tracteurs, plateaux, openbox, tautliners, remorque Trax, remorques porte-béton et camion-grue avec remorque.`,
    photo: pid("marchandises/man-tgx-gris-tautliner"),
  },

  inventory: {
    title: fr`Notre parc est composé de :`,
  },
};
