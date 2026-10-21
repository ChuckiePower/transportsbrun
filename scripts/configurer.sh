#!/usr/bin/env bash
# Configuration interactive du site sur le serveur : pose les questions une à une et écrit le
# fichier .env (droits 600) sans passer par un éditeur de texte. Le mot de passe est saisi en
# masqué et n'est jamais affiché.
#
#   bash scripts/configurer.sh
#
# Relançable à tout moment : les réponses précédentes sont proposées par défaut (Entrée pour les
# garder) et l'ancien fichier est sauvegardé dans .env.bak.
set -euo pipefail
cd "$(dirname "$0")/.."

ENV_FILE=.env
MANAGED="SITE_URL SMTP_HOST SMTP_PORT SMTP_SECURE SMTP_USER SMTP_PASS CONTACT_FROM CONTACT_TO"

if [[ ! -t 0 ]]; then
  echo "Ce script pose des questions : lancez-le directement dans un terminal." >&2
  exit 1
fi

# Valeur actuelle d'une variable du .env existant (guillemets retirés), vide si absente
current() {
  [[ -f $ENV_FILE ]] || return 0
  local line
  line=$(grep -E "^$1=" "$ENV_FILE" | tail -n 1 || true)
  line=${line#*=}
  line=${line#\"}
  line=${line%\"}
  line=${line#\'}
  line=${line%\'}
  printf '%s' "$line"
}

# Valeur entre guillemets doubles, échappée pour docker compose (\ " et $ restent littéraux)
quote() {
  local s=$1
  s=${s//\\/\\\\}
  s=${s//\"/\\\"}
  s=${s//\$/\\\$}
  printf '"%s"' "$s"
}

ask() {
  local question=$1 default=${2-} answer
  if [[ -n $default ]]; then
    read -r -p "$question [$default] : " answer
    REPLY=${answer:-$default}
  else
    read -r -p "$question : " answer
    REPLY=$answer
  fi
}

echo
echo "Configuration du site Transports Brun"
echo "Appuyez sur Entrée pour garder la valeur proposée entre crochets."
echo

# 1. Nom de domaine
default_domain=$(current SITE_URL)
default_domain=${default_domain#https://}
default_domain=${default_domain#http://}
default_domain=${default_domain:-transports-brun.com}
while :; do
  ask "1/5  Nom de domaine du site" "$default_domain"
  domain=$(printf '%s' "$REPLY" | tr '[:upper:]' '[:lower:]')
  domain=${domain#https://}
  domain=${domain#http://}
  domain=${domain#www.}
  domain=${domain%%/*}
  if [[ $domain =~ ^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$ ]]; then break; fi
  echo "     Ce n'est pas un nom de domaine valide (exemple : transports-brun.com)."
done

email_ok() { [[ $1 =~ ^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$ ]]; }

# 2. Adresse qui reçoit les demandes
default_to=$(current CONTACT_TO)
default_to=${default_to:-contact@$domain}
while :; do
  ask "2/5  Adresse e-mail qui reçoit les demandes de devis" "$default_to"
  contact_to=$REPLY
  if email_ok "$contact_to"; then break; fi
  echo "     Adresse e-mail invalide."
done

# 3. Boîte qui envoie (identifiant SMTP)
default_user=$(current SMTP_USER)
default_user=${default_user:-$contact_to}
while :; do
  ask "3/5  Boîte e-mail qui envoie les demandes (identifiant de connexion)" "$default_user"
  smtp_user=$REPLY
  if email_ok "$smtp_user"; then break; fi
  echo "     Adresse e-mail invalide."
done

# 4. Mot de passe (masqué)
old_pass_line=""
if [[ -f $ENV_FILE ]]; then
  old_pass_line=$(grep -E '^SMTP_PASS=.+' "$ENV_FILE" | tail -n 1 || true)
fi
while :; do
  if [[ -n $old_pass_line ]]; then
    read -r -s -p "4/5  Mot de passe de $smtp_user (Entrée pour garder l'actuel) : " pass1
  else
    read -r -s -p "4/5  Mot de passe de $smtp_user (rien ne s'affiche, c'est normal) : " pass1
  fi
  echo
  if [[ -z $pass1 ]]; then
    if [[ -n $old_pass_line ]]; then break; fi
    echo "     Le mot de passe ne peut pas être vide."
    continue
  fi
  read -r -s -p "     Retapez le mot de passe : " pass2
  echo
  if [[ $pass1 == "$pass2" ]]; then break; fi
  echo "     Les deux saisies sont différentes, recommencez."
done

# 5. Serveur d'envoi
default_host=$(current SMTP_HOST)
default_host=${default_host:-mail.infomaniak.com}
ask "5/5  Serveur d'envoi des e-mails (SMTP)" "$default_host"
smtp_host=$REPLY
smtp_port=$(current SMTP_PORT)
smtp_port=${smtp_port:-465}
if [[ $smtp_port == 465 ]]; then smtp_secure=true; else smtp_secure=false; fi

# Écriture : sauvegarde, droits 600, variables non gérées ici conservées
umask 077
if [[ -f $ENV_FILE ]]; then cp -p "$ENV_FILE" "$ENV_FILE.bak"; fi
tmp=$(mktemp "$ENV_FILE.XXXXXX")
{
  echo "# Généré par scripts/configurer.sh le $(date '+%d/%m/%Y %H:%M'). Relancer ce script pour modifier."
  echo "SITE_URL=$(quote "https://$domain")"
  echo "SMTP_HOST=$(quote "$smtp_host")"
  echo "SMTP_PORT=$smtp_port"
  echo "SMTP_SECURE=$smtp_secure"
  echo "SMTP_USER=$(quote "$smtp_user")"
  if [[ -n $pass1 ]]; then
    echo "SMTP_PASS=$(quote "$pass1")"
  else
    echo "$old_pass_line"
  fi
  echo "CONTACT_FROM=$(quote "$smtp_user")"
  echo "CONTACT_TO=$(quote "$contact_to")"
  if [[ -f $ENV_FILE ]]; then
    # Autres réglages déjà présents (limitation de débit, mesure d'audience…)
    grep -vE "^(${MANAGED// /|})=|^# Généré par scripts/configurer.sh" "$ENV_FILE" | grep -E '^[A-Z_]+=' || true
  else
    echo "RATE_LIMIT_MAX=5"
    echo "RATE_LIMIT_WINDOW_MS=600000"
  fi
} > "$tmp"
chmod 600 "$tmp"
mv "$tmp" "$ENV_FILE"
unset pass1 pass2

echo
echo "C'est enregistré dans $ENV_FILE (lisible par vous seul) :"
echo "  - site             : https://$domain"
echo "  - demandes reçues  : $contact_to"
echo "  - envoi par        : $smtp_user via $smtp_host:$smtp_port"
echo "  - mot de passe     : enregistré (non affiché)"
if [[ $domain != transports-brun.com ]]; then
  echo
  echo "Attention : deploy/Caddyfile est écrit pour transports-brun.com ; il faut l'adapter à $domain."
fi
echo
echo "Pour appliquer : docker compose up -d --build"
echo "(si vous travaillez avec Claude Code, revenez-y avec : claude --continue)"
