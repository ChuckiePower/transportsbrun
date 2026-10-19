import { Container } from "@/components/ui/Container";
import { trustFacts } from "@/content/services";

/** Bandeau de confiance : faits issus du site actuel uniquement */
export function TrustBand() {
  return (
    <section
      aria-labelledby="confiance-titre"
      className="on-dark border-b border-white/10 bg-ink-2 text-white"
    >
      <h2 id="confiance-titre" className="sr-only">
        Transports Brun en bref
      </h2>
      <Container>
        <ul className="grid grid-cols-2 gap-px overflow-hidden bg-white/10 sm:grid-cols-3 lg:grid-cols-7">
          {trustFacts.map((fact) => (
            <li
              key={fact.label}
              className="flex flex-col gap-1 bg-ink-2 px-3 py-5 max-sm:last:odd:col-span-2 sm:px-4 sm:max-lg:last:col-span-3 lg:py-7"
            >
              <span className="font-display text-[1.2rem] leading-tight font-bold text-white uppercase">
                {fact.label}
              </span>
              <span className="text-[0.95rem] leading-snug text-silver">{fact.detail}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
