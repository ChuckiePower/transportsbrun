import Script from "next/script";

/**
 * Mesure d'audience facultative, DÉSACTIVÉE par défaut.
 * Uniquement des outils auto-hébergés et sans cookie (Umami ou Plausible) :
 * aucune bannière de consentement n'est alors nécessaire.
 * Variables lues au build : ANALYTICS_PROVIDER, ANALYTICS_SCRIPT_URL, ANALYTICS_SITE_ID.
 */
export function Analytics() {
  const provider = process.env.ANALYTICS_PROVIDER;
  const src = process.env.ANALYTICS_SCRIPT_URL;
  const id = process.env.ANALYTICS_SITE_ID;
  if (!provider || !src || !id) return null;
  if (provider === "umami") {
    return <Script src={src} data-website-id={id} strategy="afterInteractive" />;
  }
  if (provider === "plausible") {
    return <Script src={src} data-domain={id} strategy="afterInteractive" />;
  }
  return null;
}
