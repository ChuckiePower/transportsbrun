import { Photo } from "@/components/media/Photo";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { PageHero } from "@/components/sections/PageHero";
import { PullQuote } from "@/components/sections/PullQuote";
import { Team } from "@/components/sections/Team";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { histoirePage as page } from "@/content/pages/histoire";
import { quoteHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const path = "/notre-histoire";
export const metadata = pageMetadata(page.meta, path);

export default function NotreHistoirePage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Notre histoire", path }]} focal="50% 60%">
        <ButtonLink href={quoteHref} icon="arrowRight">
          Demander un devis
        </ButtonLink>
        <ButtonLink href="/notre-equipement" variant="secondary" icon="arrowRight">
          Voir notre équipement
        </ButtonLink>
      </PageHero>

      {/* Des valeurs ancrées */}
      <Section tone="cream-2" aria-labelledby="valeurs-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="valeurs-titre" eyebrow="Nos valeurs" title={page.values.title} />
            <ul data-reveal="" className="mt-8 flex flex-wrap gap-2" aria-label="Les valeurs Brun">
              {page.values.keywords.map((k) => (
                <li key={k}>
                  <Tag className="px-4 py-2 text-[0.9375rem]">{k}</Tag>
                </li>
              ))}
            </ul>
            <div data-reveal="" className="prose-route mt-8">
              {page.values.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6">
            {/* Mosaïque : la flotte familiale */}
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              {page.values.mosaic.map((id, i) => (
                <div
                  key={id}
                  data-reveal-photo=""
                  style={{ ["--i" as string]: i }}
                  className={`relative overflow-hidden bg-cream shadow-sm ${
                    i === 0
                      ? "col-span-5 aspect-[16/9] rounded-xl"
                      : i === 1
                        ? "col-span-3 aspect-[4/3] rounded-lg"
                        : "col-span-2 aspect-[3/4] rounded-[20px]"
                  }`}
                >
                  <Photo
                    id={id}
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 560px, 100vw"
                        : "(min-width: 1024px) 340px, 60vw"
                    }
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <PullQuote>{page.values.quote}</PullQuote>
          </div>
        </Container>
      </Section>

      {/* Découvrez notre équipe : grande carte asphalte */}
      <section aria-labelledby="equipe-titre" className="py-[72px] lg:py-28">
        <Container>
          <div className="on-asphalt surface-asphalt grid gap-10 overflow-hidden rounded-xl p-6 text-white shadow-lg sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
            <div className="lg:order-2 lg:col-span-6">
              <div
                data-reveal-photo=""
                className="relative aspect-[3/2] overflow-hidden rounded-lg"
              >
                <Photo
                  id={page.team.photo}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:order-1 lg:col-span-6">
              <SectionHeading
                id="equipe-titre"
                dark
                eyebrow="Nos chauffeurs"
                title={page.team.title}
              />
              <div data-reveal="" className="mt-6 space-y-4 text-lead text-marking/80">
                {page.team.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <PullQuote dark className="mt-8">
                {page.team.quote}
              </PullQuote>
            </div>
          </div>
        </Container>
      </section>

      <Team tone="cream-2" />
      <ExpertiseBlock tone="cream-2" />
      <CtaBand />
    </>
  );
}
