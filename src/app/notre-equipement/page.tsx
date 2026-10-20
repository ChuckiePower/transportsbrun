import { PhotoGallery } from "@/components/media/PhotoGallery";
import { AdrPlate } from "@/components/route/AdrPlate";
import { ConvoiPanel } from "@/components/route/ConvoiPanel";
import { DimensionDrawing } from "@/components/route/DimensionDrawing";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, VehicleIcon, type VehicleName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { equipmentCategories, fleetCapabilities, fleetCards } from "@/content/equipment";
import { equipementPage as page } from "@/content/pages/equipement";
import { mainPhone, quoteHref, telHref } from "@/content/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

const path = "/notre-equipement";

const categoryVehicle: Record<string, VehicleName> = {
  plateaux: "plateau",
  openbox: "openbox",
  "remorque-trax": "trax",
  tautliner: "tautliner",
  "camion-grue": "camion-grue",
};
export const metadata = pageMetadata(page.meta, path);

export default function EquipementPage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Notre équipement", path }]} focal="50% 45%">
        <ButtonLink href={quoteHref} icon="arrowRight">
          Demander un devis
        </ButtonLink>
        <ButtonLink href={telHref(mainPhone)} variant="secondary" icon="phone" iconPosition="start">
          Appeler le {mainPhone.display}
        </ButtonLink>
      </PageHero>

      {/* Navigation d'ancres en pastilles, collante sous l'en-tête */}
      <nav
        aria-label="Catégories de véhicules"
        className="sticky top-[5.25rem] z-20 py-3 sm:top-[5.75rem]"
      >
        <Container>
          <ul className="no-scrollbar flex max-w-full gap-2 overflow-x-auto rounded-full border border-line bg-white/90 p-1.5 shadow-md backdrop-blur-md sm:inline-flex">
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
                  className="inline-flex min-h-10 items-center gap-2 rounded-full py-1 pr-4 pl-2.5 font-display text-[0.875rem] font-semibold whitespace-nowrap text-ink hover:bg-brand-soft hover:text-brand"
                >
                  <VehicleIcon
                    name={categoryVehicle[cat.id] ?? "plateau"}
                    className="size-7 text-brand"
                  />
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
          <ul data-convoy="" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fleetCards.map((card, i) => (
              <li
                key={card.name}
                data-reveal=""
                style={{ ["--i" as string]: i % 3 }}
                className={cn(
                  "group flex flex-col rounded-lg border border-line bg-surface p-7 shadow-sm",
                  card.name === "Plateaux" && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
                  card.vehicle === "camion-grue" && "lg:col-span-2",
                )}
              >
                <span className="inline-flex h-14 w-20 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform duration-300 ease-out-soft group-hover:translate-x-1 motion-reduce:transform-none">
                  <VehicleIcon name={card.vehicle} className="size-12" />
                </span>
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
              <div data-reveal="" className="flex items-center gap-4">
                <span className="inline-flex h-14 w-20 shrink-0 items-center justify-center rounded-full bg-surface text-brand shadow-sm">
                  <VehicleIcon name={categoryVehicle[cat.id] ?? "plateau"} className="size-12" />
                </span>
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
            {cat.id === "camion-grue" ? (
              <div data-reveal="" className="mt-10 grid gap-4 sm:grid-cols-2">
                <DimensionDrawing unit="Porteur" />
                <DimensionDrawing unit="Remorque" />
              </div>
            ) : null}
          </Container>
        </Section>
      ))}

      {/* Capacité convoi exceptionnel et ADR : les deux panneaux */}
      <section aria-labelledby="capacite-titre" className="py-[72px] lg:py-24">
        <Container>
          <div
            data-reveal=""
            className="grid gap-8 rounded-xl border border-line bg-surface p-8 shadow-md sm:p-12 lg:grid-cols-12 lg:items-center"
          >
            <div className="lg:col-span-7">
              <p className="eyebrow">Capacité</p>
              <h2 id="capacite-titre" className="mt-2 text-h2 font-extrabold">
                {fleetCapabilities.title}
              </h2>
              <p className="mt-4 text-lead text-ink-soft">{fleetCapabilities.text}</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 lg:col-span-5 lg:justify-end">
              <ConvoiPanel size="lg" />
              <AdrPlate size="lg" />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
