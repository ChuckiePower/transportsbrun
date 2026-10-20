import Image from "next/image";
import francePlateau from "@brand/logo-france-plateaux.png";
import { Photo } from "@/components/media/Photo";
import { PhotoGallery } from "@/components/media/PhotoGallery";
import { AdrPlate } from "@/components/route/AdrPlate";
import { ConvoiPanel } from "@/components/route/ConvoiPanel";
import { DimensionDrawing } from "@/components/route/DimensionDrawing";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PullQuote } from "@/components/sections/PullQuote";
import { ServiceFooter } from "@/components/sections/ServiceFooter";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, VehicleIcon } from "@/components/ui/Icon";
import { renderRich } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqFor, pickFaqs } from "@/content/faq";
import { plateauGallery } from "@/content/gallery";
import { plateauPage as page } from "@/content/pages/plateau";
import { mainPhone, telHref } from "@/content/site";
import { quoteLink } from "@/lib/quote-schema";
import { pageMetadata } from "@/lib/seo";

const path = "/transport-plateaux-camion-grue-haut-rhin-alsace";
export const metadata = pageMetadata(page.meta, path);

/** Repère visuel de chaque avantage : plateau, panneau convoi, hauteur, centrale, plaque ADR */
function advantageVisual(i: number) {
  const chip =
    "inline-flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand";
  switch (i) {
    case 0:
      return (
        <span className={`${chip} w-16`}>
          <VehicleIcon name="plateau" className="size-10" />
        </span>
      );
    case 1:
      return <ConvoiPanel size="md" />;
    case 2:
      return (
        <span className={chip}>
          <Icon name="height" className="size-6" />
        </span>
      );
    case 3:
      return (
        <span className={chip}>
          <Icon name="plant" className="size-6" />
        </span>
      );
    default:
      return <AdrPlate size="md" />;
  }
}

export default function PlateauGruePage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Transport plateau / grue", path }]}>
        <ButtonLink href={quoteLink("transport-plateau")} icon="arrowRight">
          Demander un devis
        </ButtonLink>
        <ButtonLink href={telHref(mainPhone)} variant="secondary" icon="phone" iconPosition="start">
          Appeler le {mainPhone.display}
        </ButtonLink>
      </PageHero>

      {/* Points clés : les 5 avantages, chacun avec son repère métier */}
      <Section tone="cream-2" aria-labelledby="avantages-titre">
        <Container>
          <SectionHeading
            id="avantages-titre"
            eyebrow="Points clés"
            title={page.advantages.title}
            lead={page.intro}
          />
          <ul data-convoy="" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.advantages.items.map((item, i) => (
              <li
                key={item.title}
                data-reveal=""
                style={{ ["--i" as string]: i % 3 }}
                className={
                  i === 0
                    ? "group rounded-lg border border-line bg-surface p-7 shadow-sm sm:col-span-2 lg:col-span-1"
                    : "group rounded-lg border border-line bg-surface p-7 shadow-sm"
                }
              >
                <span className="flex h-12 items-center">{advantageVisual(i)}</span>
                <h3 className="mt-5 text-h3 font-bold">{item.title}</h3>
                {"subtitle" in item && item.subtitle ? (
                  <p className="mt-1 text-[0.875rem] font-medium text-ink-soft">{item.subtitle}</p>
                ) : null}
                <p className="mt-3 text-ink-soft">{item.text}</p>
              </li>
            ))}
            <li
              data-reveal=""
              className="on-asphalt surface-asphalt flex flex-col justify-between gap-6 rounded-lg p-7 text-white shadow-md"
            >
              <p className="font-display text-h3 font-bold text-white">
                Un transport hors normes à organiser&#8239;?
              </p>
              <ButtonLink
                href={quoteLink("convoi-exceptionnel", "charges-hors-normes")}
                icon="arrowRight"
                className="self-start"
              >
                Demander un devis
              </ButtonLink>
            </li>
          </ul>
        </Container>
      </Section>

      {/* Équipements et flotte */}
      <Section tone="none" id="flotte" className="scroll-mt-28" aria-labelledby="flotte-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="flotte-titre"
              eyebrow="Camions grue, remorques et semi-remorques"
              title={page.fleet.title}
            />
            <div data-reveal="" className="prose-route mt-6">
              {page.fleet.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ButtonLink
              href="/notre-equipement"
              variant="secondary"
              icon="arrowRight"
              className="mt-8"
            >
              Voir notre équipement
            </ButtonLink>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div
              data-reveal-photo=""
              className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-2 shadow-md"
            >
              <Photo
                id={page.fleet.photo}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
            <div data-reveal="">
              <h3 className="flex items-center gap-3 text-h3 font-bold">
                <VehicleIcon name="camion-grue" className="size-10 text-brand" />
                {page.fleet.specsTitle}
              </h3>
              <div className="mt-5 grid gap-4">
                <DimensionDrawing unit="Porteur" />
                <DimensionDrawing unit="Remorque" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Qualité, sécurité, Groupement France Plateau */}
      <Section tone="cream-2" aria-labelledby="qualite-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              id="qualite-titre"
              eyebrow="Qualité et sécurité"
              title={page.quality.title}
            />
            <p data-reveal="" className="mt-6 text-lead text-ink">
              {page.quality.text}
            </p>
            <p data-reveal="" className="prose-route mt-5">
              {page.quality.contact}
            </p>
          </div>
          <aside
            data-reveal=""
            className="flex flex-col gap-6 rounded-lg border border-line bg-surface p-7 shadow-sm lg:col-span-5 lg:self-start"
          >
            <div className="inline-flex self-start rounded-md bg-surface p-2">
              <Image
                src={francePlateau}
                alt="Logo du Groupement France Plateau"
                width={200}
                height={74}
                sizes="200px"
                className="h-auto w-[180px]"
              />
            </div>
            <p className="prose-route">{renderRich(page.quality.network)}</p>
          </aside>
          <div className="lg:col-span-12">
            <PullQuote>{page.quality.tagline}</PullQuote>
          </div>
        </Container>
      </Section>

      <CtaBand
        variant="compact"
        title="Un convoi exceptionnel ou un levage à prévoir ?"
        text="Décrivez votre transport : nous vous répondons dans les plus brefs délais."
        quote={quoteLink("camion-grue")}
      />

      {/* Galerie */}
      <Section tone="none" aria-labelledby="galerie-titre">
        <Container>
          <SectionHeading
            id="galerie-titre"
            eyebrow={`${plateauGallery.length} photos`}
            title={page.gallery.title}
            className="mb-10"
          />
          <PhotoGallery
            ids={plateauGallery}
            label="Galerie : transport plateau et camion-grue"
            initial={12}
          />
        </Container>
      </Section>
      <ServiceFooter
        topics={["plateau", "grue", "convoi"]}
        faqs={pickFaqs(faqFor.plateau)}
        quote={quoteLink("transport-plateau")}
      />
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
