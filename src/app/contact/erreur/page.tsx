import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/IconChip";
import { mainPhone, telHref } from "@/content/site";

/** Échec d'un envoi du formulaire sans JavaScript */
export const metadata: Metadata = {
  title: "Demande non envoyée",
  robots: { index: false, follow: false },
};

export default function ErreurPage() {
  return (
    <section className="py-[72px] lg:py-28">
      <Container size="narrow">
        <div role="alert" className="rounded-xl border border-line bg-surface p-8 text-center shadow-md sm:p-14">
          <IconChip name="alert" size="lg" className="mx-auto" />
          <h1 className="mt-6 text-h2 font-extrabold">Votre demande n&apos;a pas pu être envoyée</h1>
          <p className="mx-auto mt-4 max-w-xl text-lead text-ink">
            Un champ obligatoire est peut-être incomplet, ou l&apos;envoi a échoué. Revenez au formulaire pour vérifier
            votre saisie, ou appelez-nous directement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact#devis" icon="arrowRight">
              Revenir au formulaire
            </ButtonLink>
            <ButtonLink href={telHref(mainPhone)} variant="secondary" icon="phone" iconPosition="start">
              Appeler le {mainPhone.display}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
