import type { Metadata } from "next";
import Link from "next/link";
import { RoadLine } from "@/components/route/RoadLine";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, VehicleIcon } from "@/components/ui/Icon";
import { mainNav, mainPhone, quoteHref, telHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="px-3 py-6 sm:px-4 lg:py-10">
      <div className="surface-asphalt on-asphalt relative mx-auto max-w-[87.5rem] overflow-hidden rounded-xl py-16 sm:py-24">
        <Container>
          <Eyebrow className="mb-4">Erreur 404</Eyebrow>
          <h1 className="text-h1 font-extrabold text-white">Vous avez pris la mauvaise sortie</h1>
          <p className="mt-5 max-w-2xl text-lead text-marking/80">
            La page demandée n&apos;existe pas ou a été déplacée. Reprenez la route depuis
            l&apos;accueil, demandez votre devis ou appelez-nous directement&#8239;: nous vous
            répondons du lundi au vendredi.
          </p>

          {/* La route qui s'interrompt */}
          <div aria-hidden="true" className="mt-10 flex items-center gap-4">
            <VehicleIcon name="tracteur" className="size-12 shrink-0 text-marking" />
            <RoadLine tone="marking-soft" className="w-2/5 max-w-sm" />
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-marking/40 text-marking/60">
              <Icon name="close" className="size-4" />
            </span>
          </div>

          <div data-hero-cta="" className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" icon="arrowRight">
              Retour à l&apos;accueil
            </ButtonLink>
            <ButtonLink href={quoteHref} variant="on-asphalt" icon="arrowRight">
              Demander un devis
            </ButtonLink>
            <ButtonLink
              href={telHref(mainPhone)}
              variant="on-asphalt"
              icon="phone"
              iconPosition="start"
            >
              Appeler le {mainPhone.display}
            </ButtonLink>
          </div>

          <nav aria-label="Pages du site" className="mt-14">
            <RoadLine tone="marking-soft" className="mb-8 opacity-60" />
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-display font-semibold text-white hover:bg-white/10"
                  >
                    {item.label}
                    <Icon
                      name="arrowRight"
                      className="size-4 text-sun transition-transform group-hover:translate-x-[3px]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </section>
  );
}
