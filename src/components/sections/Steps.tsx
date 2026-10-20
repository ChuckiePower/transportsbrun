import { Itinerary } from "@/components/route/Itinerary";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages/home";

/** « Comment ça marche » sous forme d'itinéraire : départ, étape, arrivée */
export function Steps() {
  const { eyebrow, title, items } = homePage.steps;
  const labels = ["Départ", "Étape", "Arrivée"];
  return (
    <Section aria-labelledby="etapes-titre">
      <Container>
        <SectionHeading id="etapes-titre" eyebrow={eyebrow} title={title} />
        <Itinerary
          className="mt-12 lg:mt-16"
          stops={items.map((s, i) => ({
            label: labels[i] ?? "Étape",
            title: s.title,
            text: s.text,
          }))}
        />
      </Container>
    </Section>
  );
}
