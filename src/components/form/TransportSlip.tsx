import { useId } from "react";
import { RouteInline } from "@/components/route/Itinerary";
import { cn } from "@/lib/cn";

const UNSET = "À préciser";

function formatDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

/**
 * Récapitulatif façon « bon de transport » avant l'envoi : type, chargement → livraison,
 * date et nature de la charge, séparés par une ligne de découpe. Uniquement avec JavaScript
 * (sans JS, tout le formulaire est déjà sous les yeux sur une seule page).
 */
export function TransportSlip({
  requestType,
  pickup,
  delivery,
  date,
  cargo,
  onEdit,
  className,
}: {
  requestType?: string;
  pickup?: string;
  delivery?: string;
  date?: string;
  cargo?: string;
  onEdit: () => void;
  className?: string;
}) {
  const uid = useId();
  const value = (v?: string) => v?.trim() || UNSET;
  return (
    <section
      aria-labelledby={`${uid}-titre`}
      className={cn(
        "relative hidden overflow-hidden rounded-lg border border-line bg-cream js:block",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-4 sm:px-6">
        <div>
          <h4 id={`${uid}-titre`} className="eyebrow">
            Bon de transport
          </h4>
          <p className="mt-1 font-display text-[1.125rem] font-bold text-ink">
            {value(requestType)}
          </p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="-mr-2 inline-flex min-h-11 shrink-0 items-center rounded-full px-3 font-display text-[0.875rem] font-semibold text-brand underline-offset-4 hover:underline"
        >
          Modifier<span className="sr-only"> le transport</span>
        </button>
      </div>
      <RouteInline className="mt-3 px-5 sm:px-6" from={value(pickup)} to={value(delivery)} />

      {/* Ligne de découpe, avec les encoches du ticket */}
      <div aria-hidden="true" className="relative my-4 h-8">
        <span className="absolute top-0 -left-4 size-8 rounded-full border border-line bg-surface" />
        <span className="absolute inset-x-6 top-1/2 border-t-[1.5px] border-dashed border-[#c9bfab]" />
        <span className="absolute top-0 -right-4 size-8 rounded-full border border-line bg-surface" />
      </div>

      <dl className="grid gap-4 px-5 pb-5 sm:grid-cols-2 sm:px-6">
        <div>
          <dt className="eyebrow text-[0.6875rem]">Date souhaitée</dt>
          <dd className="mt-1 font-semibold text-ink">{date ? formatDate(date) : UNSET}</dd>
        </div>
        <div className="min-w-0">
          <dt className="eyebrow text-[0.6875rem]">Nature de la charge</dt>
          <dd className="mt-1 font-semibold break-words text-ink">{value(cargo)}</dd>
        </div>
      </dl>
    </section>
  );
}
