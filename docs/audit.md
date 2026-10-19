# Audit du site actuel (Phase 0)

> Le miroir `source-site/` et `images-manifest.json` cités ici ont été retirés du dépôt (qui ne contient
> plus que le site) ; ils restent dans l'historique git, commit `4ae6300`.

Source : miroir local `source-site/` (9 pages HTML Joomla + ressources) et `images-manifest.json`,
relevés le 19/10/2026. Le site en ligne n'a pas été consulté.

## 1. Arborescence et métadonnées actuelles

| Route | Title actuel | Meta description actuelle | H1 actuel | Robots |
|---|---|---|---|---|
| `/` | Transports Brun - Transports routiers de gros oeuvre et fret interurbains | Transports Brun : location de véhicule avec chauffeur, transports de gros oeuvre à plateaux, transports de marchandises à SAINT-HIPPOLYTE. | 2 × H1 (« Transport plateau grue et plateau », « Transport de marchandises ») | index |
| `/notre-histoire` | Transports Brun - Notre histoire | *(aucune)* | Notre histoire | index |
| `/transport-routier-haut-rhin-alsace` | Transports Brun - Transport routier de marchandises par plateau - Haut-Rhin (Alsace) | Optez pour le transport routier de marchandises par plateau dans le Haut-Rhin (Alsace). Solutions fiables pour vos besoins en logistique spécialisée | Transports Brun, un savoir-faire adapté à vos besoins | index |
| `/transport-plateaux-camion-grue-haut-rhin-alsace` | Transports Brun - Transport plateaux / camion grue – Haut-Rhin (Alsace) | Découvrez nos services de transport par plateau et camion grue dans le Haut-Rhin (Alsace). Une logistique flexible et adaptée aux charges lourdes. | Transport plateau grue et plateau | index |
| `/transports-de-marchandises-et-btp-haut-rhin-alsace` | Transports Brun - Transports de marchandises - Haut-Rhin (Alsace) | Faites transporter vos marchandises dans le Haut-Rhin (Alsace) avec des solutions sur mesure, adaptées à vos besoins professionnels. Fiabilité et ponctualité garanties. | Transport de marchandises | index |
| `/notre-equipement` | Transports Brun - Notre équipement | *(aucune)* | Notre équipement | index |
| `/contact` | Transports Brun - Contact | *(aucune)* | *(aucun H1)* | index |
| `/mentions-legales` | Transports Brun - Mentions légales | *(aucune)* | *(aucun H1)* | noindex, follow |
| `/politiques-de-confidentialites` | Transports Brun - Politiques de confidentialités | *(aucune)* | *(aucun H1)* | noindex, follow |

Aucune page n'a de balise `canonical` ni de données structurées. Les meta descriptions des pages de
service sont réutilisées telles quelles dans le corps de la page sous forme de H4.

Navigation : Accueil · Notre histoire · Savoir-faire · Transport plateau / grue · Transport de marchandises ·
Notre équipement · Contact. Top bar : `03 89 73 34 63`, `contact@transports-brun.com`, « Lun-Ven : 8h-12h / 14h-18h »,
lien Facebook. Pied de page : adresse, crédit « Agence Web Exodream », liens légaux, bandeau cookies
(« Je refuse » / « OK pour moi »).

## 2. Textes : comparaison miroir / annexe A

Les textes du miroir correspondent à l'annexe A. Écarts relevés (le miroir fait foi) :

- **Contact** : l'introduction du formulaire contient une phrase supplémentaire, reprise dans la refonte :
  « Nous sommes impatients de travailler avec vous et de répondre à tous vos besoins. »
  Le bloc est titré « Informations complémentaires : ».
- **Notre histoire** : coquille « ponctualité et respect sont les maîtres mots des. » → corrigée en
  « … les maîtres mots. » (sens inchangé).
- **Savoir-faire** : « Chez Transport Brun » (sans s) → « Chez Transports Brun » ; la phrase sur l'écologie
  commence par « De plus, notre entreprise sensible à l'écologie… » (virgules ajoutées dans la refonte).
