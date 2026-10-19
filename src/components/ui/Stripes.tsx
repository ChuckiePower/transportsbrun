import { cn } from "@/lib/cn";

/**
 * Les trois bandes obliques du logo (bleu marine, graphite, argent).
 * Purement décoratif : masqué aux technologies d'assistance.
 */
export function Stripes({
  className,
  tone = "light",
}: {
  className?: string;
  /** light : sur fond clair ; dark : sur fond sombre (bleu éclairci) */
  tone?: "light" | "dark";
}) {
  const colors =
    tone === "light" ? ["#00007e", "#323232", "#bcbcbc"] : ["#6c6cf0", "#8c9099", "#e2e2e2"];
  return (
    <svg
      viewBox="0 0 54 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-auto shrink-0", className)}
    >
      {colors.map((c, i) => (
        <polygon
          key={c}
          points={`${10 + i * 16},0 ${22 + i * 16},0 ${12 + i * 16},24 ${0 + i * 16},24`}
          fill={c}
        />
      ))}
    </svg>
  );
}
