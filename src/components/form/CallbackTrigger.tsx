"use client";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export const CALLBACK_EVENT = "tb:rappel";

/**
 * Lien « Être rappelé » : ouvre le tiroir de rappel (JavaScript),
 * ou mène au mini-formulaire de rappel de la page Contact (#rappel) sans JavaScript.
 */
export function CallbackTrigger({
  className,
  variant = "link",
}: {
  className?: string;
  variant?: "link" | "bar";
}) {
  return (
    <a
      href="/contact#rappel"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent(CALLBACK_EVENT, { detail: { from: e.currentTarget } }),
        );
      }}
      onPointerEnter={() => void import("./CallbackDrawer")}
      className={cn(
        variant === "link" &&
          "inline-flex min-h-11 items-center gap-2 rounded-full font-display text-[0.95rem] font-semibold underline-offset-4 hover:underline",
        className,
      )}
    >
      <Icon name="phoneCall" className={variant === "bar" ? "size-4" : "size-[18px]"} />
      {variant === "bar" ? (
        <>
          <span>Rappel</span>
          <span className="sr-only"> : être rappelé par l&apos;équipe</span>
        </>
      ) : (
        <span>Être rappelé</span>
      )}
    </a>
  );
}
