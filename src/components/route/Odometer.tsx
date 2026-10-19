import { cn } from "@/lib/cn";

/**
 * Compteur kilométrique : chiffres sur des rouleaux, dans des cases arrondies (Overpass).
 * Une seule valeur lue par les lecteurs d'écran (aria-label du conteneur) ; sans JavaScript
 * ou en mouvement réduit, la valeur finale est affichée directement.
 */
export function Odometer({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className?: string;
}) {
  const digits = String(value).split("");
  return (
    <span
      role="img"
      aria-label={label}
      data-odometer=""
      className={cn(
        "tabular inline-flex gap-[0.08em] font-sign leading-none font-extrabold",
        className,
      )}
    >
      {digits.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-block h-[1.15em] w-[0.78em] overflow-hidden rounded-[0.16em] bg-asphalt-2 text-marking"
        >
          <span
            className="odo-reel absolute inset-x-0 top-0 flex flex-col"
            style={{ ["--d" as string]: d, ["--i" as string]: i }}
          >
            {"0123456789".split("").map((n) => (
              <span key={n} className="flex h-[1.15em] items-center justify-center">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
