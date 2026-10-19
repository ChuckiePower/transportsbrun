# Rapport final — refonte Transports Brun

## v2 — Refonte visuelle « Route douce » (19/10/2026)

### Avant / après

| | v1 « industriel premium » | v2 « Route douce » |
|---|---|---|
| Ambiance | Graphite et bleu marine, capitales condensées, angles vifs, bandes obliques | Crème et bleu nuit, casse normale, formes arrondies, ombres douces |
| Polices | Barlow Condensed + Source Sans 3 | Plus Jakarta Sans + Inter (auto-hébergées) |
| En-tête | Barre pleine largeur | Carte flottante arrondie, pastille de page active qui glisse |
| Accueil | Hero photo pleine largeur, sections alternées clair / graphite | 12 sections : hero arrondi + bandeau de confiance, savoir-faire défilants, métiers, « Ce que nous transportons » (devis présélectionné par carte), pourquoi Brun, étapes, expertise, histoire, équipement, FAQ, CTA final |
| Devis | 1 écran | 2 étapes avec progression, saisie conservée, présélection par l'URL ; envoi classique sans JavaScript |
| Conversion | Barre Appeler/Devis mobile | + « Être rappelé », CTA intermédiaires, pastille devis flottante (ordinateur), FAQ + données structurées, réassurance au bouton d'envoi |
| Animations | Révélations (Motion) | CSS uniquement : révélations, compteur, parallaxe douce, transitions de page et de visionneuse ; aucune en mouvement réduit |

Captures v2 dans `docs/screenshots/` (10 pages × 375 / 768 / 1440 px) ; celles de la v1 restent dans l'historique git.
URL, textes existants, champs et endpoint du formulaire inchangés. Aucun chiffre, avis, délai ou prix inventé.

### Vérifications

| Contrôle | Résultat |
|---|---|
| `pnpm check` (lint, typecheck, format), `pnpm build` | OK |
| Playwright | **45/45** : 2 étapes (validation, focus, retour), parcours complet présélection → succès (e-mail simulé), valeur d'URL inconnue ignorée, saisie conservée, **sans JavaScript** (POST → `/contact/merci`), « Être rappelé », API (pot de miel, délai, injection, origine, rate limit), contenu visible sans JS et en mouvement réduit, galerie repliable, pastille flottante, barre mobile masquée pendant la saisie |
| axe-core (10 pages × 375 et 1440 px) | **0 violation**, tous niveaux |
| `scripts/check-site.mjs` | 0 problème |
| Recherches interdites (`rounded-none`, `border-2/4`, `uppercase` hors eyebrow, Barlow/condensé, `skew`, `shadow-[…]`) | aucun résultat |
| Lighthouse mobile (Docker + Caddy HTTP/2) | Perf. **94 à 99** selon la page et la série (`/contact` oscille entre 94 et 96), Accessibilité / Bonnes pratiques / SEO **100**, CLS 0. LCP réel 1,7 à 2,0 s (simulé 2,1 à 2,7 s). Détails : `docs/lighthouse/scores.md` |

Défauts trouvés et corrigés pendant la relecture des captures et les tests : mots collés dans le titre
du hero, deux étapes du formulaire affichées en même temps, pastille de navigation au mauvais endroit,
numéros et e-mails coupés en plein mot, saisie réenregistrée après l'envoi, contraste des champs
(contour et texte indicatif), logo en chargement différé retenu comme LCP.

### À valider (détail dans `docs/TODO-MANU.md` §5)

1. **Preuves sociales** : fournir 3-5 avis clients autorisés, logos clients autorisés, note et lien Google
   (rien n'est affiché en attendant).
2. Textes ajoutés pour la conversion, repris du site : « Comment ça marche », FAQ, points clés, bandeaux d'appel.
3. Photos de « Ce que nous transportons », en particulier celle des **cuves de vendange**.
4. Boîte de réception des demandes de rappel.
5. Toujours en attente de la v1 : textes légaux, logo vectoriel, photos originales, SMTP, accès DNS.

---

## v1 — Base technique

### Ce qui est fait

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

### Vérifications exécutées

| Contrôle | Résultat |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check` | OK, aucun avertissement |
| `pnpm build` | OK, 9 pages + 404 statiques, seule `/api/contact` est dynamique |
| `pnpm test:e2e` (Playwright) | **33/33** : formulaire (validation, envoi simulé, honeypot, délai, injection, origine, rate limit), lien d'évitement, menu mobile, barre d'appel, visionneuse, carte sans tiers, redirections 301, axe |
| axe-core (10 pages × 375 et 1440 px) | **0 violation** (ni sérieuse, ni critique, ni modérée) |
| `scripts/check-site.mjs` | 0 problème : liens internes 200, aucun `alt` manquant, `mailto:`/`tel:` cohérents, title ≤ 60 / description ≤ 155 / canonical / H1 uniques |
| Image Docker | construite, conteneur `healthy`, lecture seule, non-root ; envoi SMTP réel vérifié vers Mailpit (sujet, `Reply-To`, HTML échappé) |
| Captures | 30 captures (10 pages × 375/768/1440 px) dans `docs/screenshots/`, relues et corrigées |

#### Lighthouse mobile v1 (image Docker derrière Caddy HTTP/2)

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

### Ce qu'il reste à fournir ou valider (détail dans `docs/TODO-MANU.md`)

1. **Textes légaux** : hébergeur du VPS, agence EXODREAM, crédit Shutterstock, horaires 13h30/14h,
   paragraphe cookies, données personnelles (+ durée de conservation), directeur de la publication,
   paragraphe RLL (plateforme fermée le 20/07/2025).
2. **Logo vectoriel** (le PNG actuel fait 250 px de large).
3. **Photos originales** haute définition (correspondance fichier par fichier fournie).
4. **SMTP** : hôte (smtp.ionos.fr à confirmer), boîte d'envoi et mot de passe, à saisir dans `.env` sur le VPS.
5. **Accès DNS** le jour de la bascule, IP du VPS, accès Search Console / Google Business Profile.
6. Validation de quelques choix éditoriaux : H1 de l'accueil, titles, bandeau de confiance, libellés des
   e-mails, catégorie « Plateaux » de l'équipement, graphie « France Plateau(x) », photo avec incrustation « Redmi ».
