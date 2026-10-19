"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

// Le panneau (et Radix Dialog) n'est téléchargé qu'au survol, au focus ou au clic du bouton
const MobileMenuPanel = dynamic(() => import("./MobileMenuPanel"), { ssr: false });
const MENU_ID = "menu-mobile";

/** Bouton « Menu » (mobile et tablette) ouvrant la navigation */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const preload = () => setLoaded(true);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? MENU_ID : undefined}
        onPointerEnter={preload}
        onTouchStart={preload}
        onFocus={preload}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-line bg-surface px-4 font-display text-[0.9rem] font-semibold text-ink transition-colors hover:border-ink xl:hidden"
      >
        <Icon name="menu" className="size-[18px]" />
        <span>Menu</span>
      </button>
      {loaded ? (
        <MobileMenuPanel open={open} onOpenChange={setOpen} returnFocusTo={button} />
      ) : null}
    </>
  );
}
