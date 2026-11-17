
"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  X,
} from "lucide-react";

import {
  mainNav,
  isExactActive,
  isExternalLink,
  isNavGroupActive,
} from "@/lib/content/nav";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   PREMIUM MOBILE NAVIGATION
   Hybrid Industrial Editorial

   - Dark charcoal surface
   - Industrial red accents
   - Expandable navigation groups
   - Active route highlighting
   - Keyboard focus management
   - Body scroll locking
   - Fixed participation CTAs
   - No animation dependency
================================================== */

type MobileMenuProps = {
  onClose: () => void;
};

const REGISTER_PATH = "/visit/register";
const STAND_PATH = "/exhibit/book-a-stand";

const focusClasses = [
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-[#C62832]",
].join(" ");

/* ==================================================
   MOBILE MENU
================================================== */

export function MobileMenu({
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname() ?? "/";
  const menuId = useId();

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [openItem, setOpenItem] = useState<
    string | null
  >(null);

  const closeMenu = useCallback(() => {
    onClose();
  }, [onClose]);

  /* ------------------------------------------------
     AUTO-EXPAND CURRENT NAVIGATION GROUP
  ------------------------------------------------ */

  useEffect(() => {
    const activeGroup = mainNav.find(
      (item) =>
        Boolean(item.children?.length) &&
        isNavGroupActive(pathname, item)
    );

    setOpenItem(activeGroup?.href ?? null);
  }, [pathname]);

  /* ------------------------------------------------
     LOCK SCROLL + KEYBOARD ACCESSIBILITY
  ------------------------------------------------ */

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const drawer = drawerRef.current;

      if (!drawer) {
        return;
      }

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          [
            'a[href]:not([tabindex="-1"])',
            'button:not([disabled]):not([tabindex="-1"])',
          ].join(",")
        )
      ).filter(
        (element) =>
          element.getClientRects().length > 0
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, [closeMenu]);

  /* ------------------------------------------------
     SUBMENU TOGGLE
  ------------------------------------------------ */

  function toggleSubmenu(href: string) {
    setOpenItem((current) =>
      current === href ? null : href
    );
  }

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* ========================================
          BACKDROP
      ======================================== */}

      <button
        type="button"
        tabIndex={-1}
        aria-label="Close navigation overlay"
        onClick={closeMenu}
        className="absolute inset-0 bg-black/75"
      />

      {/* ========================================
          MAIN DRAWER
      ======================================== */}

      <div
        ref={drawerRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "absolute inset-y-0 right-0",
          "flex w-[min(100%,400px)]",
          "flex-col overflow-hidden",
          "border-l border-white/10",
          "bg-[#191C21] text-white",
          "shadow-[-20px_0_55px_rgba(0,0,0,0.3)]"
        )}
      >
        {/* BRAND TOP ACCENT */}

        <div
          aria-hidden="true"
          className="h-[3px] shrink-0 bg-[#C62832]"
        />

        {/* ====================================
            MOBILE HEADER
        ==================================== */}

        <div className="flex min-h-[76px] shrink-0 items-center justify-between gap-3 border-b border-white/10 px-5 sm:px-6">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label={`${siteConfig.eventName} home`}
            className={cn(
              "inline-flex items-center rounded-md",
              focusClasses
            )}
          >
            <Image
              src="/logo/battery-white.png"
              alt={siteConfig.eventName}
              width={205}
              height={78}
              sizes="160px"
              className="h-auto w-[160px] object-contain"
            />
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className={cn(
              "flex h-11 w-11 shrink-0",
              "items-center justify-center",
              "rounded-md border border-white/15",
              "bg-white/[0.04]",
              "text-white transition-colors duration-200",
              "hover:border-white/30",
              "hover:bg-white/10",
              focusClasses
            )}
          >
            <X
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* ====================================
            EVENT INFORMATION
        ==================================== */}

        <div className="shrink-0 border-b border-white/10 bg-[#21252B] px-5 py-5 sm:px-6">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#E78D94]">
            Battery · Energy Storage · E-Mobility
          </p>

          <h2 className="mt-2 font-heading text-[15px] font-bold leading-[1.5] text-white">
            {siteConfig.eventName}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4 text-[#E45760]"
                strokeWidth={1.8}
              />

              <span className="font-body text-xs text-white/75">
                {siteConfig.dates.display}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin
                aria-hidden="true"
                className="h-4 w-4 text-[#E45760]"
                strokeWidth={1.8}
              />

              <span className="font-body text-xs text-white/75">
                {siteConfig.venue.city},{" "}
                {siteConfig.venue.country}
              </span>
            </div>
          </div>
        </div>

        {/* ====================================
            NAVIGATION LINKS
        ==================================== */}

        <nav
          aria-label="Mobile primary navigation"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6"
        >
          <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
            Explore the Website
          </p>

          <ul className="divide-y divide-white/10">
            {mainNav.map((item, index) => {
              const hasChildren = Boolean(
                item.children?.length
              );

              const expanded =
                openItem === item.href;

              const active =
                isNavGroupActive(pathname, item);

              const external =
                isExternalLink(item.href);

              const submenuId =
                `${menuId}-submenu-${index}`;

              return (
                <li
                  key={`${item.href}-${index}`}
                  className="min-w-0"
                >
                  {/* MAIN NAVIGATION ITEM */}

                  <div className="flex min-h-[56px] items-center gap-2">
                    <Link
                      href={item.href}
                      target={
                        external
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-current={
                        active && !hasChildren
                          ? "page"
                          : undefined
                      }
                      onClick={closeMenu}
                      className={cn(
                        "group flex min-h-[52px]",
                        "min-w-0 flex-1 items-center gap-3",
                        "rounded-md py-3",
                        "font-heading text-sm font-semibold",
                        "transition-colors duration-200",
                        active
                          ? "text-white"
                          : "text-white/70 hover:text-white",
                        focusClasses
                      )}
                    >
                      {/* ACTIVE INDICATOR */}

                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-4 w-0.5 shrink-0",
                          "rounded-full",
                          active
                            ? "bg-[#C62832]"
                            : "bg-transparent"
                        )}
                      />

                      <span>{item.label}</span>

                      {external && (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />
                      )}
                    </Link>

                    {/* DROPDOWN BUTTON */}

                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={
                          expanded
                            ? `Collapse ${item.label} links`
                            : `Expand ${item.label} links`
                        }
                        aria-expanded={expanded}
                        aria-controls={submenuId}
                        onClick={() =>
                          toggleSubmenu(item.href)
                        }
                        className={cn(
                          "flex h-10 w-10",
                          "shrink-0 items-center justify-center",
                          "rounded-md",
                          "border border-transparent",
                          "text-white/65",
                          "transition-[background-color,color,border-color]",
                          "duration-200",
                          "hover:bg-white/10",
                          "hover:text-white",
                          expanded &&
                            "border-white/10 bg-white/[0.06] text-white",
                          focusClasses
                        )}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "h-4 w-4",
                            "transition-transform duration-200",
                            expanded &&
                              "rotate-180 text-[#E45760]"
                          )}
                          strokeWidth={1.8}
                        />
                      </button>
                    )}
                  </div>

                  {/* SUBMENU */}

                  {hasChildren && (
                    <div
                      id={submenuId}
                      hidden={!expanded}
                      className="pb-4 pl-4"
                    >
                      <ul className="space-y-1 border-l border-white/15 pl-4">
                        {item.children?.map(
                          (child) => {
                            const childActive =
                              isExactActive(
                                pathname,
                                child.href
                              );

                            const childExternal =
                              isExternalLink(
                                child.href
                              );

                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  target={
                                    childExternal
                                      ? "_blank"
                                      : undefined
                                  }
                                  rel={
                                    childExternal
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  aria-current={
                                    childActive
                                      ? "page"
                                      : undefined
                                  }
                                  onClick={closeMenu}
                                  className={cn(
                                    "group flex min-h-11",
                                    "items-center justify-between",
                                    "gap-2 rounded-md",
                                    "px-3 py-2.5",
                                    "font-body text-[13px]",
                                    "transition-colors duration-200",
                                    childActive
                                      ? "bg-white/10 font-semibold text-white"
                                      : "text-white/60 hover:bg-white/[0.06] hover:text-white",
                                    focusClasses
                                  )}
                                >
                                  <span>
                                    {child.label}
                                  </span>

                                  {childExternal ? (
                                    <ArrowUpRight
                                      aria-hidden="true"
                                      className="h-3.5 w-3.5 shrink-0"
                                    />
                                  ) : (
                                    <ArrowRight
                                      aria-hidden="true"
                                      className={cn(
                                        "h-3.5 w-3.5 shrink-0",
                                        "opacity-0",
                                        "transition-opacity duration-200",
                                        "group-hover:opacity-100",
                                        "group-focus-visible:opacity-100",
                                        childActive &&
                                          "opacity-100"
                                      )}
                                    />
                                  )}
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ====================================
            STICKY BOTTOM ACTIONS
        ==================================== */}

        <div className="shrink-0 border-t border-white/10 bg-[#22262C] px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 sm:px-6">
          <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
            Be Part of the Show
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* VISITOR REGISTRATION */}

            <Link
              href="/visit/register"
              onClick={closeMenu}
              className={cn(
                "inline-flex min-h-12",
                "items-center justify-center",
                "rounded-md",
                "border border-white/30",
                "bg-transparent px-3",
                "text-center font-heading",
                "text-xs font-bold text-white",
                "transition-colors duration-200",
                "hover:border-white/60",
                "hover:bg-white/10",
                focusClasses
              )}
            >
              Register to Visit
            </Link>

            {/* EXHIBITOR BOOKING */}

            <Link
              href="/exhibit/book-a-stand"
              onClick={closeMenu}
              className={cn(
                "group inline-flex min-h-12",
                "items-center justify-center gap-1.5",
                "rounded-md",
                "bg-[#C62832] px-3",
                "text-center font-heading",
                "text-xs font-bold text-white",
                "transition-colors duration-200",
                "hover:bg-[#A82029]",
                focusClasses
              )}
            >
              Book a Stand

              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          <p className="mt-4 text-center font-body text-[11px] leading-5 text-white/45">
            {siteConfig.dates.display} ·{" "}
            {siteConfig.venue.city},{" "}
            {siteConfig.venue.country}
          </p>
        </div>
      </div>
    </div>
  );
}
