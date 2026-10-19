import type { Metadata } from "next";
import { CheckDraw } from "@/components/form/fields";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainPhone, site, telHref } from "@/content/site";
import { fr } from "@/lib/typo";

/** Confirmation après un envoi du formulaire sans JavaScript */
export const metadata: Metadata = {
  title: "Demande envoyée",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <section className="py-[72px] lg:py-28">
      <Container size="narrow">
        <div
          role="status"
          className="rounded-xl border border-line bg-surface p-8 text-center shadow-md sm:p-14"
        >
          <CheckDraw className="mx-auto" />
          <h1 className="mt-6 text-h2 font-extrabold">Demande envoyée, merci !</h1>
          <p className="mx-auto mt-4 max-w-xl text-lead text-ink">
            Votre demande a bien été transmise à l&apos;équipe Transports Brun. Nous vous
            contacterons dans les plus brefs délais.
          </p>
          <p className="mt-2 text-ink-soft">{fr`Une urgence ? L'équipe est joignable ${site.hours.sentence}.`}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={telHref(mainPhone)} icon="phone" iconPosition="start">
              Appeler le {mainPhone.display}
            </ButtonLink>
            <ButtonLink href="/" variant="secondary" icon="arrowRight">
              Retour à l&apos;accueil
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
