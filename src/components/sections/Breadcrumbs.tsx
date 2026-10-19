import Link from "next/link";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";

export type Crumb = { name: string; path: string };

/** Fil d'Ariane en pilule + BreadcrumbList JSON-LD */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Fil d'Ariane">
        <ol className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 rounded-full border border-line bg-surface px-4 py-2 text-[0.875rem] text-ink-soft shadow-sm">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="inline-flex items-center gap-1.5">
                {i > 0 ? <Icon name="chevronRight" className="size-3.5 text-ink-soft/70" /> : null}
                {last ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="rounded-sm hover:text-brand hover:underline">
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
