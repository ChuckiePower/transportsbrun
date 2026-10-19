import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { mainPhone, quoteHref, telHref } from "@/content/site";

/**
 * Barre d'action collante en bas d'écran (mobile) : Appeler / Devis.
 * Le <body> réserve sa hauteur (pb-[…] dans le layout) pour ne rien masquer.
 */
export function MobileCallBar() {
  return (
    <nav
      aria-label="Actions rapides"
      className="on-dark fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-ink/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
    >
      <a
        href={telHref(mainPhone)}
        className="flex min-h-12 items-center justify-center gap-2 rounded-sm border-2 border-white/80 font-display text-[1.15rem] font-bold tracking-wide text-white uppercase active:bg-white active:text-ink"
      >
        <Icon name="phone" className="size-5" />
        <span>Appeler</span>
        <span className="sr-only"> le {mainPhone.display}</span>
      </a>
      <Link
        href={quoteHref}
        className="flex min-h-12 items-center justify-center gap-2 rounded-sm bg-signal font-display text-[1.15rem] font-bold tracking-wide text-ink uppercase active:bg-signal-600"
      >
        <span>Devis</span>
        <span className="sr-only"> : formulaire de demande</span>
        <Icon name="arrowRight" className="size-5" />
      </Link>
    </nav>
  );
}
