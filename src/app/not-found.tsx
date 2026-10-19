import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { mainNav, mainPhone, telHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="on-night relative isolate overflow-hidden rounded-xl bg-night px-6 py-14 text-white shadow-lg sm:px-10 sm:py-20 lg:px-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 600 200"
            fill="none"
            className="absolute -right-10 -bottom-6 -z-10 hidden w-[36rem] max-w-none opacity-20 sm:block"
          >
            <path
              d="M0 170 C 150 170, 200 40, 360 60 S 560 150, 600 40"
              stroke="currentColor"
              strokeWidth="26"
              strokeLinecap="round"
              className="text-night-2"
            />
            <path
              d="M0 170 C 150 170, 200 40, 360 60 S 560 150, 600 40"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="16 18"
              strokeLinecap="round"
              className="text-sun"
            />
          </svg>
          <Eyebrow className="mb-4 text-brand-light">Erreur 404</Eyebrow>
          <h1 className="text-h1 font-extrabold text-white">Cette page a changé de route</h1>
          <p className="mt-5 max-w-2xl text-lead text-night-muted">
            La page demandée n&apos;existe pas ou a été déplacée. Reprenez la route depuis
            l&apos;accueil ou appelez-nous directement&#8239;: nous vous répondons du lundi au
            vendredi.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/" icon="arrowRight">
              Retour à l&apos;accueil
            </ButtonLink>
            <ButtonLink
              href={telHref(mainPhone)}
              variant="on-night"
              icon="phone"
              iconPosition="start"
            >
              Appeler le {mainPhone.display}
            </ButtonLink>
          </div>
          <nav aria-label="Pages du site" className="mt-14 border-t border-white/10 pt-8">
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
                      className="size-4 text-brand-light transition-transform group-hover:translate-x-[3px]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
