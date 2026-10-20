import { VehicleIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { StopMarker } from "./Itinerary";
import { RoadLine } from "./RoadLine";

/**
 * Le camion qui démarre vers l'arrivée (écrans « Demande bien reçue »). Décoratif.
 * Position finale posée en CSS : sans animation (ou mouvement réduit), il est déjà en route.
 */
export function TruckGo({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative h-14 overflow-hidden", className)}>
      <RoadLine className="absolute inset-x-0 bottom-3" />
      <span className="truck-go absolute inset-x-0 bottom-[7px] flex">
        <VehicleIcon name="tracteur" className="size-12 text-brand" />
      </span>
      <StopMarker kind="end" className="absolute right-0 -bottom-0.5 size-8" />
    </div>
  );
}
