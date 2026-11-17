
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
  type ReactNode,
} from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import {
  isExactActive,
  isExternalLink,
  isNavGroupActive,
  mainNav,
  type NavItem,
} from "@/lib/content/nav";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   PREMIUM GLOBAL NAVIGATION
   Hybrid Industrial Editorial

   Desktop:
   - Fixed dark industrial navbar
   - Branded logo
   - Active navigation indicators
   - Accessible dropdown menus
   - Registration and booking CTAs

   Mobile:
   - Slide-in navigation drawer
   - Accordion submenus
   - Keyboard focus management
   - Escape and backdrop close
   - Persistent participation CTAs

   No Motion / Framer Motion dependency
================================================== */

const REGISTER_PATH = "/visit/register";
const STAND_PATH = "/exhibit/book-a-stand";

const HEADER_HEIGHT = "h-[76px] xl:h-20";

const focusRing = [
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

const desktopNavClasses = [
  "relative inline-flex min-h-11 items-center",
  "rounded-button px-3",
  "font-heading text-[13px] font-semibold",
  "transition-colors duration-200",
].join(" ");

const actionBase = [
  "inline-flex min-h-11 shrink-0",
  "items-center justify-center gap-2",
  "rounded-button px-4",
  "font-heading text-[13px] font-bold",
  "transition-[background-color,border-color,color]",
  "duration-200",
  focusRing,
].join(" ");

/* ==================================================
   HEADER COMPONENT
================================================== */

export function Header() {
  const pathname = usePathname() ?? "/";
  const mobileDialogId = useId();

  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null);

  const [mobileSection, setMobileSection] =
    useState<string | null>(null);

  const isHome = pathname === "/";

  /* ------------------------------------------------
     SCROLL STATE
  ------------------------------------------------ */

  useEffect(() => {
    let frame = 0;

    function handleScroll() {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  /* ------------------------------------------------
     CLOSE MENUS ON ROUTE CHANGE
  ------------------------------------------------ */

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setOpenDropdown(null);
  }, [pathname]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, []);

  /* ------------------------------------------------
     MOBILE DRAWER ACCESSIBILITY
  ------------------------------------------------ */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;

    drawer
      ?.querySelector<HTMLButtonElement>(
        "[data-close-menu]"
      )
      ?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile();
        return;
      }

      if (event.key !== "Tab" || !drawer) {
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

      if (focusable.length === 0) return;

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
  }, [mobileOpen, closeMobile]);

  /* ------------------------------------------------
     DESKTOP DROPDOWN OUTSIDE CLICK / ESCAPE
  ------------------------------------------------ */

  useEffect(() => {
    if (!openDropdown) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenDropdown(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [openDropdown]);

  function openMobileMenu() {
    setOpenDropdown(null);
    setMobileSection(null);
    setMobileOpen(true);
  }

  return (
    <>
      {/* ========================================
          DESKTOP / TABLET HEADER
      ======================================== */}

      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "border-b text-white",
          "transition-[background-color,border-color,box-shadow]",
          "duration-200",
          isHome && !scrolled && !mobileOpen
            ? [
                "border-white/15",
                "bg-[#191C21]/90",
                "backdrop-blur-md",
              ]
            : [
                "border-white/10",
                "bg-[#191C21]/98",
                "shadow-[0_8px_30px_rgba(0,0,0,0.15)]",
                "backdrop-blur-lg",
              ]
        )}
      >
        {/* SUBTLE BRAND ACCENT */}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-brand-red"
        />

        <div
          className={cn(
            "mx-auto flex w-full max-w-site",
            "items-center justify-between",
            "gap-4 px-4 md:px-6 xl:px-10",
            HEADER_HEIGHT
          )}
        >
          {/* LOGO */}

         <Link
  href="/"
  aria-label={`${siteConfig.eventName} home`}
  onClick={() => setOpenDropdown(null)}
  className={cn(
    "inline-flex shrink-0 items-center rounded-button py-2",
    focusRing
  )}
>
  <Image
    src="/logo/battery-white.png"
    alt={siteConfig.eventName}
    width={210}
    height={75}
    priority
    sizes="(min-width: 1280px) 170px, 145px"
   className="h-auto w-[135px] object-contain sm:w-[145px] xl:w-[165px]"
  />
</Link>
          {/* ====================================
              PRIMARY DESKTOP NAVIGATION
          ==================================== */}

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {mainNav.map((item, index) => {
              const hasChildren = Boolean(
                item.children?.length
              );

              const expanded =
                openDropdown === item.href;

              const active = isNavGroupActive(
                pathname,
                item
              );

              const panelId =
                `desktop-nav-panel-${index}`;

              return (
                <div
                  key={`${item.href}-${index}`}
                  className="relative flex items-center"
                  onMouseEnter={() => {
                    setOpenDropdown(
                      hasChildren ? item.href : null
                    );
                  }}
                  onMouseLeave={() => {
                    if (hasChildren) {
                      setOpenDropdown(null);
                    }
                  }}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null
                      )
                    ) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  {/* MAIN LINK */}

                  <HeaderNavLink
                    item={item}
                    active={active}
                    onNavigate={() =>
                      setOpenDropdown(null)
                    }
                  />

                  {/* DROPDOWN TOGGLE */}

                  {hasChildren && (
                    <>
                      <button
                        type="button"
                        aria-label={`${item.label} submenu`}
                        aria-haspopup="true"
                        aria-expanded={expanded}
                        aria-controls={
                          expanded ? panelId : undefined
                        }
                        onClick={() =>
                          setOpenDropdown(
                            expanded ? null : item.href
                          )
                        }
                        className={cn(
                          "-ml-1 flex h-9 w-8",
                          "items-center justify-center",
                          "rounded-button",
                          "text-white/65",
                          "transition-colors hover:text-white",
                          focusRing
                        )}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "h-3.5 w-3.5",
                            "transition-transform duration-200",
                            expanded && "rotate-180"
                          )}
                          strokeWidth={1.8}
                        />
                      </button>

                      {/* DROPDOWN PANEL */}

                      {expanded && (
                        <div
                          id={panelId}
                          className="absolute left-1/2 top-full z-50 w-[286px] -translate-x-1/2 pt-4"
                        >
                          <div className="overflow-hidden rounded-[10px] border border-[#E4E2DE] bg-white p-2 shadow-[0_18px_48px_rgba(0,0,0,0.18)]">
                            <div className="border-b border-[#E4E2DE] px-3 pb-3 pt-2">
                              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-brand-red">
                                {item.label}
                              </p>
                            </div>

                            <div className="pt-1">
                              {item.children?.map(
                                (child) => {
                                  const childActive =
                                    isExactActive(
                                      pathname,
                                      child.href
                                    );

                                  const external =
                                    isExternalLink(
                                      child.href
                                    );

                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
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
                                        childActive
                                          ? "page"
                                          : undefined
                                      }
                                      onClick={() =>
                                        setOpenDropdown(
                                          null
                                        )
                                      }
                                      className={cn(
                                        "group flex min-h-11",
                                        "items-center justify-between gap-2",
                                        "rounded-md px-3 py-2.5",
                                        "font-body text-[13px]",
                                        "transition-colors duration-200",
                                        childActive
                                          ? "bg-[#FCEEEF] font-semibold text-brand-red"
                                          : "text-foreground hover:bg-background hover:text-brand-red",
                                        "focus-visible:outline-2",
                                        "focus-visible:outline-brand-red"
                                      )}
                                    >
                                      <span>
                                        {child.label}
                                      </span>

                                      {external ? (
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
                                            "transition-opacity",
                                            "group-hover:opacity-100",
                                            "group-focus-visible:opacity-100",
                                            childActive &&
                                              "opacity-100"
                                          )}
                                        />
                                      )}
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ====================================
              DESKTOP ACTION BUTTONS
          ==================================== */}

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Link
              href={REGISTER_PATH}
              className={cn(
                actionBase,
                "border border-white/30",
                "bg-transparent text-white",
                "hover:border-white/65",
                "hover:bg-white/10"
              )}
            >
              Register to Visit
            </Link>

            <Link
              href={STAND_PATH}
              className={cn(
                actionBase,
                "border border-brand-red",
                "bg-brand-red text-white",
                "hover:border-brand-red-hover",
                "hover:bg-brand-red-hover"
              )}
            >
              Book a Stand

              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          {/* ====================================
              MOBILE MENU BUTTON
          ==================================== */}

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open navigation menu"
            aria-controls={
              mobileOpen ? mobileDialogId : undefined
            }
            aria-expanded={mobileOpen}
            onClick={openMobileMenu}
            className={cn(
              "flex h-11 w-11 shrink-0",
              "items-center justify-center",
              "rounded-button",
              "border border-white/25",
              "bg-white/[0.05] text-white",
              "transition-colors duration-200",
              "hover:bg-white/10",
              "xl:hidden",
              focusRing
            )}
          >
            <Menu
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </header>

      {/* ========================================
          PAGE OFFSET

          Home hero sits beneath fixed header.
          Inner pages receive header spacing.
      ======================================== */}

      {!isHome && (
        <div
          aria-hidden="true"
          className={HEADER_HEIGHT}
        />
      )}

      {/* ========================================
          MOBILE NAVIGATION DRAWER
      ======================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={closeMobile}
            tabIndex={-1}
            className="absolute inset-0 bg-black/70"
          />

          {/* DRAWER */}

          <div
            ref={drawerRef}
            id={mobileDialogId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "absolute inset-y-0 right-0",
              "flex w-[min(100%,390px)]",
              "flex-col overflow-hidden",
              "border-l border-white/10",
              "bg-[#191C21] text-white",
              "shadow-[-18px_0_45px_rgba(0,0,0,0.24)]"
            )}
          >
            {/* MOBILE HEADER */}

            <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
              <Link
                href="/"
                onClick={closeMobile}
                aria-label={`${siteConfig.eventName} home`}
                className={cn(
                  "inline-flex rounded-button",
                  focusRing
                )}
              >
                <Image
                  src="/logo/battery-white.png"
                  alt={siteConfig.eventName}
                  width={190}
                  height={72}
                  sizes="155px"
                  className="h-auto w-[155px] object-contain"
                />
              </Link>

              <button
                data-close-menu
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMobile}
                className={cn(
                  "flex h-11 w-11",
                  "items-center justify-center",
                  "rounded-button",
                  "border border-white/20",
                  "text-white transition-colors",
                  "hover:bg-white/10",
                  focusRing
                )}
              >
                <X
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* MOBILE EVENT DETAILS */}

            <div className="border-b border-white/10 px-5 py-4">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.13em] text-white/45">
                India Battery International Show
              </p>

              <div className="mt-2 flex items-center gap-2 text-white/80">
                <CalendarDays
                  aria-hidden="true"
                  className="h-4 w-4 text-[#E45760]"
                />

                <p className="font-body text-xs">
                  {siteConfig.dates.display} ·{" "}
                  {siteConfig.venue.city}
                </p>
              </div>
            </div>

            {/* MOBILE PRIMARY LINKS */}

            <nav
              aria-label="Mobile primary navigation"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-3"
            >
              {mainNav.map((item, index) => {
                const hasChildren = Boolean(
                  item.children?.length
                );

                const expanded =
                  mobileSection === item.href;

                const active = isNavGroupActive(
                  pathname,
                  item
                );

                const sectionId =
                  `mobile-nav-section-${index}`;

                return (
                  <div
                    key={`${item.href}-${index}`}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <MobileNavLink
                        item={item}
                        active={active}
                        onNavigate={closeMobile}
                      />

                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={
                            expanded
                              ? `Collapse ${item.label} links`
                              : `Expand ${item.label} links`
                          }
                          aria-expanded={expanded}
                          aria-controls={
                            expanded
                              ? sectionId
                              : undefined
                          }
                          onClick={() =>
                            setMobileSection(
                              expanded
                                ? null
                                : item.href
                            )
                          }
                          className={cn(
                            "flex h-11 w-11 shrink-0",
                            "items-center justify-center",
                            "rounded-button",
                            "text-white/70",
                            "transition-colors",
                            "hover:bg-white/10",
                            "hover:text-white",
                            focusRing
                          )}
                        >
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              "h-4 w-4",
                              "transition-transform duration-200",
                              expanded && "rotate-180"
                            )}
                            strokeWidth={1.8}
                          />
                        </button>
                      )}
                    </div>

                    {/* MOBILE CHILD LINKS */}

                    {hasChildren && expanded && (
                      <div
                        id={sectionId}
                        className="pb-3 pl-4"
                      >
                        <div className="space-y-1 border-l border-white/15 pl-3">
                          {item.children?.map((child) => {
                            const external =
                              isExternalLink(
                                child.href
                              );

                            const childActive =
                              isExactActive(
                                pathname,
                                child.href
                              );

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
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
                                  childActive
                                    ? "page"
                                    : undefined
                                }
                                onClick={closeMobile}
                                className={cn(
                                  "flex min-h-11",
                                  "items-center justify-between",
                                  "gap-2 rounded-button",
                                  "px-3 py-2.5",
                                  "font-body text-[13px]",
                                  "transition-colors duration-200",
                                  childActive
                                    ? "bg-white/10 font-semibold text-white"
                                    : "text-white/60 hover:bg-white/[0.06] hover:text-white",
                                  focusRing
                                )}
                              >
                                <span>
                                  {child.label}
                                </span>

                                {external && (
                                  <ArrowUpRight
                                    aria-hidden="true"
                                    className="h-3.5 w-3.5 shrink-0"
                                  />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* MOBILE CTA FOOTER */}

            <div className="shrink-0 border-t border-white/10 bg-[#22262C] px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={REGISTER_PATH}
                  onClick={closeMobile}
                  className={cn(
                    "flex min-h-12 items-center",
                    "justify-center rounded-button",
                    "border border-white/30",
                    "px-3 text-center",
                    "font-heading text-xs font-bold",
                    "text-white",
                    "transition-colors hover:bg-white/10",
                    focusRing
                  )}
                >
                  Register to Visit
                </Link>

                <Link
                  href={STAND_PATH}
                  onClick={closeMobile}
                  className={cn(
                    "flex min-h-12 items-center",
                    "justify-center rounded-button",
                    "bg-brand-red px-3",
                    "text-center font-heading",
                    "text-xs font-bold text-white",
                    "transition-colors",
                    "hover:bg-brand-red-hover",
                    focusRing
                  )}
                >
                  Book a Stand
                </Link>
              </div>

              <p className="mt-4 text-center font-body text-xs text-white/45">
                {siteConfig.dates.display} ·{" "}
                {siteConfig.venue.city},{" "}
                {siteConfig.venue.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ==================================================
   SHARED MAIN NAV LINK
================================================== */

type NavigationLinkProps = {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
};

function HeaderNavLink({
  item,
  active,
  onNavigate,
}: NavigationLinkProps) {
  const external = isExternalLink(item.href);
  const hasChildren = Boolean(item.children?.length);

  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
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
      onClick={onNavigate}
      className={cn(
        desktopNavClasses,
        "group",
        active
          ? "text-white"
          : "text-white/70 hover:text-white",
        focusRing
      )}
    >
      <span>{item.label}</span>

      {external && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-3 w-3"
          strokeWidth={1.8}
        />
      )}

      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-1 left-3 right-3",
          "h-0.5 rounded-full bg-brand-red",
          "origin-left transition-transform",
          "duration-200",
          active
            ? "scale-x-100"
            : [
                "scale-x-0",
                "group-hover:scale-x-100",
                "group-focus-visible:scale-x-100",
              ]
        )}
      />
    </Link>
  );
}

/* ==================================================
   MOBILE PRIMARY NAV LINK
================================================== */

function MobileNavLink({
  item,
  active,
  onNavigate,
}: NavigationLinkProps) {
  const external = isExternalLink(item.href);
  const hasChildren = Boolean(item.children?.length);

  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
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
      onClick={onNavigate}
      className={cn(
        "flex min-h-[52px] flex-1",
        "items-center gap-3 py-3",
        "font-heading text-sm font-semibold",
        "transition-colors duration-200",
        active
          ? "text-white"
          : "text-white/70 hover:text-white",
        focusRing
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-4 w-0.5 shrink-0",
          "rounded-full",
          active
            ? "bg-brand-red"
            : "bg-transparent"
        )}
      />

      <span>{item.label}</span>

      {external && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5"
          strokeWidth={1.8}
        />
      )}
    </Link>
  );
}
