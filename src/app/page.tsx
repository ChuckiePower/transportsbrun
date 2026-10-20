import Link from "next/link";
import { Fragment } from "react";
import { CallbackTrigger } from "@/components/form/CallbackTrigger";
import { Photo } from "@/components/media/Photo";
import { hasRating, RatingBadge, ReviewsSection } from "@/components/reviews/Reviews";
import { AdrPlate } from "@/components/route/AdrPlate";
import { ConvoiPanel } from "@/components/route/ConvoiPanel";
import { RoadSegment } from "@/components/route/RoadLine";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { Faq } from "@/components/sections/Faq";
import { HomeRoad } from "@/components/sections/HomeRoad";
import { Marquee } from "@/components/sections/Marquee";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Steps } from "@/components/sections/Steps";
import { Team } from "@/components/sections/Team";
import { TransportedCards } from "@/components/sections/TransportedCards";
import { TrustBand } from "@/components/sections/TrustBand";
import { WhyBrun } from "@/components/sections/WhyBrun";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, VehicleIcon, type VehicleName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { equipmentCategories } from "@/content/equipment";
import { faqs } from "@/content/faq";
import { homePage as page } from "@/content/pages/home";
import { mainPhone, quoteHref, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(page.meta, "/");

/**
 * Numérote les lignes du titre (--l sur chaque mot) pour une révélation ligne par ligne quelle
 * que soit la largeur ; sans ce script, toutes les lignes arrivent ensemble. Placé APRÈS la
 * section du hero : un script en ligne au milieu du hero faisait peindre un hero incomplet
 * (titre seul), qui grandissait ensuite vers le haut (décalage de mise en page, CLS 0,19).
 */
const heroLinesScript =
  "(function(h){if(!h)return;var y,l=-1;h.querySelectorAll('.hero-word').forEach(function(w){var t=w.parentNode.offsetTop;if(t!==y){y=t;l++}w.style.setProperty('--l',l)})})(document.querySelector('h1[data-lines]'))";

/** Titre découpé en mots, révélés ligne par ligne derrière un masque (lisible sans JS) */
function HeroTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 data-lines="" className="text-h1 font-extrabold text-white">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-top">
            <span className="hero-word">{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

const categoryVehicle: Record<string, VehicleName> = {
  plateaux: "plateau",
  openbox: "openbox",
  "remorque-trax": "trax",
  tautliner: "tautliner",
  "camion-grue": "camion-grue",
};

export default function HomePage() {
  const mosaic = [
    "col-span-4 row-span-2 aspect-[4/5] rounded-xl",
    "col-span-2 aspect-[3/4] rounded-lg",
    "col-span-2 aspect-[3/4] rounded-[20px]",
    "col-span-6 aspect-[16/7] rounded-lg",
  ];
  const mosaicSizes = [
    "(min-width: 1024px) 440px, 66vw",
    "(min-width: 1024px) 220px, 33vw",
    "(min-width: 1024px) 220px, 33vw",
    "(min-width: 1024px) 670px, 100vw",
  ];
  return (
    <div className="relative">
      <HomeRoad />

      {/* 1. Hero : grande photo arrondie, voile sous le texte seulement */}
      <section className="relative z-[2] px-3 pt-4 sm:px-4 lg:pt-6">
        <div className="surface-asphalt relative isolate mx-auto flex min-h-[calc(100svh-7rem)] max-w-[87.5rem] overflow-hidden rounded-xl md:min-h-[78vh]">
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
            className="hero-veil absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(35_38_44/0.88)_0%,rgb(35_38_44/0.6)_45%,rgb(35_38_44/0)_80%)] md:bg-[linear-gradient(35deg,rgb(35_38_44/0.82)_0%,rgb(35_38_44/0.5)_42%,rgb(35_38_44/0)_70%)]"
          />
          <Container className="flex flex-col justify-end pt-28 pb-28 sm:pb-32 lg:pb-36">
            <div className="max-w-[44rem]">
              <Eyebrow className="hero-in mb-5 inline-block rounded-full bg-[rgb(20_33_61/0.55)] px-3.5 py-1.5 text-white backdrop-blur-md max-sm:text-[0.6875rem]">
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
                  variant="on-asphalt"
                  icon="phone"
                  iconPosition="start"
                >
                  Appeler le {mainPhone.display}
                </ButtonLink>
                <CallbackTrigger className="on-asphalt justify-center px-2 text-white xs:justify-start" />
              </div>
              {/* Micro-preuves (ordinateur) */}
              <ul
                className="hero-in mt-8 hidden flex-wrap items-center gap-x-6 gap-y-3 text-[0.9rem] text-white/90 lg:flex"
                style={{ ["--i" as string]: 5 }}
                aria-label="En bref"
              >
                <li>
                  <ConvoiPanel size="md" />
                </li>
                <li className="flex items-center gap-2.5">
                  <AdrPlate size="sm" className="h-[22px] w-[30px]" />
                  ADR de base et colisage
                </li>
                <li className="flex items-center gap-2">
                  {hasRating() ? (
                    <RatingBadge dark />
                  ) : (
                    <>
                      <Icon name="locate" className="size-[18px] text-sun" />
                      {page.hero.proofFallback}
                    </>
                  )}
                </li>
              </ul>
            </div>
          </Container>
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: heroLinesScript }} />

      {/* 2. En bref (chevauche le hero) */}
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
        title="Un transport plateau ou un levage à prévoir ?"
        text="Décrivez votre chargement : nous vous répondons dans les plus brefs délais."
      />

      {/* 5. Grande bande photo : un convoi sur la route */}
      <section aria-label={page.band.quote} className="relative z-[2] px-3 py-10 sm:px-4 lg:py-16">
        <div
          data-reveal-photo=""
          className="relative mx-auto aspect-[4/5] max-w-[87.5rem] overflow-hidden rounded-xl bg-asphalt sm:aspect-[16/8] lg:aspect-[16/6]"
        >
          <div data-parallax="" className="absolute inset-0">
            <Photo
              id={page.band.photo}
              fill
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="object-cover"
              style={{ objectPosition: page.band.focal }}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(10deg,rgb(35_38_44/0.85)_0%,rgb(35_38_44/0.35)_45%,rgb(35_38_44/0)_70%)]"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <Eyebrow className="inline-block rounded-full bg-[rgb(20_33_61/0.55)] px-3.5 py-1.5 text-white backdrop-blur-md max-sm:text-[0.6875rem]">
              {page.band.eyebrow}
            </Eyebrow>
            <p className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] font-extrabold tracking-tight text-white">
              {page.band.quote}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Ce que nous transportons */}
      <Section tone="cream-2" aria-labelledby="transport-titre">
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

      {/* 7. Pourquoi Transports Brun (asphalte, compteur kilométrique) */}
      <WhyBrun />

      {/* 8. Ce que disent nos clients (avis Google, masqué sans données) */}
      <ReviewsSection />

      {/* 9. Comment ça marche : l'itinéraire */}
      <Steps />
      <CtaBand
        variant="compact"
        title="Prêt à décrire votre transport ?"
        text="Le formulaire de devis se remplit en deux étapes."
      />
      <RoadSegment className="pt-4" />

      {/* 10. Nos domaines d'expertise : la carte des routes */}
      <ExpertiseBlock tone="none" />

      {/* 11. Notre histoire */}
      <Section tone="cream-2" aria-labelledby="histoire-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="grid grid-cols-6 gap-3 sm:gap-4 lg:order-2 lg:col-span-7">
            {page.story.mosaic.map((id, i) => (
              <div
                key={id}
                data-reveal-photo=""
                style={{ ["--i" as string]: i }}
                className={`relative overflow-hidden bg-cream shadow-sm ${mosaic[i]}`}
              >
                <Photo id={id} fill sizes={mosaicSizes[i]} className="object-cover" />
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

      {/* 12. Équipement */}
      <Section tone="none" aria-labelledby="equipement-titre">
        <Container>
          <SectionHeading
            id="equipement-titre"
            eyebrow={page.equipment.eyebrow}
            title={page.equipment.title}
            lead={page.equipment.lead}
          />
          <ul
            data-reveal=""
            className="mt-10 flex flex-wrap gap-2.5"
            aria-label="Catégories de véhicules"
          >
            {equipmentCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/notre-equipement#${cat.id}`}
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-5 pl-3 font-display text-[0.95rem] font-semibold text-ink shadow-sm transition-colors hover:border-ink"
                >
                  <VehicleIcon
                    name={categoryVehicle[cat.id] ?? "plateau"}
                    className="size-9 text-brand transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
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

      {/* 13. Équipe et logos clients : masqués tant que les fichiers sont vides */}
      <Team tone="cream-2" />
      <ClientLogos />

      {/* 14. FAQ */}
      <Faq items={faqs} eyebrow={page.faq.eyebrow} title={page.faq.title} tone="cream-2" />

      {/* 15. Bandeau final : l'arrivée */}
      <CtaBand />
    </div>
  );
}
