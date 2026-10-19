import { ButtonLink } from "@/components/ui/Button";
import { mainNav, quoteHref } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { DesktopNav } from "./NavLinks";

/** En-tête flottant arrondi, translucide ; se resserre après 24 px de défilement */
export function Header() {
  return (
    <div className="site-header-wrap sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <header className="site-header mx-auto flex max-w-[75rem] items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/85 py-2.5 pr-2.5 pl-4 shadow-md backdrop-blur-md sm:pl-5">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden xl:block">
          <DesktopNav items={mainNav} />
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={quoteHref} icon="arrowRight" size="sm">
              Demander un devis
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </header>
    </div>
  );
}
