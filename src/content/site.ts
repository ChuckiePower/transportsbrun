/**
 * Source unique de vérité : identité, coordonnées, horaires, liens.
 * Toute coordonnée affichée sur le site (en-tête, pied de page, contact, JSON-LD,
 * e-mails du formulaire…) provient de ce fichier.
 */
import { fr } from "@/lib/typo";
import { SITE_URL } from "@/lib/site-url";

export type Phone = {
  /** Libellé affiché (Administration, Exploitation, Commercial) */
  label: string;
  /** Numéro tel qu'affiché */
  display: string;
  /** Numéro au format international pour tel: et JSON-LD */
  e164: string;
};

export type Email = {
  label: string;
  address: string;
};

export const site = {
  name: "Transports Brun",
  /** Accroche historique du site */
  tagline: fr`Transports routiers de gros œuvre et fret interurbains`,
  description: fr`Société familiale de transport routier basée à Saint-Hippolyte (Haut-Rhin) : transport plateau, camion-grue, charges lourdes et hors normes, fret interurbain et ADR.`,
  /** URL publique canonique (variable d'environnement SITE_URL, voir src/lib/site-url.ts) */
  url: SITE_URL,
  locale: "fr_FR",
  foundingDate: "2018-03-02",

  address: {
    street: "5 Route de Rodern",
    postalCode: "68590",
    city: "Saint-Hippolyte",
    /** Ville telle qu'écrite sur le site actuel */
    cityDisplay: "SAINT-HIPPOLYTE",
    department: "Haut-Rhin",
    region: "Alsace",
    country: "FR",
  },
  geo: { latitude: 48.2185225, longitude: 7.3924954 },
  googleMapsUrl:
    "https://www.google.com/maps/place/Transports+Brun/@48.2185225,7.3924954,15z/data=!4m5!3m4!1s0x0:0x93e5bff6a2d8ea7d!8m2!3d48.2185225!4d7.3924954",
  openStreetMapUrl:
    "https://www.openstreetmap.org/?mlat=48.2185225&mlon=7.3924954#map=16/48.2185225/7.3924954",

  phones: [
    { label: "Administration", display: "03 89 73 34 63", e164: "+33389733463" },
    { label: "Exploitation", display: "07 88 48 87 25", e164: "+33788488725" },
    { label: "Commercial", display: "06 17 29 40 86", e164: "+33617294086" },
  ] as const satisfies readonly Phone[],

  emails: [
    { label: "Contact", address: "contact@transports-brun.com" },
    { label: "Comptabilité", address: "comptabilite@transports-brun.com" },
    { label: "Exploitation", address: "exploitation@transports-brun.com" },
    { label: "Commercial", address: "commercialtransportsbrun@gmail.com" },
  ] as const satisfies readonly Email[],

  hours: {
    /** Affichage court (top bar, pied de page) */
    display: fr`Lun-Ven : 8h-12h / 14h-18h`,
    days: fr`Lun-Ven`,
    slots: "8h-12h / 14h-18h",
    /** En toutes lettres, pour les phrases */
    sentence: "du lundi au vendredi, de 8h à 12h et de 14h à 18h",
    /** Pour le JSON-LD (openingHoursSpecification) */
    spec: [
      { opens: "08:00", closes: "12:00" },
      { opens: "14:00", closes: "18:00" },
    ],
  },

  social: {
    facebook: "https://www.facebook.com/TransportsBrun/",
  },

  /**
   * Ligne de crédit facultative en pied de page (ex. « Site réalisé par … »).
   * Vide par défaut : l'ancienne agence web n'est plus créditée.
   */
  credit: "" as string,
} as const;

/** Téléphone principal (standard / administration) */
export const mainPhone: Phone = site.phones[0];
/** E-mail principal */
export const mainEmail: Email = site.emails[0];

export function telHref(phone: Phone): string {
  return `tel:${phone.e164}`;
}

export function mailtoHref(email: Email | string): string {
  return `mailto:${typeof email === "string" ? email : email.address}`;
}

export type NavItem = { href: string; label: string };

/** Navigation principale (ordre du site actuel) */
export const mainNav: NavItem[] = [
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/transport-routier-haut-rhin-alsace", label: "Savoir-faire" },
  { href: "/transport-plateaux-camion-grue-haut-rhin-alsace", label: "Transport plateau / grue" },
  {
    href: "/transports-de-marchandises-et-btp-haut-rhin-alsace",
    label: "Transport de marchandises",
  },
  { href: "/notre-equipement", label: "Notre équipement" },
  { href: "/contact", label: "Contact" },
];

export const legalNav: NavItem[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politiques-de-confidentialites", label: "Politique de confidentialité" },
];

/** Ancre du formulaire de devis */
export const quoteHref = "/contact#devis";
