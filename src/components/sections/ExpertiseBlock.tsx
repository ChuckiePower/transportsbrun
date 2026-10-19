import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertise, services } from "@/content/services";

/** « Nos domaines d'expertise » : bloc commun à toutes les pages (maillage interne) */
export function ExpertiseBlock({
  tone = "sand",
  currentHref,
}: {
  tone?: Exclude<Tone, "ink">;
  /** Masque la vignette de la page courante */
  currentHref?: string;
}) {
  const items = services.filter((s) => s.href.split("#")[0] !== currentHref);
  return (
    <Section tone={tone} aria-labelledby="expertise-titre">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <SectionHeading
            id="expertise-titre"
            eyebrow="Régional · National · International"
            title={expertise.title}
          />
          <p className="mt-6 text-steel">{expertise.text}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Périmètre">
            {expertise.scopes.map((scope) => (
              <li
                key={scope}
                className="rounded-xs border-2 border-ink px-3 py-1 font-display text-lg font-bold tracking-wide uppercase"
              >
                {scope}
              </li>
            ))}
          </ul>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:gap-5">
          {items.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="group block overflow-hidden rounded-md border border-line bg-white shadow-card transition-shadow hover:shadow-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Photo
                      id={s.photo}
                      fill
                      decorative
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="flex min-h-14 items-center justify-between gap-2 px-4 py-3 font-display text-[1.2rem] leading-tight font-bold uppercase group-hover:text-navy">
                    {s.short}
                    <Icon name="arrowRight" className="size-5 shrink-0 text-navy" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
