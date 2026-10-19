import { IconChip } from "@/components/ui/IconChip";
import { craneSpecs } from "@/content/equipment";

/** Fiche technique du camion-grue (porteur / remorque), en cartes arrondies */
export function SpecSheet({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-7">
      <div className="flex items-center gap-3">
        <IconChip name="crane" />
        <h3 className="text-h3 font-bold">{title}</h3>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {craneSpecs.map((unit) => (
          <div key={unit.name} className="rounded-md bg-cream-2 p-5">
            <h4 className="eyebrow">{unit.name}</h4>
            <dl className="mt-3 space-y-3">
              {unit.rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-soft">{row.label}</dt>
                  <dd className="tabular font-display text-[1.75rem] leading-none font-extrabold">
                    {row.value}
                    <span className="ml-1 text-base font-semibold text-ink-soft">{row.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
