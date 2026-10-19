import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "signal" | "navy" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-sm font-display font-bold uppercase tracking-wide transition-[background-color,color,border-color,box-shadow,transform] duration-150 select-none disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  // CTA principal : jaune signalisation, texte graphite
  signal:
    "bg-signal text-ink shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)] hover:bg-signal-600 border border-signal-600/60",
  navy: "bg-navy text-white hover:bg-navy-700 shadow-[inset_0_-3px_0_rgb(0_0_0/0.25)]",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  "outline-light": "border-2 border-white/80 text-white hover:bg-white hover:text-ink",
  ghost: "text-navy underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[1.05rem]",
  lg: "min-h-13 px-7 text-[1.2rem]",
};

type Common = {
  variant?: ButtonVariant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  children: ReactNode;
  className?: string;
};

function Inner({
  icon,
  iconPosition = "end",
  children,
}: Pick<Common, "icon" | "iconPosition" | "children">) {
  const ic = icon ? (
    <Icon
      name={icon}
      className={cn(
        "size-[1.1em] shrink-0",
        icon === "arrowRight" && "transition-transform group-hover:translate-x-0.5",
      )}
    />
  ) : null;
  return (
    <>
      {iconPosition === "start" ? ic : null}
      <span>{children}</span>
      {iconPosition === "end" ? ic : null}
    </>
  );
}

export function buttonClasses(
  variant: ButtonVariant = "signal",
  size: Size = "md",
  className?: string,
) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

/** Lien stylé en bouton : interne (next/link) ou externe/tel/mailto (<a>) */
export function ButtonLink({
  href,
  variant,
  size,
  icon,
  iconPosition,
  children,
  className,
  ...rest
}: Common & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">) {
  const cls = buttonClasses(variant, size, className);
  const inner = (
    <Inner icon={icon} iconPosition={iconPosition}>
      {children}
    </Inner>
  );
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

export function Button({
  variant,
  size,
  icon,
  iconPosition,
  children,
  className,
  type = "button",
  ...rest
}: Common & Omit<ComponentPropsWithoutRef<"button">, "children">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      <Inner icon={icon} iconPosition={iconPosition}>
        {children}
      </Inner>
    </button>
  );
}
