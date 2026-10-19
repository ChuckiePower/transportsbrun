/**
 * Contrôle automatique du site servi (build de production) :
 * - chaque lien interne répond 200 (sans redirection) ;
 * - aucune image sans attribut alt ;
 * - chaque mailto:/tel: pointe vers une coordonnée connue et cohérente avec le texte affiché ;
 * - chaque page indexable a un title, une meta description, un canonical et un seul h1,
 *   tous uniques, et les longueurs title ≤ 60 / description ≤ 155 caractères.
 *
 * Usage : node scripts/check-site.mjs [http://127.0.0.1:3000]
 */
const BASE = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");

const PHONES = new Map([
  ["+33389733463", "03 89 73 34 63"],
  ["+33788488725", "07 88 48 87 25"],
  ["+33617294086", "06 17 29 40 86"],
]);
const EMAILS = new Set([
  "contact@transports-brun.com",
  "comptabilite@transports-brun.com",
  "exploitation@transports-brun.com",
  "commercialtransportsbrun@gmail.com",
  // ancienne agence web, mentionnée dans les mentions légales (à valider)
  "contact@exodream.com",
]);

const START = [
  "/",
  "/notre-histoire",
  "/transport-routier-haut-rhin-alsace",
  "/transport-plateaux-camion-grue-haut-rhin-alsace",
  "/transports-de-marchandises-et-btp-haut-rhin-alsace",
  "/notre-equipement",
  "/contact",
  "/mentions-legales",
  "/politiques-de-confidentialites",
];

const errors = [];
const warn = (msg) => errors.push(msg);
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const textOf = (html) =>
  decode(html.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();

const visited = new Map(); // path -> html
const queue = [...START];
const seo = [];

while (queue.length) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== 200) {
    warn(`${path} : statut ${res.status}`);
    visited.set(path, "");
    continue;
  }
  const type = res.headers.get("content-type") ?? "";
  const body = type.includes("text/html") ? await res.text() : "";
  visited.set(path, body);
  if (!body) continue;

  // liens internes
  for (const m of body.matchAll(/<a\b[^>]*\shref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = decode(m[1]);
    const label = textOf(m[2]);
    if (href.startsWith("/") && !href.startsWith("//")) {
      const clean = href.split("#")[0].split("?")[0] || "/";
      if (!visited.has(clean) && !queue.includes(clean)) queue.push(clean);
    } else if (href.startsWith("mailto:")) {
      const addr = href.slice(7).split("?")[0].toLowerCase();
      if (!EMAILS.has(addr)) warn(`${path} : mailto inconnu ${addr}`);
      if (/@/.test(label) && label.toLowerCase() !== addr)
        warn(`${path} : mailto ${addr} affiché « ${label} »`);
    } else if (href.startsWith("tel:")) {
      const num = href.slice(4);
      if (!PHONES.has(num)) warn(`${path} : tel inconnu ${num}`);
      const shown = label.match(/0\d(?:[\s .]?\d{2}){4}/);
      if (shown && shown[0].replace(/\D/g, "") !== PHONES.get(num)?.replace(/\D/g, ""))
        warn(`${path} : tel ${num} affiché « ${shown[0]} »`);
    }
  }

  // images sans alt
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) warn(`${path} : image sans alt ${m[0].slice(0, 120)}`);
  }

  // SEO
  if (START.includes(path)) {
    const title = textOf(body.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const description = decode(body.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    const canonical = body.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
    const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((x) => textOf(x[1]));
    const robots = body.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "index";
    seo.push({ path, title, description, canonical, h1: h1s[0] ?? "", robots });
    if (!title) warn(`${path} : title manquant`);
    if ([...title].length > 60)
      warn(`${path} : title trop long (${[...title].length}) « ${title} »`);
    if (!description) warn(`${path} : meta description manquante`);
    if ([...description].length > 155)
      warn(`${path} : description trop longue (${[...description].length})`);
    if (!canonical) warn(`${path} : canonical manquant`);
    if (h1s.length !== 1) warn(`${path} : ${h1s.length} h1`);
  }
}

for (const key of ["title", "description", "canonical", "h1"]) {
  const seen = new Map();
  for (const s of seo) {
    if (seen.has(s[key])) warn(`${key} en double : ${seen.get(s[key])} et ${s.path}`);
    seen.set(s[key], s.path);
  }
}

console.log(`Pages et ressources vérifiées : ${visited.size}`);
console.table(
  seo.map((s) => ({
    page: s.path,
    "title (car.)": [...s.title].length,
    "description (car.)": [...s.description].length,
    robots: s.robots,
    h1: s.h1.slice(0, 50),
  })),
);
if (errors.length) {
  console.error(`\n${errors.length} problème(s) :\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("Aucun problème détecté.");
