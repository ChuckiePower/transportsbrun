# Rapport final — refonte Transports Brun

## v3 — « Robuste, chaleureux, en mouvement » (20/10/2026)

Le métier dans le fond, la douceur dans la forme : la base « Route douce » (crème, bleu nuit, formes
arrondies) reçoit le vocabulaire visuel de la route — marquage au sol, asphalte, panneau « Convoi
exceptionnel », plaque ADR orange, silhouettes de véhicules, plans cotés, itinéraires, compteur
kilométrique, carte des routes au départ de Saint-Hippolyte. Aucun chiffre, avis, délai, prix ni
promesse ajouté ; URL, métadonnées de base, coordonnées, champs et endpoint du formulaire inchangés.

### Ce qui est fait, lot par lot

| Lot | Contenu |
|---|---|
| 0 — Audit | Captures « avant » (`docs/screenshots/avant/`), poids du HTML, Lighthouse « avant », vérification des 10 points [À VÉRIFIER]. |
| 1 — Corrections | Préproduction non indexable (`X-Robots-Tag` + `robots.txt` hors domaine final, tout passe par `SITE_URL`), barre d'appel mobile (2 actions, après le hero), contraste de l'eyebrow du hero, compteur lu une seule fois, photo de la carte camion-grue, « Être rappelé » sans JavaScript, galerie Openbox reclassée, carte ADR. |
| 2 — Système visuel | Jetons (asphalte, marquage, ADR…), Overpass pour la signalétique (sous-ensemble 26 Ko), sprite d'icônes unique, composants `RoadLine`, `ConvoiPanel`, `AdrPlate`, `VehicleIcon` (7 silhouettes), `DimensionDrawing`, `Itinerary`, `Odometer`, `AsphaltSection`, `FranceMap`. |
| 3 — Accueil | 15 sections : hero avec micro-preuves, bandeau « en bref », pastilles, métiers, bandeau photo, « Ce que nous transportons », « Pourquoi Transports Brun » sur asphalte, avis Google (masqués sans données), 3 étapes en itinéraire, carte des routes, histoire en mosaïque, équipement, équipe et logos clients (masqués sans données), FAQ, bandeau final « Arrivée ». |
| 4 — Pages intérieures | Points clés illustrés, plans cotés Porteur et Remorque, carte ADR, page Équipement par silhouettes et ancres collantes, itinéraire écoresponsable sans chiffre, 404 « Vous avez pris la mauvaise sortie ». |
| 5 — Vente | Devis en 2 étapes : itinéraire chargement → livraison en direct, progression en marquage au sol, « Bon de transport » avant l'envoi, « Demande bien reçue » avec le camion qui démarre ; page Contact avec panneau asphalte collant ; avis Google saisis à la main (`src/content/reviews.ts`), sans widget ni balisage d'avis ; vocabulaire de transporteur. |
| 6 — Animations | Les 16 effets du catalogue en CSS (voir `docs/DECISIONS.md`), un seul observateur partagé, rien en mouvement réduit, tout visible sans JavaScript. |
| 7 — Qualité | HTML de l'accueil 346 → 288 Ko (aperçus flous retirés des props sérialisées), corrections tablette et débordement horizontal, menu sans JavaScript, tests SEO, mobile CPU ×4 et débordement. |

### Points [À VÉRIFIER]

| # | Point | Verdict |
|---|---|---|
| 1 | Préproduction indexable | **Confirmé**, corrigé |
| 2 | Barre d'appel mobile au premier écran | **Confirmé**, corrigé |
| 3 | Eyebrow du hero illisible | **Confirmé**, corrigé (contraste médian 12:1) |
| 4 | Compteur « 25 » lu plusieurs fois | **Confirmé**, corrigé |
| 5 | Numéros d'étapes 1-2-3 | **Non reproduit** (chiffre décoratif masqué aux lecteurs d'écran par précaution) |
| 6 | Photo de la carte camion-grue | **Confirmé**, remplacée |
| 7 | « Être rappelé » sans JavaScript | **Confirmé**, corrigé |
| 8 | Page Équipement (« Catégorie X sur 5 », galerie Openbox) | **Confirmé**, corrigé |
| 9 | Carte ADR | **Non reproduit** (pas cassée) ; refaite en carte asphalte |
| 10 | Répétitions (« 2 mars 2018 » ×3) | **Confirmé**, réduit ; liens Facebook conformes |

### Vérifications

**Lighthouse mobile** (image Docker derrière Caddy HTTP/2, médiane de 3 séries ; détails dans
`docs/lighthouse/scores.md`) :

| Page | Perf. avant → après | A11y / BP / SEO | LCP simulé avant → après | LCP réel | CLS |
|---|---|---|---|---|---|
| `/` | 98 → **97** | 100 / 100 / 100 | 2,3 → 2,6 s | 1,7 s | 0 |
| `/contact` | 94 → **96** | 100 / 100 / 100 | 2,5 → 2,6 s | 1,7 s | 0 |
| `/notre-equipement` | 96 → **98** | 100 / 100 / 100 | 2,6 → 2,4 s | 1,8 s | 0 |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | 98 → **98** | 100 / 100 / 100 | 2,2 → 2,3 s | 1,7 s | ≤ 0,01 |

