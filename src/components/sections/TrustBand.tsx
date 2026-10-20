import { RatingBadge } from "@/components/reviews/Reviews";
import { AdrPlate } from "@/components/route/AdrPlate";
import { ConvoiPanel } from "@/components/route/ConvoiPanel";
import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/IconChip";
import { trustFacts } from "@/content/services";

/**
 * Bandeau « en bref » : carte blanche flottante qui chevauche le bas du hero.
 * Faits réels uniquement ; panneau convoi et plaque ADR à la place des pictogrammes génériques ;
 * note Google seulement si elle est renseignée.
 */
export function TrustBand() {
  return (
    <section aria-labelledby="confiance-titre" className="relative z-10 -mt-16 sm:-mt-20">
      <h2 id="confiance-titre" className="sr-only">
        Transports Brun en bref
      </h2>
      <Container>
        <div className="hero-trust rounded-lg border border-line bg-surface p-6 shadow-lg sm:p-8 xl:p-7">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-6 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-5">
            {trustFacts.map((fact) => (
              <li key={fact.label} className="flex items-start gap-3 xs:flex-col">
                <span className="flex h-11 shrink-0 items-center">
                  {fact.visual === "convoi" ? (
                    <ConvoiPanel size="sm" category={false} />
                  ) : fact.visual === "adr" ? (
                    <AdrPlate size="md" className="h-8 w-[2.75rem]" />
                  ) : (
                    <IconChip name={fact.visual} />
                  )}
                </span>
                <span>
                  <span className="block font-display text-[0.95rem] leading-snug font-bold text-ink">
                    {fact.label}
                  </span>
                  <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-soft">
                    {fact.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <RatingBadge className="mt-6 border-t border-line pt-5" />
        </div>
      </Container>
    </section>
  );
}
