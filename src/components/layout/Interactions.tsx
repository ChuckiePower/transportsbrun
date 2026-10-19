"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { onScroll, prefersReducedMotion } from "@/lib/scroll-bus";
import { track } from "@/lib/track";
import { watch } from "@/lib/visibility";

/**
 * Moteur d'interactions du site, monté une seule fois :
 * - révélations au défilement ([data-reveal], [data-reveal-photo], [data-steps]) ;
 * - compteur animé ([data-count]) ;
 * - barre d'appel mobile affichée une fois les boutons du hero ([data-hero-cta]) sortis de l'écran ;
 * - état de défilement (en-tête compact, pastille « Demander un devis » flottante) via le bus de défilement ;
 * Tous les éléments observés passent par le même IntersectionObserver (src/lib/visibility.ts).
 * - effet magnétique des boutons principaux (souris uniquement) ;
 * - masquage de la barre d'appel mobile quand le clavier est ouvert ;
 * - événements de mesure facultatifs (appel, devis).
 * Sans JavaScript, tout le contenu reste visible (les états cachés dépendent de la classe .js).
 */
export function Interactions() {
  const pathname = usePathname();

  // Révélations et compteurs : relancés à chaque page
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-in), [data-reveal-photo]:not(.is-in), [data-steps]:not(.is-in), [data-count]:not(.is-in)",
    );
    const offs: (() => void)[] = [];
    els.forEach((el) => {
      const off = watch(el, (entry) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        if (el.dataset.count !== undefined) countUp(el);
        off();
      });
      offs.push(off);
    });
    return () => offs.forEach((off) => off());
  }, [pathname]);

  // Barre d'appel mobile : seulement une fois les boutons du hero sortis de l'écran
  useEffect(() => {
    const root = document.documentElement;
    const cta = document.querySelector("[data-hero-cta]");
    if (!cta) {
      root.setAttribute("data-past-hero", "");
      return;
    }
    root.removeAttribute("data-past-hero");
    return watch(cta, (entry) => {
      root.toggleAttribute(
        "data-past-hero",
        !entry.isIntersecting && entry.boundingClientRect.bottom < 0,
      );
    });
  }, [pathname]);

  // En-tête compact et pastille de devis flottante
  useEffect(() => {
    const root = document.documentElement;
    const footer = document.querySelector("footer");
    let footerVisible = false;
    const unwatchFooter = footer
      ? watch(footer, (entry) => {
          footerVisible = entry.isIntersecting;
          update(window.scrollY);
        })
      : () => {};
    const onContact = pathname === "/contact";
    function update(y: number) {
      root.toggleAttribute("data-scrolled", y > 24);
      root.toggleAttribute("data-float-cta", !onContact && y > 600 && !footerVisible);
    }
    const off = onScroll(update);
    return () => {
      off();
      unwatchFooter();
    };
  }, [pathname]);

  // Interactions globales (une seule fois)
  useEffect(() => {
    const root = document.documentElement;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Bouton magnétique (≤ 6 px), souris uniquement
    let magnet: HTMLElement | null = null;
    function onMove(e: PointerEvent) {
      if (!fine || prefersReducedMotion()) return;
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet && magnet !== target) {
        magnet.style.translate = "";
        magnet = null;
      }
      if (!target) return;
      magnet = target;
      const r = target.getBoundingClientRect();
      const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 6;
      const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 4;
      target.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    }

    // Clavier mobile ouvert : on masque la barre d'appel flottante
    function onFocusIn(e: FocusEvent) {
      const t = e.target as HTMLElement | null;
      if (t?.matches("input:not([type=checkbox]):not([type=radio]), textarea, select"))
        root.setAttribute("data-typing", "");
    }
    function onFocusOut() {
      root.removeAttribute("data-typing");
    }

    // Mesure facultative (aucun envoi si aucun outil n'est activé)
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_call");
      else if (href.startsWith("/contact")) track("click_quote");
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

/** Compteur 0 → valeur finale ; la valeur finale est déjà dans le HTML (sans JS) */
function countUp(el: HTMLElement) {
  const end = Number(el.dataset.count);
  if (!Number.isFinite(end) || prefersReducedMotion()) return;
  const start = performance.now();
  const duration = 1400;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(end * eased));
    if (t < 1) requestAnimationFrame(step);
  };
  el.textContent = "0";
  requestAnimationFrame(step);
}
