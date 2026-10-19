import { CallbackTrigger } from "@/components/form/CallbackTrigger";
import { CallbackFallbackForm } from "@/components/form/CallbackFallbackForm";
import { QuoteForm } from "@/components/form/QuoteForm";
import { MapEmbed } from "@/components/media/MapEmbed";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
        <ButtonLink href={telHref(mainPhone)} variant="secondary" icon="phone" iconPosition="start">
          Appeler le {mainPhone.display}
        </ButtonLink>
        <CallbackTrigger className="text-brand" />
      </PageHero>

      <div className="pb-[72px] lg:pb-28">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <section
            id="devis"
            aria-labelledby="devis-titre"
            className="scroll-mt-28 rounded-panel border border-line bg-surface p-6 shadow-md sm:p-10 lg:col-span-7 lg:p-12"
          >
            <h2 id="devis-titre" className="text-h2 font-extrabold">
              {page.form.title}
            </h2>
            <div className="mt-6">
              <QuoteForm
                intro={page.form.intro}
                consentText={page.form.consent}
                submitLabel={page.form.submit}
              />
            </div>
          </section>

          <aside
            className="flex flex-col gap-8 lg:sticky lg:top-28 lg:col-span-5"
            aria-label="Coordonnées"
          >
            <div className="on-night rounded-panel bg-night p-7 text-white shadow-md sm:p-9">
              <h2 className="font-display text-h3 font-bold text-white">Nous contacter</h2>
              <ContactDetails tone="night" stacked className="mt-7" />
            </div>
            <div>
              <h2 className="mb-4 font-display text-h3 font-bold">{page.map.title}</h2>
              <MapEmbed />
            </div>
          </aside>
          <CallbackFallbackForm className="lg:col-span-7" />
        </Container>
      </div>
    </>
  );
}
