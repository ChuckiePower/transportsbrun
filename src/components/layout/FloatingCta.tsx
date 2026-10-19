import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainPhone, quoteHref, telHref } from "@/content/site";

/**
 * Pastille discrète en bas à droite (ordinateur) : apparaît après 600 px de défilement,
 * disparaît sur la page Contact et au niveau du pied de page (attribut posé par Interactions).
 */
export function FloatingCta() {
  return (
    <aside
      aria-label="Devis rapide"
      className="float-cta fixed right-6 bottom-6 z-30 hidden items-center gap-2 rounded-full border border-line bg-white/90 p-1.5 pl-4 shadow-lg backdrop-blur-md lg:flex"
    >
      <a href={telHref(mainPhone)} className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 font-display text-[0.9rem] font-semibold text-ink hover:text-brand">
        <Icon name="phone" className="size-4 text-brand" />
        {mainPhone.display}
      </a>
      <ButtonLink href={quoteHref} size="sm" icon="arrowRight">
        Demander un devis
      </ButtonLink>
    </aside>
  );
}
