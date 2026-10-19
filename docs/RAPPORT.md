# Rapport final — refonte Transports Brun

## Ce qui est fait

- **Audit** du miroir local (`docs/audit.md`) : titres, meta, H1, écarts de texte, anomalies (dont le
  `mailto:` d'« exploitation » qui pointait vers « comptabilité »), inventaire des 111 images.
- **89 photos réelles** retenues (plus grande variante de chaque photo), classées par thème, chacune avec
  un texte alternatif rédigé après examen de la photo ; hero = camion-grue Volvo levant un module.
- **Site Next.js 16** : les 9 URL actuelles à l'identique + page 404, contenu centralisé dans
  `src/content/` (coordonnées dans un seul fichier), design « industriel premium » dérivé du logo,
  jaune signalisation pour les CTA, barre Appeler/Devis collante sur mobile, menu plein écran accessible,
  galeries (40 et 27 photos) avec visionneuse clavier/tactile, fiche technique du camion-grue,
  carte OpenStreetMap chargée seulement au clic.
- **Formulaire de devis** : validation zod partagée navigateur/serveur, messages en français, focus sur
  la première erreur, pot de miel, délai minimal, 5 envois / 10 min / IP, contrôle d'origine, aucune
  injection d'en-tête, contenu échappé, `Reply-To` du visiteur, Nodemailer (console en dev, Mailpit en test).
- **SEO local** : title/description/canonical uniques, Open Graph générées par page, JSON-LD
  LocalBusiness + BreadcrumbList + Service, sitemap, robots, redirections 301 (slash final, `/index.php/*`, `www`).
- **Pages légales** reprises mot pour mot ; les 7 passages à valider (+ la plateforme RLL fermée en 2025)
  isolés dans `src/content/legal.ts`.
- **Aucun cookie ni traceur** (bandeau cookies supprimé) ; Umami/Plausible auto-hébergé en option, désactivé.
- **Déploiement** : Dockerfile multi-étapes non-root avec HEALTHCHECK, docker-compose sur 127.0.0.1:3000,
  exemples Caddy et nginx, `DEPLOY.md` (bascule DNS sans toucher aux MX/SPF/DKIM, contrôles, rollback).

## Vérifications exécutées

| Contrôle | Résultat |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check` | OK, aucun avertissement |
| `pnpm build` | OK, 9 pages + 404 statiques, seule `/api/contact` est dynamique |
| `pnpm test:e2e` (Playwright) | **33/33** : formulaire (validation, envoi simulé, honeypot, délai, injection, origine, rate limit), lien d'évitement, menu mobile, barre d'appel, visionneuse, carte sans tiers, redirections 301, axe |
| axe-core (10 pages × 375 et 1440 px) | **0 violation** (ni sérieuse, ni critique, ni modérée) |
| `scripts/check-site.mjs` | 0 problème : liens internes 200, aucun `alt` manquant, `mailto:`/`tel:` cohérents, title ≤ 60 / description ≤ 155 / canonical / H1 uniques |
| Image Docker | construite, conteneur `healthy`, lecture seule, non-root ; envoi SMTP réel vérifié vers Mailpit (sujet, `Reply-To`, HTML échappé) |
| Captures | 30 captures (10 pages × 375/768/1440 px) dans `docs/screenshots/`, relues et corrigées |

### Lighthouse mobile (image Docker derrière Caddy HTTP/2)

| Page | Perf. | Access. | Bonnes prat. | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 | 2,6 s | 0 |
| `/notre-histoire` | 97 | 100 | 100 | 100 | 2,4 s | 0 |
| `/transport-routier-haut-rhin-alsace` | 98 | 100 | 100 | 100 | 2,5 s | 0 |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 98 | 100 | 100 | 100 | 2,2 s | 0 |
| `/transports-de-marchandises-et-btp-haut-rhin-alsace` | 97 | 100 | 100 | 100 | 2,5 s | 0 |
| `/notre-equipement` | 97 | 100 | 100 | 100 | 2,5 s | 0 |
| `/contact` | 97 | 100 | 100 | 100 | 2,4 s | 0 |

Objectifs atteints (≥ 95 / 100 / 100 / 100, CLS < 0,05). Le LCP **simulé** de l'accueil (2,6 s) dépasse
de peu 2,5 s ; en étranglement réel il est de 1,7 s. Sans proxy HTTP/2, la Performance simulée tombe à
93-95 : il faut donc bien servir le site derrière Caddy ou nginx (prévu). Détails : `docs/lighthouse/scores.md`.

## Ce qu'il reste à fournir ou valider (détail dans `docs/TODO-MANU.md`)

1. **Textes légaux** : hébergeur du VPS, agence EXODREAM, crédit Shutterstock, horaires 13h30/14h,
   paragraphe cookies, données personnelles (+ durée de conservation), directeur de la publication,
   paragraphe RLL (plateforme fermée le 20/07/2025).
2. **Logo vectoriel** (le PNG actuel fait 250 px de large).
3. **Photos originales** haute définition (correspondance fichier par fichier fournie).
4. **SMTP** : hôte (smtp.ionos.fr à confirmer), boîte d'envoi et mot de passe, à saisir dans `.env` sur le VPS.
5. **Accès DNS** le jour de la bascule, IP du VPS, accès Search Console / Google Business Profile.
6. Validation de quelques choix éditoriaux : H1 de l'accueil, titles, bandeau de confiance, libellés des
   e-mails, catégorie « Plateaux » de l'équipement, graphie « France Plateau(x) », photo avec incrustation « Redmi ».
