/**
 * Textes légaux repris MOT POUR MOT du site actuel (relevés le 19/10/2026).
 * Seule la typographie est normalisée (apostrophes, guillemets, espaces insécables).
 *
 * Les passages devenus faux ou douteux avec la refonte sont isolés ci-dessous et
 * marqués « TODO(manu): à valider ». Ils sont affichés tels quels tant qu'ils
 * n'ont pas été validés : ne pas les réécrire sans accord (voir docs/TODO-MANU.md).
 */
import { mainEmail, mainPhone, site } from "@/content/site";
import { fr } from "@/lib/typo";

/* ------------------------------------------------------------------ */
/* Passages à valider                                                  */
/* ------------------------------------------------------------------ */

// TODO(manu): à valider — directeur de la publication (David BRUN à confirmer).
export const publicationDirector = "David BRUN";

// TODO(manu): à valider — horaires « 13h30-18h » ici contre « 14h-18h » partout ailleurs.
export const legalHours = fr`Lun-Ven : 8h-12h / 13h30-18h`;

// TODO(manu): à valider — agence web à retirer ou remplacer si EXODREAM n'est plus impliquée.
export const webAgency = {
  show: true,
  title: fr`Création web et référencement :`,
  name: "EXODREAM",
  lines: ["36 Grand'Rue".replace("'", "’"), "68180 HORBOURG-WIHR"],
  phone: "03 89 79 18 89",
  email: "contact@exodream.com",
  site: "exodream.com",
};

// TODO(manu): à valider — la refonte n'utilise que des photos de l'entreprise :
// garder cette mention seulement si une image sous licence Shutterstock est réutilisée.
export const imageCredit = {
  show: true,
  title: "Crédit",
  text: fr`Image(s) et/ou clips vidéo utilisés sous licence de Shutterstock.com`,
};

// TODO(manu): à valider — l'hébergeur change avec la migration sur VPS
// (indiquer le nom et l'adresse de l'hébergeur du VPS).
export const host = {
  title: fr`Hébergeur :`,
  name: "Ionos SARL",
  lines: ["7, place de la Gare", "BP 70 109", "57201 SARREGUEMINES CEDEX"],
};

// TODO(manu): à valider — « nouveautés et promotions », « commande » : le site refait
// n'a qu'un formulaire de devis (ni newsletter, ni commande).
export const personalDataIntro = fr`Les informations recueillies lors d'une demande de contact ou d'une commande font l'objet d'un traitement informatique destiné à vous communiquer les nouveautés et promotions. Elles seront utilisées uniquement par Transports Brun.`;

// TODO(manu): à valider — le site n'utilise plus d'outil de statistiques ni de cookie
// non essentiel : paragraphe à réécrire (cookies strictement fonctionnels uniquement).
export const cookiesSection = {
  title: "Utilisation des cookies",
  paragraphs: [
    fr`Ce site utilise des cookies. Un "cookie" est une information qu'un site internet envoie à votre navigateur. Il aide le site à mémoriser des informations sur vous ou vos préférences pour faciliter votre navigation sur le site. Le cookie nous aide aussi à établir les statistiques de fréquentation et d'utilisation de notre site. Nous n'utilisons pas l'information rapportée par les cookies à des fins étrangères à ce site.`,
    fr`Toutefois, vous pouvez préférer désactiver les cookies sur ce site et sur d'autres. Le moyen le plus efficace consiste à désactiver les cookies dans votre navigateur. Nous vous suggérons de consulter la section Aide de votre navigateur ou de consulter le site Web de la [CNIL](https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser) qui propose des conseils pour tous les navigateurs modernes.`,
  ],
};

// TODO(manu): à valider — la plateforme européenne de règlement en ligne des litiges
// (RLL/ODR) a été fermée le 20 juillet 2025 : paragraphe probablement à retirer.
export const odrSection = {
  title: fr`Règlement en ligne des litiges :`,
  text: fr`La Commission européenne permet aux consommateurs de résoudre les litiges en ligne sur l'une de ses plateformes, conformément à l'art. 14 paragr. 1 du RLL. La plateforme ([Règlement en ligne des litiges](https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=FR)) agit comme un site où les consommateurs peuvent essayer des régler hors tribunal des litiges survenus lors d'achats de biens ou services en ligne.`,
};

