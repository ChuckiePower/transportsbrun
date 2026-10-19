import { fr } from "@/lib/typo";
import type { PageMeta } from "./types";

export const contactPage = {
  meta: {
    title: "Contact et demande de devis",
    description: fr`Contactez Transports Brun à Saint-Hippolyte (68) au 03 89 73 34 63, du lundi au vendredi. Demandez votre devis de transport en ligne.`,
    ogPhoto: "flotte/man-tgx-enseigne",
    ogTitle: fr`Contact et demande de devis`,
  } satisfies PageMeta,

  hero: {
    eyebrow: fr`Contact`,
    title: fr`Contact et demande de devis`,
    lead: fr`Une question, un transport à organiser ? Appelez-nous ou décrivez votre besoin : nous vous répondons dans les plus brefs délais.`,
  },

  form: {
    title: "Demander un devis",
    intro: fr`Si vous avez des questions ou si vous souhaitez obtenir un devis, veuillez remplir le formulaire ci-dessous et nous vous contacterons dans les plus brefs délais. Nous sommes impatients de travailler avec vous et de répondre à tous vos besoins.`,
    /** Texte de consentement repris à l'identique du site actuel */
    consent: fr`En soumettant ce formulaire, j'accepte que les données renseignées soient utilisées par Transports Brun pour leur permettre de prendre connaissance de votre demande, y répondre ainsi que, le cas échéant, assurer la gestion de la relation contractuelle qui pourrait en découler.`,
    submit: "Envoyer",
  },

  map: {
    title: fr`Nous trouver`,
  },
};
