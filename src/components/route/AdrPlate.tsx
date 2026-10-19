import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-[18px] w-6 border-[1.5px]",
  md: "h-9 w-12 border-2",
  lg: "h-15 w-20 border-[3px]",
} as const;

/**
 * Plaque orange vierge à bord noir (transport de marchandises dangereuses en colis),
 * proportions 4:3 et petit rayon comme la vraie plaque. Purement décorative.
 */
export function AdrPlate({
  size = "md",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block shrink-0 rounded-[4px] border-[#111] bg-adr shadow-sm",
        sizes[size],
        className,
      )}
    />
  );
}
