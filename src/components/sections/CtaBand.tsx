import { AsphaltSection } from "@/components/route/AsphaltSection";
import { StopMarker } from "@/components/route/Itinerary";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { mainPhone, quoteHref, site, telHref } from "@/content/site";
import { typo } from "@/lib/typo";
import { CallbackTrigger } from "@/components/form/CallbackTrigger";

/**
 * Bandeau d'appel à l'action.
 * - « compact » : une ligne entre deux sections (devis + appel) ;
 * - « full » : grande carte nuit arrondie avec les 3 numéros.
 */
export function CtaBand({
  variant = "full",
  title: rawTitle = "Un transport à organiser ?",
  text: rawText = "Décrivez votre besoin ou appelez-nous : nous vous répondons dans les plus brefs délais.",
  quote = quoteHref,
}: {
  variant?: "full" | "compact";
  title?: string;
  text?: string;
  /** Lien du bouton devis (permet un type de demande présélectionné) */
  quote?: string;
}) {
  // Typographie française (espaces fines avant « ? », etc.) quel que soit l'appelant
  const title = typo(rawTitle);
  const text = typo(rawText);
  if (variant === "compact") {
    return (
      <div className="py-6 lg:py-8">
        <Container>
          <div
            data-reveal=""
            className="flex flex-col gap-5 rounded-lg border border-line bg-surface px-6 py-6 shadow-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p className="font-display text-[1.25rem] leading-snug font-bold text-ink">{title}</p>
              <p className="mt-1 text-ink-soft">{text}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href={quote} icon="arrowRight">
                Demander un devis
              </ButtonLink>
              <ButtonLink
                href={telHref(mainPhone)}
                variant="secondary"
                icon="phone"
                iconPosition="start"
              >
                Appeler le {mainPhone.display}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <AsphaltSection aria-labelledby="cta-titre" className="relative z-[2] pt-10 pb-6 lg:pt-14">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div data-reveal="" className="lg:col-span-7">
          <p className="eyebrow mb-3 flex items-center gap-3">
            <StopMarker kind="end" className="size-8" />
            Arrivée
          </p>
          <h2 id="cta-titre" className="text-h2 font-extrabold text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lead text-marking/80">{text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={quote} icon="arrowRight">
              Demander un devis
            </ButtonLink>
            <ButtonLink
              href={telHref(mainPhone)}
              variant="on-asphalt"
              icon="phone"
              iconPosition="start"
            >
              Appeler le {mainPhone.display}
            </ButtonLink>
          </div>
          <CallbackTrigger className="mt-5 text-marking/80 hover:text-white" />
        </div>
        <ul data-reveal="" className="space-y-1 rounded-lg bg-asphalt-2 p-3 lg:col-span-5">
          {site.phones.map((p) => (
            <li key={p.e164}>
              <a
                href={telHref(p)}
                className="flex min-h-14 flex-col justify-center gap-0.5 rounded-md px-4 py-3 transition-colors hover:bg-white/5 xs:flex-row xs:items-center xs:justify-between xs:gap-4"
              >
                <span className="text-marking/80">{p.label}</span>
                <span className="tabular font-sign text-[1.35rem] font-extrabold whitespace-nowrap text-white">
                  {p.display}
                </span>
              </a>
            </li>
          ))}
          <li className="flex items-center gap-2 px-4 py-3 text-[0.9rem] text-marking/80">
            <Icon name="clock" className="size-4" /> {site.hours.display}
          </li>
        </ul>
      </Container>
    </AsphaltSection>
  );
}
