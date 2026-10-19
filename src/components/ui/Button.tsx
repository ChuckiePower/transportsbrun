import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "primary" | "secondary" | "on-asphalt" | "link";
type Size = "md" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold whitespace-nowrap select-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none";

const variants: Record<ButtonVariant, string> = {
  // Action principale : jaune, texte bleu nuit, ombre jaune douce, reflet au survol
  primary: "btn-shine bg-sun text-ink shadow-sun hover:-translate-y-px hover:bg-sun-hover",
  secondary: "border-[1.5px] border-line bg-surface text-ink hover:border-ink",
  // Sur asphalte : contour couleur marquage, translucide
  "on-asphalt":
    "border-[1.5px] border-marking/40 bg-transparent text-marking hover:border-marking hover:bg-marking/5",
  link: "px-0 text-brand underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "min-h-13 px-7 text-[0.95rem]",
  sm: "min-h-11 px-5 text-[0.9rem]",
};

type Common = {
  variant?: ButtonVariant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  children: ReactNode;
  className?: string;
};

/** Flèche dans un petit rond qui glisse au survol ; autres icônes simples */
function Inner({
  icon,
  iconPosition = "end",
  variant,
  children,
}: Pick<Common, "icon" | "iconPosition" | "children" | "variant">) {
  const ic = !icon ? null : icon === "arrowRight" ? (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-full transition-transform duration-200 ease-out-soft group-hover/btn:translate-x-[3px]",
        variant === "primary"
          ? "bg-ink/10"
          : variant === "on-asphalt"
            ? "bg-white/15"
            : "bg-brand-soft text-brand",
      )}
    >
      <Icon name="arrowRight" className="size-3.5" strokeWidth={2.25} />
    </span>
  ) : (
    <Icon name={icon} className="size-[18px] shrink-0" />
  );
  return (
    <>
      {iconPosition === "start" ? ic : null}
      <span>{children}</span>
      {iconPosition === "end" ? ic : null}
    </>
  );
}

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}

/** Lien stylé en bouton : interne (next/link) ou tel:/mailto:/externe (<a>) */
export function ButtonLink({
  href,
  variant = "primary",
  size,
  icon,
  iconPosition,
  children,
  className,
  magnetic = variant === "primary",
  ...rest
}: Common & { href: string; magnetic?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "children"
  >) {
  const cls = buttonClasses(variant, size, className);
  const inner = (
    <Inner icon={icon} iconPosition={iconPosition} variant={variant}>
      {children}
    </Inner>
  );
  const data = magnetic ? { "data-magnetic": "" } : {};
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls} {...data} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...data} {...rest}>
      {inner}
    </a>
  );
}

export function Button({
  variant = "primary",
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
      <Inner icon={icon} iconPosition={iconPosition} variant={variant}>
        {children}
      </Inner>
    </button>
  );
}
