import Link from "next/link";
import { CallbackTrigger } from "@/components/form/CallbackTrigger";
import { Icon } from "@/components/ui/Icon";
import { mainPhone, quoteHref, telHref } from "@/content/site";

/**
 * Barre d'action flottante (mobile) : Appeler · Rappel · Devis.
 * Masquée pendant la saisie (clavier ouvert) ; le <body> réserve sa hauteur.
 */
export function MobileCallBar() {
  const pill =
    "flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full font-display text-[0.9rem] font-semibold transition-transform active:scale-[0.98]";
  return (
    <nav
      aria-label="Actions rapides"
      className="mobile-bar fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-1.5 rounded-full border border-line bg-white/90 p-1.5 shadow-lg backdrop-blur-md transition-transform duration-300 ease-out-soft md:hidden"
    >
      <a
        href={telHref(mainPhone)}
        className={`${pill} border-[1.5px] border-line bg-surface text-ink`}
      >
        <Icon name="phone" className="size-4" />
        <span>Appeler</span>
        <span className="sr-only"> le {mainPhone.display}</span>
      </a>
      <CallbackTrigger
        variant="bar"
        className={`${pill} border-[1.5px] border-line bg-surface text-ink`}
      />
      <Link href={quoteHref} className={`${pill} bg-sun text-ink shadow-sun`}>
        <span>Devis</span>
        <span className="sr-only"> : demander un devis</span>
        <Icon name="arrowRight" className="size-4" />
      </Link>
    </nav>
  );
}
