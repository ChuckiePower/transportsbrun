"use client";

import dynamic from "next/dynamic";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { blurBackground } from "@/lib/placeholder";

export type GalleryItem = { id: string; image: StaticImageData; alt: string };

// La visionneuse (et Radix Dialog) n'est téléchargée qu'à la première ouverture
const loadLightbox = () => import("./Lightbox");
const Lightbox = dynamic(loadLightbox, { ssr: false });
const preloadLightbox = () => void loadLightbox();

/** Hauteurs de rangée de la grille justifiée (doivent suivre .gallery-justified dans globals.css) */
const ROW = { sm: 150, md: 190, lg: 230 };

/**
 * Galerie justifiée (ordre de lecture conservé, aucune déformation) + visionneuse accessible :
 * clavier (← → Échap), balayage tactile, piège de focus, légende et compteur annoncés.
 */
export function Gallery({
  items,
  label,
  layout = "justified",
}: {
  items: GalleryItem[];
  label: string;
  /** justified : rangées à hauteur fixe ; grid : vignettes égales (petites séries) */
  layout?: "justified" | "grid";
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const lastIndex = useRef(0);
  useEffect(() => {
    if (index !== null) lastIndex.current = index;
  }, [index]);

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  return (
    <>
      <ul
        className={
          layout === "justified"
            ? "gallery-justified"
            : cn(
                "grid grid-cols-2 gap-2 sm:gap-3",
                items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4",
              )
        }
        aria-label={label}
        // précharge la visionneuse dès que le visiteur approche d'une vignette
        onPointerEnter={preloadLightbox}
        onFocus={preloadLightbox}
        onTouchStart={preloadLightbox}
      >
        {items.map((item, i) => {
          const ratio = item.image.width / item.image.height;
          const sizes =
            layout === "justified"
              ? `(min-width: 64rem) ${Math.round(ratio * ROW.lg * 1.35)}px, (min-width: 40rem) ${Math.round(ratio * ROW.md * 1.35)}px, ${Math.round(ratio * ROW.sm * 1.5)}px`
              : items.length % 3 === 0
                ? "(min-width: 64rem) 30vw, 50vw"
                : "(min-width: 64rem) 23vw, 50vw";
          return (
            <li
              key={item.id}
              style={
                layout === "justified" ? { ["--ratio" as string]: ratio.toFixed(4) } : undefined
              }
            >
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "group relative block w-full cursor-zoom-in overflow-hidden rounded-sm bg-sand",
                  layout === "justified" ? "h-[var(--row-h)]" : "aspect-[4/3]",
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  style={blurBackground(item.image)}
                  sizes={sizes}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-2 bottom-2 inline-flex size-9 items-center justify-center rounded-sm bg-ink/75 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Icon name="expand" className="size-4" />
                </span>
                <span className="sr-only">
                  {" "}
                  — agrandir la photo {i + 1} sur {items.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

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
