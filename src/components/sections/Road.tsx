"use client";

import { useEffect, useRef } from "react";
import { onScroll, prefersReducedMotion } from "@/lib/scroll-bus";

/**
 * « La route » (accueil, grands écrans) : un fil pointillé discret dans la marge droite
 * qui se dessine au fil du défilement, avec un petit camion qui avance dessus.
 * Purement décoratif (aria-hidden), une seule source de défilement partagée.
 */
export function Road() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const dots = useRef<SVGPathElement>(null);
  const mask = useRef<SVGPathElement>(null);
  const truck = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !window.matchMedia("(min-width: 85rem)").matches) return;
    let length = 0;
    let top = 0;
    let height = 0;
    const reduced = prefersReducedMotion();

    function build() {
      if (!el || !svg.current || !dots.current || !mask.current) return;
      height = el.offsetHeight;
      top = el.getBoundingClientRect().top + window.scrollY;
      const w = 48;
      const step = 520;
      let d = `M ${w / 2} 0`;
      for (let y = 0, i = 0; y < height; y += step, i++) {
        const x1 = i % 2 === 0 ? 6 : w - 6;
        d += ` C ${x1} ${y + step * 0.35}, ${w - x1} ${y + step * 0.65}, ${w / 2} ${Math.min(height, y + step)}`;
      }
      svg.current.setAttribute("viewBox", `0 0 ${w} ${height}`);
      svg.current.setAttribute("height", String(height));
      dots.current.setAttribute("d", d);
      mask.current.setAttribute("d", d);
      length = mask.current.getTotalLength();
      mask.current.style.strokeDasharray = `${length}`;
      update(window.scrollY);
    }

    function update(y: number) {
      if (!length || !mask.current || !truck.current) return;
      const vh = window.innerHeight;
      const progress = reduced ? 1 : Math.min(1, Math.max(0, (y + vh * 0.6 - top) / height));
      mask.current.style.strokeDashoffset = `${length * (1 - progress)}`;
      const p = mask.current.getPointAtLength(length * progress);
      truck.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      truck.current.style.opacity = reduced || progress <= 0 ? "0" : "1";
    }

    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    const off = onScroll(update);
    return () => {
      ro.disconnect();
      off();
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none absolute top-[92vh] right-[calc((100vw-75rem)/4-24px)] bottom-[28rem] z-0 hidden w-12 min-[85rem]:block"
    >
      <svg ref={svg} width="48" className="overflow-visible">
        <defs>
          <mask id="road-mask" maskUnits="userSpaceOnUse">
            <path ref={mask} fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
          </mask>
        </defs>
        <path
          ref={dots}
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.35"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="0 14"
          mask="url(#road-mask)"
        />
        <g ref={truck} style={{ opacity: 0, transition: "opacity .3s" }}>
          <circle r="16" fill="var(--color-surface)" stroke="var(--color-line)" />
          <g
            transform="translate(-9 -9) scale(0.75)"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}
