"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Navigation principale (ordinateur) : la pastille de page active glisse d'un lien à l'autre.
 * Sans JavaScript, le lien actif garde simplement son fond.
 */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const list = useRef<HTMLUListElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const ul = list.current;
    const p = pill.current;
    if (!ul || !p) return;
    const place = () => {
      const a = ul.querySelector<HTMLElement>('[aria-current="page"]');
      if (!a) {
        p.style.opacity = "0";
        return;
      }
      // Position mesurée sur le <li> (positionné) par rapport à la liste
      const li = a.closest("li") ?? a;
      p.style.opacity = "1";
      p.style.width = `${a.offsetWidth}px`;
      p.style.transform = `translateX(${li.offsetLeft + a.offsetLeft}px)`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(ul);
    const id = requestAnimationFrame(() => setEnhanced(true));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  return (
    <ul ref={list} className="relative flex items-center">
      <span
        ref={pill}
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-0 rounded-full bg-brand-soft opacity-0",
          enhanced && "transition-[transform,width,opacity] duration-300 ease-out-soft",
        )}
      />
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex min-h-11 items-center rounded-full px-3 font-display text-[0.9rem] font-semibold whitespace-nowrap text-ink transition-colors hover:text-brand 2xl:px-4 2xl:text-ui",
                active && "text-brand",
                active && !enhanced && "bg-brand-soft",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Liens simples avec aria-current (menu mobile, pied de page) */
export function NavLinks({
  items,
  className,
  linkClassName,
  activeClassName,
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(linkClassName, active && activeClassName)}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
