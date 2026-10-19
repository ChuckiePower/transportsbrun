import Link from "next/link";
import { Fragment } from "react";
import { CallbackTrigger } from "@/components/form/CallbackTrigger";
import { Photo } from "@/components/media/Photo";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { Faq } from "@/components/sections/Faq";
import { Marquee } from "@/components/sections/Marquee";
import { Road } from "@/components/sections/Road";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ClientLogos, Testimonials } from "@/components/sections/SocialProof";
import { Steps } from "@/components/sections/Steps";
import { TransportedCards } from "@/components/sections/TransportedCards";
import { TrustBand } from "@/components/sections/TrustBand";
import { WhyBrun } from "@/components/sections/WhyBrun";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { equipmentCategories } from "@/content/equipment";
import { faqs } from "@/content/faq";
import { homePage as page } from "@/content/pages/home";
import { mainPhone, quoteHref, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(page.meta, "/");

/** Titre découpé en mots pour la révélation en cascade (le texte reste lisible sans JS) */
function HeroTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="text-h1 font-extrabold text-white">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-top">
            <span className="hero-word" style={{ ["--w" as string]: i }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

export default function HomePage() {
  const photoRadii = ["rounded-lg", "rounded-xl", "rounded-lg", "rounded-2xl"];
  return (
    <div className="relative">
      <Road />

      {/* 1. Hero : grande photo arrondie, voile doux sous le texte */}
      <section className="px-3 pt-4 sm:px-4 lg:pt-6">
        <div className="relative isolate mx-auto flex min-h-[calc(100svh-7rem)] max-w-[87.5rem] overflow-hidden rounded-xl bg-night md:min-h-[78vh]">
          <div data-parallax="" className="absolute inset-0 -z-20">
            <Photo
              id={page.hero.photo}
              fill
              preload
              decoding="sync"
              fetchPriority="high"
              quality={70}
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="hero-zoom object-cover"
              style={{ objectPosition: page.hero.focal }}
            />
          </div>
          <div
            aria-hidden="true"
            className="hero-veil absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(20_33_61/0.85)_0%,rgb(20_33_61/0.55)_45%,rgb(20_33_61/0)_80%)] md:bg-[linear-gradient(35deg,rgb(20_33_61/0.78)_0%,rgb(20_33_61/0.45)_42%,rgb(20_33_61/0)_70%)]"
          />
          <Container className="flex flex-col justify-end pt-28 pb-28 sm:pb-32 lg:pb-36">
            <div className="max-w-[44rem]">
              <Eyebrow className="hero-in mb-5 inline-flex rounded-full bg-[rgb(20_33_61/0.55)] px-3.5 py-1.5 text-white backdrop-blur-md">
                {page.hero.eyebrow}
              </Eyebrow>
              <HeroTitle text={page.hero.title} />
              <p
                className="hero-in mt-6 max-w-[36rem] text-lead text-white/90"
                style={{ ["--i" as string]: 3 }}
              >
                {page.hero.lead}
              </p>
              <div
                data-hero-cta=""
                className="hero-in mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center"
                style={{ ["--i" as string]: 4 }}
              >
                <ButtonLink href={quoteHref} icon="arrowRight">
                  Demander un devis
                </ButtonLink>
                <ButtonLink
                  href={telHref(mainPhone)}
                  variant="on-night"
                  icon="phone"
                  iconPosition="start"
                >
                  Appeler le {mainPhone.display}
                </ButtonLink>
                <CallbackTrigger className="on-night justify-center px-2 text-white xs:justify-start" />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* 2. Bandeau de confiance (chevauche le hero) */}
      <TrustBand />

      {/* 3. Savoir-faire en pastilles défilantes */}
      <Marquee items={page.marquee} label="Nos savoir-faire" />

      {/* 4. Les trois métiers */}
      <Section spacing="none" className="pt-6 pb-10 lg:pt-10" aria-labelledby="metiers-titre">
        <Container>
          <SectionHeading
            id="metiers-titre"
            eyebrow={page.services.eyebrow}
            title={page.services.title}
            lead={page.services.lead}
            className="mb-12"
          />
          <ServiceCards />
        </Container>
      </Section>
      <CtaBand
        variant="compact"
        title="Un transport plateau ou grue à prévoir ?"
        text="Décrivez-le en quelques champs : nous vous répondons dans les plus brefs délais."
      />

      {/* 5. Ce que nous transportons */}
      <Section tone="none" aria-labelledby="transport-titre">
        <Container>
          <SectionHeading
            id="transport-titre"
            eyebrow={page.transported.eyebrow}
            title={page.transported.title}
            lead={page.transported.lead}
            className="mb-12"
          />
          <TransportedCards />
        </Container>
      </Section>

      {/* 6. Pourquoi Transports Brun */}
      <WhyBrun />

      {/* 7. Comment ça marche */}
      <Steps />
      <CtaBand
        variant="compact"
        title="Prêt à décrire votre transport ?"
        text="Le formulaire de devis se remplit en deux étapes."
      />

      {/* 8. Nos domaines d'expertise */}
      <ExpertiseBlock tone="none" photo={page.expertise.photo} />

      {/* 9. Notre histoire */}
      <Section tone="cream-2" aria-labelledby="histoire-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="grid grid-cols-6 gap-3 sm:gap-4 lg:order-2 lg:col-span-7">
            {page.story.mosaic.map((id, i) => (
              <div
                key={id}
                data-reveal-photo=""
                style={{ ["--i" as string]: i }}
                className={[
                  "relative overflow-hidden bg-cream shadow-sm",
                  photoRadii[i],
                  i === 0
                    ? "col-span-4 row-span-2 aspect-[4/5]"
                    : i === 3
                      ? "col-span-6 aspect-[16/7]"
                      : "col-span-2 aspect-[3/4]",
                ].join(" ")}
              >
                <Photo
                  id={id}
                  fill
                  sizes={
                    i === 3
                      ? "(min-width: 1024px) 670px, 100vw"
                      : i === 0
                        ? "(min-width: 1024px) 440px, 66vw"
                        : "(min-width: 1024px) 220px, 33vw"
                  }
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="lg:order-1 lg:col-span-5">
            <SectionHeading
              id="histoire-titre"
              eyebrow={page.story.eyebrow}
              title={page.story.title}
            />
            <div data-reveal="" className="prose-route mt-6">
              {page.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p
              data-reveal=""
              className="mt-6 rounded-lg bg-surface p-5 font-display font-semibold text-ink shadow-sm"
            >
              {page.story.quote}
            </p>
            <ButtonLink
              href="/notre-histoire"
              variant="secondary"
              icon="arrowRight"
              className="mt-8"
            >
              {page.story.linkLabel}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 10. Équipement */}
      <Section tone="none" aria-labelledby="equipement-titre">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                id="equipement-titre"
                eyebrow={page.equipment.eyebrow}
                title={page.equipment.title}
                lead={page.equipment.lead}
              />
            </div>
            <div data-reveal="" className="lg:col-span-5 lg:justify-self-end">
              <ul
                className="flex flex-wrap gap-2 lg:justify-end"
                aria-label="Catégories de véhicules"
              >
                {equipmentCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/notre-equipement#${cat.id}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 font-display text-[0.9rem] font-semibold text-ink shadow-sm transition-colors hover:border-ink"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {page.equipment.thumbs.map((id, i) => (
              <div
                key={id}
                data-reveal-photo=""
                style={{ ["--i" as string]: i }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cream-2 shadow-sm"
              >
                <Photo
                  id={id}
                  fill
                  sizes="(min-width: 640px) 384px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/notre-equipement" variant="secondary" icon="arrowRight">
              {page.equipment.linkLabel}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 11. Preuves sociales : masquées tant qu'il n'y a pas de données réelles */}
      <Testimonials />
      <ClientLogos />

      {/* 12. FAQ puis grand bandeau final */}
      <Faq items={faqs} eyebrow={page.faq.eyebrow} title={page.faq.title} tone="cream-2" />
      <CtaBand />
    </div>
  );
}
