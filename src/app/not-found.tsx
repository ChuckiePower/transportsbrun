import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stripes } from "@/components/ui/Stripes";
import { mainNav, mainPhone, telHref } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <Stripes
        tone="dark"
        className="absolute -right-16 -bottom-10 -z-10 h-[28rem] opacity-[0.08]"
      />
      <Container className="py-20 sm:py-28">
        <Eyebrow tone="dark" className="mb-4">
          Erreur 404
        </Eyebrow>
        <h1 className="text-h1 font-bold uppercase">Cette page a changé de route</h1>
        <p className="mt-5 max-w-2xl text-lead text-silver">
          La page demandée n&apos;existe pas ou a été déplacée. Reprenez la route depuis
          l&apos;accueil ou appelez-nous directement&#8239;: nous vous répondons du lundi au
          vendredi.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={telHref(mainPhone)} size="lg" icon="phone" iconPosition="start">
            Appeler le {mainPhone.display}
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="outline-light" icon="arrowRight">
            Retour à l&apos;accueil
          </ButtonLink>
        </div>
        <nav aria-label="Pages du site" className="mt-14 border-t border-white/15 pt-8">
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center font-display text-xl font-bold uppercase hover:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
