import { VehicleIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { RoadLine } from "./RoadLine";

/**
 * Écrans « Demande bien reçue » : la coche se trace à l'arrivée, puis le camion démarre.
 * Décoratif. La position finale est posée en CSS : sans animation (ou en mouvement réduit),
 * le camion est déjà en route.
 */
export function TruckGo({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative h-14", className)}>
      <div className="absolute inset-y-0 right-12 left-0 overflow-hidden">
        <RoadLine className="absolute inset-x-0 bottom-3" />
        <span className="truck-go absolute inset-x-0 bottom-[7px] flex">
          <VehicleIcon name="tracteur" className="size-12 text-brand" />
        </span>
      </div>
      <span className="absolute right-0 -bottom-1.5 inline-flex size-10 items-center justify-center rounded-full bg-ok/10 text-ok">
        <svg
          viewBox="0 0 24 24"
          className="check-draw size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
    </div>
  );
}
