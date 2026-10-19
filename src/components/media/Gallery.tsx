"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image, { type StaticImageData } from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { Icon } from "@/components/ui/Icon";

export type GalleryItem = { id: string; image: StaticImageData; alt: string };

/** Hauteurs de rangée de la grille justifiée (doivent suivre .gallery-justified dans globals.css) */
const ROW = { sm: 150, md: 190, lg: 230 };

/**
 * Galerie justifiée (ordre de lecture conservé, aucune déformation) + visionneuse accessible :
 * clavier (← → Échap), balayage tactile, piège de focus, légende et compteur annoncés.
 */
export function Gallery({ items, label }: { items: GalleryItem[]; label: string }) {
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
      <ul className="gallery-justified" aria-label={label}>
        {items.map((item, i) => {
          const ratio = item.image.width / item.image.height;
          return (
            <li key={item.id} style={{ ["--ratio" as string]: ratio.toFixed(4) }}>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-[var(--row-h)] w-full cursor-zoom-in overflow-hidden rounded-sm bg-sand"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  placeholder="blur"
                  sizes={`(min-width: 64rem) ${Math.round(ratio * ROW.lg * 1.35)}px, (min-width: 40rem) ${Math.round(ratio * ROW.md * 1.35)}px, ${Math.round(ratio * ROW.sm * 1.5)}px`}
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

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/95 data-[state=open]:animate-fade-in" />
          {open ? (
            <Lightbox
              items={items}
              index={index}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              onCloseAutoFocus={(e) => {
                // Rend le focus à la vignette de la dernière photo affichée
                e.preventDefault();
                buttons.current[lastIndex.current]?.focus();
              }}
            />
          ) : null}
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function Lightbox({
  items,
  index,
  onPrev,
  onNext,
  onCloseAutoFocus,
}: {
  items: GalleryItem[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onCloseAutoFocus: (e: Event) => void;
}) {
  const item = items[index]!;
  const start = useRef<{ x: number; y: number } | null>(null);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
    }
  }
  function onPointerDown(e: PointerEvent) {
    start.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e: PointerEvent) {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    }
  }

  const navBtn =
    "inline-flex size-12 items-center justify-center rounded-sm bg-white/10 text-white hover:bg-white/20 sm:size-14";

  return (
    <Dialog.Content
      aria-describedby="lightbox-legende"
      onKeyDown={onKeyDown}
      onCloseAutoFocus={onCloseAutoFocus}
      className="on-dark fixed inset-0 z-50 flex flex-col text-white outline-none data-[state=open]:animate-fade-in"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Dialog.Title
          className="tabular font-display text-lg font-bold tracking-wide uppercase"
          aria-live="polite"
        >
          Photo {index + 1} / {items.length}
        </Dialog.Title>
        <Dialog.Close className="inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-white/70 px-3.5 font-display font-bold tracking-wide uppercase hover:bg-white hover:text-ink">
          <Icon name="close" className="size-5" />
          <span>Fermer</span>
        </Dialog.Close>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
      >
        <Image
          key={item.id}
          src={item.image}
          alt={item.alt}
          fill
          sizes="100vw"
          quality={82}
          placeholder="blur"
          className="object-contain px-2 sm:px-20"
          draggable={false}
        />
        <button
          type="button"
          onClick={onPrev}
          className={`${navBtn} absolute top-1/2 left-2 -translate-y-1/2 sm:left-4`}
        >
          <Icon name="chevronLeft" className="size-7" />
          <span className="sr-only">Photo précédente</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className={`${navBtn} absolute top-1/2 right-2 -translate-y-1/2 sm:right-4`}
        >
          <Icon name="chevronRight" className="size-7" />
          <span className="sr-only">Photo suivante</span>
        </button>
      </div>

      <p
        id="lightbox-legende"
        aria-live="polite"
        className="mx-auto max-w-3xl px-4 py-4 text-center text-silver sm:pb-6"
      >
        {item.alt}
      </p>
    </Dialog.Content>
  );
}
