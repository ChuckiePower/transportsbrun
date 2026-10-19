import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Petit label au-dessus d'un titre (seul texte en capitales du site) */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
