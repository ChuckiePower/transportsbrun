"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

// Le panneau (et Radix Dialog) n'est téléchargé qu'au survol, au focus ou au clic du bouton
const MobileMenuPanel = dynamic(() => import("./MobileMenuPanel"), { ssr: false });
const MENU_ID = "menu-mobile";

/** Bouton « Menu » (mobile et tablette) ouvrant la navigation plein écran */
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
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-ink px-3.5 font-display text-[1.05rem] font-bold tracking-wide uppercase hover:bg-ink hover:text-white xl:hidden"
      >
        <Icon name="menu" className="size-5" />
        <span>Menu</span>
      </button>
      {loaded ? (
        <MobileMenuPanel open={open} onOpenChange={setOpen} returnFocusTo={button} />
      ) : null}
    </>
  );
}
