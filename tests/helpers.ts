import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const OUTBOX = path.resolve(".playwright/outbox.jsonl");

/** Messages capturés par le transport de test (un JSON par ligne) */
export function outbox(): {
  subject: string;
  replyTo: unknown;
  to: unknown;
  text: string;
  html: string;
}[] {
  if (!existsSync(OUTBOX)) return [];
  return readFileSync(OUTBOX, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

export const pages = [
  { path: "/", name: "accueil" },
  { path: "/notre-histoire", name: "notre-histoire" },
  { path: "/transport-routier-haut-rhin-alsace", name: "savoir-faire" },
  { path: "/transport-plateaux-camion-grue-haut-rhin-alsace", name: "plateau-grue" },
  { path: "/transports-de-marchandises-et-btp-haut-rhin-alsace", name: "marchandises" },
  { path: "/notre-equipement", name: "equipement" },
  { path: "/contact", name: "contact" },
  { path: "/mentions-legales", name: "mentions-legales" },
  { path: "/politiques-de-confidentialites", name: "confidentialite" },
  { path: "/page-inexistante", name: "404" },
];

let ipCounter = 10;
/** Adresse IP fictive unique : chaque test a son propre compteur de limitation */
export function freshIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

export function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "Camille Test",
    company: "Chantiers d'Essai",
    email: "camille@example.com",
    phone: "06 12 34 56 78",
    requestType: "Transport plateau",
    pickup: "Colmar",
    delivery: "Mulhouse",
    date: "",
    cargo: "Module 6 × 2,5 m, 4 t",
    message: "Bonjour, je souhaite un devis pour un transport de module.",
    consent: true,
    website: "",
    startedAt: Date.now() - 10_000,
    ...overrides,
  };
}
