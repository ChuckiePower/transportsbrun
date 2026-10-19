import { PhotoGallery } from "@/components/media/PhotoGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { marchandisesGallery } from "@/content/gallery";
import { marchandisesPage as page } from "@/content/pages/marchandises";
import { quoteHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const path = "/transports-de-marchandises-et-btp-haut-rhin-alsace";
export const metadata = pageMetadata(page.meta, path);

export default function MarchandisesPage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Transport de marchandises", path }]}>
        <ButtonLink href={quoteHref} size="lg" icon="arrowRight">
          Demander un devis
        </ButtonLink>
      </PageHero>

      {/* Matériaux et chantiers */}
      <Section aria-labelledby="chantiers-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="chantiers-titre"
              eyebrow="Fret interurbain · Tous types de route"
              title={page.intro.title}
            />
            <p className="mt-6 font-display text-2xl font-bold text-navy uppercase">
              {page.intro.text}
            </p>
            <p className="mt-6 text-lead text-steel">{page.examples.lead}</p>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-md border-2 border-ink bg-white shadow-card">
              <div className="flex items-center justify-between gap-4 bg-ink px-5 py-3 text-white">
                <h3 className="font-display text-xl font-bold tracking-wide uppercase">
                  {page.examples.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-bold tracking-[0.2em] text-signal uppercase"
                >
                  Exemples
                </span>
              </div>
              <ul className="divide-y divide-line">
                {page.examples.items.map((item, i) => (
                  <li key={item.label} className="flex items-baseline gap-5 px-5 py-4 sm:px-6">
                    <span
                      aria-hidden="true"
                      className="tabular font-display text-lg font-bold text-navy"
                    >
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-[1.6rem] leading-tight font-bold uppercase">
                        {item.label}
                      </span>
                      {item.detail ? <span className="text-steel">{item.detail}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ADR + note sur le prix */}
      <Section tone="sand" aria-labelledby="adr-titre">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="on-dark rounded-md bg-ink p-6 text-white sm:p-10 lg:col-span-7">
            <SectionHeading
              id="adr-titre"
              tone="dark"
              eyebrow={page.adr.eyebrow}
              title={page.adr.title}
            />
            {page.adr.paragraphs.map((p, i) => (
              <p key={i} className="mt-6 text-lead text-silver">
                {p}
              </p>
            ))}
          </div>
          <div className="rounded-md border border-line bg-white p-6 shadow-card sm:p-10 lg:col-span-5">
            <h2 className="eyebrow flex items-center gap-2 text-navy">
              <Icon name="alert" className="size-5" />
              {page.priceNote.title}
            </h2>
            <p className="mt-4 text-lead">{page.priceNote.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Facteurs de prix">
              {page.priceNote.factors.map((f) => (
                <li
                  key={f}
                  className="rounded-xs border-2 border-ink px-3 py-1 font-display text-lg font-bold uppercase"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 rounded-md border border-line bg-paper p-6 sm:flex-row sm:items-center sm:p-8 lg:col-span-12">
            <p className="font-display text-2xl leading-tight font-bold uppercase">
              {page.collaborate}
            </p>
            <ButtonLink href={quoteHref} size="lg" icon="arrowRight" className="shrink-0">
              Demander un devis
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Galerie */}
      <Section tone="white" aria-labelledby="galerie-titre">
        <Container size="wide">
          <SectionHeading
            id="galerie-titre"
            eyebrow={`${marchandisesGallery.length} photos`}
            title={page.gallery.title}
            className="mb-10"
          />
          <PhotoGallery ids={marchandisesGallery} label="Galerie : transport de marchandises" />
        </Container>
      </Section>

      <ExpertiseBlock />
      <CtaBand />
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
