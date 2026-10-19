import { z } from "zod";
import { mainPhone } from "@/content/site";
import { MailNotConfiguredError, sendQuoteEmail } from "@/lib/mailer";
import { MIN_FILL_MS, quoteSchema } from "@/lib/quote-schema";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 20_000;
const RATE_MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);
const RATE_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
const PHONE = mainPhone.display;

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/** IP du visiteur transmise par le reverse proxy (Caddy / nginx) */
function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "inconnue";
}

/** Refuse les envois provenant d'un autre site (en-tête Origin des navigateurs) */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const o = new URL(origin).host;
    const allowed = new Set([req.headers.get("x-forwarded-host"), req.headers.get("host")]);
    if (process.env.SITE_URL) allowed.add(new URL(process.env.SITE_URL).host);
    return allowed.has(o);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ ok: false, error: "Origine non autorisée." }, 403);

  const limit = rateLimit(clientIp(req), { max: RATE_MAX, windowMs: RATE_WINDOW_MS });
  if (!limit.ok) {
    return json(
      {
        ok: false,
        error: `Trop de demandes envoyées depuis votre connexion. Réessayez dans quelques minutes ou appelez-nous au ${PHONE}.`,
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Demande trop volumineuse." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES)
      return json({ ok: false, error: "Demande trop volumineuse." }, 413);
    body = JSON.parse(raw) as Record<string, unknown>;
    if (!body || typeof body !== "object") throw new Error("corps invalide");
  } catch {
    return json({ ok: false, error: "Requête invalide." }, 400);
  }

  // Pot de miel rempli : on répond comme si tout allait bien, sans rien envoyer
  if (typeof body.website === "string" && body.website.trim() !== "") {
    console.warn("[contact] envoi ignoré (pot de miel)");
    return json({ ok: true });
  }

  // Envoi trop rapide après l'affichage du formulaire : très probablement un robot
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

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Certains champs sont invalides.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      422,
    );
  }

  try {
    await sendQuoteEmail(parsed.data);
  } catch (err) {
    console.error(
      "[contact] échec de l'envoi :",
      err instanceof MailNotConfiguredError ? err.message : err,
    );
    return json(
      {
        ok: false,
        error: `L'envoi n'a pas abouti. Réessayez plus tard ou appelez-nous au ${PHONE}.`,
      },
      err instanceof MailNotConfiguredError ? 503 : 502,
    );
  }

  return json({ ok: true });
}
