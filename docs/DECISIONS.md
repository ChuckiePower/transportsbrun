# Journal des décisions

Décisions prises en autonomie pendant la refonte, avec leur justification. Les points qui
nécessitent un arbitrage métier sont dans `docs/TODO-MANU.md`.

## Sources

- **Miroir local de l'ancien site** (`source-site/` + `images-manifest.json`) : c'est la seule source utilisée.
  Le site en ligne n'a pas été consulté. Le miroir et l'annexe A concordent ; écarts listés dans
  `docs/audit.md` §2 (le miroir fait foi : la phrase « Nous sommes impatients de travailler avec vous… »
  de l'introduction du formulaire est conservée).
- Le miroir, son outil (`tools/mirror_site.py`, `tools/curate_photos.py`) et son workflow GitHub ont été
  **retirés du dépôt** à la demande (le dépôt ne contient plus que le site). Ils restent consultables dans
  l'historique git (commit `4ae6300` pour le miroir) ; les chemins `sourceMiroir` de
  `content/images-manifest.json` et de `docs/audit.md` y font référence.

## Pile technique

| Choix | Pourquoi |
|---|---|
| Next.js **16.4.2** (App Router, Turbopack, `output: "standalone"`), React **19.3** | Dernières versions stables au 19/10/2026 |
| TypeScript **6.0** (et non 7.0) | `typescript-eslint` (utilisé par `eslint-config-next`) ne prend pas encore en charge TS 7 |
| ESLint **9** (et non 10) | `eslint-plugin-react` (inclus dans la config Next) n'est pas encore compatible ESLint 10 |
| Tailwind CSS **4.3** (`@theme`) | Tokens en variables CSS dans `src/app/globals.css` |
| Polices **Plus Jakarta Sans** (titres, 200-800) + **Inter** (texte, 100-900), variables, woff2 latin dans `src/fonts/` via `next/font/local` (v2) | Auto-hébergées, aucune requête vers Google ; pas de dépendance réseau au build. Deux fichiers (27 + 48 Ko). Graisses statiques 600/800 de Jakarta dans `src/fonts/og/` pour les images Open Graph |
| Icônes **lucide-react** (trait 1,75) (v2) | Jeu cohérent au trait fin, importé icône par icône (seules les icônes utilisées sont embarquées) |
| Radix Dialog pour le menu mobile et la visionneuse | Piège de focus, Échap, `aria-*` fiables ; **chargés à la demande** (survol/focus/clic) pour ne pas alourdir le premier affichage |
| ~~Motion~~ **retiré en v2** : animations en CSS, un seul `IntersectionObserver` et un seul écouteur de défilement partagés (`src/lib/scroll-bus.ts`, `src/components/layout/Interactions.tsx`) | Le catalogue d'animations de la v2 se fait entièrement en CSS (+ animations pilotées par le défilement là où le navigateur les prend en charge) : la bibliothèque n'apportait plus rien |
| `react-hook-form` + `zod` 4 (schéma partagé `src/lib/quote-schema.ts`) | Zod en mode **`jitless`** : sinon il tente un `new Function()` que la CSP bloque (signalé par Lighthouse) |
| Nodemailer | SMTP en production ; transport JSON (console ou fichier) en développement/test |
| pnpm 10, Node 22 LTS | Imposés |

## Direction artistique — « Route douce » (v2)

La v2 **remplace** la direction « industriel premium » de la v1 (grotesque condensée en capitales,
angles vifs, bandes obliques, ombres dures). Principes :

- **Palette** (`src/app/globals.css`, `@theme`, toutes les couleurs par défaut de Tailwind désactivées) :
  crème `#F8F5EF` / crème 2 `#F1ECE2`, blanc `#FFFFFF`, encre `#14213D` et encre douce `#4A5670`,
  bleu Brun `#2B3A9F` (+ bleu doux `#E8EBFA`, bleu clair `#A9B4F2` sur fond nuit), nuit `#14213D` /
  `#1D2E57`. **Jaune `#FFC21A` réservé aux actions principales** (texte encre, contraste ≈ 11:1).
- **Formes** : rayons généreux (cartes 24 px, champs 14 px, boutons et étiquettes en pilule), ombres
  douces et diffuses (`--shadow-sm/md/lg`), aucune bordure épaisse, aucun angle vif, aucun biais.
- **Typographie** : Plus Jakarta Sans pour les titres (casse normale, approche légèrement resserrée),
  Inter pour le texte. **Seul l'eyebrow** (petit label au-dessus des titres) est en capitales.
- **Mise en page** : en-tête flottant arrondi et translucide, sections espacées (112 px / 72 px en
  mobile), grandes photos arrondies, cartes « nuit » pour les blocs forts (CTA, équipe, sécurité, contact,
  pied de page).
- Hiérarchie volontairement inégale conservée (carte « Camion-grue » mise en avant, fiche technique,
  carte « Capacité convoi exceptionnel et ADR » en nuit).

## Contenu et typographie

- Tout le contenu est dans `src/content/` ; les coordonnées n'existent que dans `src/content/site.ts`.
- Typographie française appliquée automatiquement par le gabarit `fr\`…\`` (`src/lib/typo.ts`) :
  apostrophes ’, guillemets « », espaces insécables avant `: ; ! ?` et entre nombre et unité.
- Corrections sans changement de sens : « maîtres mots des. » → « maîtres mots. » ; « Chez Transport Brun »
  → « Chez Transports Brun » ; « Caractèristiques » → « Caractéristiques » ; « Nos domaines d'expertises »
  → « d'expertise » ; « 1.3m » → « 1,3 m » ; H1 de la page légale « Politiques de confidentialités »
  → « Politique de confidentialité » (l'URL ne change pas).
- **H1 de l'accueil** reformulé : « Transport plateau, camion-grue et charges hors normes en Alsace »
  (mots-clés plateau / grue / charges / Alsace ; « marchandises » et « Haut-Rhin » sont dans le texte et le title).
- Le **bandeau de confiance** ne reprend que des faits de l'annexe A ; « Prévenu en avance en cas de
  livraison tardive » paraphrase « vous serez toujours prévenu en avance, car nos chauffeurs sont localisables ».
- L'engagement écoresponsable est présenté en deux leviers (taux de remplissage, kilométrages inutiles), **sans chiffre**.
- « Ce que nous transportons » (v2) : cartes illustrées **par la photo de la photothèque qui montre le
  plus visiblement ce type de charge** (murs préfabriqués, benne de granulats, module, treillis soudés,
  cuve, porte-engins). Ce sont des illustrations, pas des preuves d'un chantier précis ; la carte ADR
  n'a **pas** de photo (aucune ne montre un transport ADR). Choix listés dans `docs/TODO-MANU.md` pour validation.
- Libellés des e-mails (Contact, Comptabilité, Exploitation, Commercial) déduits des adresses. Le lien
  `exploitation@` pointe enfin vers `exploitation@` (il pointait vers `comptabilite@`).
- Le lien « Camion-grue » mène à la section `#flotte` de la page plateau / grue (pas de page dédiée sur le site actuel).
- Page Équipement : 5 catégories. « Openbox », « Remorque Trax », « Tautliner » et « Camion-grue »
  reprennent les galeries actuelles ; « Plateaux » est illustrée par 4 photos de semi-remorques plateau
  issues de la galerie plateau (à valider).

### Titles et meta descriptions

| Page | Title (≤ 60) | Description (≤ 155) |
|---|---|---|
| `/` | Transports Brun – Transport plateau, grue et fret en Alsace | Transporteur routier familial à Saint-Hippolyte (Haut-Rhin) : transport plateau, camion-grue, charges lourdes et hors normes, convois exceptionnels, ADR. |
| `/notre-histoire` | Notre histoire – Transporteur familial \| Transports Brun | Transports Brun, société familiale de transport née le 2 mars 2018 à Saint-Hippolyte (Haut-Rhin), portée par près de 25 ans d'expérience du transport. |
| `/transport-routier-haut-rhin-alsace` | Transport routier par plateau, Haut-Rhin \| Transports Brun | Transport routier de marchandises par plateau dans le Haut-Rhin (Alsace) : charges lourdes, service personnalisé, matériel contrôlé, conseiller ADR. |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | Transport plateau, camion-grue – Haut-Rhin \| Transports Brun | Transport par plateau et camion-grue dans le Haut-Rhin (Alsace) : charges hors normes, convois exceptionnels cat. 1 et 2, ADR. Une logistique flexible. |
| `/transports-de-marchandises-et-btp-haut-rhin-alsace` | Transport de marchandises, Haut-Rhin \| Transports Brun | Fret interurbain dans le Haut-Rhin (Alsace) : murs préfabriqués, sable, gravier, modules, treillis, cuves de vendange, ADR. Des solutions sur mesure. |
| `/notre-equipement` | Notre équipement – plateaux, grue, Trax \| Transports Brun | Le parc de Transports Brun : tracteurs, plateaux, openbox, tautliners, remorque Trax, porte-béton, camion-grue. Convoi exceptionnel cat. 1 et 2, ADR. |
| `/contact` | Contact et demande de devis \| Transports Brun | Contactez Transports Brun à Saint-Hippolyte (68) au 03 89 73 34 63, du lundi au vendredi. Demandez votre devis de transport en ligne. |

Pages légales : `noindex, follow`, exclues du sitemap (comportement actuel conservé).

## Photos

- **89 photos uniques** retenues sur 111 fichiers (copies identiques et recadrages d'une même photo
  fusionnés ; la plus grande variante est gardée). Détail : `docs/audit.md`, `content/images-manifest.json`.
- Fichiers dans `content/photos/<thème>/`, référencés par **import statique** dans `src/content/gallery.ts` :
  largeur, hauteur et miniature floue sont lues **automatiquement** à la compilation. Remplacer une photo
  par son original = écraser le fichier (même nom) et reconstruire. C'est plus sûr que de recopier
  largeur/hauteur à la main (aucun risque de désynchronisation).
- PNG photographiques convertis en JPEG qualité 92 ; JPEG/WebP copiés sans recompression.
- Les 3 images de l'ancien diaporama ont un voile sombre incrusté : une est un doublon (écartée), les
  deux autres ne servent que de fonds décoratifs (`content/photos/divers/`).
- **Textes alternatifs réécrits un par un** après examen de chaque photo (marque du tracteur, type de
  remorque, chargement, contexte). Les enseignes de clients visibles sur certaines photos ne sont pas
  nommées. Les vignettes purement décoratives (texte déjà présent à côté) ont `alt=""`.
- Hero de l'accueil : Volvo FM grue levant un module (2550 × 1434), l'une des 4 photos haute définition.
- Aperçu flou : la miniature générée par Next.js est affichée en arrière-plan de l'image (au lieu du
  filtre SVG de `placeholder="blur"`, très coûteux en CPU sur une galerie de 40 photos : TBT ÷ 5).
- Galeries (v2) : **maçonnerie** en colonnes (vignettes arrondies, proportions d'origine) pour les grandes
  séries, limitées à **12 vignettes + bouton « Voir les N photos »** avec JavaScript (toutes visibles sans
  JavaScript ; la visionneuse parcourt toujours la série complète) ; grille régulière pour les petites
  séries de la page Équipement. Ouverture de la visionneuse en transition partagée (View Transitions)
  quand le navigateur le permet.

## Formulaire de devis

- Champs demandés + case de consentement au texte exact du site actuel.
- Anti-abus côté serveur (`src/app/api/contact/route.ts`) : pot de miel (réponse neutre, rien n'est envoyé),
  délai minimal de 3 s entre l'affichage et l'envoi, **5 envois / 10 min / IP** (en mémoire, paramétrable),
  contrôle de l'en-tête `Origin`, taille du corps limitée, champs d'une ligne sans retour à la ligne
  (aucune injection d'en-tête), tout le contenu échappé dans l'e-mail HTML.
- `Reply-To` = e-mail du visiteur ; destinataire `CONTACT_TO`. **Pas d'accusé de réception** envoyé au
  visiteur : cela transformerait le formulaire en relais de spam vers des adresses arbitraires.
- En production sans `SMTP_HOST`, l'API répond 503 avec un message invitant à téléphoner (pas de perte silencieuse).
- Aucune donnée n'est stockée (pas de base de données).

## Sécurité, vie privée

- **Aucun cookie, aucun traceur** : pas de bannière cookies. Mesure d'audience Umami/Plausible
  auto-hébergée possible mais **désactivée par défaut** (`src/components/seo/Analytics.tsx`).
- **Carte** : rien n'est chargé depuis un tiers avant le clic sur « Afficher la carte » (iframe OpenStreetMap) ;
  liens directs vers Google Maps et OpenStreetMap. Vérifié par un test automatique.
- **CSP sans nonce** (`script-src 'self' 'unsafe-inline'`), comme recommandé par la documentation Next.js
  pour garder des pages **statiques** : une CSP à nonce imposerait un rendu dynamique de chaque page.
  Le risque est faible : aucun contenu saisi par un visiteur n'est jamais réaffiché.
  Autres en-têtes : `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`,
  `Cross-Origin-Opener-Policy` (application) ; HSTS au niveau du proxy, sans `includeSubDomains`
  pour ne pas risquer de casser un sous-domaine de messagerie.

## SEO

- URL actuelles conservées à l'identique. Redirections **301** (et non 308, valeur par défaut de Next) :
  slash final, `/index.php` et `/index.php/*`, `www.` → domaine nu (application **et** proxy).
- JSON-LD : `LocalBusiness` (sur toutes les pages : adresse, géo, 3 téléphones en `contactPoint`, horaires,
  `areaServed` Haut-Rhin / Alsace / France tirés des textes, `sameAs` Facebook, `foundingDate`),
  `BreadcrumbList` (pages intérieures), `Service` (2 pages de service). Pas d'`aggregateRating`.
  Type générique `LocalBusiness` : schema.org n'a pas de type « transporteur routier ».
- Image Open Graph **générée par page** (photo réelle + titre + logo, `opengraph-image.tsx`).
- `sitemap.xml` (date = date du build), `robots.txt` (API exclue), manifest, favicon/icônes générés
  à partir du motif à trois bandes (`scripts/generate-icons.mjs`).

## Performance

- Mesures et essais : `experimental.inlineCss` testé puis **rejeté** (Next duplique la CSS dans la charge
  RSC : document HTML de 26 → 62 Ko compressés). Hero : `preload` + `fetchPriority="high"` + décodage synchrone.
- v2 : le **logo est de nouveau préchargé**. Sur mobile, la bannière photo des pages intérieures est
  sous la ligne de flottaison et Lighthouse retenait le logo (chargé en différé) comme élément LCP.
  Pour la même raison, l'eyebrow, le H1 et le chapô des pages intérieures s'affichent **sans fondu**
  (un départ à opacité 0 retarde le LCP mesuré) ; seuls les boutons et les points clés apparaissent en douceur.
- Lighthouse est mesuré sur l'image Docker **derrière Caddy en HTTP/2** (conditions de production) ;
  sur le serveur Node seul en HTTP/1.1, le modèle simulé de Lighthouse donne 2 à 4 points de moins
  (limite de 6 connexions). Résultats : `docs/lighthouse/scores.md`.

## Déploiement

- Image `node:22-alpine` (multi-étapes), utilisateur non-root, `HEALTHCHECK` sans curl (fetch Node),
  conteneur en lecture seule et sans capacités, cache d'images sur volume.
- `SITE_URL` est un **argument de build** (gravé dans les pages statiques) et une variable d'exécution.
- Dans le bac à sable de développement, Docker Hub répondait 429 (limite de débit) : les images de base
  ont été tirées depuis le miroir officiel `mirror.gcr.io` **uniquement pour les tests locaux** ;
  le `Dockerfile` référence normalement `node:22-alpine`.
- Exemples Caddy et nginx fournis, sans présupposer celui installé sur le VPS.

## Refonte visuelle v2 — choix et écarts au cahier des charges

- **Animations** : CSS d'abord, état final visible sans JavaScript (les états « avant révélation » ne
  s'appliquent que sous la classe `js` posée sur `<html>` par un script en ligne, et seulement si
  `prefers-reduced-motion: no-preference`). En mouvement réduit : aucun déplacement, bandeau défilant
  statique, pas de parallaxe ni de transition de page. Interdits respectés : pas de Lenis, GSAP, three.js,
  curseur personnalisé ni vidéo en lecture automatique.
- **Titre du hero de l'accueil** : révélé **mot par mot** dans un masque (approximation de la révélation
  ligne par ligne, impossible à calculer côté serveur sans connaître la largeur d'écran).
- **Parallaxe** de la photo du hero : animation pilotée par le défilement (`animation-timeline: view()`),
  **statique** sur les navigateurs qui ne la prennent pas en charge (pas de JavaScript de secours).
- **« La route »** (tracé pointillé décoratif le long de la page d'accueil) : affichée à partir de
  **1 360 px** de large (et non 1 024 px) pour ne jamais passer sous le contenu.
- **Bandeau défilant** des savoir-faire : commande « Pause » accessible au clavier (critère WCAG 2.2.2).
- **Champs de formulaire** : fond blanc et **contour gris `#828A9B` (≥ 3:1)** au lieu d'un fond crème
  sans contour, pour que les champs et les cases à cocher restent identifiables (WCAG 1.4.11) ; texte
  indicatif en encre douce (contraste 6:1).
- **Formulaire de devis en 2 étapes** (même schéma, même endpoint, mêmes champs) : progression, bouton
  Retour, saisie conservée dans `sessionStorage` (sans le consentement, effacée après l'envoi), focus sur
  le titre de l'étape puis sur le premier champ en erreur, écran de succès avec le téléphone.
  **Sans JavaScript** : un seul formulaire classique (POST) qui redirige vers `/contact/merci` ou
  `/contact/erreur` (pages `noindex`) ; pour ce chemin, le délai minimal de saisie n'est pas contrôlé
  (pas d'horodatage sans JavaScript) mais l'en-tête `Origin` est **exigé**.
- **Présélection** `/contact?type=…&nature=…` : seules les valeurs d'une liste fermée sont acceptées
  (`typeSlugs`, `natureSlugs` dans `src/lib/quote-schema.ts`), jamais le texte brut du paramètre.
- **« Être rappelé »** (nouveauté) : tiroir avec nom, téléphone, type de demande facultatif et **case de
  consentement** (ajoutée par cohérence RGPD avec le devis). Même endpoint (`source: "rappel"`), mêmes
  protections, e-mail court intitulé « Demande de rappel – nom – téléphone ».
- **FAQ** : 6 questions dont les réponses reprennent uniquement des phrases du site (accueil), 3 en
  version courte sur les pages de service ; données structurées `FAQPage` sur chaque page qui l'affiche.
- **Preuves sociales** (avis, logos clients, note Google) : composants prêts mais **masqués** tant
  qu'aucune donnée réelle et autorisée n'est fournie (`src/components/sections/SocialProof.tsx`).
- **CTA** : « Demander un devis » et « Appeler le 03 89 73 34 63 » partout, CTA intermédiaires entre
  les sections, carte nuit en fin de page, pastille flottante sur ordinateur après 600 px (jamais sur
  Contact ni au-dessus du pied de page), barre Appeler · Rappel · Devis sur mobile, masquée quand le
  clavier est ouvert. Aucune fenêtre surgissante, aucun chatbot.
- **Mesure d'audience** facultative : événements `click_call`, `click_quote`, `form_step_2`,
  `form_submit`, `callback_submit` envoyés **uniquement** si Umami ou Plausible auto-hébergé est activé
  (désactivé par défaut).
