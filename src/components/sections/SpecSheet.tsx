import { craneSpecs } from "@/content/equipment";

/** Fiche technique du camion-grue (porteur / remorque) */
export function SpecSheet({ title }: { title: string }) {
  return (
    <div className="overflow-hidden rounded-md border-2 border-ink bg-white shadow-card">
      <div className="flex items-center justify-between gap-4 bg-ink px-5 py-3 text-white">
        <h3 className="font-display text-xl font-bold tracking-wide uppercase">{title}</h3>
        <span
          aria-hidden="true"
          className="font-display text-sm font-bold tracking-[0.2em] text-signal uppercase"
        >
          Fiche technique
        </span>
      </div>
      <div className="grid divide-y-2 divide-ink sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
        {craneSpecs.map((unit) => (
          <div key={unit.name} className="p-5">
            <h4 className="eyebrow text-navy">{unit.name}</h4>
            <dl className="mt-3 divide-y divide-line">
              {unit.rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-steel">{row.label}</dt>
                  <dd className="tabular font-display text-[2rem] leading-none font-bold">
                    {row.value}
                    <span className="ml-1 text-lg text-steel">{row.unit}</span>
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
