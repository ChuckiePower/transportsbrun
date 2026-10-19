"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { RefObject } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav, quoteHref, site, telHref } from "@/content/site";
import { NavLinks } from "./NavLinks";

export const MOBILE_MENU_ID = "menu-mobile";

/**
 * Panneau du menu plein écran (chargé à la demande) : piège de focus,
 * fermeture par Échap, reste de la page masqué aux lecteurs d'écran (Radix Dialog).
 */
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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          id={MOBILE_MENU_ID}
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo.current?.focus();
          }}
          className="on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-white data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
            <Dialog.Title className="eyebrow text-signal">Menu</Dialog.Title>
            <Dialog.Close className="inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-white/70 px-3.5 font-display text-[1.05rem] font-bold tracking-wide uppercase hover:bg-white hover:text-ink">
              <Icon name="close" className="size-5" />
              <span>Fermer</span>
            </Dialog.Close>
          </div>

          <nav aria-label="Navigation principale" className="px-4 pt-6 sm:px-6">
            <NavLinks
              items={[{ href: "/", label: "Accueil" }, ...mainNav]}
              onNavigate={close}
              className="divide-y divide-white/10 border-y border-white/10"
              linkClassName="flex min-h-14 items-center justify-between py-3 font-display text-[1.85rem] leading-tight font-bold uppercase hover:text-signal"
              activeClassName="text-signal"
            />
          </nav>

          <div className="mt-auto space-y-5 px-4 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
            <ButtonLink
              href={quoteHref}
              size="lg"
              icon="arrowRight"
              className="w-full"
              onClick={close}
            >
              Demander un devis
            </ButtonLink>
            <ul className="grid gap-2 sm:grid-cols-3">
              {site.phones.map((p) => (
                <li key={p.e164}>
                  <a
                    href={telHref(p)}
                    className="flex min-h-12 items-center gap-3 rounded-sm border border-white/15 px-4 py-2 hover:border-signal"
                  >
                    <Icon name="phone" className="size-5 shrink-0 text-signal" />
                    <span className="leading-tight">
                      <span className="block text-sm text-silver">{p.label}</span>
                      <span className="tabular font-semibold">{p.display}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 text-silver">
              <Icon name="clock" className="size-4" /> {site.hours.display}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
