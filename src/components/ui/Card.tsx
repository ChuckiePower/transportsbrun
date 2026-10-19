import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("rounded-md border border-line bg-white shadow-card", className)}
      {...rest}
    />
  );
}
