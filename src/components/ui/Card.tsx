import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Carte : blanc, rayon 24 px, filet 1 px, ombre douce (et léger soulèvement si interactive) */
export function Card({
  className,
  interactive = false,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface shadow-sm",
        interactive &&
          "transition-[box-shadow,transform] duration-300 ease-out-soft focus-within:-translate-y-[3px] focus-within:shadow-md hover:-translate-y-[3px] hover:shadow-md motion-reduce:transform-none",
        className,
      )}
      {...rest}
    />
  );
}
