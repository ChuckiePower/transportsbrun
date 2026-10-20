import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { Icon, VehicleIcon } from "@/components/ui/Icon";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Les trois métiers. Hiérarchie volontaire : le camion-grue en grande carte à gauche,
 * plateau et marchandises en cartes horizontales empilées à droite (grand écran).
 */
export function ServiceCards({ headingLevel: H = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
      {services.map((s, i) => {
        const featured = i === 0;
        return (
          <li
            key={s.id}
            data-reveal=""
            style={{ ["--i" as string]: i }}
            className={cn(featured ? "md:col-span-2 lg:col-span-7 lg:row-span-2" : "lg:col-span-5")}
          >
            <article
              className={cn(
                "group relative flex h-full flex-col rounded-lg border border-line bg-surface p-2 shadow-sm transition-[box-shadow,transform] duration-300 ease-out-soft focus-within:-translate-y-[3px] focus-within:shadow-md hover:-translate-y-[3px] hover:shadow-md motion-reduce:transform-none",
                !featured && "lg:flex-row",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-md bg-cream-2",
                  featured
                    ? "aspect-[16/10] lg:aspect-auto lg:min-h-[22rem] lg:flex-1"
                    : "aspect-[4/3] lg:aspect-auto lg:w-[44%] lg:shrink-0",
                )}
              >
                <Photo
                  id={s.photo}
                  fill
                  decorative
                  sizes={
                    featured
                      ? "(min-width: 1024px) 660px, 100vw"
                      : "(min-width: 1024px) 210px, (min-width: 768px) 50vw, 100vw"
                  }
                  className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none"
                  style={s.focal ? { objectPosition: s.focal } : undefined}
                />
              </div>
              <div
                className={cn(
                  "flex flex-col px-4 pt-5 pb-4 sm:px-5",
                  featured ? "lg:flex-none" : "flex-1 lg:pt-4",
                )}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-16 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform duration-300 ease-out-soft group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  <VehicleIcon name={s.vehicle} className="size-10" />
                </span>
                <H className="mt-4 text-h3 font-bold">{s.title}</H>
                <p className="mt-2 flex-1 text-ink-soft">{s.teaser}</p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-full font-display text-[0.95rem] font-semibold text-brand after:absolute after:inset-0 after:rounded-lg after:content-['']"
                >
                  {s.linkLabel}
                  <Icon
                    name="arrowRight"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]"
                  />
                </Link>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
