import { cn } from "@/lib/cn";

const sizes = {
  sm: "px-1.5 py-0.5 text-[0.5rem] border-[1.5px] gap-0",
  md: "px-3 py-1.5 text-[0.75rem] border-2 gap-0.5",
  lg: "px-5 py-3 text-[1.05rem] border-2 gap-1",
} as const;

/**
 * Panneau « Convoi exceptionnel » : rectangle jaune, bord noir, texte noir en capitales,
 * petit rayon comme le vrai panneau. Le texte est lisible (pas décoratif) : il porte l'information.
 */
export function ConvoiPanel({
  size = "md",
  category = true,
  className,
}: {
  size?: keyof typeof sizes;
  /** Affiche la seconde ligne « cat. 1 et 2 » */
  category?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 flex-col items-center justify-center rounded-[4px] border-[#111] bg-sun text-center font-sign leading-[1.05] font-extrabold tracking-[0.04em] text-[#111] uppercase shadow-sm",
        sizes[size],
        className,
      )}
    >
      <span>Convoi exceptionnel</span>
      {category ? <span className="font-bold">Cat. 1 et 2</span> : null}
    </span>
  );
}
