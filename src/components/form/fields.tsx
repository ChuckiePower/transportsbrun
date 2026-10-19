import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Champ : 52 px, rayon 14 px, fond crème au repos, blanc + anneau bleu au focus */
export const inputClass =
  "block w-full min-h-13 rounded-field border-[1.5px] border-transparent bg-cream-2 px-4 py-3 text-body text-ink transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-ink-soft/70 hover:border-line focus:border-brand focus:bg-surface focus:shadow-[0_0_0_3px_rgb(43_58_159/0.25)] focus:outline-none aria-[invalid=true]:border-error";

export const checkboxClass =
  "mt-0.5 size-6 shrink-0 cursor-pointer appearance-none rounded-[7px] border-[1.5px] border-line bg-surface bg-center bg-no-repeat transition-colors checked:border-brand checked:bg-brand checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12l5 5L20 7'/%3E%3C/svg%3E\")] checked:bg-[length:16px] aria-[invalid=true]:border-error";

export function Field({
  label,
  required,
  htmlFor,
  hint,
  hintId,
  error,
  errorId,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block font-display text-[0.875rem] font-semibold text-ink">
        {label}
        {required ? (
          <>
            {" "}
            <span aria-hidden="true" className="text-error">
              *
            </span>
          </>
        ) : (
          <span className="font-normal text-ink-soft"> (facultatif)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="-mt-1 mb-2 text-[0.875rem] text-ink-soft">
          {hint}
        </p>
      ) : null}
      {children}
      {error && errorId ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

export function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[0.9rem] font-medium text-error">
      <Icon name="alert" className="size-4 shrink-0" />
      {children}
    </p>
  );
}

/** Coche qui se trace (écran de succès) */
export function CheckDraw({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex size-14 items-center justify-center rounded-full bg-ok/10 text-ok", className)}>
      <svg viewBox="0 0 24 24" className="check-draw size-8" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}
