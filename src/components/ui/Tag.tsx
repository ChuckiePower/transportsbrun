import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/** Étiquette en pilule (bleu doux) : Convoi exceptionnel, ADR, Membre France Plateau… */
export function Tag({
  children,
  icon,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  icon?: IconName;
  tone?: "brand" | "neutral" | "asphalt";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[0.8125rem] leading-none font-semibold",
        tone === "brand" && "bg-brand-soft text-brand",
        tone === "neutral" && "border border-line bg-surface text-ink",
        tone === "asphalt" && "bg-white/10 text-white",
        className,
      )}
    >
      {icon ? <Icon name={icon} className="size-[15px]" /> : null}
      {children}
    </span>
  );
}