/* ------------------------------------------------------------------ */
/* Mentions légales                                                    */
/* ------------------------------------------------------------------ */

export const mentionsLegales = {
  title: fr`Mentions légales`,
  company: [
    { label: "Raison Sociale", value: [site.name] },
    {
      label: fr`Siège social`,
      value: [`${site.address.street},`, `${site.address.postalCode} ${site.address.cityDisplay}`],
    },
    { label: "Directeur de la publication", value: [publicationDirector] },
    { label: "E-mail", value: [mainEmail.address], href: `mailto:${mainEmail.address}` },
    { label: fr`Téléphone`, value: [mainPhone.display], href: `tel:${mainPhone.e164}` },
    { label: "Horaires", value: [legalHours] },
  ],
  legalForm: fr`Société à responsabilité limitée`,
  registration: [
    { label: "RCS Colmar", value: "2018 B 837809052" },
    { label: "SIRET", value: "83780905200025" },
    { label: "Code APE", value: fr`4941A : Transports routiers de fret interurbains` },
    { label: "Identification intracommunautaire", value: "FR28837809052" },
    { label: "Capital social", value: fr`20 000 €` },
  ],
  personalData: {
    title: fr`Données personnelles :`,
    intro: personalDataIntro,
    rights: fr`Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée en 2004 et à l'article 13 du règlement UE 2016/679 relatif à la protection des données, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en vous adressant :`,
    channels: [
      fr`À l'adresse du siège social`,
      fr`Par e-mail : [${mainEmail.address}](mailto:${mainEmail.address})`,
      fr`Via la [page de contact](/contact)`,
    ],
    objection: fr`Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.`,
  },
};

/* ------------------------------------------------------------------ */
/* Politique de confidentialité                                        */
/* ------------------------------------------------------------------ */

