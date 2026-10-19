# Déploiement sur le VPS

Ce guide déploie le site dans un conteneur Docker derrière un reverse proxy (Caddy **ou** nginx),
puis bascule le nom de domaine **sans interrompre les e-mails**. Rien n'a été déployé ni modifié
côté DNS : toutes les commandes ci-dessous sont à exécuter par vous.

- L'application écoute uniquement sur `127.0.0.1:3000` ; seul le reverse proxy est exposé (80/443).
- Aucune base de données, aucun fichier à sauvegarder hormis `.env` (secrets SMTP).

---

## 1. Prérequis sur le VPS

- Linux récent (Debian 12 / Ubuntu 24.04…), accès `sudo`.
- Docker Engine + plugin Compose : `docker --version` et `docker compose version`
  (installation : <https://docs.docker.com/engine/install/>).
- Ports 80 et 443 ouverts dans le pare-feu (`ufw allow 80,443/tcp` le cas échéant).
- Un reverse proxy : **Caddy** (recommandé : HTTPS automatique) ou **nginx** + certbot.
  Si l'un des deux tourne déjà sur le serveur, gardez-le et ajoutez simplement le bloc du site.

## 2. Récupérer le code et configurer

```bash
sudo mkdir -p /opt/transports-brun && sudo chown "$USER" /opt/transports-brun
git clone https://github.com/ChuckiePower/transportsbrun.git /opt/transports-brun
cd /opt/transports-brun
cp .env.example .env
chmod 600 .env
nano .env
```

Variables à renseigner dans `.env` :

| Variable | Valeur | Remarque |
|---|---|---|
| `SITE_URL` | `https://transports-brun.com` | sans slash final ; gravée dans les pages au build |
| `SMTP_HOST` | `smtp.ionos.fr` | **à confirmer** dans l'espace client IONOS (rubrique e-mail) |
| `SMTP_PORT` / `SMTP_SECURE` | `465` / `true` (SSL) ou `587` / `false` (STARTTLS) | |
| `SMTP_USER` / `SMTP_PASS` | adresse complète de la boîte d'envoi + mot de passe | ex. une boîte dédiée `site@…` ou `contact@…` |
| `CONTACT_FROM` | en général = `SMTP_USER` | IONOS refuse un expéditeur qui n'est pas la boîte authentifiée |
| `CONTACT_TO` | `contact@transports-brun.com` | destinataire des demandes de devis |

Sans `SMTP_HOST`, le formulaire refuse proprement l'envoi en production (message invitant à
téléphoner) : aucune demande n'est perdue en silence.

## 3. Construire et lancer

```bash
cd /opt/transports-brun
# étiquette = commit courant, pour pouvoir revenir en arrière
export IMAGE_TAG=$(git rev-parse --short HEAD)
docker compose build
docker compose up -d
docker compose ps          # l'état doit passer à « healthy » après ~20 s
curl -I http://127.0.0.1:3000/
```

Le conteneur tourne en lecture seule, sans privilèges, avec un utilisateur non-root ; le cache
des images optimisées (AVIF/WebP) est conservé dans le volume `next-cache`.

> Cas particulier — serveur derrière un proxy qui intercepte le TLS : remplacez `docker compose build` par
> `docker build --secret id=ca,src=/chemin/ca.pem --build-arg SITE_URL=https://transports-brun.com -t transports-brun:$IMAGE_TAG .`

## 4. Reverse proxy

### Option A — Caddy (recommandé)

```bash
sudo apt install -y caddy            # ou https://caddyserver.com/docs/install
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile   # ou fusionner avec l'existant
sudo mkdir -p /var/log/caddy
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy obtient seul les certificats Let's Encrypt **dès que le DNS pointe vers le VPS**,
redirige `http → https` et `www → domaine nu` (301), compresse (zstd/gzip), ajoute HSTS
et transmet l'IP réelle du visiteur (limitation de débit du formulaire).

### Option B — nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/transports-brun.com
sudo ln -s /etc/nginx/sites-available/transports-brun.com /etc/nginx/sites-enabled/
sudo mkdir -p /var/www/certbot
# 1er passage : commenter temporairement les blocs « listen 443 » le temps d'obtenir les certificats
sudo certbot certonly --webroot -w /var/www/certbot -d transports-brun.com -d www.transports-brun.com
sudo nginx -t && sudo systemctl reload nginx
```

Point d'attention : `X-Forwarded-For` doit valoir `$remote_addr` (déjà le cas dans l'exemple),
sinon un robot pourrait contourner la limitation de débit en forgeant l'en-tête.

### Tester avant la bascule (recommandé)

