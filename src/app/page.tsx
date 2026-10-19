import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScopeBand } from "@/components/sections/ScopeBand";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { TrustBand } from "@/components/sections/TrustBand";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { equipmentCategories } from "@/content/equipment";
import { homeMosaic } from "@/content/gallery";
import { homePage as page } from "@/content/pages/home";
import { mainPhone, quoteHref, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(page.meta, "/");

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <Photo
          id={page.hero.photo}
          fill
          preload
          decoding="sync"
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          className="-z-20 object-cover object-[62%_center] lg:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(19_20_23/0.35)_0%,rgb(19_20_23/0.6)_45%,rgb(19_20_23/0.95)_100%)] lg:bg-[linear-gradient(90deg,rgb(19_20_23/0.94)_0%,rgb(19_20_23/0.8)_38%,rgb(19_20_23/0.15)_72%)]"
        />
        <Container className="flex max-h-[56rem] min-h-[calc(100svh-4.5rem-4.25rem)] flex-col justify-end pt-24 pb-12 sm:min-h-[38rem] md:min-h-[calc(100svh-7.5rem)] lg:justify-center lg:pb-20">
          <div className="max-w-[46rem]">
            <Eyebrow tone="dark" className="mb-5">
              {page.hero.eyebrow}
            </Eyebrow>
            <h1 className="text-display font-bold uppercase">{page.hero.title}</h1>
            <p className="mt-6 max-w-[38rem] text-lead text-white/90">{page.hero.lead}</p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink href={quoteHref} size="lg" icon="arrowRight">
                Demander un devis
              </ButtonLink>
              <ButtonLink
                href={telHref(mainPhone)}
                size="lg"
                variant="outline-light"
                icon="phone"
                iconPosition="start"
              >
                Appeler le {mainPhone.display}
              </ButtonLink>
            </div>
          </div>
        </Container>
        <div className="rule-stripes" aria-hidden="true" />
      </section>

      {/* 2. Bandeau de confiance */}
      <TrustBand />

      {/* 3. Les trois métiers */}
      <Section aria-labelledby="metiers-titre">
        <Container>
          <SectionHeading
            id="metiers-titre"
            eyebrow={page.services.eyebrow}
            title={page.services.title}
            lead={page.services.lead}
            className="mb-10 lg:mb-14"
          />
          <ServiceCards />
        </Container>
      </Section>

      {/* 4. Domaines d'expertise */}
      <ScopeBand />

      {/* 5. Notre histoire */}
      <Section tone="sand" aria-labelledby="histoire-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="histoire-titre"
              eyebrow={page.story.eyebrow}
              title={page.story.title}
            />
            <div className="prose-brun mt-6 space-y-4 text-steel">
              {page.story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 1 ? "border-l-4 border-navy pl-4 font-semibold text-ink" : undefined
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <ButtonLink href="/notre-histoire" variant="outline" icon="arrowRight" className="mt-8">
              {page.story.linkLabel}
            </ButtonLink>
          </div>
          <Reveal className="lg:col-span-7">
            <Mosaic />
          </Reveal>
        </Container>
      </Section>

      {/* 6. Équipement */}
      <Section aria-labelledby="equipement-titre">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              id="equipement-titre"
              eyebrow={page.equipment.eyebrow}
              title={page.equipment.title}
              lead={page.equipment.lead}
            />
            <ButtonLink
              href="/notre-equipement"
              variant="outline"
              icon="arrowRight"
              className="shrink-0"
            >
              {page.equipment.linkLabel}
            </ButtonLink>
          </div>
          <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
            {equipmentCategories.map((cat, i) => (
              <li key={cat.id} className="w-[72%] shrink-0 snap-start sm:w-auto">
                <Reveal delay={i * 0.05}>
                  <Link
                    href={`/notre-equipement#${cat.id}`}
                    className="group block overflow-hidden rounded-md border border-line bg-white shadow-card transition-shadow hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Photo
                        id={cat.photos[0]!}
                        fill
                        decorative
                        sizes="(min-width: 1024px) 19vw, (min-width: 640px) 45vw, 72vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="tabular absolute top-3 left-3 rounded-xs bg-ink/80 px-2 py-0.5 font-display text-sm font-bold text-white">
                        0{i + 1}
                      </span>
                    </div>
                    <span className="flex min-h-14 items-center justify-between gap-2 px-4 py-3 font-display text-[1.3rem] leading-tight font-bold uppercase group-hover:text-navy">
                      {cat.title}
                      <Icon name="arrowRight" className="size-5 shrink-0 text-navy" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7. Appel à l'action */}
      <CtaBand />
    </>
  );
}

/** Mosaïque de photos de la flotte (galerie de l'accueil actuel) */
function Mosaic() {
  const [a, b, c, d, e] = homeMosaic;
  const cell = "relative overflow-hidden rounded-md bg-ink";
  return (
    <div
      className="grid grid-cols-6 grid-rows-[repeat(6,minmax(0,1fr))] gap-2 sm:gap-3"
      style={{ aspectRatio: "6 / 5" }}
    >
      <div className={`${cell} col-span-4 row-span-4`}>
        <Photo id={a} fill sizes="(min-width: 1024px) 38vw, 66vw" className="object-cover" />
      </div>
      <div className={`${cell} col-span-2 row-span-2`}>
        <Photo id={b} fill sizes="(min-width: 1024px) 19vw, 33vw" className="object-cover" />
      </div>
      <div className={`${cell} col-span-2 row-span-2`}>
        <Photo id={c} fill sizes="(min-width: 1024px) 19vw, 33vw" className="object-cover" />
      </div>
      <div className={`${cell} col-span-3 row-span-2`}>
        <Photo id={d} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
      </div>
      <div className={`${cell} col-span-3 row-span-2`}>
        <Photo id={e} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
      </div>
    </div>
  );
}
