import { z } from "zod";
import { mainPhone } from "@/content/site";
import { MailNotConfiguredError, sendCallbackEmail, sendQuoteEmail } from "@/lib/mailer";
import { callbackSchema, MIN_FILL_MS, quoteSchema } from "@/lib/quote-schema";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Réception des demandes :
 * - JSON (navigateur avec JavaScript) : devis (par défaut) ou rappel (`source: "rappel"`) ;
 * - formulaire classique application/x-www-form-urlencoded (navigateur SANS JavaScript) :
 *   devis uniquement, réponse par redirection vers /contact/merci ou /contact/erreur.
 * Protections communes : origine, limitation de débit, taille, pot de miel ;
 * délai minimal de saisie pour les envois JavaScript ; Origin obligatoire pour les envois sans JS.
 */
const MAX_BODY_BYTES = 20_000;
const RATE_MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);
const RATE_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
const PHONE = mainPhone.display;

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** Redirection 303 (POST → GET) pour l'envoi sans JavaScript */
function redirect(req: Request, path: string) {
  return new Response(null, {
    status: 303,
    headers: { Location: new URL(path, req.url).pathname, "Cache-Control": "no-store" },
  });
}

/** IP du visiteur transmise par le reverse proxy (Caddy / nginx) */
function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "inconnue";
}

/** Origine du navigateur : absente (outil) ou identique au site */
function originStatus(req: Request): "same" | "absent" | "foreign" {
  const origin = req.headers.get("origin");
  if (!origin) return "absent";
  try {
    const o = new URL(origin).host;
    const allowed = new Set([req.headers.get("x-forwarded-host"), req.headers.get("host")]);
    if (process.env.SITE_URL) allowed.add(new URL(process.env.SITE_URL).host);
    return allowed.has(o) ? "same" : "foreign";
  } catch {
    return "foreign";
  }
}

export async function POST(req: Request) {
  const isForm = (req.headers.get("content-type") ?? "").includes(
    "application/x-www-form-urlencoded",
  );
  const fail = (
    status: number,
    error: string,
    extra: Record<string, unknown> = {},
    headers: Record<string, string> = {},
  ) =>
    isForm
      ? redirect(req, "/contact/erreur")
      : json({ ok: false, error, ...extra }, status, headers);
  const invalid = (error: z.ZodError) =>
    fail(422, "Certains champs sont invalides.", {
      fieldErrors: z.flattenError(error).fieldErrors,
    });

  const origin = originStatus(req);
  // Sans JavaScript, le navigateur envoie toujours l'en-tête Origin : son absence trahit un robot
  if (origin === "foreign" || (isForm && origin === "absent"))
    return fail(403, "Origine non autorisée.");

  const limit = rateLimit(clientIp(req), { max: RATE_MAX, windowMs: RATE_WINDOW_MS });
  if (!limit.ok) {
    return fail(
      429,
      `Trop de demandes envoyées depuis votre connexion. Réessayez dans quelques minutes ou appelez-nous au ${PHONE}.`,
      {},
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES)
    return fail(413, "Demande trop volumineuse.");

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return fail(413, "Demande trop volumineuse.");
    if (isForm) {
      const params = new URLSearchParams(raw);
      body = Object.fromEntries(params.entries());
      body.consent = params.get("consent") === "on" || params.get("consent") === "true";
    } else {
      body = JSON.parse(raw) as Record<string, unknown>;
    }
    if (!body || typeof body !== "object") throw new Error("corps invalide");
  } catch {
    return fail(400, "Requête invalide.");
  }

  // Pot de miel rempli : on répond comme si tout allait bien, sans rien envoyer
  if (typeof body.website === "string" && body.website.trim() !== "") {
    console.warn("[contact] envoi ignoré (pot de miel)");
    return isForm ? redirect(req, "/contact/merci") : json({ ok: true });
  }

  // Envoi JavaScript trop rapide après l'affichage du formulaire : très probablement un robot
  if (!isForm) {
    const startedAt = Number(body.startedAt);
    const elapsed = Date.now() - startedAt;
    if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > 7 * 24 * 3600 * 1000) {
      return json(
        {
          ok: false,
          error: "Envoi trop rapide. Patientez quelques secondes puis renvoyez le formulaire.",
        },
        400,
      );
    }
  }

  const isCallback = body.source === "rappel";
  let send: () => Promise<void>;
  if (isCallback) {
    const parsed = callbackSchema.safeParse(body);
    if (!parsed.success) return invalid(parsed.error);
    send = () => sendCallbackEmail(parsed.data);
  } else {
    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) return invalid(parsed.error);
    send = () => sendQuoteEmail(parsed.data);
  }

  try {
    await send();
  } catch (err) {
    console.error(
      "[contact] échec de l'envoi :",
      err instanceof MailNotConfiguredError ? err.message : err,
    );
    return fail(
      err instanceof MailNotConfiguredError ? 503 : 502,
      `L'envoi n'a pas abouti. Réessayez plus tard ou appelez-nous au ${PHONE}.`,
    );
  }

  return isForm ? redirect(req, "/contact/merci") : json({ ok: true });
}
