import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { RoadLine } from "./RoadLine";

export type Stop = { label: string; title: ReactNode; text?: ReactNode };

/** Repère d'un arrêt : départ (cercle plein), étape (anneau), arrivée (repère) */
export function StopMarker({
  kind,
  dark = false,
  className,
}: {
  kind: "start" | "step" | "end";
  dark?: boolean;
  className?: string;
}) {
  if (kind === "end") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "route-stop inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sun text-ink shadow-sun",
          className,
        )}
      >
        <Icon name="pin" className="size-5" strokeWidth={2} />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "route-stop inline-flex size-10 shrink-0 items-center justify-center rounded-full",
        kind === "start"
          ? dark
            ? "bg-marking"
            : "bg-ink"
          : dark
            ? "border-[1.5px] border-marking bg-asphalt"
            : "border-[1.5px] border-ink bg-surface",
        className,
      )}
    >
      <span
        className={cn(
          "size-3 rounded-full",
          kind === "start" ? (dark ? "bg-asphalt" : "bg-cream") : dark ? "bg-marking" : "bg-ink",
        )}
      />
    </span>
  );
}

/**
 * Itinéraire A → B : départ, étapes, arrivée, reliés par une route en pointillés.
 * Vertical sur mobile, horizontal à partir de la tablette. Motif unique dès qu'on parle de trajet.
 */
export function Itinerary({
  stops,
  dark = false,
  className,
}: {
  stops: Stop[];
  dark?: boolean;
  className?: string;
}) {
  const n = stops.length;
  return (
    <ol
      data-itinerary=""
      className={cn(
        "grid gap-0 md:gap-6",
        n === 2 ? "md:grid-cols-2" : n === 3 ? "md:grid-cols-3" : "md:grid-cols-4",
        className,
      )}
    >
      {stops.map((stop, i) => {
        const kind = i === 0 ? "start" : i === n - 1 ? "end" : "step";
        const last = i === n - 1;
        return (
          <li
            key={i}
            className={cn("relative pl-14 md:pt-16 md:pl-0", !last && "pb-10 md:pb-0")}
            style={{ ["--i" as string]: i }}
          >
            <StopMarker kind={kind} dark={dark} className="absolute top-0 left-0" />
            {!last ? (
              <>
                <RoadLine
                  orientation="vertical"
                  tone={dark ? "marking-soft" : "line"}
                  className="route-seg absolute top-12 bottom-2 left-[18px] h-auto md:hidden"
                />
                <RoadLine
                  tone={dark ? "marking-soft" : "line"}
                  className="route-seg absolute top-[18px] right-0 left-14 hidden w-auto md:block"
                />
              </>
            ) : null}
            <p className={cn("eyebrow", dark && "text-sun")}>{stop.label}</p>
            <h3 className={cn("mt-2 text-h3 font-bold", dark && "text-white")}>{stop.title}</h3>
            {stop.text ? (
              <p className={cn("mt-2 max-w-sm", dark ? "text-marking/80" : "text-ink-soft")}>
                {stop.text}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Itinéraire compact (formulaire, encarts) : A ——— B sur une ligne à partir de 640 px,
 * A puis B l'un sous l'autre sur mobile pour ne jamais couper un nom de lieu.
 */
export function RouteInline({
  from,
  to,
  fromLabel = "Chargement",
  toLabel = "Livraison",
  dark = false,
  className,
}: {
  from: ReactNode;
  to: ReactNode;
  fromLabel?: string;
  toLabel?: string;
  dark?: boolean;
  className?: string;
}) {
  const label = cn("eyebrow text-[0.6875rem]", dark && "text-sun");
  const place = cn(
    "line-clamp-2 font-display leading-snug font-semibold [overflow-wrap:anywhere]",
    dark ? "text-white" : "text-ink",
  );
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 sm:flex sm:gap-3",
        className,
      )}
    >
      <StopMarker kind="start" dark={dark} className="size-8" />
      <div className="min-w-0 sm:max-w-[40%]">
        <p className={label}>{fromLabel}</p>
        <p className={place}>{from}</p>
      </div>
      <RoadLine
        orientation="vertical"
        tone={dark ? "marking-soft" : "line"}
        className="col-start-1 row-start-2 my-1.5 h-5 justify-self-center sm:hidden"
      />
      <RoadLine tone={dark ? "marking-soft" : "line"} className="hidden min-w-10 flex-1 sm:block" />
      <div className="col-start-2 row-start-3 min-w-0 sm:max-w-[40%] sm:text-right">
        <p className={label}>{toLabel}</p>
        <p className={place}>{to}</p>
      </div>
      <StopMarker kind="end" dark={dark} className="col-start-1 row-start-3 size-8" />
    </div>
  );
}
