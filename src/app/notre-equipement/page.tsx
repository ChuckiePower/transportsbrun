import { PhotoGallery } from "@/components/media/PhotoGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { equipmentCategories, fleetCapabilities, fleetCards } from "@/content/equipment";
import { equipementPage as page } from "@/content/pages/equipement";
import { mainPhone, quoteHref, telHref } from "@/content/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

const path = "/notre-equipement";
export const metadata = pageMetadata(page.meta, path);

export default function EquipementPage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Notre équipement", path }]} focal="50% 45%">
        <ButtonLink href={quoteHref} icon="arrowRight">
          Demander un devis
        </ButtonLink>
        <ButtonLink href={telHref(mainPhone)} variant="secondary" icon="phone" iconPosition="start">
          {mainPhone.display}
        </ButtonLink>
      </PageHero>

      {/* Navigation d'ancres en pastilles, collante sous l'en-tête */}
      <nav
        aria-label="Catégories de véhicules"
        className="sticky top-[5.25rem] z-20 py-3 sm:top-[5.75rem]"
      >
        <Container>
          <ul className="no-scrollbar flex gap-2 overflow-x-auto rounded-full border border-line bg-white/90 p-1.5 shadow-md backdrop-blur-md sm:inline-flex">
            <li>
              <a
                href="#parc"
                className="inline-flex min-h-10 items-center rounded-full px-4 font-display text-[0.875rem] font-semibold whitespace-nowrap text-ink hover:bg-brand-soft hover:text-brand"
              >
                Le parc
              </a>
            </li>
            {equipmentCategories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="inline-flex min-h-10 items-center rounded-full px-4 font-display text-[0.875rem] font-semibold whitespace-nowrap text-ink hover:bg-brand-soft hover:text-brand"
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Le parc en cartes */}
      <Section tone="none" id="parc" className="scroll-mt-40" aria-labelledby="parc-titre">
        <Container>
          <SectionHeading id="parc-titre" eyebrow="Inventaire" title={page.inventory.title} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fleetCards.map((card, i) => (
              <li
                key={card.name}
                data-reveal=""
                style={{ ["--i" as string]: i % 3 }}
                className={cn(
                  "group flex flex-col rounded-lg border border-line bg-surface p-7 shadow-sm",
                  card.name === "Plateaux" && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
                )}
              >
                <IconChip
                  name={card.icon}
                  className="group-hover:rotate-6 motion-reduce:rotate-0"
                />
                <h3 className="mt-5 text-h3 font-bold">{card.name}</h3>
                {card.items ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {card.items.map((it) => (
                      <li key={it}>
                        <Tag tone="neutral">{it}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {card.anchor ? (
                  <a
                    href={`#${card.anchor}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 font-display text-[0.95rem] font-semibold text-brand hover:underline"
                  >
                    Voir les photos
                    <span className="sr-only"> : {card.name}</span>
                    <Icon name="arrowRight" className="size-4 rotate-90" />
                  </a>
                ) : null}
              </li>
            ))}
            <li
              data-reveal=""
              className="on-asphalt surface-asphalt rounded-lg p-7 text-white shadow-md sm:col-span-2 lg:col-span-1"
            >
              <IconChip name="shield" tone="asphalt" />
              <h3 className="mt-5 text-h3 font-bold text-white">{fleetCapabilities.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                <li>
                  <Tag tone="asphalt">Convoi exceptionnel cat. 1</Tag>
                </li>
                <li>
                  <Tag tone="asphalt">Convoi exceptionnel cat. 2</Tag>
                </li>
                <li>
                  <Tag tone="asphalt">ADR</Tag>
                </li>
              </ul>
            </li>
          </ul>
        </Container>
      </Section>

      <CtaBand variant="compact" />

      {/* Photos par catégorie */}
      {equipmentCategories.map((cat, i) => (
        <Section
          key={cat.id}
          id={cat.id}
          tone={i % 2 === 0 ? "cream-2" : "cream"}
          className="scroll-mt-40"
          aria-labelledby={`${cat.id}-titre`}
        >
          <Container>
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div data-reveal="">
                <h2 id={`${cat.id}-titre`} className="text-h2 font-extrabold">
                  {cat.title}
                </h2>
              </div>
              <ul data-reveal="" className="flex flex-wrap gap-2 lg:max-w-[55%] lg:justify-end">
                {cat.composition.map((c) => (
                  <li key={c}>
                    <Tag>{c}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <PhotoGallery ids={cat.photos} label={`Photos : ${cat.title}`} layout="grid" />
          </Container>
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
