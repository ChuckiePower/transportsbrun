import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type Tone = "cream" | "cream-2" | "surface" | "none";

const tones: Record<Tone, string> = {
  cream: "bg-cream",
  "cream-2": "bg-cream-2",
  surface: "bg-surface",
  none: "",
};

type Props = ComponentPropsWithoutRef<"section"> & {
  tone?: Tone;
  spacing?: "default" | "tight" | "none";
};

/** Section : 112 px de respiration (72 px en mobile) */
export function Section({ tone = "cream", spacing = "default", className, ...rest }: Props) {
  return (
    <section
      className={cn(
        tones[tone],
        spacing === "default" && "py-[72px] lg:py-28",
        spacing === "tight" && "py-12 lg:py-16",
        className,
      )}
      {...rest}
    />
  );
}
