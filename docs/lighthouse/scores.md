# Scores Lighthouse (mobile)

Mesurés le 20/10/2026 sur https://localhost:8443 : image Docker de production (`docker compose`),
derrière Caddy 2 en HTTPS/HTTP/2 avec compression zstd (`deploy/Caddyfile.local`, qui présente le
domaine final à l'application), Lighthouse 13.5 en profil mobile par défaut (Moto G Power émulé,
4G lente et CPU ×4 simulés), Chromium 141. Refonte « robuste, chaleureux, en mouvement » (v3).

## Série complète (throttling simulé)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 | 2.7 s | 0 | 40 ms |
| `/notre-histoire` | 99 | 100 | 100 | 100 | 2.0 s | 0 | 40 ms |
| `/transport-routier-haut-rhin-alsace` | 99 | 100 | 100 | 100 | 2.0 s | 0 | 40 ms |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 98 | 100 | 100 | 100 | 2.3 s | 0 | 40 ms |
| `/transports-de-marchandises-et-btp-haut-rhin-alsace` | 97 | 100 | 100 | 100 | 2.4 s | 0 | 80 ms |
| `/notre-equipement` | 98 | 100 | 100 | 100 | 2.4 s | 0 | 40 ms |
| `/contact` | 96 | 100 | 100 | 100 | 2.6 s | 0 | 100 ms |

## Les 4 pages de référence : avant / après (médiane de 3 séries, throttling simulé)

« Avant » = série v2 « Route douce » du 19/10/2026 (mêmes conditions), retenue au lot 0.

| Page | Perf. avant | Perf. après (3 séries) | LCP avant | LCP après (médiane) | CLS après |
|---|---|---|---|---|---|
| `/` | 98 | **97** (96, 98, 97) | 2,3 s | 2,6 s | 0 |
| `/contact` | 94 | **96** (96, 96, 96) | 2,5 s | 2,6 s | 0 |
| `/notre-equipement` | 96 | **98** (98, 98, 97) | 2,6 s | 2,4 s | 0 |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 98 | **98** (98, 98, 99) | 2,2 s | 2,3 s | 0 à 0,01 |

Accessibilité, bonnes pratiques et SEO : **100** sur toutes les pages, à chaque série.

## Étranglement réel (`throttlingMethod: devtools`, mêmes conditions réseau et CPU)

| Page | Performance | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| `/` | 96 | 1,7 s | 1,7 s | 210 ms | 0 |
| `/contact` | 96 | 1,7 s | 1,7 s | 210 ms | 0 |
| `/notre-equipement` | 96 | 1,7 s | 1,8 s | 190 ms | 0 |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 97 | 1,7 s | 1,7 s | 170 ms | 0,013 |

## Remarques

- **Objectifs** : Performance ≥ 95 et 100 ailleurs, atteints sur les 4 pages à chaque série ;
  CLS < 0,05 partout. **LCP < 2,5 s** : atteint en étranglement réel (1,7 à 1,8 s) ; en simulation, il
  est de 2,3 à 2,4 s sur l'équipement et le plateau, mais de **2,6 s** sur l'accueil et le contact.
  Sur l'accueil, l'élément LCP est la photo du hero (22 Ko, préchargée, priorité haute) : le modèle de
  Lighthouse lui fait partager la bande passante simulée avec les polices et les scripts du socle
  Next.js. Sur le contact, c'est le chapô (texte).
- **Corrigé pendant la mesure** : un CLS de 0,19 sur l'accueil (script en ligne au milieu du hero et
  échange tardif de la police des titres) ; polices allégées (Inter 48 → 26 Ko, Plus Jakarta 27 → 18 Ko).
  Voir `docs/DECISIONS.md`, lot 7.
- Lighthouse en simulation varie de ±2 points d'une série à l'autre.
- Sur le serveur Node.js seul (HTTP/1.1, sans proxy), la simulation donne 2 à 4 points de moins :
  servir le site derrière Caddy ou nginx (HTTP/2), comme prévu dans `DEPLOY.md`.
- Les rapports HTML détaillés sont générés à côté de ce fichier (ignorés par git) : `pnpm lighthouse <url>`.
