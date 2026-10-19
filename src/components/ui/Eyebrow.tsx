import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Stripes } from "./Stripes";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "light" ? "text-navy" : "text-signal",
        className,
      )}
    >
      <Stripes tone={tone} className="h-4" />
      <span>{children}</span>
    </p>
  );
}
