import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline" | "outlineDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent-500 text-brand-950 shadow-cta hover:bg-accent-400",
  secondary: "bg-brand-600 text-white shadow-card hover:bg-brand-700",
  light: "bg-white text-brand-700 shadow-card hover:bg-brand-50",
  outline: "border-2 border-white/70 text-white hover:border-white hover:bg-white hover:text-brand-800",
  outlineDark: "border-2 border-brand-200 bg-white text-brand-700 hover:border-brand-600 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-5 text-sm",
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-14 px-8 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Adds a light sweep across the button on hover */
  sheen?: boolean;
}

type AnchorProps = BaseProps & Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps> & { href: string };
type ButtonProps = BaseProps & Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: undefined };

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, sheen = variant === "primary", ...rest } = props;

  const classes = cn(
    "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-display font-bold tracking-tight",
    "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out will-change-transform",
    "hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/45 transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<"a"> & { href: string };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {inner}
      </a>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}
