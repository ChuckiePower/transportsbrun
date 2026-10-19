import { cn } from "@/lib/cn";

/** Citation mise en exergue : grande carte douce, guillemets bleus */
export function PullQuote({
  children,
  className,
  night = false,
}: {
  children: string;
  className?: string;
  night?: boolean;
}) {
  return (
    <figure
      data-reveal=""
      className={cn(
        "relative rounded-lg p-8 sm:p-10",
        night ? "bg-night-2" : "bg-brand-soft",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block font-display text-6xl leading-none font-extrabold",
          night ? "text-brand-light" : "text-brand",
        )}
      >
        «
      </span>
      <blockquote className="mt-2">
        <p
          className={cn(
            "font-display text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] leading-snug font-bold tracking-tight",
            night ? "text-white" : "text-ink",
          )}
        >
          {children}
        </p>
      </blockquote>
    </figure>
  );
}
