import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "./PageHero";

/** Gabarit des pages légales : en-tête compact + colonne de lecture */
export function LegalLayout({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Informations légales" title={title} crumbs={[{ name: title, path }]} />
      <Section tone="white">
        <Container
          size="narrow"
          className="prose-brun legal space-y-10 text-[1.0625rem] text-graphite"
        >
          {children}
        </Container>
      </Section>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-h3 font-bold text-ink uppercase">{title}</h2>
      {children}
    </section>
  );
}
