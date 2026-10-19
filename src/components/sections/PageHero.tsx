import type { ReactNode } from "react";
import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stripes } from "@/components/ui/Stripes";
import type { PhotoId } from "@/content/gallery";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** En-tête des pages intérieures : grande photo réelle, voile sombre, H1 */
export function PageHero({
  eyebrow,
  title,
  lead,
  photo,
  crumbs,
  children,
  objectPosition = "center",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Sans photo : en-tête compact sur fond graphite (contact, pages légales) */
  photo?: PhotoId;
  crumbs: Crumb[];
  children?: ReactNode;
  objectPosition?: string;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      {photo ? (
        <>
          <Photo
            id={photo}
            fill
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            quality={70}
            sizes="100vw"
            className="-z-20 object-cover"
            style={{ objectPosition }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(19_20_23/0.92)_0%,rgb(19_20_23/0.78)_45%,rgb(19_20_23/0.35)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
          />
        </>
      ) : (
        <Stripes
          tone="dark"
          className="absolute -right-10 -bottom-6 -z-10 h-64 opacity-[0.07] sm:h-80"
        />
      )}
      <Container
        className={
          photo
            ? "flex min-h-[26rem] flex-col justify-end gap-6 pt-10 pb-12 sm:min-h-[30rem] sm:pb-16 lg:min-h-[34rem] lg:pb-20"
            : "flex flex-col gap-6 pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pb-16"
        }
      >
        <Breadcrumbs items={crumbs} />
        <div className="max-w-3xl">
          <Eyebrow tone="dark" className="mb-4">
            {eyebrow}
          </Eyebrow>
          <h1 className="text-h1 font-bold uppercase">{title}</h1>
          {lead ? <p className="mt-5 max-w-2xl text-lead text-white/90">{lead}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </Container>
      <div className="rule-stripes" aria-hidden="true" />
    </section>
  );
}
