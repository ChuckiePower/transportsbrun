# Transports Brun — site vitrine

Refonte du site [transports-brun.com](https://transports-brun.com) : transporteur routier familial à
Saint-Hippolyte (Haut-Rhin), transport plateau / camion-grue, charges lourdes et hors normes, fret
interurbain, ADR. Objectif : générer des **demandes de devis** et des **appels**.

- **Stack** : Next.js 16 (App Router, pages statiques, `output: "standalone"`), React 19, TypeScript strict,
  Tailwind CSS 4, react-hook-form + zod, Nodemailer, Radix Dialog, icônes Lucide, Playwright.
- **Design « Route douce »** (v2) : tons crème et bleu nuit, jaune réservé aux actions, formes arrondies,
  Plus Jakarta Sans (titres) + Inter (texte), animations CSS discrètes (désactivées en mouvement réduit).
- **Aucun cookie, aucun traceur**, polices auto-hébergées, photos réelles uniquement.
- Déploiement : Docker derrière Caddy ou nginx → voir [`DEPLOY.md`](DEPLOY.md).

## Démarrer en local

Prérequis : Node 22 LTS et pnpm 10 (`corepack enable`).

```bash
pnpm install
cp .env.example .env.local     # facultatif en développement
pnpm dev                       # http://localhost:3000
```

Sans configuration SMTP, le formulaire fonctionne en développement : l'e-mail est **affiché dans la
console** au lieu d'être envoyé. Pour voir les e-mails dans une vraie boîte de test :
`docker compose -f compose.mailpit.yml up -d`, puis dans `.env.local` `SMTP_HOST=127.0.0.1`,
`SMTP_PORT=1025`, et ouvrir <http://127.0.0.1:8025>.

| Commande | Rôle |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production (`.next/standalone`) |
| `pnpm lint` · `pnpm typecheck` · `pnpm format:check` | ESLint, `tsc --noEmit`, Prettier (`pnpm check` = les trois) |
| `pnpm test:e2e` | Tests Playwright (formulaire, navigation, accessibilité axe) — après `pnpm build` |
| `pnpm screenshots` | Captures 375 / 768 / 1440 px dans `docs/screenshots/` — après `pnpm build` |
| `pnpm check:site <url>` | Liens internes, `alt`, `mailto:`/`tel:`, title/description/canonical/H1 |
| `pnpm lighthouse <url>` | Scores Lighthouse mobile → `docs/lighthouse/scores.md` |

`pnpm check:site` et `pnpm lighthouse` s'exécutent contre un site qui tourne, par ex.
`pnpm build && pnpm start` puis `pnpm check:site http://127.0.0.1:3000`.

## Structure

```
content/
  photos/<thème>/…      photos réelles (grue, plateau, marchandises, equipement, flotte, divers)
  brand/                logo actuel (PNG) et logo France Plateau
  images-manifest.json  inventaire des photos (dimensions, alt, original sur l'ancien hébergement)
src/
  app/                  pages (une par URL du site actuel), API /api/contact, sitemap, robots, OG
  components/
    layout/             en-tête, menu mobile, pied de page, barre d'appel mobile, CTA flottant, interactions
    sections/           hero, bandeau de confiance, cartes services, FAQ, étapes, coordonnées, CTA…
    media/              Photo, galerie + visionneuse, carte
    form/               formulaire de devis (2 étapes), tiroir « Être rappelé »
    ui/                 Button, Container, Section, Card, IconChip, Tag, icônes…
    seo/                JSON-LD, mesure d'audience facultative
  content/              TOUS les textes et données (voir ci-dessous)
  lib/                  schéma du formulaire, envoi d'e-mail, limitation de débit, typographie, SEO
  fonts/                polices woff2 (licence OFL)
deploy/                 Caddyfile, nginx.conf
docs/                   audit, décisions, à-faire, captures, scores Lighthouse
scripts/                contrôle du site, Lighthouse, icônes, serveur de test
tests/                  Playwright
source-site/            miroir de l'ancien site (référence, non déployé)
```

## Design : couleurs, polices, rayons

Tous les réglages visuels sont des variables CSS dans **`src/app/globals.css`** (bloc `@theme`) :
couleurs (`--color-cream`, `--color-ink`, `--color-brand`, `--color-sun`, `--color-night`…), rayons
(`--radius-*`), ombres (`--shadow-*`), tailles de titres (`--text-h1`…). Les couleurs par défaut de
Tailwind sont désactivées : seules ces couleurs existent. Polices : `src/app/fonts.ts`
(fichiers dans `src/fonts/`, licence OFL). Le jaune (`sun`) est réservé aux actions principales.

## Modifier le contenu

### Changer un numéro, un e-mail, l'adresse ou les horaires

Un seul fichier : **`src/content/site.ts`** (`phones`, `emails`, `address`, `hours`, `social`).
Le changement se répercute partout : en-tête, pied de page, page contact, barre d'appel mobile,
données structurées Google, e-mails du formulaire. (Seuls les horaires recopiés à l'identique dans les
mentions légales sont à part : `legalHours` dans `src/content/legal.ts`.)

### Modifier un texte

Les textes sont dans `src/content/` :

| Fichier | Contenu |
|---|---|
| `pages/home.ts` | Accueil (hero, sections, title/description) |
| `pages/histoire.ts`, `pages/savoir-faire.ts`, `pages/plateau.ts`, `pages/marchandises.ts`, `pages/equipement.ts`, `pages/contact.ts` | Une page chacun |
| `services.ts` | Les 3 métiers, bloc « Nos domaines d'expertise », bandeau de confiance |
| `equipment.ts` | Inventaire du parc, catégories et photos de la page Équipement, fiche technique du camion-grue |
| `legal.ts` | Mentions légales et politique de confidentialité |

Écrivez naturellement dans les gabarits `` fr`…` `` : apostrophes, guillemets « » et espaces
insécables sont ajoutés automatiquement. Dans certains textes, `**gras**` et `[lien](/contact)` sont reconnus.

### Remplacer une photo par son original haute définition

Déposer le fichier original **sous le même nom** dans `content/photos/<thème>/` (écraser l'ancien),
puis reconstruire (`pnpm build`, ou `docker compose build` sur le serveur). Largeur, hauteur et aperçu
flou sont recalculés automatiquement. La correspondance avec les fichiers de l'ancien hébergement est
dans `docs/TODO-MANU.md`.

### Ajouter une photo

1. Copier le fichier dans `content/photos/<thème>/nom-explicite.jpg`.
2. Dans `src/content/gallery.ts` : ajouter un `import imgXX from "@photos/<thème>/nom-explicite.jpg";`
   et une entrée dans `library` avec un **texte alternatif qui décrit la photo**
   (ex. « Tracteur MAN et semi-remorque plateau chargée de poutres en béton »).
3. Référencer son identifiant (`"<thème>/nom-explicite"`) dans une galerie (`plateauGallery`,
   `marchandisesGallery`, `homeMosaic`) ou dans une catégorie de `src/content/equipment.ts`.
   TypeScript signale toute faute de frappe dans un identifiant.

### Remplacer le logo

Remplacer `content/brand/logo-transports-brun.png` (même nom). Pour un logo SVG, adapter l'import dans
`src/components/layout/Logo.tsx` et `src/components/seo/JsonLd.tsx`.

## Qualité

- Accessibilité : WCAG 2.2 AA visé (contrastes, focus visible, navigation clavier, lien d'évitement,
  menu et visionneuse accessibles, cibles ≥ 44 px, `prefers-reduced-motion`). axe : aucune violation.
- Performances et SEO : voir `docs/lighthouse/scores.md`.
- Choix et compromis : `docs/DECISIONS.md`. Points en attente : `docs/TODO-MANU.md`.
