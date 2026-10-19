import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quoteHref } from "@/content/site";
import { ContactDetails } from "./ContactDetails";

/** Bloc « Nous contacter » (présent sur les pages du site actuel) */
export function ContactSection({ tone = "white" }: { tone?: Exclude<Tone, "ink"> }) {
  return (
    <Section tone={tone} aria-labelledby="contact-titre">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="contact-titre" eyebrow="Coordonnées" title="Nous contacter" />
          <ButtonLink href={quoteHref} size="lg" icon="arrowRight" className="mt-8">
            Formuler une demande
          </ButtonLink>
        </div>
        <ContactDetails className="lg:col-span-8" />
      </Container>
    </Section>
  );
}
