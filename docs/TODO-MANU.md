# À fournir ou à valider par Manu

Rien de ce qui suit ne bloque la mise en ligne technique, mais chaque point doit être tranché
avant (ou juste après) la bascule. Les textes concernés sont affichés **tels qu'ils figurent sur
le site actuel** tant qu'ils ne sont pas validés : rien n'a été réécrit de ma propre initiative.

## 1. Textes légaux (`src/content/legal.ts`, commentaires `TODO(manu): à valider`)

| # | Point | Où | Ce qu'il faut décider |
|---|---|---|---|
| 1 | **Hébergeur** : « Ionos SARL, 7 place de la Gare, Sarreguemines » | `host` | Nom, adresse (et téléphone) de l'hébergeur du VPS |
| 2 | **Création web et référencement : EXODREAM** | `webAgency` (`show: true`) | Retirer (`show: false`) ou remplacer si l'agence n'est plus impliquée |
| 3 | **Crédit Shutterstock** | `imageCredit` (`show: true`) | La refonte n'utilise **aucune** image Shutterstock (uniquement vos photos) : passer `show: false` sauf avis contraire |
| 4 | **Horaires** « 8h-12h / 13h30-18h » (mentions légales) contre « 14h-18h » partout ailleurs | `legalHours` | Donner l'horaire juste ; s'il change, modifier aussi `site.hours` dans `src/content/site.ts` |
| 5 | **Cookies / statistiques** : le texte parle de statistiques de fréquentation | `cookiesSection` | Le site refait **ne dépose aucun cookie** (ni statistiques, ni bannière). Paragraphe à réécrire (proposition possible sur demande) |
| 6 | **Données personnelles** : « nouveautés et promotions », « commande », « lettre d'information », « informations de paiement », transferts hors Europe (Canada, États-Unis) | `personalDataIntro`, `privacyPolicy.sections` (`todo: true`) | Réécrire pour le seul traitement réel : formulaire de devis → e-mail à `CONTACT_TO` ; **définir la durée de conservation** des e-mails reçus |
| 7 | **Directeur de la publication** : David BRUN | `publicationDirector` | Confirmer |
| 8 | **Règlement en ligne des litiges** : la plateforme européenne RLL/ODR a été **fermée le 20 juillet 2025** | `odrSection` | Paragraphe et lien probablement à retirer |

## 2. Fichiers à fournir

