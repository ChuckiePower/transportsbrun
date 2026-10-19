import { CallbackTrigger } from "@/components/form/CallbackTrigger";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quoteHref } from "@/content/site";
import { ContactDetails } from "./ContactDetails";

/** Bloc « Nous contacter » (pages intérieures) */
export function ContactSection({ tone = "cream" }: { tone?: Tone }) {
  return (
    <Section tone={tone} aria-labelledby="contact-titre">
      <Container>
        <div className="grid gap-10 rounded-xl border border-line bg-surface p-6 shadow-md sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
          <div className="lg:col-span-4">
            <SectionHeading id="contact-titre" eyebrow="Coordonnées" title="Nous contacter" />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={quoteHref} icon="arrowRight">
                Demander un devis
              </ButtonLink>
              <CallbackTrigger className="text-brand" />
            </div>
          </div>
          <ContactDetails className="lg:col-span-8" />
        </div>
      </Container>
    </Section>
  );
}
