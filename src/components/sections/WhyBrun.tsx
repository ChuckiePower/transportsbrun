import { AdrPlate } from "@/components/route/AdrPlate";
import { AsphaltSection } from "@/components/route/AsphaltSection";
import { ConvoiPanel } from "@/components/route/ConvoiPanel";
import { Odometer } from "@/components/route/Odometer";
import { RoadLine } from "@/components/route/RoadLine";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages/home";

/**
 * « Pourquoi Transports Brun » sur asphalte : le compteur kilométrique « près de 25 ans »
 * d'un côté, quatre arguments en liste aérée de l'autre (pas des cartes).
 */
export function WhyBrun() {
  const why = homePage.why;
  const visuals = [
    <span
      key="v0"
      className="inline-flex size-11 items-center justify-center rounded-full bg-sun/15 text-sun"
    >
      <Icon name="locate" className="size-[22px]" />
    </span>,
    <ConvoiPanel key="v1" size="sm" category={false} />,
    <AdrPlate key="v2" size="md" className="h-8 w-[2.75rem]" />,
    <span
      key="v3"
      className="inline-flex size-11 items-center justify-center rounded-full bg-sun/15 text-sun"
    >
      <Icon name="family" className="size-[22px]" />
    </span>,
  ];
  return (
    <AsphaltSection aria-labelledby="pourquoi-titre" className="relative z-[2]">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="pourquoi-titre"
            eyebrow={why.eyebrow}
            title={why.title}
            lead={why.lead}
            dark
          />
          <div data-reveal="" className="mt-10">
            <p className="font-display text-[1.05rem] font-semibold text-marking/80">
              {why.experience.prefix}
            </p>
            <Odometer
              value={why.experience.value}
              label={`${why.experience.prefix} ${why.experience.value} ${why.experience.label}`}
              className="mt-3 text-[clamp(4.5rem,11vw,7rem)]"
            />
            <p
              aria-hidden="true"
              className="mt-4 max-w-xs font-display text-xl font-bold text-white"
            >
              {why.experience.label}
            </p>
          </div>
        </div>
        <ul className="lg:col-span-7 lg:pt-4">
          {why.cards.map((c, i) => (
            <li key={c.title} data-reveal="" style={{ ["--i" as string]: i }}>
              {i > 0 ? <RoadLine tone="marking-soft" className="my-7 opacity-50" /> : null}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
                <span className="flex h-11 shrink-0 items-center sm:w-[5.5rem]">{visuals[i]}</span>
                <span>
                  <span className="block text-h3 font-bold text-white">{c.title}</span>
                  <span className="mt-2 block max-w-xl text-marking/80">{c.text}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </AsphaltSection>
  );
}
