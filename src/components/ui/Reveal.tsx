"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import type { ReactNode } from "react";

/**
 * Révélation discrète au défilement. Désactivée :
 * - si prefers-reduced-motion (règle CSS [data-reveal] dans globals.css) ;
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
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        data-reveal=""
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
