import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-grey-light bg-grey-light/60">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-1.5 container-px py-3 text-sm">
        <Link href="/" className="flex items-center text-grey-medium hover:text-red" aria-label="Home">
          <Home className="h-4 w-4" aria-hidden="true" />
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-grey-medium" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link href={item.href} className="text-grey-medium hover:text-red">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-navy-dark" aria-current={isLast ? "page" : undefined}>
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
