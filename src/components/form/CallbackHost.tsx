"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { CALLBACK_EVENT } from "./CallbackTrigger";

// Le tiroir (formulaire + Radix Dialog) n'est chargé qu'à la première ouverture
const CallbackDrawer = dynamic(() => import("./CallbackDrawer"), { ssr: false });

/** Hôte unique du tiroir « Être rappelé », monté dans le layout */
export function CallbackHost() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onOpen(e: Event) {
      trigger.current = ((e as CustomEvent).detail?.from as HTMLElement | undefined) ?? null;
      setLoaded(true);
      setOpen(true);
    }
    window.addEventListener(CALLBACK_EVENT, onOpen);
    // Lien direct vers /contact#rappel (favori, partage) : on ouvre le tiroir
    if (window.location.hash === "#rappel") window.dispatchEvent(new CustomEvent(CALLBACK_EVENT));
    return () => window.removeEventListener(CALLBACK_EVENT, onOpen);
  }, []);

  if (!loaded) return null;
  return <CallbackDrawer open={open} onOpenChange={setOpen} returnFocusTo={trigger} />;
}
