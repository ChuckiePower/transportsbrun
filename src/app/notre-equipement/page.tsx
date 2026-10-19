import { PhotoGallery } from "@/components/media/PhotoGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { equipmentCategories, fleetCapabilities, fleetInventory } from "@/content/equipment";
import { equipementPage as page } from "@/content/pages/equipement";
import { pageMetadata } from "@/lib/seo";

const path = "/notre-equipement";
export const metadata = pageMetadata(page.meta, path);

export default function EquipementPage() {
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ name: "Notre équipement", path }]} />

      {/* Inventaire du parc */}
      <Section aria-labelledby="parc-titre">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading id="parc-titre" eyebrow="Inventaire" title={page.inventory.title} />
            <nav aria-label="Catégories de véhicules" className="mt-8">
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {equipmentCategories.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`#${cat.id}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xs border-2 border-ink px-3 font-display text-lg font-bold uppercase hover:bg-ink hover:text-white"
                    >
                      {cat.title}
                      <Icon name="arrowRight" className="size-4 rotate-90" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-md border-2 border-ink bg-white shadow-card">
              <div className="flex items-center justify-between gap-4 bg-ink px-5 py-3 text-white">
                <p className="font-display text-xl font-bold tracking-wide uppercase">
                  Parc de véhicules
                </p>
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-bold tracking-[0.2em] text-signal uppercase"
                >
                  Transports Brun
                </span>
              </div>
              <ul className="divide-y divide-line">
                {fleetInventory.map((row) => (
                  <li
                    key={row.item}
                    className="grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6 sm:px-6"
                  >
                    <span className="font-display text-[1.45rem] leading-tight font-bold uppercase">
                      {row.item}
                    </span>
                    {row.details ? (
                      <ul className="space-y-1 text-steel">
                        {row.details.map((d) => (
                          <li key={d} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-[0.7em] h-0.5 w-3 shrink-0 bg-navy"
                            />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ul>
              <div className="on-dark flex flex-col gap-3 bg-navy px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="font-display text-[1.45rem] leading-tight font-bold uppercase">
                  {fleetCapabilities.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="signal">Convoi exceptionnel cat. 1</Badge>
                  <Badge tone="signal">Convoi exceptionnel cat. 2</Badge>
                  <Badge tone="signal">ADR</Badge>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Catégories visuelles */}
      {equipmentCategories.map((cat, i) => (
        <Section
          key={cat.id}
          id={cat.id}
          tone={i % 2 === 0 ? "sand" : "paper"}
          aria-labelledby={`${cat.id}-titre`}
        >
          <Container size="wide">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p aria-hidden="true" className="tabular font-display text-xl font-bold text-navy">
                  0{i + 1} / 0{equipmentCategories.length}
                </p>
                <h2 id={`${cat.id}-titre`} className="mt-1 text-h2 font-bold uppercase">
                  {cat.title}
                </h2>
              </div>
              <ul className="flex flex-wrap gap-2 lg:max-w-[50%] lg:justify-end">
                {cat.composition.map((c) => (
                  <li
                    key={c}
                    className="rounded-xs bg-white px-3 py-1.5 text-[0.95rem] font-semibold shadow-card"
                  >
                    {c}
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
