import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/IconChip";
import type { IconName } from "@/components/ui/Icon";
import { trustFacts } from "@/content/services";

const icons: IconName[] = ["family", "badge", "ruler", "flame", "shield", "users", "locate"];

/**
 * Bandeau de confiance : carte blanche flottante qui chevauche le bas du hero.
 * Uniquement des faits du site actuel.
 */
export function TrustBand() {
  return (
    <section aria-labelledby="confiance-titre" className="relative z-10 -mt-16 sm:-mt-20">
      <h2 id="confiance-titre" className="sr-only">
        Transports Brun en bref
      </h2>
      <Container>
        <ul className="hero-trust grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-line bg-surface p-6 shadow-lg xs:grid-cols-2 sm:p-8 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4 xl:p-7">
          {trustFacts.map((fact, i) => (
            <li key={fact.label} className="flex items-start gap-3 xl:flex-col xl:gap-3">
              <IconChip name={icons[i] ?? "badge"} />
              <span>
                <span className="block font-display text-[0.95rem] leading-snug font-bold text-ink">{fact.label}</span>
                <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-soft">{fact.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
