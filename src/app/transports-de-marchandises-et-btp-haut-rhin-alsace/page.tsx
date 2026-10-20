import { PhotoGallery } from "@/components/media/PhotoGallery";
import { AdrPlate } from "@/components/route/AdrPlate";
import { KeyPoints } from "@/components/sections/KeyPoints";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceFooter } from "@/components/sections/ServiceFooter";
import { TransportedCards } from "@/components/sections/TransportedCards";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { faqFor, pickFaqs } from "@/content/faq";
import { marchandisesGallery } from "@/content/gallery";
import { marchandisesPage as page } from "@/content/pages/marchandises";
import { mainPhone, telHref } from "@/content/site";
import { quoteLink } from "@/lib/quote-schema";
import { pageMetadata } from "@/lib/seo";

const path = "/transports-de-marchandises-et-btp-haut-rhin-alsace";
export const metadata = pageMetadata(page.meta, path);

export default function MarchandisesPage() {
  return (
    <>
      <PageHero
        {...page.hero}
        crumbs={[{ name: "Transport de marchandises", path }]}
        focal="55% 55%"
        aside={<KeyPoints points={page.keyPoints} />}
      >
        <ButtonLink href={quoteLink("transport-marchandises")} icon="arrowRight">
          Demander un devis
        </ButtonLink>
        <ButtonLink href={telHref(mainPhone)} variant="secondary" icon="phone" iconPosition="start">
          Appeler le {mainPhone.display}
        </ButtonLink>
      </PageHero>

      {/* Matériaux et chantiers */}
      <Section tone="cream-2" aria-labelledby="chantiers-titre">
        <Container>
          <SectionHeading
            id="chantiers-titre"
            eyebrow="Fret interurbain · Tous types de route"
            title={page.intro.title}
            lead={`${page.intro.text} ${page.examples.lead}`}
            className="mb-12"
          />
          <TransportedCards withAdr={false} />
        </Container>
      </Section>

      {/* ADR + note sur le prix */}
      <Section tone="none" aria-labelledby="adr-titre">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div
            data-reveal=""
            className="on-asphalt surface-asphalt rounded-xl p-8 text-white shadow-md sm:p-12 lg:col-span-7"
          >
            <AdrPlate size="lg" />
            <p className="eyebrow mt-6">{page.adr.eyebrow}</p>
            <h2 id="adr-titre" className="mt-2 text-h2 font-extrabold text-white">
              {page.adr.title}
            </h2>
            {page.adr.paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-lead text-marking/80">
                {p}
              </p>
            ))}
          </div>
          <div
            data-reveal=""
            style={{ ["--i" as string]: 1 }}
            className="flex flex-col justify-between gap-8 rounded-xl border border-line bg-surface p-8 shadow-sm sm:p-10 lg:col-span-5"
          >
            <div>
              <IconChip name="clipboard" />
              <h2 className="mt-6 font-display text-h2 font-extrabold">
                Comment le prix est-il établi&#8239;?
              </h2>
              <p className="mt-3 text-ink">{page.priceNote.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Facteurs de prix">
                {page.priceNote.factors.map((f) => (
                  <li key={f}>
                    <Tag>{f}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display font-semibold text-ink">{page.collaborate}</p>
              <ButtonLink
                href={quoteLink("transport-marchandises")}
                icon="arrowRight"
                className="mt-4"
              >
                Demander un devis
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Galerie */}
      <Section tone="cream-2" aria-labelledby="galerie-titre">
        <Container>
          <SectionHeading
            id="galerie-titre"
            eyebrow={`${marchandisesGallery.length} photos`}
            title={page.gallery.title}
            className="mb-10"
          />
          <PhotoGallery
            ids={marchandisesGallery}
            label="Galerie : transport de marchandises"
            initial={12}
          />
        </Container>
      </Section>
      <ServiceFooter
        topics={["marchandises", "adr"]}
        faqs={pickFaqs(faqFor.marchandises)}
        quote={quoteLink("transport-marchandises")}
      />
      <JsonLd
        data={serviceJsonLd({
          name: "Transport de marchandises",
          serviceType: "Fret routier interurbain",
          description: page.meta.description,
          path,
        })}
      />
    </>
  );
}
