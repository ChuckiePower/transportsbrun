import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/** Pastille d'icône : cercle 44 px, fond bleu doux, icône 22 px */
export function IconChip({
  name,
  className,
  tone = "light",
  size = "md",
}: {
  name: IconName;
  className?: string;
  tone?: "light" | "night";
  size?: "md" | "lg";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "icon-chip inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out-soft",
        size === "md" ? "size-11 text-[22px]" : "size-14 text-[26px]",
        tone === "light" ? "bg-brand-soft text-brand" : "bg-white/10 text-brand-light",
        className,
      )}
    >
      <Icon name={name} />
    </span>
  );
}
