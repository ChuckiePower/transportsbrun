"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { RefObject } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav, mainPhone, quoteHref, site, telHref } from "@/content/site";
import { NavLinks } from "./NavLinks";

export const MOBILE_MENU_ID = "menu-mobile";

/** Panneau du menu : carte arrondie plein écran, piège de focus, Échap (Radix Dialog) */
export default function MobileMenuPanel({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}) {
  const close = () => onOpenChange(false);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-night/40 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          id={MOBILE_MENU_ID}
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo.current?.focus();
          }}
          className="fixed inset-3 z-50 flex flex-col overflow-y-auto rounded-xl bg-surface shadow-lg data-[state=closed]:animate-fade-out data-[state=open]:animate-sheet-in"
        >
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <Dialog.Title className="eyebrow">Menu</Dialog.Title>
            <Dialog.Close className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-line px-4 font-display text-[0.9rem] font-semibold hover:border-ink">
              <Icon name="close" className="size-[18px]" />
              <span>Fermer</span>
            </Dialog.Close>
          </div>

          <nav aria-label="Navigation principale" className="px-3 pt-2">
            <NavLinks
              items={[{ href: "/", label: "Accueil" }, ...mainNav]}
              onNavigate={close}
              className="space-y-1"
              linkClassName="flex min-h-13 items-center justify-between rounded-lg px-4 py-2.5 font-display text-[1.6rem] leading-tight font-bold tracking-tight text-ink hover:bg-cream"
              activeClassName="bg-brand-soft text-brand"
            />
          </nav>

          <div className="mt-auto space-y-3 px-5 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <ButtonLink href={quoteHref} icon="arrowRight" className="w-full" onClick={close}>
              Demander un devis
            </ButtonLink>
            <ButtonLink
              href={telHref(mainPhone)}
              variant="secondary"
              icon="phone"
              iconPosition="start"
              className="w-full"
            >
              Appeler le {mainPhone.display}
            </ButtonLink>
            <p className="flex items-center justify-center gap-2 pt-2 text-[0.875rem] text-ink-soft">
              <Icon name="clock" className="size-4" /> {site.hours.display}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
