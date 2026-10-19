"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/site";
import { cn } from "@/lib/cn";

/** Liens de navigation avec aria-current sur la page active */
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
