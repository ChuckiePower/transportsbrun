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

export const quoteSchema = z.object({
  name: singleLine(100, "100 caractères maximum.").min(2, "Indiquez votre nom."),
  company: optionalLine(120, "120 caractères maximum."),
  email: singleLine(254, "Adresse e-mail trop longue.")
    .min(1, "Indiquez votre adresse e-mail.")
    .pipe(z.email("Adresse e-mail invalide (exemple : nom@entreprise.fr).")),
  phone: singleLine(30, "Numéro trop long.")
    .min(1, "Indiquez un numéro de téléphone.")
    .refine(
      (v) =>
        /^\+?[\d\s().-]+$/.test(v) &&
        (v.match(/\d/g)?.length ?? 0) >= 9 &&
        (v.match(/\d/g)?.length ?? 0) <= 15,
      {
        message: "Numéro de téléphone invalide (exemple : 06 12 34 56 78).",
      },
    ),
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
  consent: z.literal(true, { error: "Votre accord est nécessaire pour traiter la demande." }),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

/** Champs techniques anti-spam ajoutés à l'envoi (non affichés) */
export type QuotePayload = QuoteInput & {
  /** Pot de miel : doit rester vide */
  website?: string;
  /** Horodatage (ms) de l'affichage du formulaire */
  startedAt?: number;
};

/** Délai minimal entre l'affichage du formulaire et l'envoi */
export const MIN_FILL_MS = 3000;
