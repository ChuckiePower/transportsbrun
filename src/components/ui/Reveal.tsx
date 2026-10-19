"use client";

import { inView } from "motion";
import { animate } from "motion/mini";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Révélation discrète au défilement, avec Motion en version légère
 * (inView + animate WAAPI, ~3 Ko) pour garder un JavaScript initial minimal.
 * Désactivée :
 * - si prefers-reduced-motion (contenu affiché immédiatement, règle CSS [data-reveal]) ;
 * - sans JavaScript (règle <noscript> du layout).
 * Ne jamais l'utiliser sur l'élément LCP (hero).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }
    return inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], transform: [`translateY(${y}px)`, "translateY(0)"] },
          { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        ).then(() => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      },
      { margin: "0px 0px -8% 0px" },
    );
  }, [delay, y]);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={{ opacity: 0, transform: `translateY(${y}px)` }}
    >
      {children}
    </div>
  );
}