Objectifs atteints (≥ 95, 100, 100, 100 ; CLS < 0,05) sur les 4 pages. **Seul écart : le LCP
simulé de l'accueil et du contact (2,6 s) dépasse 2,5 s** ; en étranglement réel, il est de 1,7 s.
Les 3 autres pages indexables : 97 à 99.

| Contrôle | Résultat |
|---|---|
| `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` | OK |
| Playwright (`--project=e2e`) | **60/60** : accueil → « Demander un devis pour ce transport » → 2 étapes → bon de transport → succès (e-mail simulé) ; tiroir « Être rappelé » ; avis masqués sans données et affichés avec les données de test ; pot de miel ; limitation de débit ; parcours sans JavaScript (devis, rappel, menu) ; mouvement réduit (état final direct) ; mobile CPU ×4 ; animations (état initial puis final) ; balisage SEO ; aucun défilement horizontal à 375, 768, 1024 et 1440 px |
| axe-core (10 pages × 375 et 1440 px, WCAG 2.2 AA) | **0 violation**, tous niveaux |
| Recherches interdites (`rounded-none`, `border-4`, `skew`, `Barlow`, `vercel.app`, `lorem`) | aucun résultat ; `uppercase` et `border-2` seulement dans `.eyebrow`, `ConvoiPanel` et `AdrPlate` |
| Poids HTML (accueil) | 346 → 288 Ko brut, 42 → 39 Ko compressé |

### Captures

`docs/screenshots/final/` : 10 pages × 375 / 768 / 1440 px, plus `avis-donnees-de-test-*.jpg` (section
d'avis remplie avec les **données de test** : rendu à venir, jamais publié). Les captures « avant »
sont dans `docs/screenshots/avant/`.

**Test des 5 secondes** (une phrase par page, sans lire le texte) :

- **Accueil** : un camion-grue lève un module sous un ciel bleu, puis des cartes de camions et de chargements, une route en pointillés et une carte de France dont les routes partent d'Alsace.
- **Notre histoire** : une flotte de camions blancs alignés, une mosaïque de camions sur la route et une carte sombre avec un camion sur un circuit.
- **Savoir-faire** : des camions alignés sur un parking, un itinéraire départ → arrivée, un encadré asphalte avec une plaque orange et un camion.
- **Transport plateau / grue** : un camion plateau, des panneaux jaunes « convoi » et une plaque orange, les plans cotés d'un camion-grue et de sa remorque, une galerie de chargements.
- **Transport de marchandises** : des camions bâchés et des cartes de chargements (murs, sable, modules…) avec une carte asphalte à plaque orange.
- **Notre équipement** : des silhouettes de camions en pastilles, des galeries par type de remorque, deux plans cotés et les panneaux convoi et ADR.
- **Contact** : un formulaire avec un itinéraire chargement → livraison et un camion sur une route en pointillés, à côté d'un panneau asphalte de téléphones.
- **404** : un panneau asphalte avec un camion devant une route en pointillés qui s'interrompt.
- **Mentions légales, confidentialité** : une page de texte sobre — exception voulue, le cahier des charges demande une mise en page sobre pour ces pages.

**Regard de directeur artistique** (ce qui tient, ce qui reste perfectible) :

- *Tient* : un système cohérent (rayons, crème et bleu nuit, une seule couleur d'action) ; le métier se lit
  au premier coup d'œil grâce à la signalétique (panneau convoi, plaque ADR, marquage) sans tomber dans
  le décor de chantier ; les sections asphalte rythment les pages longues ; formulaire et 404 ont une
  vraie personnalité.
- *Perfectible* : la plupart des photos sont des réductions de 800 × 600 px, un peu molles en grand format
  (bannières, mosaïque) — les originaux HD changeront nettement le rendu ; le logo PNG reste petit ;
  l'accueil est long sur mobile (15 sections) : à surveiller avec les vraies données d'avis et d'équipe ;
  le contour de la carte de France est volontairement simplifié ; la route continue de l'accueil
  n'apparaît qu'au-delà de 1 360 px de large.

### Reste à fournir ou à valider

Liste consolidée en tête de `docs/TODO-MANU.md` : photos HD, logo vectoriel, photo de remorque
porte-béton, photos d'équipe avec accord, `reviews.ts` (note, nombre d'avis, liens, 3 à 6 avis exacts),
logos clients (facultatif), mentions centrales nucléaires / France Plateau / cat. 1 et 2, 3 étapes et
« Être rappelé », textes légaux, adresse commerciale Gmail, SMTP et `CONTACT_TO`.

---

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

Captures v2 dans `docs/screenshots/avant/` (10 pages × 375 / 768 / 1440 px) ; celles de la v1 restent dans l'historique git.
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
