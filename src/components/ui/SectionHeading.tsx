import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  id?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  align = "left",
  className,
  id,
  dark,
}: Props) {
  return (
    <div
      data-reveal=""
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={cn("text-h2 font-extrabold", dark && "text-white")}>
        {title}
      </Tag>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-lead",
            dark ? "text-marking/80" : "text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
