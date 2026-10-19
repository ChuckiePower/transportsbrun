import { Stripes } from "@/components/ui/Stripes";
import { cn } from "@/lib/cn";

/** Citation mise en exergue */
export function PullQuote({
  children,
  className,
  tone = "light",
}: {
  children: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <figure className={cn("relative", className)}>
      <Stripes tone={tone} className="mb-5 h-7" />
      <blockquote>
        <p
          className={cn(
            "font-display text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.05] font-bold uppercase",
            tone === "light" ? "text-navy" : "text-white",
          )}
        >
          «{" "}
          {children}
          {" "}»
        </p>
      </blockquote>
    </figure>
  );
}
