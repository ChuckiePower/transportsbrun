import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { mainPhone, quoteHref, telHref } from "@/content/site";

/**
 * Barre d'action flottante (mobile) : Appeler · Devis.
 * Avec JavaScript, elle n'apparaît qu'une fois les boutons du hero sortis de l'écran
 * (pas de doublon au premier écran) et se masque pendant la saisie (clavier ouvert).
 * Sans JavaScript, elle reste visible. Le <body> réserve sa hauteur.
 */
export function MobileCallBar() {
  const pill =
    "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full font-display text-[0.95rem] font-semibold active:scale-[0.98]";
  return (
    <nav
      aria-label="Actions rapides"
      className="mobile-bar fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-1.5 rounded-full border border-line bg-white/90 p-1.5 shadow-lg backdrop-blur-md md:hidden"
    >
      <a
        href={telHref(mainPhone)}
        className={`${pill} border-[1.5px] border-line bg-surface text-ink`}
      >
        <Icon name="phone" className="size-4" />
        <span>Appeler</span>
        <span className="sr-only"> le {mainPhone.display}</span>
      </a>
      <Link href={quoteHref} className={`${pill} bg-sun text-ink shadow-sun`}>
        <span>Devis</span>
        <span className="sr-only"> : demander un devis</span>
        <Icon name="arrowRight" className="size-4" />
      </Link>
    </nav>
  );
}
