"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { LIGHTBOX_NAME, type GalleryItem } from "./Gallery";

/**
 * Visionneuse plein écran : fond nuit, photo arrondie, boutons ronds en verre dépoli,
 * compteur en pilule. Clavier (← → Échap), glissement tactile qui suit le doigt,
 * piège de focus, légende et compteur annoncés.
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
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  const prev = () => {
    setDir(-1);
    onPrev();
  };
  const next = () => {
    setDir(1);
    onNext();
  };

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }
  function onPointerDown(e: PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    setDragging(true);
  }
  function onPointerMove(e: PointerEvent) {
    if (!start.current) return;
    const ddx = e.clientX - start.current.x;
    if (Math.abs(ddx) > Math.abs(e.clientY - start.current.y)) setDx(ddx);
  }
  function onPointerUp(e: PointerEvent) {
    if (!start.current) return;
    const ddx = e.clientX - start.current.x;
    const velocity = Math.abs(ddx) / Math.max(1, performance.now() - start.current.t);
    start.current = null;
    setDragging(false);
    setDx(0);
    // Glissement franc ou rapide (inertie) : photo suivante / précédente
    if (Math.abs(ddx) > 60 || (Math.abs(ddx) > 20 && velocity > 0.5)) {
      if (ddx < 0) next();
      else prev();
    }
  }

  const navBtn =
    "inline-flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:size-14";

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-night/92 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          aria-describedby="lightbox-legende"
          onKeyDown={onKeyDown}
          onCloseAutoFocus={onCloseAutoFocus}
          className="on-night fixed inset-0 z-50 flex flex-col text-white outline-none"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Dialog.Title className="rounded-full bg-white/10 px-4 py-2 font-display text-[0.875rem] font-semibold tabular backdrop-blur-md" aria-live="polite">
              Photo {index + 1} / {items.length}
            </Dialog.Title>
            <Dialog.Close className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 font-display text-[0.9rem] font-semibold backdrop-blur-md hover:bg-white/20">
              <Icon name="close" className="size-[18px]" />
              <span>Fermer</span>
            </Dialog.Close>
          </div>

          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-3 select-none sm:px-24"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              start.current = null;
              setDragging(false);
              setDx(0);
            }}
          >
            <div
              key={item.id}
              className={dir === 1 ? "step-enter flex size-full items-center justify-center" : "step-enter-back flex size-full items-center justify-center"}
            >
              <div
                className="flex size-full items-center justify-center"
                style={{
                  transform: dx ? `translateX(${dx}px)` : undefined,
                  transition: dragging ? "none" : "transform 0.3s cubic-bezier(.22,1,.36,1)",
                }}
              >
              <Image
                data-lightbox-img=""
                src={item.image}
                alt={item.alt}
                sizes="100vw"
                quality={82}
                draggable={false}
                className="h-auto max-h-full w-auto max-w-full rounded-gallery object-contain shadow-lg"
                style={{ viewTransitionName: LIGHTBOX_NAME, maxHeight: "calc(100dvh - 11rem)" }}
              />
              </div>
            </div>
            <button type="button" onClick={prev} className={`${navBtn} absolute top-1/2 left-3 -translate-y-1/2 sm:left-6`}>
              <Icon name="chevronLeft" className="size-6" />
              <span className="sr-only">Photo précédente</span>
            </button>
            <button type="button" onClick={next} className={`${navBtn} absolute top-1/2 right-3 -translate-y-1/2 sm:right-6`}>
              <Icon name="chevronRight" className="size-6" />
              <span className="sr-only">Photo suivante</span>
            </button>
          </div>

          <p id="lightbox-legende" aria-live="polite" className="mx-auto max-w-3xl px-4 pt-4 pb-6 text-center text-[0.95rem] text-night-muted">
            {item.alt}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
