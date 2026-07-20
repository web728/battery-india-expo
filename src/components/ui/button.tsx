import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "outline-white";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-dark",
  secondary: "bg-navy text-white hover:bg-navy-dark",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white bg-transparent",
  "outline-white": "border-2 border-white text-white hover:bg-white hover:text-navy bg-transparent",
  ghost: "text-navy hover:bg-grey-light",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm min-h-[40px]",
  md: "px-6 py-3 text-base min-h-[44px]",
  lg: "px-8 py-4 text-base min-h-[52px]",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors duration-150 focus-visible:outline focus-visible:outline-3 focus-visible:outline-red focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