Créez un sous-domaine temporaire (ex. `nouveau.transports-brun.com`, enregistrement **A** vers
l'IP du VPS), ajoutez-le au bloc du site dans le Caddyfile (`transports-brun.com, nouveau.transports-brun.com {`),
rechargez Caddy et vérifiez tout le site sur `https://nouveau.transports-brun.com`
(dont un envoi réel du formulaire). Supprimez ce sous-domaine après la bascule.

## 5. Bascule DNS sans coupure des e-mails

Les adresses `@transports-brun.com` sont hébergées chez IONOS. Seul le **site** déménage :
on ne touche **qu'aux enregistrements A/AAAA** du site.

1. **Inventaire** : dans la zone DNS (IONOS), faites une capture/export de *tous* les
   enregistrements avant toute modification.
2. **À ne pas toucher** : `MX`, `TXT` SPF (`v=spf1 …`), DKIM (`…._domainkey`), DMARC (`_dmarc`),
   `autodiscover`/`autoconfig`, `mail`/`imap`/`smtp`, vérifications (Google, etc.).
3. **J-2** : baissez le TTL des enregistrements `A`/`AAAA` de `@` et `www` à 300 s.
4. **Jour J** :
   - `@` (`transports-brun.com`) : **A** → IPv4 du VPS ;
   - `www` : **A** → IPv4 du VPS (ou CNAME vers `transports-brun.com`) ;
   - **AAAA** : à remplacer par l'IPv6 du VPS s'il en a une, **sinon à supprimer**
     (sinon les visiteurs IPv6 arriveraient encore sur l'ancien hébergement).
5. Vérifiez la propagation : `dig +short transports-brun.com A`, `dig +short www.transports-brun.com A`.
6. Vérifiez que la messagerie est intacte : `dig +short transports-brun.com MX` (inchangé),
   envoyez et recevez un e-mail de test sur `contact@`.
7. Laissez l'ancien hébergement actif quelques jours (retour arrière = remettre les anciens A/AAAA).
   Attention, chez IONOS, le nom de domaine, l'hébergement et la messagerie peuvent être dans le
   même contrat : ne résiliez **que** la partie hébergement web, jamais la messagerie ni le domaine.

## 6. Contrôles après bascule

- [ ] `https://transports-brun.com` s'affiche, cadenas valide.
- [ ] `http://transports-brun.com` et `https://www.transports-brun.com/...` → 301 vers `https://transports-brun.com/...`
- [ ] Anciennes URL en 200 : `/notre-histoire`, `/transport-routier-haut-rhin-alsace`,
      `/transport-plateaux-camion-grue-haut-rhin-alsace`, `/transports-de-marchandises-et-btp-haut-rhin-alsace`,
      `/notre-equipement`, `/contact`, `/mentions-legales`, `/politiques-de-confidentialites`.
- [ ] Slash final et reliquats Joomla en 301 : `/contact/` → `/contact`, `/index.php/contact` → `/contact`.
- [ ] `https://transports-brun.com/robots.txt` et `/sitemap.xml` répondent.
- [ ] Formulaire : envoyer une vraie demande ; vérifier la réception sur `CONTACT_TO` et que
      « Répondre » écrit bien au demandeur (Reply-To).
- [ ] Liens `tel:` et `mailto:` testés depuis un téléphone.
- [ ] Google Search Console : propriété « Domaine » `transports-brun.com`, soumettre
      `https://transports-brun.com/sitemap.xml`, inspecter l'URL d'accueil, surveiller la couverture.
- [ ] Fiche Google Business Profile : vérifier le lien vers le site.
- [ ] Mentions légales : hébergeur mis à jour (voir `docs/TODO-MANU.md`).
- [ ] Lighthouse mobile (Chrome DevTools) sur l'accueil et une page de service.

## 7. Mise à jour du site

```bash
cd /opt/transports-brun
git pull
export IMAGE_TAG=$(git rev-parse --short HEAD)
docker compose build           # le site actuel continue de tourner pendant le build
docker compose up -d           # remplacement du conteneur (quelques secondes)
docker image prune -f          # facultatif : nettoie les images orphelines
```

Mises à jour de sécurité de l'image de base (mensuel conseillé) : `docker compose build --pull && docker compose up -d`.

## 8. Retour arrière (rollback)

Chaque build est étiqueté par son commit (`IMAGE_TAG`). Pour revenir à la version précédente :

```bash
docker image ls transports-brun          # repérer l'étiquette précédente
IMAGE_TAG=<ancienne-etiquette> docker compose up -d --no-build
```

(ou `git checkout <commit>` puis reconstruire). En cas de problème grave juste après la bascule DNS,
remettre les anciens enregistrements A/AAAA rétablit l'ancien site.

## 9. Exploitation

- Journaux : `docker compose logs -f web` (application), `/var/log/caddy/transports-brun.log` ou
  `/var/log/nginx/transports-brun.*.log` (proxy). Les envois de formulaire en échec y sont signalés `[contact]`.
- Redémarrage : `docker compose restart web`. Le conteneur redémarre seul après un reboot du VPS.
- Mesure d'audience (facultative) : Umami ou Plausible auto-hébergés, sans cookie. Renseigner
  `ANALYTICS_PROVIDER`, `ANALYTICS_SCRIPT_URL`, `ANALYTICS_SITE_ID` dans `.env` puis **reconstruire**
  (valeurs lues au build ; la CSP autorise automatiquement le domaine du script).
- Tester l'envoi d'e-mails sans rien expédier : `docker compose -f docker-compose.yml -f compose.mailpit.yml up -d`
  avec `SMTP_HOST=mailpit`, `SMTP_PORT=1025` dans `.env`, puis interface sur `http://127.0.0.1:8025`.
