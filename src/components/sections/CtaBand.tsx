import { Photo } from "@/components/media/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mainPhone, quoteHref, site, telHref } from "@/content/site";
import { fr } from "@/lib/typo";

/** Bande d'appel à l'action : devis + téléphones */
export function CtaBand({
  title = fr`Un transport à organiser ?`,
  text = fr`Décrivez votre besoin ou appelez-nous : nous vous répondons dans les plus brefs délais.`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section
      aria-labelledby="cta-titre"
      className="on-dark relative isolate overflow-hidden bg-ink text-white"
    >
      <Photo
        id="divers/scania-plateau-crepuscule-assombri"
        fill
        decorative
        sizes="100vw"
        quality={70}
        className="-z-20 object-cover opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(19_20_23/0.95)_30%,rgb(19_20_23/0.55)_100%)]"
      />
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-7">
          <Eyebrow tone="dark" className="mb-4">
            Devis
          </Eyebrow>
          <h2 id="cta-titre" className="text-h2 font-bold uppercase">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lead text-white/85">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={quoteHref} size="lg" icon="arrowRight">
              Demander un devis
            </ButtonLink>
            <ButtonLink
              href={telHref(mainPhone)}
              size="lg"
              variant="outline-light"
              icon="phone"
              iconPosition="start"
            >
              {mainPhone.display}
            </ButtonLink>
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-md border border-white/15 bg-white/15 lg:col-span-5">
          {site.phones.map((p) => (
            <li key={p.e164} className="bg-ink/85">
              <a
                href={telHref(p)}
                className="flex min-h-16 items-center justify-between gap-4 px-5 py-4 hover:bg-white/5"
              >
                <span className="text-silver">{p.label}</span>
                <span className="tabular font-display text-2xl font-bold">{p.display}</span>
              </a>
            </li>
          ))}
          <li className="bg-ink/85 px-5 py-4 text-silver">{site.hours.display}</li>
        </ul>
      </Container>
    </section>
  );
}
