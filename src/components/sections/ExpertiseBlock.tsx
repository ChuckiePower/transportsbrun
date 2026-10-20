import Link from "next/link";
import { FranceMap } from "@/components/route/FranceMap";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertise, services } from "@/content/services";

/**
 * « Nos domaines d'expertise » : texte et liens vers les métiers à gauche ; à droite, la carte
 * de France où les routes partent de Saint-Hippolyte (régional, national, international).
 */
export function ExpertiseBlock({ tone = "cream" }: { tone?: Tone }) {
  return (
    <Section tone={tone} aria-labelledby="expertise-titre">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            id="expertise-titre"
            eyebrow="Du quai d'expédition jusqu'au client"
            title={expertise.title}
          />
          <p data-reveal="" className="prose-route mt-6">
            {expertise.text}
          </p>
          <ul
            data-reveal=""
            className="mt-10 divide-y divide-line rounded-lg border border-line bg-surface shadow-sm"
          >
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="group flex min-h-14 items-center justify-between gap-4 px-5 py-3.5 font-display font-semibold text-ink hover:text-brand"
                >
                  {s.title}
                  <Icon
                    name="arrowRight"
                    className="size-4 text-brand transition-transform duration-200 group-hover:translate-x-[3px]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <FranceMap className="mx-auto max-w-[34rem]" />
        </div>
      </Container>
    </Section>
  );
}