export const privacyPolicy = {
  title: fr`Politique de confidentialité`,
  intro: [
    fr`Le site web transports-brun.com est détenu par Transports Brun, qui est un contrôleur de données de vos données personnelles.`,
    fr`Nous avons adopté cette politique de confidentialité, qui détermine la manière dont nous traitons les informations collectées par transports-brun.com, qui fournit également les raisons pour lesquelles nous devons collecter certaines données personnelles vous concernant. Par conséquent, vous devez lire cette politique de confidentialité avant d'utiliser le site web de transports-brun.com.`,
    fr`Nous prenons soin de vos données personnelles et nous nous engageons à en garantir la confidentialité et la sécurité.`,
  ],
  sections: [
    {
      title: fr`Les informations personnelles que nous collectons :`,
      // TODO(manu): à valider — cookies, « informations de paiement », « inscription » :
      // à réécrire pour refléter le seul traitement réel (formulaire de devis envoyé par e-mail).
      todo: true,
      paragraphs: [
        fr`Lorsque vous visitez le transports-brun.com, nous recueillons automatiquement certaines informations sur votre appareil, notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies installés sur votre appareil. En outre, lorsque vous naviguez sur le site, nous recueillons des informations sur les pages web ou les produits individuels que vous consultez, sur les sites web ou les termes de recherche qui vous ont renvoyé au site et sur la manière dont vous interagissez avec le site. Nous désignons ces informations collectées automatiquement par le terme "informations sur les appareils". En outre, nous pourrions collecter les données personnelles que vous nous fournissez (y compris, mais sans s'y limiter, le nom, le prénom, l'adresse, les informations de paiement, etc.) lors de l'inscription afin de pouvoir exécuter le contrat.`,
      ],
    },
    {
      title: fr`Pourquoi traitons-nous vos données ?`,
      // TODO(manu): à valider — « statistiques », « lettre d'information », « bulletin
      // d'information » : n'existent pas sur le site refait ; durée de conservation à définir.
      todo: true,
      paragraphs: [
        fr`Notre priorité absolue est la sécurité des données des clients et, à ce titre, nous ne pouvons traiter que des données minimales sur les utilisateurs, uniquement dans la mesure où cela est absolument nécessaire pour maintenir le site web. Les informations collectées automatiquement sont utilisées uniquement pour identifier les cas potentiels d'abus et établir des informations statistiques concernant l'utilisation du site web. Ces informations statistiques ne sont pas autrement agrégées de manière à identifier un utilisateur particulier du système.`,
        fr`Vous pouvez visiter le site web sans nous dire qui vous êtes ni révéler d'informations, par lesquelles quelqu'un pourrait vous identifier comme un individu spécifique et identifiable. Toutefois, si vous souhaitez utiliser certaines fonctionnalités du site web, ou si vous souhaitez recevoir notre lettre d'information ou fournir d'autres détails en remplissant un formulaire, vous pouvez nous fournir des données personnelles, telles que votre e-mail, votre prénom, votre nom, votre ville de résidence, votre organisation, votre numéro de téléphone. Vous pouvez choisir de ne pas nous fournir vos données personnelles, mais il se peut alors que vous ne puissiez pas profiter de certaines fonctionnalités du site web. Par exemple, vous ne pourrez pas recevoir notre bulletin d'information ou nous contacter directement à partir du site web. Les utilisateurs qui ne savent pas quelles informations sont obligatoires sont invités à nous contacter via [${mainEmail.address}](mailto:${mainEmail.address}).`,
      ],
    },
    {
      title: fr`Vos droits :`,
      todo: false,
      paragraphs: [
        fr`Si vous êtes un résident européen, vous disposez des droits suivants liés à vos données personnelles :`,
      ],
      list: [
        fr`Le droit d'être informé.`,
        fr`Le droit d'accès.`,
        fr`Le droit de rectification.`,
        fr`Le droit à l'effacement.`,
        fr`Le droit de restreindre le traitement.`,
        fr`Le droit à la portabilité des données.`,
        fr`Le droit d'opposition.`,
        fr`Les droits relatifs à la prise de décision automatisée et au profilage.`,
      ],
      after: [
        fr`Si vous souhaitez exercer ce droit, veuillez nous contacter via les coordonnées ci-dessous.`,
        // TODO(manu): à valider — « passez une commande » et transferts hors Europe
        // (Canada, États-Unis) : ne correspondent plus au site refait.
        fr`En outre, si vous êtes un résident européen, nous notons que nous traitons vos informations afin d'exécuter les contrats que nous pourrions avoir avec vous (par exemple, si vous passez une commande par le biais du site), ou autrement pour poursuivre nos intérêts commerciaux légitimes énumérés ci-dessus. En outre, veuillez noter que vos informations pourraient être transférées en dehors de l'Europe, y compris au Canada et aux États-Unis.`,
      ],
    },
    {
      title: fr`Liens vers d'autres sites web :`,
      todo: false,
      paragraphs: [
        fr`Notre site web peut contenir des liens vers d'autres sites web qui ne sont pas détenus ou contrôlés par nous. Sachez que nous ne sommes pas responsables de ces autres sites web ou des pratiques de confidentialité des tiers. Nous vous encourageons à être attentif lorsque vous quittez notre site web et à lire les déclarations de confidentialité de chaque site web susceptible de collecter des informations personnelles.`,
      ],
    },
    {
      title: fr`Sécurité de l'information :`,
      todo: false,
      paragraphs: [
        fr`Nous sécurisons les informations que vous fournissez sur des serveurs informatiques dans un environnement contrôlé et sécurisé, protégé contre tout accès, utilisation ou divulgation non autorisés. Nous conservons des garanties administratives, techniques et physiques raisonnables pour nous protéger contre tout accès, utilisation, modification et divulgation non autorisés des données personnelles sous son contrôle et sa garde. Toutefois, aucune transmission de données sur Internet ou sur un réseau sans fil ne peut être garantie.`,
      ],
    },
    {
      title: fr`Divulgation légale :`,
      todo: false,
      paragraphs: [
        fr`Nous divulguerons toute information que nous collectons, utilisons ou recevons si la loi l'exige ou l'autorise, par exemple pour nous conformer à une citation à comparaître ou à une procédure judiciaire similaire, et lorsque nous pensons de bonne foi que la divulgation est nécessaire pour protéger nos droits, votre sécurité ou celle d'autrui, enquêter sur une fraude ou répondre à une demande du gouvernement.`,
      ],
    },
    {
      title: fr`Informations de contact :`,
      todo: false,
      paragraphs: [
        fr`Si vous souhaitez nous contacter pour comprendre davantage la présente politique ou si vous souhaitez nous contacter concernant toute question relative aux droits individuels et à vos informations personnelles, vous pouvez envoyer un courriel à [${mainEmail.address}](mailto:${mainEmail.address}).`,
      ],
    },
  ],
};