- **Transport plateau / grue** : « Caractèristiques » → « Caractéristiques » ; « 1.3m » / « 6.5m » → « 1,3 m » /
  « 6,5 m » ; la dernière phrase n'a pas de point final.
- **Accueil** : « Nos domaines d'expertises » → « Nos domaines d'expertise » (pluriel fautif).
- **Formulaire actuel** : champs Nom / Email / Téléphone / Message (+ honeypot `ba-honeypot`), case de
  consentement, bouton « Envoyer ».

## 3. Anomalies à ne pas reproduire

- `mailto:` erroné sur **toutes** les pages : le lien affiché `exploitation@transports-brun.com` pointe vers
  `mailto:comptabilite@transports-brun.com`. Corrigé (une seule source : `src/content/site.ts`).
- Plusieurs H1 sur l'accueil, aucun H1 sur Contact et les pages légales.
- Tous les `alt` sont le titre de la page répété (« Transports Brun - … ») : réécrits un par un.
- Bandeau cookies alors que le site ne déclare que des cookies de fonctionnement.
- Carte Google Maps intégrée (module `mod_tm_google_map`) : dépôt de cookies tiers. Remplacée par une
  carte OpenStreetMap chargée uniquement sur clic.

## 4. Inventaire des images

- 111 fichiers image distincts dans le miroir (`source-site/optimize/`, `source-site/images/`), dont de
  nombreux doublons : copies identiques sous plusieurs noms (vignettes « Nos domaines d'expertise »
  répétées sur 5 pages) et recadrages différents d'une même photo (600×600 en accueil, 800×600 en galerie,
  2550×1434 en en-tête…).
- Après dédoublonnage visuel : **89 photos uniques** conservées dans `content/photos/` (plus grande
  variante à chaque fois), + 2 logos dans `content/brand/`.
- Les photos sont des variantes redimensionnées (plus grand côté 600 à 1 331 px, 4 photos à 2 550 px).
  Le HTML des galeries indique le **chemin du fichier original** sur l'hébergement
  (`images/bagallery/original/…`, `images/gallery/…`, `images/notre-equipement/galleries/…`) : il est
  reporté pour chaque photo dans `content/images-manifest.json` (`originalHebergement`).
- Les 3 images du diaporama d'accueil (`images/slider/*.jpg`, 2000×636) ont un voile sombre incrusté :
  `Attach011.jpg` est une variante assombrie de la photo du camion-grue dans les vignes (écartée) ;
  les deux autres ne sont conservées que comme fonds décoratifs (`content/photos/divers/`).
- `images/bc-brun.png` : motif décoratif à trois bandes (bleu marine, graphite, argent) repris en CSS.

### Classement thématique (content/photos/)

| Dossier | Contenu | Nb |
|---|---|---|
| `grue/` | camions-grue en levage (modules, chantier, centre-ville, vignoble) | 9 |
| `plateau/` | semi-remorques plateau, porte-engins, convois exceptionnels, charges longues | 28 |
| `marchandises/` | tautliners, porteurs bâchés, cuves, murs préfabriqués, benne | 18 |
| `equipement/` | remorque Trax à rampes, tautliner à hayon | 5 |
| `flotte/` | portraits de tracteurs et vues de la flotte | 27 |
| `divers/` | fonds assombris issus de l'ancien diaporama | 2 |

### Choix de la photo de hero

`grue/camion-grue-volvo-levage-module.jpg` (2550×1434) : Volvo FM « Transports Brun » levant un module
préfabriqué, ciel bleu. Elle réunit les trois mots-clés du métier (camion-grue, plateau, charge) et c'est
l'une des quatre seules photos en haute résolution du miroir.

### Logo

`images/logo/transport-brun-camion-routier-plateau-marchandise-alsace.png` : 250×130 px, PNG transparent.
Palette relevée : bleu marine `#00007E`, graphite `#323232`, argent `#BCBCBC`. Trop petit pour un affichage
net au-delà de ~125 px de large : vectoriel à fournir (voir `docs/TODO-MANU.md`).

### Détail par page (ordre d'apparition dans le HTML)

