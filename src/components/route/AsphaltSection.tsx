import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { RoadLine } from "./RoadLine";

/**
 * Section sombre « asphalte » : grande carte arrondie (32 px) posée dans la page avec une marge,
 * grain très léger et marquage discret en bas. Accents jaunes ou blancs uniquement.
 */
export function AsphaltSection({
  className,
  inner,
  marking = true,
  children,
  ...rest
}: ComponentPropsWithoutRef<"section"> & { inner?: string; marking?: boolean }) {
  return (
    <section className={cn("px-3 py-3 sm:px-4", className)} {...rest}>
      <div
        className={cn(
          "surface-asphalt on-asphalt mx-auto max-w-[87.5rem] overflow-hidden rounded-xl py-[72px] lg:py-28",
          inner,
        )}
      >
        {children}
        {marking ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-6 opacity-60 sm:inset-x-14"
          >
            <RoadLine tone="marking-soft" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
