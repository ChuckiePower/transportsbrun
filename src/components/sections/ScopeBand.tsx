import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { expertise } from "@/content/services";

/** Variante « affiche » du bloc Nos domaines d'expertise (accueil) */
export function ScopeBand() {
  return (
    <section
      aria-labelledby="expertise-titre"
      className="on-dark bg-ink py-16 text-white sm:py-20 lg:py-28"
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <Eyebrow tone="dark" className="mb-4">
            Du quai d&apos;expédition jusqu&apos;au client
          </Eyebrow>
          <h2 id="expertise-titre" className="text-h2 font-bold uppercase">
            {expertise.title}
          </h2>
          <p className="mt-6 text-lead text-silver">{expertise.text}</p>
        </div>
        <Reveal className="lg:col-span-7">
          <ul
            className="divide-y divide-white/15 border-y border-white/15"
            aria-label="Périmètre d'intervention"
          >
            {expertise.scopes.map((scope, i) => (
              <li key={scope} className="flex items-baseline justify-between gap-6 py-3 sm:py-4">
                <span className="font-display text-[clamp(2.6rem,1.6rem+4.5vw,5.5rem)] leading-none font-bold uppercase">
                  {scope}
                </span>
                <span
                  aria-hidden="true"
                  className="tabular font-display text-xl font-bold text-signal"
                >
                  0{i + 1}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
