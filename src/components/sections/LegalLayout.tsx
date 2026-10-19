import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "./PageHero";

/** Pages légales : en-tête sans photo + grande carte de lecture */
export function LegalLayout({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Informations légales" title={title} crumbs={[{ name: title, path }]} />
      <div className="pb-[72px] lg:pb-28">
        <Container>
          <div className="rounded-xl border border-line bg-surface p-6 shadow-sm sm:p-10 lg:p-14">
            <div className="prose-route max-w-3xl space-y-10 text-body">{children}</div>
          </div>
        </Container>
      </div>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-h3 font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