#### `/` — 15 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |
| 2 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-b4bcd077.jpg` | 960×466 |  | `grue/camion-grue-vignoble.jpg` |
| 3 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-1-478d6b0c.jpg` | 960×466 |  | `grue/camion-grue-volvo-levage-module.jpg` *(variante recadrée écartée)* |
| 4 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-2-477da651.jpg` | 960×466 |  | `marchandises/volvo-bleu-tautliner-neige.jpg` |
| 5 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-3-ba2edff7.png` | 250×92 |  | `content/brand/logo-france-plateaux.png` |
| 6 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-4-c705f422.jpg` | 960×720 |  | `flotte/man-tgx-enseigne.jpg` |
| 7 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-5-ae3a7450.jpg` | 600×600 | 7 / category-1 | `flotte/daf-xg-decoration-noire.jpg` *(variante recadrée écartée)* |
| 8 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-6-03e547be.jpg` | 600×600 | 7 / category-1 | `flotte/daf-xg-livree.jpg` *(variante recadrée écartée)* |
| 9 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-7-8d0ed30a.jpg` | 600×600 | 7 / category-1 | `flotte/quatre-tracteurs-ciel-bleu.jpg` |
| 10 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-8-f476ffce.jpg` | 600×600 | 7 / category-1 | `marchandises/man-tgx-gris-tautliner.jpg` *(variante recadrée écartée)* |
| 11 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-9-814ab72c.jpg` | 600×600 | 7 / category-1 | `marchandises/bache-logo-transports-brun.jpg` |
| 12 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-10-dfea4cbc.jpg` | 600×600 | 7 / category-1 | `plateau/porte-engins-pelle-volvo.jpg` |
| 13 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-11-d9b8bee9.jpg` | 600×600 | 7 / category-1 | `marchandises/renault-t-tautliner-ciel-bleu.jpg` |
| 14 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-12-bb49f3bf.jpg` | 600×600 | 7 / category-1 | `grue/camion-grue-batiment-historique.jpg` |
| 15 | `transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-13-f44e068c.jpg` | 600×600 | 7 / category-1 | `grue/camion-grue-levage-centre-ville.jpg` |

#### `/notre-histoire` — 7 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |
| 2 | `transports-brun-notre-histoire-a369ed99.jpg` | 1920×910 |  | `flotte/flotte-alignee.jpg` |
| 3 | `transports-brun-notre-histoire-1-3d9ada8b.jpg` | 2550×1434 |  | `flotte/daf-xg-montagnes.jpg` |
| 4 | `transports-brun-notre-histoire-2-07afbcc5.JPG` | 1280×853 |  | `flotte/daf-passerelle-dunlop.jpg` |
| 5 | `transports-brun-notre-histoire-3-b4bcd077.jpg` | 960×466 |  | `grue/camion-grue-vignoble.jpg` *(copie identique)* |
| 6 | `transports-brun-notre-histoire-4-478d6b0c.jpg` | 960×466 |  | `grue/camion-grue-volvo-levage-module.jpg` *(variante recadrée écartée)* |
| 7 | `transports-brun-notre-histoire-5-477da651.jpg` | 960×466 |  | `marchandises/volvo-bleu-tautliner-neige.jpg` *(copie identique)* |

#### `/transport-routier-haut-rhin-alsace` — 7 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |
| 2 | `transports-brun-transport-routier-de-marchandises-par-plateau-haut-rhin-alsace-3a128137.jpg` | 2550×1434 |  | `flotte/flotte-nuit.jpg` |
| 3 | `transports-brun-transport-routier-de-marchandises-par-plateau-haut-rhin-alsace-1-4cb22d63.jpg` | 960×466 |  | `flotte/quatre-tracteurs.jpg` |
| 4 | `transports-brun-transport-routier-de-marchandises-par-plateau-haut-rhin-alsace-2-4d723af2.jpeg` | 1920×1080 |  | `marchandises/man-tgx-gris-tautliner.jpg` |
| 5 | `transports-brun-transport-routier-de-marchandises-par-plateau-haut-rhin-alsace-3-b4bcd077.jpg` | 960×466 |  | `grue/camion-grue-vignoble.jpg` *(copie identique)* |
| 6 | `transports-brun-transport-routier-de-marchandises-par-plateau-haut-rhin-alsace-4-478d6b0c.jpg` | 960×466 |  | `grue/camion-grue-volvo-levage-module.jpg` *(variante recadrée écartée)* |
| 7 | `transports-brun-transport-routier-de-marchandises-par-plateau-haut-rhin-alsace-5-477da651.jpg` | 960×466 |  | `marchandises/volvo-bleu-tautliner-neige.jpg` *(copie identique)* |

#### `/transport-plateaux-camion-grue-haut-rhin-alsace` — 45 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |
| 2 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-7802bdca.jpg` | 2550×1434 |  | `grue/camion-grue-volvo-levage-module.jpg` |
| 3 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-1-91785949.webp` | 960×466 |  | `plateau/plateau-renault-armatures.webp` |
| 4 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-2-a9164ecb.jpg` | 600×600 | 8 / category-1 | `grue/bras-de-grue-deploye.jpg` |
| 5 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-3-132058f9.jpg` | 600×600 | 8 / category-1 | `grue/camion-grue-scania-gros-plan.jpg` |
| 6 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-4-3b7bfcc0.jpg` | 600×600 | 8 / category-1 | `grue/camion-grue-scania-stabilisateurs.jpg` |
| 7 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-5-a41c768d.webp` | 250×92 |  | `content/brand/logo-france-plateaux.png` *(variante WebP écartée)* |
| 8 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-6-814dd812.jpg` | 960×466 |  | `plateau/plateau-man-voie-rapide.jpg` |
| 9 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-7-6159156f.jpeg` | 1067×600 | 2 / category-4 | `flotte/daf-xg-decoration-noire.jpg` |
| 10 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-8-7d775468.JPG` | 800×600 | 2 / category-2 | `grue/camion-grue-chantier-structure.jpg` |
| 11 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-9-cb8ab7c6.jpg` | 800×600 | 2 / category-3 | `flotte/man-tgx-enseigne.jpg` *(variante recadrée écartée)* |
| 12 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-10-9d54e16c.jpg` | 800×600 | 2 / category-3 | `plateau/porte-engins-man-ville.jpg` |
| 13 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-11-dd14f8ce.jpg` | 800×600 | 2 / category-3 | `plateau/camions-nuit-arc-de-triomphe.jpg` |
| 14 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-12-a521b90a.jpg` | 1331×600 | 2 / category-1 | `plateau/plateau-daf-zone-stockage.jpg` |
| 15 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-13-bd31d275.jpg` | 600×600 | 2 / category-1 | `plateau/porte-engins-man-gris.jpg` |
| 16 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-14-3b09c051.jpg` | 1331×600 | 2 / category-1 | `plateau/plateau-route-mouillee.jpg` |
| 17 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-15-b4da8b43.jpg` | 450×600 | 2 / category-1 | `flotte/volvo-fh-crepuscule.jpg` |
| 18 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-16-5f19a4d1.jpg` | 450×600 | 2 / category-1 | `plateau/plateau-man-coucher-soleil.jpg` |
| 19 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-17-1bfc5fc4.jpg` | 800×600 | 2 / category-1 | `grue/camion-grue-volvo-fm.jpg` *(variante recadrée écartée)* |
| 20 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-18-ccecf998.jpg` | 800×600 | 2 / category-1 | `plateau/module-sur-plateau.jpg` |
| 21 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-19-1b2e440b.jpg` | 450×600 | 2 / category-1 | `plateau/plateau-chantier-grue-a-tour.jpg` |
| 22 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-20-184b3fbb.jpg` | 800×600 | 2 / category-1 | `plateau/plateau-chargement-mixte.jpg` |
| 23 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-21-7766e2c1.jpg` | 800×600 | 2 / category-1 | `plateau/charge-longue-nuit.jpg` |
| 24 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-22-529aed2f.jpg` | 1236×600 | 2 / category-1 | `plateau/plateau-bottes-de-paille.jpg` |
| 25 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-23-ab6466a0.jpg` | 800×600 | 2 / category-1 | `plateau/poutres-beton-chantier.jpg` |
| 26 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-24-9f8c135d.jpg` | 446×600 | 2 / category-1 | `plateau/convoi-exceptionnel-module-arriere.jpg` |
| 27 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-25-3a324c78.jpg` | 291×600 | 2 / category-1 | `plateau/scania-plateau-caisses-bois.jpg` |
| 28 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-26-31dca4ca.jpg` | 800×600 | 2 / category-1 | `plateau/chargement-module-grue.jpg` |
| 29 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-27-6d5aa030.jpg` | 800×600 | 2 / category-1 | `plateau/convoi-exceptionnel-man-conteneur.jpg` |
| 30 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-28-6eb165e9.jpg` | 800×600 | 2 / category-1 | `plateau/plateau-treillis-soudes.jpg` |
| 31 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-29-7616e730.jpg` | 800×600 | 2 / category-1 | `plateau/renault-caisses-palettes.jpg` |
| 32 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-30-4a02ece4.jpg` | 800×600 | 2 / category-1 | `plateau/man-plateau-jaune-chemin.jpg` |
| 33 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-31-9897def9.jpg` | 800×600 | 2 / category-1 | `flotte/trois-tracteurs-caisses-grillagees.jpg` |
| 34 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-32-ebf7dc6c.jpg` | 800×600 | 2 / category-1 | `flotte/volvo-fh-blanc.jpg` |
| 35 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-33-ddc05b30.jpg` | 800×600 | 2 / category-1 | `plateau/volvo-fh-caisses-grillagees.jpg` |
| 36 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-34-bfff1ae7.jpg` | 800×600 | 2 / category-1 | `plateau/volvo-fh-caisses-coucher-soleil.jpg` |
| 37 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-35-0e2ca02f.jpg` | 800×600 | 2 / category-1 | `flotte/deux-man-tgx.jpg` |
| 38 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-36-c914ef40.jpg` | 800×600 | 2 / category-1 | `plateau/volvo-bleu-plateau-givre.jpg` |
| 39 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-37-9328ec19.jpg` | 800×600 | 2 / category-1 | `plateau/volvo-bleu-face-givre.jpg` |
| 40 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-38-ef7605c9.jpg` | 450×600 | 2 / category-1 | `plateau/dechargement-poutrelles-acier.jpg` |
| 41 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-39-13e1de5e.jpg` | 800×600 | 2 / category-1 | `plateau/levage-poutrelle-chantier.jpg` |
| 42 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-40-98ead597.jpeg` | 600×600 | 2 / category-1 | `flotte/volvo-bleu-neige.jpg` |
| 43 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-41-b4bcd077.jpg` | 960×466 |  | `grue/camion-grue-vignoble.jpg` *(copie identique)* |
| 44 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-42-478d6b0c.jpg` | 960×466 |  | `grue/camion-grue-volvo-levage-module.jpg` *(variante recadrée écartée)* |
| 45 | `transports-brun-transport-plateaux-camion-grue-haut-rhin-alsace-43-477da651.jpg` | 960×466 |  | `marchandises/volvo-bleu-tautliner-neige.jpg` *(copie identique)* |

