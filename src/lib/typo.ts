/**
 * Typographie française appliquée aux contenus : apostrophes typographiques,
 * guillemets « », espaces insécables avant : ; ! ? et entre un nombre et son unité.
 * Idempotent : peut être appliqué plusieurs fois sans effet de bord.
 */
const NBSP = " "; // espace insécable
const NNBSP = " "; // espace fine insécable

export function typo(input: string): string {
  return (
    input
      // apostrophe droite → typographique
      .replace(/'/g, "’")
      // "texte" → « texte »
      .replace(/"([^"\n]*)"/g, `«${NBSP}$1${NBSP}»`)
      .replace(/«[   ]*/g, `«${NBSP}`)
      .replace(/[   ]*»/g, `${NBSP}»`)
      // ponctuation haute
      .replace(/[   ]+([;!?])/g, `${NNBSP}$1`)
      .replace(/[   ]+:/g, `${NBSP}:`)
      // séparateur de milliers : 20 000 → 20 000 (fine insécable)
      .replace(/(\d)[  ](?=\d{3}(?!\d))/g, `$1${NNBSP}`)
      // nombre + unité : 6 m, 7 t, 20 000 €, 25 ans
      .replace(/(\d)[ ](m|t|€|km|ans|h)(?=[\s.,;:!?)]|$)/g, `$1${NBSP}$2`)
      // tiret long entouré d'espaces : pas de retour à la ligne avant
      .replace(/ (—|–) /g, `${NBSP}$1 `)
  );
}

/** Gabarit étiqueté : fr`Lun-Ven : 8h-12h` */
export function fr(strings: TemplateStringsArray, ...values: unknown[]): string {
  let out = "";
  strings.forEach((s, i) => {
    out += s + (i < values.length ? String(values[i]) : "");
  });
  return typo(out);
}
