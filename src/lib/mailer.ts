import "server-only";
import { appendFile } from "node:fs/promises";
import nodemailer, { type Transporter } from "nodemailer";
import { mainEmail, site } from "@/content/site";
import type { QuoteData } from "./quote-schema";

/**
 * Envoi des demandes de devis par e-mail.
 *
 * - SMTP_HOST défini → envoi réel via SMTP (IONOS : smtp.ionos.fr à confirmer).
 * - MAIL_OUTBOX_FILE défini → aucun envoi, le message est ajouté (JSON) à ce fichier (tests).
 * - Sinon, hors production → aucun envoi, le message est affiché dans la console.
 * - Sinon (production sans SMTP) → erreur explicite : on ne perd pas une demande en silence.
 */
export class MailNotConfiguredError extends Error {
  constructor() {
    super("SMTP non configuré (SMTP_HOST manquant) : impossible d'envoyer la demande.");
  }
}

type Mode = "smtp" | "file" | "console";

function mode(): Mode {
  if (process.env.SMTP_HOST) return "smtp";
  if (process.env.MAIL_OUTBOX_FILE) return "file";
  if (process.env.NODE_ENV !== "production") return "console";
  throw new MailNotConfiguredError();
}

let smtp: Transporter | null = null;
function smtpTransport(): Transporter {
  smtp ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? "" }
      : undefined,
  });
  return smtp;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rows(data: QuoteData): [string, string][] {
  return [
    ["Nom", data.name],
    ["Entreprise", data.company || "—"],
    ["E-mail", data.email],
    ["Téléphone", data.phone],
    ["Type de demande", data.requestType],
    ["Lieu de chargement", data.pickup || "—"],
    ["Lieu de livraison", data.delivery || "—"],
    [
      "Date souhaitée",
      data.date ? new Date(`${data.date}T12:00:00Z`).toLocaleDateString("fr-FR") : "—",
    ],
    ["Nature de la charge", data.cargo || "—"],
  ];
}

export function buildQuoteEmail(data: QuoteData, meta: { receivedAt: Date }) {
  const subject = `Demande de devis – ${data.requestType} – ${data.name}${data.company ? ` (${data.company})` : ""}`;
  const when = meta.receivedAt.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

  const text = [
    `Nouvelle demande reçue depuis le site ${site.url} le ${when}.`,
    "",
    ...rows(data).map(([k, v]) => `${k} : ${v}`),
    "",
    "Message :",
    data.message,
    "",
    "—",
    "Le demandeur a accepté que ses données soient utilisées pour traiter sa demande.",
    "Répondre à cet e-mail écrit directement au demandeur.",
  ].join("\n");

  const html = `<!doctype html><html lang="fr"><body style="font-family:Arial,sans-serif;color:#131417">
<h1 style="font-size:20px">Nouvelle demande de devis</h1>
<p style="color:#53565e">Reçue depuis ${escapeHtml(site.url)} le ${escapeHtml(when)}.</p>
<table cellpadding="6" style="border-collapse:collapse">
${rows(data)
  .map(
    ([k, v]) =>
      `<tr><th align="left" style="border-bottom:1px solid #d8d1c4;padding-right:16px">${escapeHtml(k)}</th><td style="border-bottom:1px solid #d8d1c4">${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<h2 style="font-size:16px;margin-top:24px">Message</h2>
<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
<p style="color:#53565e;font-size:13px">Le demandeur a accepté que ses données soient utilisées pour traiter sa demande. Répondre à cet e-mail écrit directement au demandeur.</p>
</body></html>`;

  return {
    from: process.env.CONTACT_FROM || process.env.SMTP_USER || mainEmail.address,
    to: process.env.CONTACT_TO || mainEmail.address,
    // Adresse validée par le schéma (une seule ligne, format e-mail)
    replyTo: { name: data.name, address: data.email },
    subject,
    text,
    html,
  };
}

export async function sendQuoteEmail(data: QuoteData): Promise<void> {
  const message = buildQuoteEmail(data, { receivedAt: new Date() });
  const m = mode();
  if (m === "smtp") {
    await smtpTransport().sendMail(message);
    return;
  }
  // Pas d'envoi réel : transport JSON de Nodemailer (construit le message sans l'expédier)
  const info = await nodemailer.createTransport({ jsonTransport: true }).sendMail(message);
  if (m === "file") {
    await appendFile(process.env.MAIL_OUTBOX_FILE!, `${info.message.toString()}\n`, "utf8");
  } else {
    console.info(
      "[contact] SMTP non configuré : e-mail NON envoyé (mode développement)\n" + message.text,
    );
  }
}