#### `/transports-de-marchandises-et-btp-haut-rhin-alsace` — 34 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |
| 2 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-421e364a.jpg` | 2550×1434 |  | `marchandises/renault-tautliner-parking.jpg` |
| 3 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-1-bd8d3409.jpeg` | 1920×1080 |  | `marchandises/porteur-man-village.jpg` |
| 4 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-2-d797015a.jpeg` | 800×600 | 1 / category-2 | `flotte/man-tgx-blanc.jpg` |
| 5 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-3-1ccb73b5.jpeg` | 1066×600 | 1 / category-2 | `flotte/daf-xg-livree.jpg` |
| 6 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-4-96e916fa.jpeg` | 600×600 | 1 / category-2 | `flotte/iveco-s-way.jpg` |
| 7 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-5-68d97049.jpg` | 450×600 | 1 / category-1 | `marchandises/porteur-bache-quai.jpg` |
| 8 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-6-10c37d8f.jpg` | 800×600 | 1 / category-1 | `flotte/flotte-alignee-soir.jpg` |
| 9 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-7-fe437fd8.jpg` | 800×600 | 1 / category-1 | `flotte/daf-volvo-man.jpg` |
| 10 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-8-e03f461f.jpg` | 800×600 | 1 / category-1 | `flotte/flotte-panorama.jpg` |
| 11 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-9-dd790269.jpg` | 1331×600 | 1 / category-1 | `marchandises/volvo-tautliner-ouvert.jpg` |
| 12 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-10-6303b6ea.jpg` | 800×600 | 1 / category-1 | `flotte/trois-tracteurs-contre-plongee.jpg` |
| 13 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-11-d4a0bb5f.jpg` | 800×600 | 1 / category-1 | `flotte/deux-volvo-fh.jpg` |
| 14 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-12-eb3775ac.jpg` | 450×600 | 1 / category-1 | `flotte/volvo-fh-460-face.jpg` |
| 15 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-13-c2c08863.jpg` | 450×600 | 1 / category-1 | `flotte/volvo-bleu-sol-mouille.jpg` |
| 16 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-14-ab6255f1.jpg` | 800×600 | 1 / category-1 | `marchandises/renault-t-semi-remorque.jpg` |
| 17 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-15-c330dead.jpg` | 270×600 | 1 / category-1 | `flotte/renault-t-face.jpg` |
| 18 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-16-17278116.jpg` | 450×600 | 1 / category-1 | `marchandises/porteur-bache-quai.jpg` *(copie identique)* |
| 19 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-17-56415c9e.jpg` | 800×600 | 1 / category-1 | `marchandises/volvo-bleu-tautliner.jpg` |
| 20 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-18-7d7f940d.jpg` | 800×600 | 1 / category-1 | `flotte/flotte-panorama.jpg` *(copie identique)* |
| 21 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-19-d0953d48.jpg` | 1236×600 | 1 / category-1 | `marchandises/scania-fourgon-entrepot.jpg` |
| 22 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-20-efc65612.jpg` | 450×600 | 1 / category-1 | `marchandises/convoi-exceptionnel-cuve.jpg` |
| 23 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-21-fb9bc349.jpg` | 1236×600 | 1 / category-1 | `marchandises/murs-prefabriques-scania.jpg` |
| 24 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-22-90e085f3.jpg` | 1236×600 | 1 / category-1 | `marchandises/scania-conteneur-foret.jpg` |
| 25 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-23-18eb1d56.jpg` | 1236×600 | 1 / category-1 | `marchandises/structure-metallique-centrale.jpg` |
| 26 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-24-b06209f0.jpg` | 800×600 | 1 / category-1 | `marchandises/cuve-levage-grue.jpg` |
| 27 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-25-2247c749.jpg` | 1234×600 | 1 / category-1 | `marchandises/benne-man-granulats.jpg` |
| 28 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-26-f2034df7.jpg` | 800×600 | 1 / category-1 | `marchandises/renault-tautliner-cloture.jpg` |
| 29 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-27-d3ecb605.jpg` | 450×600 | 1 / category-1 | `flotte/volvo-fh-reflet.jpg` |
| 30 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-28-97d1bff9.jpg` | 450×600 | 1 / category-1 | `flotte/volvo-fh-portes-ouvertes.jpg` |
| 31 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-29-6e0e6369.jpg` | 450×600 | 1 / category-1 | `flotte/volvo-fh-460-cabine.jpg` |
| 32 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-30-b4bcd077.jpg` | 960×466 |  | `grue/camion-grue-vignoble.jpg` *(copie identique)* |
| 33 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-31-478d6b0c.jpg` | 960×466 |  | `grue/camion-grue-volvo-levage-module.jpg` *(variante recadrée écartée)* |
| 34 | `transports-brun-transports-de-marchandises-haut-rhin-alsace-32-477da651.jpg` | 960×466 |  | `marchandises/volvo-bleu-tautliner-neige.jpg` *(copie identique)* |

