import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/team";

/** L'équipe et les chauffeurs : masquée tant que src/content/team.ts est vide */
export function Team({ tone = "cream" }: { tone?: Tone }) {
  if (!team.length) return null;
  return (
    <Section tone={tone} aria-labelledby="equipe-photos-titre">
      <Container>
        <SectionHeading
          id="equipe-photos-titre"
          eyebrow="L'équipe"
          title="Les visages de Transports Brun"
        />
        <ul data-convoy="" className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {team.map((m, i) => (
            <li
              key={m.name}
              data-reveal=""
              style={{ ["--i" as string]: i % 4 }}
              className="text-center"
            >
              <div className="relative mx-auto aspect-square overflow-hidden rounded-lg bg-cream-2">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 768px) 280px, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <p className="mt-3 font-display font-semibold text-ink">{m.name}</p>
              <p className="text-[0.875rem] text-ink-soft">{m.role}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
