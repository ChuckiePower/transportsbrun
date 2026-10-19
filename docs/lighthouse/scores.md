# Scores Lighthouse (mobile, throttling simulé)

Mesurés le 19/10/2026 17:16:56 sur https://localhost:8443 (build de production local, refonte « Route douce » v2).

**Conditions** : image Docker de production (`docker compose`), derrière Caddy 2 en HTTPS/HTTP/2 avec
compression zstd (`deploy/Caddyfile.local`), Lighthouse 13.5 en profil mobile par défaut (Moto G Power
émulé, réseau 4G lent et CPU ×4 **simulés**), Chromium 141.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 | 2.3 s | 0 | 100 ms |
| `/notre-histoire` | 99 | 100 | 100 | 100 | 2.1 s | 0 | 80 ms |
| `/transport-routier-haut-rhin-alsace` | 98 | 100 | 100 | 100 | 2.4 s | 0 | 60 ms |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 98 | 100 | 100 | 100 | 2.2 s | 0 | 130 ms |
| `/transports-de-marchandises-et-btp-haut-rhin-alsace` | 95 | 100 | 100 | 100 | 2.7 s | 0 | 110 ms |
| `/notre-equipement` | 96 | 100 | 100 | 100 | 2.6 s | 0 | 120 ms |
| `/contact` | 94 | 100 | 100 | 100 | 2.5 s | 0 | 210 ms |

## Mesure avec étranglement réel (`throttlingMethod: devtools`, mêmes conditions réseau et CPU)

| Page | Performance | FCP | LCP | TBT |
|---|---|---|---|---|
| `/` | 95 | 1,9 s | 2,0 s | 170 ms |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 92 | 1,8 s | 1,8 s | 320 ms |
| `/transports-de-marchandises-et-btp-haut-rhin-alsace` | 96 | 1,7 s | 1,7 s | 200 ms |
| `/notre-equipement` | 95 | 1,9 s | 2,0 s | 200 ms |
| `/contact` | 93 | 1,8 s | 1,8 s | 300 ms |

## Remarques

- Lighthouse en simulation varie de ±2 points d'une série à l'autre. Sur trois séries complètes, la
  Performance a varié entre **94 et 99** selon la page ; `/contact` oscille entre 94 et 96 (TBT 130 à 220 ms,
  dû à l'hydratation du formulaire par React), les autres pages restent à 95 ou plus. Accessibilité,
  bonnes pratiques et SEO : **100** partout, à chaque série. CLS : 0 (une fois 0,006 sur `/notre-histoire`,
  non reproduit).
- **LCP** : en mesure réelle (tableau ci-dessus), il est entre **1,7 et 2,0 s** sur toutes les pages.
  En simulation, il atteint 2,5 à 2,7 s sur certaines pages intérieures : sur mobile, l'élément LCP y est
  le chapô (texte affiché à 0,2 s en mesure observée), et le modèle de Lighthouse ajoute le téléchargement
  simulé de tous les scripts demandés avant cet instant. C'était déjà le cas en v1.
- L'essentiel du temps de script est le socle React/Next.js (hydratation) ; le code propre au site est léger
  (un seul composant d’interactions global ; visionneuse et tiroirs chargés à la demande).
- Sur le serveur Node.js seul (HTTP/1.1, sans proxy), la simulation donne 2 à 4 points de moins :
  servir le site derrière Caddy ou nginx (HTTP/2), comme prévu dans `DEPLOY.md`.
- Les rapports HTML détaillés sont générés à côté de ce fichier (ignorés par git) : `pnpm lighthouse <url>`.