#### `/notre-equipement` — 19 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |
| 2 | `transports-brun-notre-equipement-c42c934b.png` | 799×600 | 3 / category-4 | `plateau/volvo-fh-caisses-grillagees.jpg` *(variante recadrée écartée)* |
| 3 | `transports-brun-notre-equipement-1-e89c16b2.jpeg` | 801×600 | 3 / category-4 | `plateau/convoi-exceptionnel-man-conteneur.jpg` *(variante recadrée écartée)* |
| 4 | `transports-brun-notre-equipement-2-9151b3b0.png` | 799×600 | 3 / category-4 | `flotte/deux-man-tgx.jpg` *(variante recadrée écartée)* |
| 5 | `transports-brun-notre-equipement-3-5b690c5e.jpeg` | 800×600 | 3 / category-4 | `marchandises/cuve-levage-grue.jpg` *(variante recadrée écartée)* |
| 6 | `transports-brun-notre-equipement-4-7b266377.jpeg` | 800×600 | 3 / category-4 | `plateau/poutres-beton-chantier.jpg` *(variante recadrée écartée)* |
| 7 | `transports-brun-notre-equipement-5-0bb100f0.jpeg` | 800×600 | 3 / category-4 | `plateau/plateau-chargement-mixte.jpg` *(variante recadrée écartée)* |
| 8 | `transports-brun-notre-equipement-6-622f3aae.jpeg` | 800×600 | 4 / category-4 | `equipement/remorque-trax-cadres-beton.jpg` |
| 9 | `transports-brun-notre-equipement-7-b6f37d41.jpeg` | 800×600 | 4 / category-4 | `equipement/remorque-trax-chargee.jpg` |
| 10 | `transports-brun-notre-equipement-8-0e3f24c7.jpeg` | 800×600 | 4 / category-4 | `equipement/remorque-trax-rampes.jpg` |
| 11 | `transports-brun-notre-equipement-9-20b0d2e5.jpeg` | 800×600 | 4 / category-4 | `equipement/remorque-trax-vue-arriere.jpg` |
| 12 | `transports-brun-notre-equipement-10-e8d6c5ed.png` | 800×600 | 5 / category-4 | `marchandises/renault-tautliner-cloture.jpg` *(variante recadrée écartée)* |
| 13 | `transports-brun-notre-equipement-11-cd8f39cb.png` | 450×600 | 5 / category-4 | `marchandises/porteur-bache-quai.jpg` *(variante recadrée écartée)* |
| 14 | `transports-brun-notre-equipement-12-2847318a.jpeg` | 1332×600 | 5 / category-4 | `marchandises/volvo-tautliner-ouvert.jpg` *(variante recadrée écartée)* |
| 15 | `transports-brun-notre-equipement-13-ea3ef408.png` | 409×600 | 5 / category-4 | `equipement/tautliner-hayon.jpg` |
| 16 | `transports-brun-notre-equipement-14-45526e1d.png` | 799×600 | 6 / category-4 | `grue/camion-grue-volvo-fm.jpg` |
| 17 | `transports-brun-notre-equipement-15-7877cbc5.jpeg` | 1066×600 | 6 / category-4 | `grue/camion-grue-volvo-levage-module.jpg` *(variante recadrée écartée)* |
| 18 | `transports-brun-notre-equipement-16-bb514337.jpg` | 450×600 | 6 / category-4 | `grue/camion-grue-batiment-historique.jpg` *(variante recadrée écartée)* |
| 19 | `transports-brun-notre-equipement-17-ae9c408f.jpg` | 450×600 | 6 / category-4 | `grue/camion-grue-levage-centre-ville.jpg` *(variante recadrée écartée)* |

#### `/contact` — 1 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |

#### `/mentions-legales` — 1 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |

#### `/politiques-de-confidentialites` — 1 images

| # | Fichier miroir | Dimensions | Galerie Joomla | Retenue dans le projet |
|---|---|---|---|---|
| 1 | `transport-brun-camion-routier-plateau-marchandise-alsace.png` | 250×130 |  | `content/brand/logo-transports-brun.png` |
