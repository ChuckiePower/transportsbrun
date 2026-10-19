import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, quoteHref } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div>
        <Container
          size="wide"
          className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-20"
        >
          <Logo priority />
          <nav aria-label="Navigation principale" className="hidden xl:block">
            <NavLinks
              items={mainNav}
              className="flex items-center gap-0.5 2xl:gap-1"
              linkClassName="relative inline-flex min-h-11 items-center px-2 font-display text-[1.02rem] font-semibold whitespace-nowrap text-graphite uppercase hover:text-navy 2xl:px-3 2xl:text-[1.1rem] after:absolute after:inset-x-2 after:bottom-1.5 2xl:after:inset-x-3 after:h-[3px] after:origin-left after:scale-x-0 after:bg-navy after:transition-transform hover:after:scale-x-100"
              activeClassName="text-navy after:scale-x-100"
            />
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ButtonLink href={quoteHref} icon="arrowRight" className="hidden sm:inline-flex">
              Demander un devis
            </ButtonLink>
            <MobileMenu />
          </div>
        </Container>
      </div>
    </header>
  );
}
