import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import type { PhotoId } from "@/content/gallery";
import { expertise, services } from "@/content/services";

/**
 * « Nos domaines d'expertise » : texte à gauche, grande photo arrondie à droite,
 * trois pastilles Régional / National / International, liens vers les métiers.
 */
export function ExpertiseBlock({ tone = "cream", photo = "marchandises/scania-conteneur-foret" }: { tone?: Tone; photo?: PhotoId }) {
  return (
    <Section tone={tone} aria-labelledby="expertise-titre">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading id="expertise-titre" eyebrow="Du quai d'expédition jusqu'au client" title={expertise.title} />
          <p data-reveal="" className="prose-route mt-6">
            {expertise.text}
          </p>
          <ul data-reveal="" className="mt-8 flex flex-wrap gap-2" aria-label="Périmètre d'intervention">
            {expertise.scopes.map((scope) => (
              <li key={scope}>
                <Tag icon={scope === "Régional" ? "pin" : scope === "National" ? "route" : "globe"}>{scope}</Tag>
              </li>
            ))}
          </ul>
          <ul data-reveal="" className="mt-10 divide-y divide-line rounded-lg border border-line bg-surface shadow-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className="group flex min-h-14 items-center justify-between gap-4 px-5 py-3.5 font-display font-semibold text-ink hover:text-brand">
                  {s.title}
                  <Icon name="arrowRight" className="size-4 text-brand transition-transform duration-200 group-hover:translate-x-[3px]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div data-reveal-photo="" className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-2 shadow-md lg:aspect-[4/5]">
            <Photo id={photo} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
