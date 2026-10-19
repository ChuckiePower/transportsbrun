import type { ReactNode } from "react";
import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { PhotoId } from "@/content/gallery";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * En-tête des pages intérieures : fil d'Ariane, eyebrow, H1, chapô, actions,
 * puis grande bannière photo arrondie (16/6 sur ordinateur, 4/3 sur mobile).
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  photo,
  crumbs,
  children,
  focal = "50% 50%",
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  photo?: PhotoId;
  crumbs: Crumb[];
  children?: ReactNode;
  /** Point focal de la photo (object-position), choisi pour garder camion et charge visibles */
  focal?: string;
  /** Contenu affiché à droite du titre sur grand écran (ex. points clés) */
  aside?: ReactNode;
}) {
  return (
    <section className="pt-8 pb-14 lg:pt-12 lg:pb-20">
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            <Eyebrow className="hero-in mb-4" >
              {eyebrow}
            </Eyebrow>
            <h1 className="hero-in text-h1 font-extrabold" style={{ ["--i" as string]: 1 }}>
              {title}
            </h1>
            {lead ? (
              <p className="hero-in mt-6 max-w-[40rem] text-lead text-ink" style={{ ["--i" as string]: 2 }}>
                {lead}
              </p>
            ) : null}
            {children ? (
              <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ ["--i" as string]: 3 }}>
                {children}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div className="hero-in lg:col-span-5" style={{ ["--i" as string]: 3 }}>
              {aside}
            </div>
          ) : null}
        </div>
        {photo ? (
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl bg-cream-2 shadow-md sm:aspect-[16/8] lg:mt-14 lg:aspect-[16/6]">
            <div data-parallax="" className="absolute inset-0">
              <Photo
                id={photo}
                fill
                preload
                decoding="sync"
                fetchPriority="high"
                quality={70}
                sizes="(min-width: 1200px) 1152px, 100vw"
                className="hero-zoom object-cover"
                style={{ objectPosition: focal }}
              />
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
