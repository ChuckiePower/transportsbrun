/**
 * URL publique canonique du site : seule source de vérité.
 * Définie par la variable d'environnement SITE_URL (build et exécution) ; la valeur par défaut
 * est le domaine final, pour que les liens canoniques restent justes si la variable manque.
 */
const DEFAULT_SITE_URL = "https://transports-brun.com";

export const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
export const SITE_HOST = new URL(SITE_URL).host;

/**
 * Le site est-il servi sur son domaine de production ?
 * Non pour les déploiements Vercel de prévisualisation (VERCEL_ENV ≠ production)
 * et pour tout hôte différent de SITE_URL (préproduction *.vercel.app, IP, localhost…).
 */
export function isProductionHost(host: string | null | undefined): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv && vercelEnv !== "production") return false;
  const h = (host ?? "").split(",")[0]!.trim().toLowerCase();
  return h === SITE_HOST.toLowerCase();
}
