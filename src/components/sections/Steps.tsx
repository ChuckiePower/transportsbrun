import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages/home";

/** « Comment ça marche » : numéros qui apparaissent un par un, trait de liaison qui se trace */
export function Steps() {
  const { eyebrow, title, items } = homePage.steps;
  return (
    <Section aria-labelledby="etapes-titre">
      <Container>
        <SectionHeading id="etapes-titre" eyebrow={eyebrow} title={title} align="center" />
        <ol data-steps="" className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden="true"
            data-step-line=""
            className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-0.5 rounded-full bg-[repeating-linear-gradient(90deg,var(--color-brand)_0_10px,transparent_10px_18px)] opacity-40 md:block"
          />
          {items.map((s, i) => (
            <li key={s.title} className="relative flex flex-col items-center text-center">
              <span
                data-step-num=""
                style={{ ["--i" as string]: i }}
                className="relative z-10 inline-flex size-14 items-center justify-center rounded-full bg-brand font-display text-xl font-extrabold text-white shadow-md ring-8 ring-cream"
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-h3 font-bold">{s.title}</h3>
              <p className="mt-2 max-w-xs text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
