import { Container } from "@/components/ui/Container";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Faq as FaqItem } from "@/content/faq";

/**
 * Questions fréquentes en accordéon (details/summary : fonctionne sans JavaScript),
 * hauteur animée là où le navigateur le permet, + JSON-LD FAQPage.
 */
export function Faq({
  items,
  eyebrow = "Questions fréquentes",
  title = "Vos questions, nos réponses",
  tone = "cream",
  id = "faq-titre",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  tone?: Tone;
  id?: string;
}) {
  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container size="narrow">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} align="center" />
        <div className="mt-12 space-y-3">
          {items.map((f, i) => (
            <details
              key={f.id}
              data-reveal=""
              style={{ ["--i" as string]: i }}
              className="faq-item group rounded-lg border border-line bg-surface shadow-sm open:shadow-md"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 rounded-lg px-6 py-4 font-display text-[1.0625rem] font-bold text-ink hover:text-brand">
                {f.q}
                <span
                  aria-hidden="true"
                  className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform duration-300 ease-out-soft group-open:rotate-45"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.25}
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="prose-route">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </Section>
  );
}
