import { cn } from "@/lib/cn";

const tones = {
  line: "bg-[#d8cfbd]",
  marking: "bg-marking",
  "marking-soft": "bg-marking/35",
  sun: "bg-sun",
  brand: "bg-brand",
} as const;

/**
 * Marquage au sol (signature du site) : tirets arrondis comme une ligne médiane.
 * Séparateur de sections, fil de la page d'accueil, tronçons entre sections sur mobile,
 * barre de progression du formulaire. Toujours décoratif.
 */
export function RoadLine({
  orientation = "horizontal",
  tone = "line",
  className,
  draw = false,
}: {
  orientation?: "horizontal" | "vertical";
  tone?: keyof typeof tones;
  className?: string;
  /** Se dessine à l'entrée dans l'écran (voir animations) */
  draw?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      data-road-draw={draw ? "" : undefined}
      className={cn(
        "block",
        orientation === "horizontal"
          ? "road-x h-1 w-full origin-left"
          : "road-y h-full w-1 origin-top",
        tones[tone],
        className,
      )}
    />
  );
}

/** Court tronçon de route entre deux sections (mobile et tablette) */
export function RoadSegment({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex justify-center lg:hidden", className)}>
      <RoadLine orientation="vertical" className="h-14" />
    </div>
  );
}
