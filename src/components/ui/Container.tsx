import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Props<T extends ElementType> = {
  as?: T;
  size?: "default" | "narrow" | "wide";
} & ComponentPropsWithoutRef<T>;

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-[77.5rem]",
  wide: "max-w-[90rem]",
};

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...rest
}: Props<T>) {
  const Tag = as ?? "div";
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...rest} />
  );
}