- [ ] **Logo vectoriel** (SVG, PDF ou AI). Le logo actuel est un PNG de 250 × 130 px : il est
      affiché à 125 px maximum pour rester net, ce qui limite sa taille. Avec un SVG, il suffira de
      remplacer `content/brand/logo-transports-brun.png` (et l'import dans `src/components/layout/Logo.tsx`).
- [ ] **Photos originales haute définition**. Les photos du miroir sont des versions réduites
      (souvent 800 × 600). Pour chaque photo ci-dessous, déposez l'original **sous le même nom**
      dans `content/photos/…` puis reconstruisez : dimensions et aperçus flous se mettent à jour seuls.
      La colonne de droite donne le chemin du fichier d'origine sur l'hébergement actuel
      (à récupérer par FTP/gestionnaire de fichiers IONOS, dossier `images/`).
- [ ] (Facultatif) **Photos d'équipe** : la section « Découvrez notre équipe » est illustrée par une
      photo de camion faute de photo des chauffeurs.

| Fichier dans `content/photos/` | Taille actuelle | Original sur l'hébergement |
|---|---|---|
| `grue/camion-grue-volvo-levage-module.jpg` | 2550×1434 | `images/notre-equipement/galleries/camion-grue/image23.jpeg` |
| `grue/camion-grue-vignoble.jpg` | 960×466 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `grue/bras-de-grue-deploye.jpg` | 600×600 | `images/transports-plateaux/galerie/image661.jpg` |
| `grue/camion-grue-scania-gros-plan.jpg` | 600×600 | `images/transports-plateaux/galerie/image662.jpg` |
| `grue/camion-grue-scania-stabilisateurs.jpg` | 600×600 | `images/transports-plateaux/galerie/image663.jpg` |
| `grue/camion-grue-chantier-structure.jpg` | 800×600 | `images/gallery/grues/IMG-2885.JPG` |
| `grue/camion-grue-volvo-fm.jpg` | 799×600 | `images/notre-equipement/galleries/camion-grue/image22.png` |
| `grue/camion-grue-batiment-historique.jpg` | 600×600 | `images/accueil/galerie/20251022_170704.jpg` |
| `grue/camion-grue-levage-centre-ville.jpg` | 600×600 | `images/accueil/galerie/20251105_073237.jpg` |
| `plateau/plateau-renault-armatures.webp` | 960×466 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `plateau/plateau-man-voie-rapide.jpg` | 960×466 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `plateau/porte-engins-man-ville.jpg` | 800×600 | `images/gallery/plateau/1_20231023/IMG-4569.jpg` |
| `plateau/camions-nuit-arc-de-triomphe.jpg` | 800×600 | `images/gallery/plateau/1_20231023/IMG-4673.jpg` |
| `plateau/plateau-daf-zone-stockage.jpg` | 1331×600 | `images/bagallery/original/snapchat-1975727576-2.jpg` |
| `plateau/porte-engins-man-gris.jpg` | 600×600 | `images/bagallery/original/1645004653368-2.jpg` |
| `plateau/porte-engins-pelle-volvo.jpg` | 600×600 | `images/accueil/galerie/20241129_Messages.jpg` |
| `plateau/plateau-route-mouillee.jpg` | 1331×600 | `images/bagallery/original/20220330_195903-2.jpg` |
| `plateau/plateau-man-coucher-soleil.jpg` | 450×600 | `images/bagallery/original/20220321_181401.jpg` |
| `plateau/module-sur-plateau.jpg` | 800×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-conteneur-profil.jpg` |
| `plateau/plateau-chantier-grue-a-tour.jpg` | 450×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-travaux-btp.jpg` |
| `plateau/plateau-chargement-mixte.jpg` | 800×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-profil.jpg` |
| `plateau/charge-longue-nuit.jpg` | 800×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-nuit.jpg` |
| `plateau/plateau-bottes-de-paille.jpg` | 1236×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-mottes.jpg` |
| `plateau/poutres-beton-chantier.jpg` | 800×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-marchandises-btp.jpg` |
| `plateau/convoi-exceptionnel-module-arriere.jpg` | 446×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-intrieur.jpg` |
| `plateau/scania-plateau-caisses-bois.jpg` | 291×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-face.jpg` |
| `plateau/chargement-module-grue.jpg` | 800×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-conteneur-vide.jpg` |
| `plateau/convoi-exceptionnel-man-conteneur.jpg` | 800×600 | `/images/bagallery/original/transport-routier-plateaux-haut-rhin-alsace-camion-bleu.jpg` |
| `plateau/plateau-treillis-soudes.jpg` | 800×600 | `/images/gallery/plateau/camion-mini-transport-brun.jpg` |
| `plateau/renault-caisses-palettes.jpg` | 800×600 | `/images/gallery/plateau/camion-plateau-transport-brun-pluie.jpg` |
| `plateau/man-plateau-jaune-chemin.jpg` | 800×600 | `/images/gallery/plateau/camion-plateau-transport-brun-nature.jpg` |
| `plateau/volvo-fh-caisses-grillagees.jpg` | 800×600 | `/images/gallery/plateau/Transports-brun-transports-plateaux-camion-arrete.jpg` |
| `plateau/volvo-fh-caisses-coucher-soleil.jpg` | 800×600 | `/images/gallery/plateau/Transport-plateaux-transports-brun.jpg` |
| `plateau/volvo-bleu-plateau-givre.jpg` | 800×600 | `/images/gallery/plateau/20210113_084750.jpg` |
| `plateau/volvo-bleu-face-givre.jpg` | 800×600 | `/images/gallery/plateau/20210113_084802.jpg` |
| `plateau/dechargement-poutrelles-acier.jpg` | 450×600 | `/images/gallery/plateau/FB_IMG_1616047649252.jpg` |
| `plateau/levage-poutrelle-chantier.jpg` | 800×600 | `/images/gallery/plateau/FB_IMG_1616047677263.jpg` |
| `marchandises/renault-tautliner-parking.jpg` | 2550×1434 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `marchandises/porteur-man-village.jpg` | 1920×1080 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `marchandises/porteur-bache-quai.jpg` | 450×600 | `images/bagallery/original/20220323_105315-2.jpg` |
| `marchandises/volvo-tautliner-ouvert.jpg` | 1331×600 | `images/bagallery/original/20220405_111602.jpg` |
| `marchandises/renault-t-semi-remorque.jpg` | 800×600 | `/images/gallery/marchandises/20200825_203617.jpg` |
| `marchandises/volvo-bleu-tautliner.jpg` | 800×600 | `images/bagallery/original/20220321_150004.jpg` |
| `marchandises/scania-fourgon-entrepot.jpg` | 1236×600 | `/images/bagallery/original/transports-de-marchandises-et-btp-haut-rhin-alsace-sortie-camion.jpg` |
| `marchandises/convoi-exceptionnel-cuve.jpg` | 450×600 | `/images/bagallery/original/transports-de-marchandises-et-btp-haut-rhin-alsace-camion-souleve-charge.jpg` |
| `marchandises/murs-prefabriques-scania.jpg` | 1236×600 | `/images/bagallery/original/transports-de-marchandises-et-btp-haut-rhin-alsace-camion-plateaux.jpg` |
| `marchandises/scania-conteneur-foret.jpg` | 1236×600 | `/images/bagallery/original/transports-de-marchandises-et-btp-haut-rhin-alsace-camion-foret.jpg` |
| `marchandises/structure-metallique-centrale.jpg` | 1236×600 | `/images/bagallery/original/transports-de-marchandises-et-btp-haut-rhin-alsace-camion-echaffaudage.jpg` |
| `marchandises/cuve-levage-grue.jpg` | 800×600 | `/images/bagallery/original/transports-de-marchandises-et-btp-haut-rhin-alsace-camion-cuve.jpg` |
| `marchandises/benne-man-granulats.jpg` | 1234×600 | `/images/gallery/marchandises/Camion-transport-marchandises-transport-brun.jpg` |
| `marchandises/renault-tautliner-cloture.jpg` | 800×600 | `/images/gallery/marchandises/Camion-transport-brun-de-profil.jpg` |
| `marchandises/volvo-bleu-tautliner-neige.jpg` | 960×466 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `marchandises/bache-logo-transports-brun.jpg` | 600×600 | `images/accueil/galerie/20231116_Gallery.jpg` |
| `marchandises/renault-t-tautliner-ciel-bleu.jpg` | 600×600 | `images/accueil/galerie/20240606_174028.jpg` |
| `marchandises/man-tgx-gris-tautliner.jpg` | 1920×1080 | `images/accueil/galerie/IMG_3334.jpg` |
| `equipement/remorque-trax-cadres-beton.jpg` | 800×600 | `images/notre-equipement/galleries/remorque-trax/image14.jpeg` |
| `equipement/remorque-trax-chargee.jpg` | 800×600 | `images/notre-equipement/galleries/remorque-trax/image15.jpeg` |
| `equipement/remorque-trax-rampes.jpg` | 800×600 | `images/notre-equipement/galleries/remorque-trax/image16.jpeg` |
| `equipement/remorque-trax-vue-arriere.jpg` | 800×600 | `images/notre-equipement/galleries/remorque-trax/image17.jpeg` |
| `equipement/tautliner-hayon.jpg` | 409×600 | `images/notre-equipement/galleries/camion-tautliner/image21.png` |
| `flotte/flotte-alignee.jpg` | 1920×910 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `flotte/daf-xg-montagnes.jpg` | 2550×1434 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `flotte/daf-passerelle-dunlop.jpg` | 1280×853 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `flotte/flotte-nuit.jpg` | 2550×1434 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `flotte/quatre-tracteurs.jpg` | 960×466 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `flotte/man-tgx-enseigne.jpg` | 960×720 | `images/gallery/plateau/1_20231023/IMG-3592.jpg` |
| `flotte/daf-xg-decoration-noire.jpg` | 1067×600 | `images/bagallery/original/img_3784.jpeg` |
| `flotte/daf-xg-livree.jpg` | 1066×600 | `images/bagallery/original/img_2737.jpeg` |
| `flotte/quatre-tracteurs-ciel-bleu.jpg` | 600×600 | `images/accueil/galerie/IMG_3452.jpg` |
| `flotte/volvo-fh-crepuscule.jpg` | 450×600 | `images/bagallery/original/20220321_190500.jpg` |
| `flotte/trois-tracteurs-caisses-grillagees.jpg` | 800×600 | `/images/gallery/plateau/Transport-Brun-transport-sur-plateau.jpg` |
| `flotte/volvo-fh-blanc.jpg` | 800×600 | `/images/gallery/plateau/Transports-plateaux-transport-brun-camion-profil.jpg` |
| `flotte/deux-man-tgx.jpg` | 800×600 | `/images/gallery/plateau/20201113_095358.jpg` |
| `flotte/volvo-bleu-neige.jpg` | 600×600 | `/images/gallery/plateau/Resized_IMG_20210115_140123_563.jpeg` |
| `flotte/man-tgx-blanc.jpg` | 800×600 | `images/bagallery/original/img_8698-2.jpeg` |
| `flotte/iveco-s-way.jpg` | 600×600 | `images/bagallery/original/image0000001-2.jpeg` |
| `flotte/flotte-alignee-soir.jpg` | 800×600 | `images/bagallery/original/img-1234.jpg` |
| `flotte/daf-volvo-man.jpg` | 800×600 | `images/bagallery/original/img-1073.jpg` |
| `flotte/flotte-panorama.jpg` | 800×600 | `images/bagallery/original/slider3.jpg` |
| `flotte/trois-tracteurs-contre-plongee.jpg` | 800×600 | `images/bagallery/original/20220206_125123-1-.jpg` |
| `flotte/deux-volvo-fh.jpg` | 800×600 | `/images/gallery/marchandises/camions-transport-brun.jpg` |
| `flotte/volvo-fh-460-face.jpg` | 450×600 | `/images/gallery/marchandises/Camion-blanc-transport-brun.jpg` |
| `flotte/volvo-bleu-sol-mouille.jpg` | 450×600 | `/images/gallery/marchandises/Camion-bleu-transport-brun.jpg` |
| `flotte/renault-t-face.jpg` | 270×600 | `images/bagallery/original/20220329_185511.jpg` |
| `flotte/volvo-fh-reflet.jpg` | 450×600 | `images/bagallery/original/camion-transport-marchandises-transport-brun-face-avant.jpg` |
| `flotte/volvo-fh-portes-ouvertes.jpg` | 450×600 | `images/bagallery/original/camion-transport-brun-face-avant.jpg` |
| `flotte/volvo-fh-460-cabine.jpg` | 450×600 | `images/bagallery/original/camion-profil-transport-brun.jpg` |
| `divers/scania-plateau-crepuscule-assombri.jpg` | 2000×636 | — (nom d'origine inconnu : voir `sourceMiroir`) |
| `divers/man-fourgon-assombri.jpg` | 2000×636 | — (nom d'origine inconnu : voir `sourceMiroir`) |
## 3. Accès et paramètres de production

- [ ] **SMTP** : confirmer l'hôte (`smtp.ionos.fr` probable), le port, et fournir la boîte d'envoi
      + son mot de passe (à saisir dans `.env` sur le VPS uniquement, jamais dans le dépôt).
- [ ] **Destinataire** des demandes de devis (`CONTACT_TO`, par défaut `contact@transports-brun.com`).
- [ ] **Accès à la zone DNS** (IONOS) le jour de la bascule et IP(v4/v6) du VPS (voir `DEPLOY.md` §5).
- [ ] **Google Search Console** et **Google Business Profile** : accès pour soumettre le sitemap
      et vérifier le lien vers le site.
- [ ] (Facultatif) **Mesure d'audience** : souhaitez-vous Umami ou Plausible auto-hébergé ? (désactivé par défaut)

## 4. Choix de contenu à valider

- [ ] **H1 de l'accueil** : « Transport plateau, camion-grue et charges hors normes en Alsace »
      (remplace « Transport plateau grue et plateau »).
- [ ] **Titres et descriptions** des pages (onglet du navigateur / Google) : listés dans `docs/DECISIONS.md`.
- [ ] **Bandeau de confiance** de l'accueil : Entreprise familiale (créée le 2 mars 2018) · Près de 25 ans
      d'expérience · Convois exceptionnels cat. 1 et 2 · ADR de base et colisage · Accès référencés en
      centrales nucléaires · Membre du Groupement France Plateau · Chauffeurs localisables.
- [ ] **Libellés des e-mails** : Contact / Comptabilité / Exploitation / Commercial (déduits des adresses).
- [ ] **Catégorie « Plateaux »** de la page Équipement : illustrée par 4 photos de semi-remorques plateau
      choisies dans la galerie plateau (le site actuel n'avait pas de galerie dédiée).
- [ ] **Nom du groupement** : « Groupement France Plateau » dans les textes, « France-Plateaux » sur le logo :
      quelle graphie ? Et l'utilisation de leur logo est-elle toujours d'actualité ?
- [ ] Une photo de la galerie plateau porte l'incrustation « Redmi Note 9 · AI Quad Camera »
      (`plateau/porte-engins-man-gris.jpg`) : la garder, la recadrer ou la retirer ?
- [ ] Les photos montrant des lieux identifiables (Arc de Triomphe, circuit avec passerelle Dunlop,
      bâtiment historique en rénovation) sont déjà publiées sur le site actuel : OK pour les conserver ?
