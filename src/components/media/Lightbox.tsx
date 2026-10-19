"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import type { GalleryItem } from "./Gallery";

/**
 * Visionneuse plein écran : clavier (← → Échap), balayage tactile, piège de focus,
 * compteur et légende annoncés.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  onCloseAutoFocus,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
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
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/95 data-[state=open]:animate-fade-in" />
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
      </Dialog.Portal>
    </Dialog.Root>
  );
}
