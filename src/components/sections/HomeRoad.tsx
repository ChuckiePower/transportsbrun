import { VehicleIcon } from "@/components/ui/Icon";
import { RoadLine } from "@/components/route/RoadLine";

/**
 * Le fil de l'accueil (grands écrans) : un marquage au sol continu dans la marge droite, du bas
 * du hero jusqu'au bandeau final, et un camion qui le parcourt au fil du défilement (sticky,
 * sans JavaScript) puis s'arrête à l'arrivée. La partie déjà parcourue se dessine au défilement
 * là où le navigateur le permet. Purement décoratif.
 */
export function HomeRoad() {
  return (
    <div
      aria-hidden="true"
      className="home-road pointer-events-none absolute top-[calc(100svh-6rem)] right-[max(1rem,calc((100vw-75rem)/4-0.75rem))] bottom-[22rem] z-[1] hidden w-6 min-[85rem]:block"
    >
      <RoadLine orientation="vertical" tone="line" className="absolute inset-y-0 left-[10px]" />
      <span className="home-road-drawn absolute inset-y-0 left-[10px] w-1 origin-top">
        <RoadLine orientation="vertical" tone="brand" className="opacity-40" />
      </span>
      <div className="home-road-truck sticky top-[55vh] -ml-[14px] flex size-13 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md">
        <VehicleIcon name="tracteur" className="size-9 rotate-90" />
      </div>
    </div>
  );
}
