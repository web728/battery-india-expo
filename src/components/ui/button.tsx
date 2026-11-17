
import Link from "next/link";

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

/* ==================================================
   SHARED BUTTON
   Hybrid Industrial Editorial

   Supports:
   - Native buttons
   - Next.js internal links
   - External links
   - Five visual variants
   - Three sizes
   - Accessible focus states
================================================== */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-white"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  title?: string;
  "aria-label"?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type ButtonProps =
  | ButtonAsButton
  | ButtonAsLink;

/* --------------------------------------------------
   BASE STYLES
-------------------------------------------------- */

const baseClasses = [
  "inline-flex shrink-0",
  "items-center justify-center gap-2.5",
  "rounded-button",
  "font-heading font-bold",
  "leading-none",
  "transition-[background-color,border-color,color]",
  "duration-200",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
  "disabled:pointer-events-none",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
].join(" ");

/* --------------------------------------------------
   VARIANTS
-------------------------------------------------- */

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "border border-brand-red",
    "bg-brand-red text-white",
    "hover:border-brand-red-hover",
    "hover:bg-brand-red-hover",
  ].join(" "),

  secondary: [
    "border border-[#191C21]",
    "bg-[#191C21] text-white",
    "hover:border-[#343941]",
    "hover:bg-[#343941]",
  ].join(" "),

  outline: [
    "border border-[#D9D7D3]",
    "bg-white text-foreground",
    "hover:border-brand-red",
    "hover:text-brand-red",
  ].join(" "),

  "outline-white": [
    "border border-white/70",
    "bg-transparent text-white",
    "hover:border-white",
    "hover:bg-white",
    "hover:text-[#191C21]",
    "focus-visible:outline-white",
  ].join(" "),

  ghost: [
    "border border-transparent",
    "bg-transparent text-foreground",
    "hover:bg-[#EEECE8]",
    "hover:text-brand-red",
  ].join(" "),
};

/* --------------------------------------------------
   SIZES
-------------------------------------------------- */

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2.5 text-xs",
  md: "min-h-12 px-6 py-3 text-sm",
  lg: "min-h-[52px] px-7 py-3.5 text-sm sm:px-8",
};

/* ==================================================
   BUTTON COMPONENT
================================================== */

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (typeof props.href === "string") {
    const {
      href,
      target,
      rel,
      title,
      onClick,
    } = props;

    const isExternal =
      /^https?:\/\//i.test(href) ||
      href.startsWith("//");

    const safeRel =
      target === "_blank"
        ? [
            rel,
            "noopener",
            "noreferrer",
          ]
            .filter(Boolean)
            .join(" ")
        : rel;

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={safeRel}
          title={title}
          aria-label={props["aria-label"]}
          onClick={onClick}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        target={target}
        rel={safeRel}
        title={title}
        aria-label={props["aria-label"]}
        onClick={onClick}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    href: _href,
    children: _children,
    type = "button",
    ...buttonProps
  } = props as ButtonAsButton;

  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
    >
      {children}
    </button>
  );
}
