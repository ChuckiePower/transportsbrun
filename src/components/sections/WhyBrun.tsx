import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/IconChip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages/home";

/** « Pourquoi Transports Brun » : compteur d'expérience (seul chiffre animé) + 4 engagements */
export function WhyBrun() {
  const why = homePage.why;
  return (
    <Section tone="cream-2" aria-labelledby="pourquoi-titre">
      <Container>
        <SectionHeading
          id="pourquoi-titre"
          eyebrow={why.eyebrow}
          title={why.title}
          lead={why.lead}
        />
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div
            data-reveal=""
            className="on-asphalt surface-asphalt flex flex-col justify-between rounded-xl p-8 text-white shadow-md lg:col-span-4 lg:p-10"
          >
            <div
              role="img"
              aria-label={`${why.experience.prefix} ${why.experience.value} ${why.experience.label}`}
            >
              <p className="font-display text-[1.05rem] font-semibold text-marking/80">
                {why.experience.prefix}
              </p>
              <p className="mt-2 font-display leading-none font-extrabold tracking-tight">
                {/* Valeur finale déjà dans le HTML ; le décompte n'est qu'une animation */}
                <span
                  className="tabular text-[clamp(5rem,12vw,8.5rem)]"
                  data-count={why.experience.value}
                >
                  {why.experience.value}
                </span>
              </p>
              <p className="mt-3 font-display text-xl font-bold text-white">
                {why.experience.label}
              </p>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:gap-6">
            {why.cards.map((c, i) => (
              <li
                key={c.title}
                data-reveal=""
                style={{ ["--i" as string]: i }}
                className="group rounded-lg border border-line bg-surface p-7 shadow-sm transition-[box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-[3px] hover:shadow-md motion-reduce:transform-none"
              >
                <IconChip name={c.icon} className="group-hover:rotate-6 motion-reduce:rotate-0" />
                <h3 className="mt-5 text-h3 font-bold">{c.title}</h3>
                <p className="mt-2 text-ink-soft">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
