import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "navy",
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "signal" | "ink" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs px-2.5 py-1 font-display text-sm font-bold tracking-wider uppercase",
        tone === "navy" && "bg-navy text-white",
        tone === "signal" && "bg-signal text-ink",
        tone === "ink" && "bg-ink text-white",
        tone === "outline" && "border border-current",
        className,
      )}
    >
      {children}
    </span>
  );
}
