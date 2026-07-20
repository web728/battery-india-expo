"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { mainNav } from "@/lib/content/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/mobile-menu";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync menu state across routes change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Handle outside clicks
  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-navy-dark/95 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-navy-dark/80"
      )}
    >
      {/* 
        FIXED `container-px` to standard premium mobile spacing system `px-4 sm:px-6 lg:px-8`
      */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
        >
          <Image
            src="/logo/battery-solar-logo.png"
            alt="Battery India Expo Logo"
            width={160}
            height={60}
            className="h-10 w-auto object-contain sm:h-12"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Desktop Primary Nav */}
        <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const isOpen = openDropdown === item.href;
            return (
              <div key={item.href} className="relative">
                {item.children ? (
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenDropdown((current) => (current === item.href ? null : item.href))
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-red after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-red after:transition-transform after:duration-200 hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && (
                  <div
                    className={cn(
                      "absolute left-0 top-full w-72 -translate-y-1 rounded-lg border border-grey-light bg-white py-2 shadow-xl transition-[opacity,transform,visibility] duration-150",
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible opacity-0"
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-navy-dark transition-colors hover:bg-grey-light hover:text-red focus-visible:bg-grey-light focus-visible:text-red focus-visible:outline-none"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/exhibit/book-a-stand" size="sm" variant="primary">
            Book a Stand
          </Button>
          <Button href="/visit/register" size="sm" variant="outline-white">
            Register to Visit
          </Button>
        </div>

        {/* Mobile Trigger Button */}
        <button
          type="button"
          className="rounded p-2 text-white transition-colors hover:text-red lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}