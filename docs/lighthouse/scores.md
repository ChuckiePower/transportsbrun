# Scores Lighthouse (mobile, throttling simulé)

Mesurés le 19/10/2026 15:54:30 sur https://localhost:8443 (build de production local).

**Conditions** : image Docker de production (`docker compose`), derrière Caddy 2 en HTTPS/HTTP/2 avec compression zstd (`deploy/Caddyfile.local`), Lighthouse 13.5 en profil mobile par défaut (Moto G Power émulé, réseau 4G lent et CPU ×4 **simulés**), Chromium 141, machine de mesure benchmarkIndex ≈ 2 000.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 | 2.6 s | 0 | 100 ms |
| `/notre-histoire` | 97 | 100 | 100 | 100 | 2.4 s | 0 | 90 ms |
| `/transport-routier-haut-rhin-alsace` | 98 | 100 | 100 | 100 | 2.5 s | 0 | 50 ms |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 98 | 100 | 100 | 100 | 2.2 s | 0 | 110 ms |
| `/transports-de-marchandises-et-btp-haut-rhin-alsace` | 97 | 100 | 100 | 100 | 2.5 s | 0 | 100 ms |
| `/notre-equipement` | 97 | 100 | 100 | 100 | 2.5 s | 0 | 90 ms |
| `/contact` | 97 | 100 | 100 | 100 | 2.4 s | 0 | 110 ms |

## Remarques

- Lighthouse en simulation varie de ±2 points d'un passage à l'autre ; les valeurs ci-dessus sont celles du dernier passage.
- Sur le serveur Node.js seul (HTTP/1.1, sans proxy), la simulation donne 93-95 en Performance :
  le modèle applique la limite de 6 connexions HTTP/1.1. En production derrière Caddy ou nginx (HTTP/2),
  ce sont les chiffres ci-dessus qui s'appliquent.
- Avec un étranglement réel (`throttlingMethod: devtools`) au lieu de la simulation, l'accueil mesure
  LCP 1,7 s et Performance 98.
- LCP : la photo du hero (AVIF ≈ 21 Ko en mobile), préchargée en priorité haute. CLS : 0 sur toutes les pages
  (dimensions de toutes les images connues à la compilation).
- Les rapports HTML détaillés sont générés à côté de ce fichier (ignorés par git) : `pnpm lighthouse <url>`.
