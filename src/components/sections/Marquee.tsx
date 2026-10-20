import { Container } from "@/components/ui/Container";

/**
 * Bandeau défilant lent (36 s) de pastilles. Pause au survol, bouton Pause accessible
 * au clavier (WCAG 2.2.2), copie décorative masquée aux lecteurs d'écran,
 * statique si mouvement réduit.
 */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  // Style des pastilles porté par la liste (*:) : une fois par liste au lieu d'une fois par pastille
  const pills =
    "flex gap-3 *:shrink-0 *:rounded-full *:border *:border-line *:bg-surface *:px-5 *:py-2.5 *:font-display *:text-[0.95rem] *:font-semibold *:whitespace-nowrap *:text-ink *:shadow-sm";
  return (
    <section aria-label={label} className="marquee-wrap py-10 lg:py-14">
      <Container size="wide" className="flex items-center gap-3">
        <div className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="marquee-track flex w-max gap-3 py-1">
            <ul className={pills}>
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <ul className={`marquee-clone ${pills}`} aria-hidden="true">
              {items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
        <span className="motion-reduce:hidden">
          <input id="marquee-pause" type="checkbox" className="peer sr-only" />
          <label
            htmlFor="marquee-pause"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-line bg-surface text-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-ink"
          >
            <span className="sr-only">Mettre en pause le défilement</span>
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1.5" />
              <rect x="14" y="5" width="4" height="14" rx="1.5" />
            </svg>
          </label>
        </span>
      </Container>
    </section>
  );
}
