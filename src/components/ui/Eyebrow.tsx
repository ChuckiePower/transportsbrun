import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Petit label au-dessus d'un titre (Overpass, seul texte en capitales avec le panneau convoi).
 * Les séparateurs « · » sont rendus à part pour un espacement régulier en capitales espacées.
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{withSeparators(children)}</p>;
}

export function withSeparators(children: ReactNode): ReactNode {
  if (typeof children !== "string" || !children.includes("·")) return children;
  const parts = children.split(/\s*·\s*/);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 ? (
        <span aria-hidden="true" className="mx-[0.55em] opacity-70">
          ·
        </span>
      ) : null}
      {i > 0 ? <span className="sr-only">, </span> : null}
      {part}
    </Fragment>
  ));
}
