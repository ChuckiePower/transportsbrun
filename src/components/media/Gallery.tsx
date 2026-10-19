"use client";

import dynamic from "next/dynamic";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { blurBackground } from "@/lib/placeholder";
import { prefersReducedMotion } from "@/lib/scroll-bus";

export type GalleryItem = { id: string; image: StaticImageData; alt: string };

// La visionneuse (et Radix Dialog) n'est téléchargée qu'à la première ouverture
const loadLightbox = () => import("./Lightbox");
const Lightbox = dynamic(loadLightbox, { ssr: false });
const preloadLightbox = () => void loadLightbox();

export const LIGHTBOX_NAME = "photo-agrandie";

/** Attend l'apparition d'un élément (visionneuse montée) avant de capturer la transition */
function waitFor(selector: string, timeout = 600): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      if (document.querySelector(selector) || performance.now() - start > timeout) resolve();
      else requestAnimationFrame(tick);
    };
    tick();
  });
}

/**
 * Galerie en maçonnerie (vignettes arrondies, apparition en cascade) ou grille régulière
 * pour les petites séries, + visionneuse accessible.
 * `initial` : nombre de vignettes affichées avant « Voir les N photos » (avec JavaScript
 * seulement ; sans JavaScript, toutes les vignettes restent visibles). La visionneuse
 * parcourt toujours la série complète.
 */
export function Gallery({
  items,
  label,
  layout = "masonry",
  initial,
}: {
  items: GalleryItem[];
  label: string;
  layout?: "masonry" | "grid";
  initial?: number;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const collapsible = initial !== undefined && items.length > initial;
  const open = index !== null;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const lastIndex = useRef(0);
  useEffect(() => {
    if (index !== null) lastIndex.current = index;
  }, [index]);

  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  /** Ouverture : transition partagée (View Transitions API) si disponible, sinon fondu + zoom */
  function openAt(i: number) {
    const thumb = buttons.current[i]?.querySelector("img");
    if (!thumb || !("startViewTransition" in document) || prefersReducedMotion()) {
      setIndex(i);
      return;
    }
    thumb.style.viewTransitionName = LIGHTBOX_NAME;
    document.startViewTransition(async () => {
      thumb.style.viewTransitionName = "";
      flushSync(() => setIndex(i));
      await waitFor("[data-lightbox-img]");
    });
  }

  const isGrid = layout === "grid";
  return (
    <>
      <ul
        className={isGrid ? cn("grid grid-cols-2 gap-3 sm:gap-4", items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4") : "masonry"}
        aria-label={label}
        onPointerEnter={preloadLightbox}
        onFocus={preloadLightbox}
        onTouchStart={preloadLightbox}
      >
        {items.map((item, i) => (
          <li
            key={item.id}
            data-reveal=""
            style={{ ["--i" as string]: i % 4 }}
            className={collapsible && !expanded && i >= initial ? "js:hidden" : undefined}
          >
            <button
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              onClick={() => openAt(i)}
              className={cn(
                "group relative block w-full cursor-zoom-in overflow-hidden rounded-gallery bg-cream-2 shadow-sm transition-shadow duration-300 hover:shadow-md",
                isGrid && "aspect-[4/3]",
              )}
            >
              <Image
                src={item.image}
                alt={item.alt}
                {...(isGrid ? { fill: true } : {})}
                style={blurBackground(item.image)}
                sizes={
                  isGrid
                    ? items.length % 3 === 0
                      ? "(min-width: 1024px) 384px, 50vw"
                      : "(min-width: 1024px) 288px, 50vw"
                    : "(min-width: 1024px) 288px, (min-width: 640px) 33vw, 50vw"
                }
                className={cn(
                  "transition-transform duration-500 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none",
                  isGrid ? "object-cover" : "h-auto w-full",
                )}
              />
              <span
                aria-hidden="true"
                className="absolute right-2.5 bottom-2.5 inline-flex size-9 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Icon name="expand" className="size-4" />
              </span>
              <span className="sr-only">
                {" "}
                — agrandir la photo {i + 1} sur {items.length}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {collapsible && !expanded ? (
        <div className="mt-8 hidden justify-center js:flex">
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              // Focus sur la première vignette révélée
              requestAnimationFrame(() => buttons.current[initial]?.focus());
            }}
            className={buttonClasses("secondary")}
          >
            <Icon name="plus" className="size-[18px]" />
            Voir les {items.length} photos
          </button>
        </div>
      ) : null}

      {open ? (
        <Lightbox
          items={items}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          onCloseAutoFocus={(e) => {
            // Rend le focus à la vignette de la dernière photo affichée
            e.preventDefault();
            buttons.current[lastIndex.current]?.focus();
          }}
        />
      ) : null}
    </>
  );
}
