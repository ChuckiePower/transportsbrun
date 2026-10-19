import { Icon } from "@/components/ui/Icon";

/** Bloc « points clés » des pages de service : liste scannable dans une carte */
export function KeyPoints({ points, title = "Points clés" }: { points: string[]; title?: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-7">
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-ink">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
            >
              <Icon name="check" className="size-3.5" strokeWidth={2.5} />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
