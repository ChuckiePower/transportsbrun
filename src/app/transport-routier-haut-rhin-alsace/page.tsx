import { Photo } from "@/components/media/Photo";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { savoirFairePage as page } from "@/content/pages/savoir-faire";
import { pageMetadata } from "@/lib/seo";

const path = "/transport-routier-haut-rhin-alsace";
export const metadata = pageMetadata(page.meta, path);

export default function SavoirFairePage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Savoir-faire", path }]} />

      {/* Introduction */}
      <Section aria-labelledby="intro-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="intro-titre"
              eyebrow="Charges lourdes et pondéreuses"
              title={page.intro.title}
            />
            <div className="prose-brun mt-6 text-lead text-steel">
              {page.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-ink shadow-lift">
              <Photo
                id={page.intro.photo}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Engagement écoresponsable */}
      <Section tone="sand" aria-labelledby="eco-titre">
        <Container>
          <div className="grid gap-10 rounded-lg border border-line bg-white p-6 shadow-card sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-4">{page.ecology.eyebrow}</Eyebrow>
              <h2 id="eco-titre" className="text-h2 font-bold uppercase">
                {page.ecology.title}
              </h2>
              <p className="mt-6 text-steel">{page.ecology.text}</p>
            </div>
            <ul className="grid content-center gap-4 lg:col-span-5">
              {page.ecology.levers.map((lever) => (
                <li key={lever.title} className="flex gap-4 rounded-md bg-paper p-5">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-sm bg-navy text-white">
                    <Icon name="leaf" className="size-6" />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold uppercase">
                      {lever.title}
                    </span>
                    <span className="text-steel">{lever.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Service personnalisé */}
      <Section aria-labelledby="methode-titre">
        <Container size="narrow">
          <SectionHeading id="methode-titre" eyebrow="Coûts et délais" title={page.method.title} />
          <div className="prose-brun mt-6 text-lead text-steel">
            {page.method.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sécurité */}
      <Section tone="ink" aria-labelledby="securite-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="securite-titre"
              tone="dark"
              eyebrow={page.safety.eyebrow}
              title={page.safety.title}
            />
            <p className="mt-6 text-lead text-silver">{page.safety.text}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {page.safety.points.map((pt) => (
                <li key={pt.title} className="rounded-md border border-white/15 p-5">
                  <Icon name="shield" className="size-7 text-signal" />
                  <span className="mt-3 block font-display text-xl font-bold uppercase">
                    {pt.title}
                  </span>
                  <span className="mt-1 block text-silver">{pt.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-square overflow-hidden rounded-md sm:aspect-[4/3] lg:aspect-square">
              <Photo
                id={page.safety.photo}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="tight" aria-label="En résumé">
        <Container size="narrow">
          <p className="border-l-4 border-navy pl-5 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] leading-tight font-bold">
            {page.closing}
          </p>
        </Container>
      </Section>

      <ExpertiseBlock />
      <CtaBand />
    </>
  );
}
