import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services, type Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Les trois métiers en cartes visuelles. La première carte est mise en avant
 * (plus grande) pour éviter trois blocs identiques.
 */
export function ServiceCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
      {services.map((s, i) => (
        <li key={s.id} className={cn(i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5")}>
          <Reveal delay={i * 0.08} className="h-full">
            <ServiceCard service={s} featured={i === 0} headingLevel={headingLevel} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function ServiceCard({
  service,
  featured,
  headingLevel: H,
}: {
  service: Service;
  featured: boolean;
  headingLevel: "h2" | "h3";
}) {
  return (
    <article
      className={cn(
        "group on-dark relative isolate flex h-full flex-col justify-end overflow-hidden rounded-md bg-ink text-white shadow-card",
        featured ? "min-h-[26rem] lg:min-h-full" : "min-h-[20rem]",
      )}
    >
      <Photo
        id={service.photo}
        fill
        decorative
        sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          featured
            ? "bg-[linear-gradient(180deg,rgb(19_20_23/0.05)_25%,rgb(19_20_23/0.7)_55%,rgb(19_20_23/0.95)_100%)]"
            : "bg-[linear-gradient(180deg,rgb(19_20_23/0.15)_0%,rgb(19_20_23/0.82)_42%,rgb(19_20_23/0.96)_100%)]",
        )}
      />
      <div className={cn("p-6 sm:p-8", featured && "lg:p-10")}>
        <H className={cn("font-bold uppercase", featured ? "text-h2" : "text-h3")}>
          {service.title}
        </H>
        <p className={cn("mt-3 max-w-xl text-white/85", !featured && "line-clamp-3")}>
          {service.summary}
        </p>
        <Link
          href={service.href}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-display text-[1.1rem] font-bold tracking-wide text-signal uppercase after:absolute after:inset-0 after:content-[''] hover:underline"
        >
          {service.linkLabel}
          <Icon
            name="arrowRight"
            className="size-5 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
