import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  tone = "light",
  align = "left",
  className,
  id,
}: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={cn("mb-4", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag id={id} className="text-h2 font-bold uppercase">
        {title}
      </Tag>
      {lead ? (
        <p className={cn("mt-5 text-lead", tone === "light" ? "text-steel" : "text-silver")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
