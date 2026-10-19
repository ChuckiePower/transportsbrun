import Image from "next/image";
import franceePlateau from "@brand/logo-france-plateaux.png";
import { Photo } from "@/components/media/Photo";
import { PhotoGallery } from "@/components/media/PhotoGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { PageHero } from "@/components/sections/PageHero";
import { SpecSheet } from "@/components/sections/SpecSheet";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { renderRich } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plateauGallery } from "@/content/gallery";
import { plateauPage as page } from "@/content/pages/plateau";
import { quoteHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const path = "/transport-plateaux-camion-grue-haut-rhin-alsace";
export const metadata = pageMetadata(page.meta, path);

export default function PlateauGruePage() {
  return (
    <>
      <PageHero
        {...page.hero}
        crumbs={[{ name: "Transport plateau / grue", path }]}
        objectPosition="60% center"
      >
        <ButtonLink href={quoteHref} size="lg" icon="arrowRight">
          Demander un devis
        </ButtonLink>
      </PageHero>

      {/* Avantages */}
      <Section aria-labelledby="avantages-titre">
        <Container>
          <SectionHeading
            id="avantages-titre"
            eyebrow="Hors normes · Convois exceptionnels · ADR"
            title={page.advantages.title}
            lead={page.intro}
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {page.advantages.items.map((item, i) => (
              <li key={item.title} className="bg-white p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="tabular font-display text-5xl leading-none font-bold text-navy"
                >
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-h3 font-bold uppercase">{item.title}</h3>
                {"subtitle" in item && item.subtitle ? (
                  <p className="mt-1 text-sm font-semibold text-steel">{item.subtitle}</p>
                ) : null}
                <p className="mt-3 text-steel">{item.text}</p>
              </li>
            ))}
            <li className="on-dark flex flex-col justify-between gap-6 bg-ink p-6 text-white sm:p-8">
              <p className="font-display text-2xl leading-tight font-bold uppercase">
                Un transport hors normes à organiser&#8239;?
              </p>
              <ButtonLink href={quoteHref} icon="arrowRight" className="self-start">
                Demander un devis
              </ButtonLink>
            </li>
          </ol>
        </Container>
      </Section>

      {/* Équipements et flotte */}
      <Section tone="sand" id="flotte" aria-labelledby="flotte-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="flotte-titre"
              eyebrow="Camions grue, remorques et semi-remorques"
              title={page.fleet.title}
            />
            <div className="prose-brun mt-6 text-steel">
              {page.fleet.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ButtonLink
              href="/notre-equipement"
              variant="outline"
              icon="arrowRight"
              className="mt-8"
            >
              Tout notre équipement
            </ButtonLink>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-ink shadow-lift">
                <Photo
                  id={page.fleet.photo}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <SpecSheet title={page.fleet.specsTitle} />
          </div>
        </Container>
      </Section>

      {/* Qualité, sécurité, Groupement France Plateau */}
      <Section aria-labelledby="qualite-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              id="qualite-titre"
              eyebrow="Qualité et sécurité"
              title={page.quality.title}
            />
            <p className="mt-6 text-lead text-steel">{page.quality.text}</p>
            <p className="mt-6 text-steel">{page.quality.contact}</p>
          </div>
          <aside className="flex flex-col gap-6 rounded-md border border-line bg-white p-6 shadow-card sm:p-8 lg:col-span-5">
            <Image
              src={franceePlateau}
              alt="Logo du Groupement France Plateau"
              width={200}
              height={74}
              sizes="200px"
              className="h-auto w-[200px]"
            />
            <p className="prose-brun text-steel">{renderRich(page.quality.network)}</p>
          </aside>
          <p className="border-l-4 border-navy pl-5 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] leading-tight font-semibold lg:col-span-12">
            {page.quality.tagline}
          </p>
        </Container>
      </Section>

      {/* Galerie */}
      <Section tone="white" aria-labelledby="galerie-titre">
        <Container size="wide">
          <SectionHeading
            id="galerie-titre"
            eyebrow={`${plateauGallery.length} photos`}
            title={page.gallery.title}
            className="mb-10"
          />
          <PhotoGallery ids={plateauGallery} label="Galerie : transport plateau et camion-grue" />
        </Container>
      </Section>

      <ExpertiseBlock currentHref={path} />
      <CtaBand />
      <JsonLd
        data={serviceJsonLd({
          name: "Transport plateau et camion-grue",
          serviceType: "Transport routier par plateau et camion-grue",
          description: page.meta.description,
          path,
        })}
      />
    </>
  );
}
