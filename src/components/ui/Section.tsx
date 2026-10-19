import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type Tone = "paper" | "sand" | "white" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  white: "bg-white text-ink",
  ink: "on-dark bg-ink text-white",
};

type Props = ComponentPropsWithoutRef<"section"> & {
  tone?: Tone;
  spacing?: "default" | "tight" | "none";
};

export function Section({ tone = "paper", spacing = "default", className, ...rest }: Props) {
  return (
    <section
      className={cn(
        tones[tone],
        spacing === "default" && "py-16 sm:py-20 lg:py-28",
        spacing === "tight" && "py-10 sm:py-14",
        className,
      )}
      {...rest}
    />
  );
}
