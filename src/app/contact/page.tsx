import { QuoteForm } from "@/components/form/QuoteForm";
import { MapEmbed } from "@/components/media/MapEmbed";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactPage as page } from "@/content/pages/contact";
import { mainPhone, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const path = "/contact";
export const metadata = pageMetadata(page.meta, path);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lead={page.hero.lead}
        crumbs={[{ name: "Contact", path }]}
      >
        <ButtonLink
          href={telHref(mainPhone)}
          size="lg"
          variant="outline-light"
          icon="phone"
          iconPosition="start"
        >
          {mainPhone.display}
        </ButtonLink>
      </PageHero>

      <Section spacing="tight" className="pb-16 sm:pb-20 lg:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div
            id="devis"
            className="scroll-mt-28 rounded-md border border-line bg-white p-5 shadow-card sm:p-8 lg:col-span-7 lg:p-10"
            aria-labelledby="devis-titre"
            role="region"
          >
            <h2 id="devis-titre" className="text-h2 font-bold uppercase">
              {page.form.title}
            </h2>
            <div className="mt-6">
              <QuoteForm
                intro={page.form.intro}
                consentText={page.form.consent}
                submitLabel={page.form.submit}
              />
            </div>
          </div>

          <aside className="flex flex-col gap-8 lg:col-span-5" aria-label="Coordonnées">
            <div className="on-dark rounded-md bg-ink p-6 text-white sm:p-8">
              <h2 className="font-display text-h3 font-bold uppercase">Nous contacter</h2>
              <ContactDetails tone="dark" stacked className="mt-6" />
            </div>
            <div>
              <h2 className="mb-4 font-display text-h3 font-bold uppercase">{page.map.title}</h2>
              <MapEmbed />
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
