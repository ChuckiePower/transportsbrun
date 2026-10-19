/**
 * Schéma du formulaire de devis, partagé entre le navigateur (react-hook-form)
 * et le serveur (route /api/contact). Messages d'erreur en français.
 */
import { z } from "zod";

// Pas de compilation à la volée (new Function) : compatible avec la CSP sans 'unsafe-eval'
z.config({ jitless: true });

export const requestTypes = [
  "Transport plateau",
  "Camion-grue",
  "Transport de marchandises",
  "Convoi exceptionnel",
  "ADR",
  "Autre",
] as const;

/** Champs d'une ligne : pas de retour à la ligne (aucune injection d'en-tête possible) */
const singleLine = (max: number, tooLong: string) =>
  z
    .string()
    .trim()
    .max(max, tooLong)
    .regex(/^[^\r\n]*$/, "Ce champ doit tenir sur une seule ligne.");

const optionalLine = (max: number, tooLong: string) =>
  singleLine(max, tooLong).optional().or(z.literal(""));

/** Date AAAA-MM-JJ valide, pas dans le passé (tolérance d'un jour pour les fuseaux) */
function isValidFutureDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) return false;
  return d.getTime() >= Date.now() - 36 * 3600 * 1000;
}

const nameField = singleLine(100, "100 caractères maximum.").min(2, "Indiquez votre nom.");
const phoneField = singleLine(30, "Numéro trop long.")
  .min(1, "Indiquez un numéro de téléphone.")
  .refine(
    (v) =>
      /^\+?[\d\s().-]+$/.test(v) &&
      (v.match(/\d/g)?.length ?? 0) >= 9 &&
      (v.match(/\d/g)?.length ?? 0) <= 15,
    { message: "Numéro de téléphone invalide (exemple : 06 12 34 56 78)." },
  );
const consentField = z.literal(true, { error: "Votre accord est nécessaire pour traiter la demande." });

export const quoteSchema = z.object({
  name: nameField,
  company: optionalLine(120, "120 caractères maximum."),
  email: singleLine(254, "Adresse e-mail trop longue.")
    .min(1, "Indiquez votre adresse e-mail.")
    .pipe(z.email("Adresse e-mail invalide (exemple : nom@entreprise.fr).")),
  phone: phoneField,
  requestType: z.enum(requestTypes, { error: "Choisissez le type de demande." }),
  pickup: optionalLine(200, "200 caractères maximum."),
  delivery: optionalLine(200, "200 caractères maximum."),
  date: z
    .string()
    .trim()
    .refine((v) => v === "" || isValidFutureDate(v), { message: "Date invalide ou déjà passée." })
    .optional(),
  cargo: z.string().trim().max(1000, "1 000 caractères maximum.").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Décrivez votre demande (10 caractères minimum).")
    .max(5000, "5 000 caractères maximum."),
  consent: consentField,
});

/** Champs de chaque étape du formulaire de devis (même schéma, découpé pour l'affichage) */
export const stepFields = {
  1: ["requestType", "pickup", "delivery", "date", "cargo"],
  2: ["name", "company", "email", "phone", "message", "consent"],
} as const;

/** Demande de rappel (« Être rappelé ») : schéma allégé, mêmes protections côté serveur */
export const callbackSchema = z.object({
  source: z.literal("rappel"),
  name: nameField,
  phone: phoneField,
  requestType: z.enum(requestTypes).optional().or(z.literal("")),
  consent: consentField,
});

export type CallbackInput = z.input<typeof callbackSchema>;
export type CallbackData = z.output<typeof callbackSchema>;

/**
 * Présélection depuis l'URL (/contact?type=…&nature=…) : seules ces valeurs sont acceptées,
 * jamais le texte brut du paramètre.
 */
export const typeSlugs: Record<string, (typeof requestTypes)[number]> = {
  "transport-plateau": "Transport plateau",
  "camion-grue": "Camion-grue",
  "transport-marchandises": "Transport de marchandises",
  "convoi-exceptionnel": "Convoi exceptionnel",
  adr: "ADR",
  autre: "Autre",
};

export const natureSlugs: Record<string, string> = {
  "murs-prefabriques": "Murs préfabriqués",
  "sable-gravier": "Sable et gravier",
  modules: "Modules",
  treillis: "Treillis",
  "cuves-de-vendange": "Cuves de vendange",
  "charges-hors-normes": "Charge hors normes",
  "adr-colisage": "ADR de base et colisage",
};

export function quoteLink(type: keyof typeof typeSlugs, nature?: keyof typeof natureSlugs): string {
  const q = new URLSearchParams({ type });
  if (nature) q.set("nature", nature);
  return `/contact?${q.toString()}#devis`;
}

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

/** Champs techniques anti-spam ajoutés à l'envoi (non affichés) */
export type QuotePayload = QuoteInput & {
  /** Pot de miel : doit rester vide */
  website?: string;
  /** Horodatage (ms) de l'affichage du formulaire */
  startedAt?: number;
};

/** Délai minimal entre l'affichage du formulaire et l'envoi (envois JavaScript) */
export const MIN_FILL_MS = 3000;
