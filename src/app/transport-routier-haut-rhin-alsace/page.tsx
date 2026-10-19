import { Photo } from "@/components/media/Photo";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExpertiseBlock } from "@/components/sections/ExpertiseBlock";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { savoirFairePage as page } from "@/content/pages/savoir-faire";
import { mainPhone, quoteHref, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const path = "/transport-routier-haut-rhin-alsace";
export const metadata = pageMetadata(page.meta, path);

const leverIcons = ["package", "route"] as const;

export default function SavoirFairePage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Savoir-faire", path }]} focal="50% 55%">
        <ButtonLink href={quoteHref} icon="arrowRight">
          Demander un devis
        </ButtonLink>
        <ButtonLink href={telHref(mainPhone)} variant="secondary" icon="phone" iconPosition="start">
          {mainPhone.display}
        </ButtonLink>
      </PageHero>

      {/* Introduction */}
      <Section tone="cream-2" aria-labelledby="intro-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="intro-titre"
              eyebrow="Charges lourdes et pondéreuses"
              title={page.intro.title}
            />
            <div data-reveal="" className="prose-route mt-6">
              {page.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div
              data-reveal-photo=""
              className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream shadow-md"
            >
              <Photo
                id={page.intro.photo}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Engagement écoresponsable */}
      <Section tone="none" aria-labelledby="eco-titre">
        <Container>
          <div className="grid gap-10 rounded-xl border border-line bg-surface p-6 shadow-md sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
            <div data-reveal="" className="lg:col-span-7">
              <IconChip name="leaf" size="lg" />
              <Eyebrow className="mt-6 mb-3">{page.ecology.eyebrow}</Eyebrow>
              <h2 id="eco-titre" className="text-h2 font-extrabold">
                {page.ecology.title}
              </h2>
              <p className="prose-route mt-6">{page.ecology.text}</p>
            </div>
            <ul className="grid content-center gap-4 lg:col-span-5">
              {page.ecology.levers.map((lever, i) => (
                <li
                  key={lever.title}
                  data-reveal=""
                  style={{ ["--i" as string]: i }}
                  className="flex gap-4 rounded-lg bg-cream p-5"
                >
                  <IconChip name={leverIcons[i] ?? "leaf"} />
                  <span>
                    <span className="block font-display text-h3 font-bold">{lever.title}</span>
                    <span className="mt-1 block text-ink-soft">{lever.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Service personnalisé */}
      <Section tone="cream-2" aria-labelledby="methode-titre">
        <Container size="narrow">
          <SectionHeading id="methode-titre" eyebrow="Coûts et délais" title={page.method.title} />
          <div data-reveal="" className="prose-route mt-6 text-lead">
            {page.method.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sécurité : grande carte nuit */}
      <section aria-labelledby="securite-titre" className="py-[72px] lg:py-28">
        <Container>
          <div className="on-asphalt surface-asphalt grid gap-10 overflow-hidden rounded-xl p-6 text-white shadow-lg sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
            <div className="lg:col-span-6">
              <SectionHeading
                id="securite-titre"
                dark
                eyebrow={page.safety.eyebrow}
                title={page.safety.title}
              />
              <p data-reveal="" className="mt-6 text-lead text-marking/80">
                {page.safety.text}
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {page.safety.points.map((pt, i) => (
                  <li
                    key={pt.title}
                    data-reveal=""
                    style={{ ["--i" as string]: i }}
                    className="rounded-lg bg-asphalt-2 p-5"
                  >
                    <IconChip name={i === 0 ? "shield" : "clipboard"} tone="asphalt" />
                    <span className="mt-4 block font-display text-[1.125rem] font-bold text-white">
                      {pt.title}
                    </span>
                    <span className="mt-1 block text-marking/80">{pt.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div
                data-reveal-photo=""
                className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-square"
              >
                <Photo
                  id={page.safety.photo}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* En résumé */}
      <Section tone="none" spacing="tight" aria-label="En résumé">
        <Container size="narrow">
          <p
            data-reveal=""
            className="rounded-lg bg-brand-soft p-8 font-display text-[clamp(1.35rem,1.1rem+1vw,1.85rem)] leading-snug font-bold text-ink sm:p-10"
          >
            {page.closing}
          </p>
        </Container>
      </Section>

      <ExpertiseBlock tone="cream-2" />
      <CtaBand />
    </>
  );
}
