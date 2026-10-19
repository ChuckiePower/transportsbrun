import type { NextConfig } from "next";

/**
 * En-têtes de sécurité appliqués par l'application (le reverse proxy ajoute HSTS).
 * CSP : sans nonce pour garder des pages statiques (voir docs/DECISIONS.md).
 */
const isDev = process.env.NODE_ENV !== "production";

// Mesure d'audience auto-hébergée facultative (voir src/components/seo/Analytics.tsx)
const analyticsOrigin = (() => {
  try {
    return process.env.ANALYTICS_SCRIPT_URL ? new URL(process.env.ANALYTICS_SCRIPT_URL).origin : "";
  } catch {
    return "";
  }
})();
const extra = analyticsOrigin ? ` ${analyticsOrigin}` : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${extra}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}${extra}`,
  // Carte OpenStreetMap chargée uniquement après un clic du visiteur
  "frame-src https://www.openstreetmap.org",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Serveur autonome pour l'image Docker ; sur Vercel (VERCEL=1 pendant le build),
  // on laisse Vercel empaqueter le site à sa façon.
  output: process.env.VERCEL ? undefined : "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  // Les redirections « slash final » sont gérées ci-dessous en 301 (au lieu du 308 par défaut).
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 82],
    deviceSizes: [384, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [96, 160, 256, 320],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      // www → domaine nu (doublé par le reverse proxy)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.transports-brun.com" }],
        destination: "https://transports-brun.com/:path*",
        statusCode: 301,
      },
      // Reliquats Joomla : /index.php et /index.php/xxx
      { source: "/index.php", destination: "/", statusCode: 301 },
      { source: "/index.php/:path*", destination: "/:path*", statusCode: 301 },
      // Slash final : /page/ → /page
      { source: "/:path+/", destination: "/:path+", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
