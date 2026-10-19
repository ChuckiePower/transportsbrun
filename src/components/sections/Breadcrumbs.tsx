import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";

export type Crumb = { name: string; path: string };

/** Fil d'Ariane visible + BreadcrumbList JSON-LD */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Fil d'Ariane">
        <ol
          className={
            tone === "dark"
              ? "flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] text-white/80"
              : "flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] text-steel"
          }
        >
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="inline-flex items-center gap-2">
                {i > 0 ? <Icon name="chevronRight" className="size-3.5 opacity-70" /> : null}
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-white" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="underline-offset-4 hover:underline">
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
