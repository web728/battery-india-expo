import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
}: {
  items: Crumb[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="
        border-b border-black/[0.06]
        bg-white
      "
    >
      <div
        className="
          mx-auto flex w-full max-w-7xl
          flex-wrap items-center
          gap-x-1.5 gap-y-1
          container-px
          py-2.5
          text-[12px]
          leading-none
          tracking-[0.01em]
          sm:text-[13px]
        "
      >
        <Link
          href="/"
          aria-label="Home"
          className="
            group flex h-7 w-7
            items-center justify-center
            text-zinc-400
            transition-colors duration-200
            hover:text-brand-green
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-green/30
          "
        >
          <Home
            className="
              h-3.5 w-3.5
              transition-transform duration-200
              group-hover:-translate-y-[1px]
            "
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Link>

        {items.map((item, index) => {
          const isLast =
            index === items.length - 1;

          return (
            <span
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              <ChevronRight
                className="
                  h-3 w-3
                  shrink-0
                  text-zinc-300
                "
                strokeWidth={1.6}
                aria-hidden="true"
              />

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="
                    font-medium
                    text-zinc-500
                    transition-colors duration-200
                    hover:text-brand-green
                    focus-visible:outline-none
                  "
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={
                    isLast ? "page" : undefined
                  }
                  className="
                    max-w-[240px]
                    truncate
                    font-semibold
                    tracking-[0.005em]
                    text-zinc-900
                    sm:max-w-none
                  "
                >
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}