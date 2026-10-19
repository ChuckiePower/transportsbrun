/**
 * Preuves sociales PRÊTES MAIS MASQUÉES : aucun avis, logo client ou note n'est affiché
 * tant que des données réelles et autorisées n'ont pas été fournies (voir docs/TODO-MANU.md).
 * Pour les activer : remplir les tableaux ci-dessous, rien d'autre à modifier.
 */
import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Testimonial = { quote: string; author: string; role?: string };
type ClientLogo = { name: string; logo: StaticImageData };
type Rating = { value: number; count: number; url: string } | null;

// TODO(manu): fournir 3 à 5 avis clients autorisés
const testimonials: Testimonial[] = [];
// TODO(manu): fournir des logos clients dont l'usage est autorisé
const clientLogos: ClientLogo[] = [];
// TODO(manu): note et lien de la fiche Google (sans données, rien n'est affiché)
const googleRating: Rating = null;

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <Section aria-labelledby="avis-titre">
      <Container>
        <SectionHeading id="avis-titre" eyebrow="Ils nous font confiance" title="Ce que disent nos clients" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.author} className="rounded-lg border border-line bg-surface p-7 shadow-sm">
              <blockquote className="text-ink">« {t.quote} »</blockquote>
              <p className="mt-4 font-display font-semibold">{t.author}</p>
              {t.role ? <p className="text-[0.875rem] text-ink-soft">{t.role}</p> : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function ClientLogos() {
  if (!clientLogos.length) return null;
  return (
    <Container className="py-10">
      <ul className="flex flex-wrap items-center justify-center gap-10" aria-label="Clients">
        {clientLogos.map((c) => (
          <li key={c.name}>
            <Image src={c.logo} alt={c.name} className="h-10 w-auto" />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export function GoogleRating() {
  if (!googleRating) return null;
  return (
    <a href={googleRating.url} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-display font-semibold" rel="noopener noreferrer" target="_blank">
      {googleRating.value.toLocaleString("fr-FR")} / 5 sur Google ({googleRating.count} avis)
    </a>
  );
}
