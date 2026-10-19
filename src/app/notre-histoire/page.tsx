import { Photo } from "@/components/media/Photo";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { PageHero } from "@/components/sections/PageHero";
import { PullQuote } from "@/components/sections/PullQuote";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { histoirePage as page } from "@/content/pages/histoire";
import { pageMetadata } from "@/lib/seo";

const path = "/notre-histoire";
export const metadata = pageMetadata(page.meta, path);

export default function NotreHistoirePage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Notre histoire", path }]} />

      {/* Des valeurs ancrées */}
      <Section aria-labelledby="valeurs-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="valeurs-titre" eyebrow="Nos valeurs" title={page.values.title} />
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Les valeurs Brun">
              {page.values.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-xs bg-navy px-3 py-1.5 font-display text-lg font-bold tracking-wide text-white uppercase"
                >
                  {k}
                </li>
              ))}
            </ul>
            <div className="prose-brun mt-8 text-steel">
              {page.values.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10 lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-ink shadow-lift">
                <Photo
                  id={page.values.photo}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <PullQuote>{page.values.quote}</PullQuote>
          </div>
        </Container>
      </Section>

      {/* Découvrez notre équipe */}
      <Section tone="ink" aria-labelledby="equipe-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:order-2 lg:col-span-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded-md">
              <Photo
                id={page.team.photo}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:order-1 lg:col-span-6">
            <SectionHeading
              id="equipe-titre"
              tone="dark"
              eyebrow="Nos chauffeurs"
              title={page.team.title}
            />
            <div className="prose-brun mt-6 text-lead text-silver">
              {page.team.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <PullQuote tone="dark" className="mt-10">
              {page.team.quote.replace(/\.$/, "")}
            </PullQuote>
          </div>
        </Container>
      </Section>

      <ContactSection />
      <ExpertiseBlock />
    </>
  );
}
