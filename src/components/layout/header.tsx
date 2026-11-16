"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import {
  isExactActive,
  isExternalLink,
  isNavGroupActive,
  mainNav,
  type NavItem,
} from "@/lib/content/nav";
import { cn } from "@/lib/utils";

const STAND_PATH = "/exhibit/book-a-stand";
const REGISTER_PATH = "/visit/register";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark";

const navigationTransition = { duration: 0.18, ease: "easeOut" as const };

export function Header() {
  const pathname = usePathname() ?? "/";
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLButtonElement>("[data-close-menu]")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const items = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"])',
        ),
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openDropdown) return;
    const closeOutside = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [openDropdown]);

  function closeMobile() {
    setMobileOpen(false);
    setMobileSection(null);
    menuButtonRef.current?.focus();
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b text-white",
          "transition-[background-color,border-color,box-shadow] duration-200",
          transparent
            ? "border-white/15 bg-surface-dark/75 backdrop-blur-md"
            : "border-white/10 bg-surface-dark/95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-lg",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-[76px] w-full max-w-site items-center justify-between gap-4 px-4 md:px-6 xl:h-20 xl:px-12",
          )}
        >
          <Link
            href="/"
            aria-label="India International Battery Show — Home"
            onClick={() => setOpenDropdown(null)}
            className={cn("relative flex shrink-0 items-center rounded-button", focusRing)}
          >
            <Image
              src="/logo/battery-white.png"
              alt="India International Battery Show"
              width={210}
              height={80}
              priority
              sizes="(min-width: 1280px) 185px, 160px"
              className="h-auto w-[150px] object-contain sm:w-[165px] xl:w-[185px]"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {mainNav.map((item, index) => {
              const hasChildren = Boolean(item.children?.length);
              const expanded = openDropdown === item.href;
              const active = isNavGroupActive(pathname, item);
              const panelId = `desktop-nav-${index}`;

              return (
                <div
                  key={`${item.href}-${index}`}
                  className="relative flex items-center"
                  onMouseEnter={() => setOpenDropdown(hasChildren ? item.href : null)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <NavLink item={item} active={active} onNavigate={() => setOpenDropdown(null)} />

                  {hasChildren && (
                    <>
                      <button
                        type="button"
                        aria-label={`${item.label} submenu`}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        aria-haspopup="true"
                        onClick={() => setOpenDropdown(expanded ? null : item.href)}
                        className={cn(
                          "-ml-1 flex size-9 items-center justify-center rounded-button text-white/70 transition-colors hover:text-white",
                          focusRing,
                        )}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            expanded && "rotate-180 text-white",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            key={panelId}
                            id={panelId}
                            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
                            transition={navigationTransition}
                            style={{ left: "50%", x: "-50%" }}
                            className="absolute top-full w-[268px] pt-3"
                          >
                            <div className="overflow-hidden rounded-lg border border-border bg-white p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.14)]">
                              {item.children?.map((child) => {
                                const childActive = isExactActive(pathname, child.href);
                                const external = isExternalLink(child.href);
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noopener noreferrer" : undefined}
                                    aria-current={childActive ? "page" : undefined}
                                    onClick={() => setOpenDropdown(null)}
                                    className={cn(
                                      "flex min-h-11 items-center justify-between gap-2 rounded-button px-3 py-2.5 font-body text-[13px] font-medium transition-colors",
                                      childActive
                                        ? "bg-brand-red/10 font-semibold text-brand-red"
                                        : "text-foreground/85 hover:bg-surface-muted hover:text-brand-red",
                                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red",
                                    )}
                                  >
                                    {child.label}
                                    {external && <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Link
              href={REGISTER_PATH}
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-button border border-white/30 px-4 font-body text-[13px] font-semibold text-white",
                "transition-colors duration-200 hover:border-white/60 hover:bg-white/10",
                focusRing,
              )}
            >
              Register to Visit
            </Link>
            <Link
              href={STAND_PATH}
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-button bg-brand-red px-4 font-body text-[13px] font-semibold text-white",
                "transition-colors duration-200 hover:bg-brand-red-hover",
                focusRing,
              )}
            >
              Book a Stand
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen(true);
              setOpenDropdown(null);
            }}
            className={cn(
              "flex size-11 items-center justify-center rounded-button border border-white/25 text-white transition-colors hover:bg-white/10 xl:hidden",
              focusRing,
            )}
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </header>

      {/* Prevent fixed navigation from overlapping inner-page headings.
          Homepage hero should deliberately extend beneath the navbar. */}
      {!isHome && <div aria-hidden="true" className="h-[76px] xl:h-20" />}

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] xl:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              onClick={closeMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-black/65"
            />

            <motion.div
              ref={drawerRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 }}
              transition={reduceMotion ? { duration: 0.12 } : { type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,390px)] flex-col bg-surface-dark text-white shadow-2xl"
            >
              <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
                <Link href="/" onClick={closeMobile} aria-label="India International Battery Show — Home" className={cn("rounded-button", focusRing)}>
                  <Image
                    src="/logo/battery-white.png"
                    alt="India International Battery Show"
                    width={210}
                    height={80}
                    className="h-auto w-[160px] object-contain"
                  />
                </Link>
                <button
                  data-close-menu
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={closeMobile}
                  className={cn("flex size-11 items-center justify-center rounded-button border border-white/20 hover:bg-white/10", focusRing)}
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>

              <nav aria-label="Mobile primary navigation" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
                {mainNav.map((item, index) => {
                  const hasChildren = Boolean(item.children?.length);
                  const expanded = mobileSection === item.href;
                  const active = isNavGroupActive(pathname, item);
                  const sectionId = `mobile-section-${index}`;

                  return (
                    <div key={`${item.href}-${index}`} className="border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <MobileLink item={item} active={active} onNavigate={closeMobile} />
                        {hasChildren && (
                          <button
                            type="button"
                            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} links`}
                            aria-controls={sectionId}
                            aria-expanded={expanded}
                            onClick={() => setMobileSection(expanded ? null : item.href)}
                            className={cn("flex size-11 shrink-0 items-center justify-center rounded-button text-white/75 hover:bg-white/10", focusRing)}
                          >
                            <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {hasChildren && expanded && (
                          <motion.div
                            key={sectionId}
                            id={sectionId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 pb-3 pl-4">
                              {item.children?.map((child) => {
                                const childActive = isExactActive(pathname, child.href);
                                const external = isExternalLink(child.href);
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noopener noreferrer" : undefined}
                                    aria-current={childActive ? "page" : undefined}
                                    onClick={closeMobile}
                                    className={cn(
                                      "flex min-h-11 items-center gap-2 rounded-button px-3 py-2.5 font-body text-[13px] transition-colors",
                                      childActive ? "bg-white/10 font-semibold text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
                                      focusRing,
                                    )}
                                  >
                                    {child.label}
                                    {external && <ArrowUpRight aria-hidden="true" className="size-3.5" />}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="shrink-0 border-t border-white/10 bg-surface-dark-elevated px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={REGISTER_PATH}
                    onClick={closeMobile}
                    className={cn("flex min-h-12 items-center justify-center rounded-button border border-white/30 px-3 text-center font-body text-xs font-semibold hover:bg-white/10", focusRing)}
                  >
                    Register to Visit
                  </Link>
                  <Link
                    href={STAND_PATH}
                    onClick={closeMobile}
                    className={cn("flex min-h-12 items-center justify-center rounded-button bg-brand-red px-3 text-center font-body text-xs font-semibold hover:bg-brand-red-hover", focusRing)}
                  >
                    Book a Stand
                  </Link>
                </div>
                <p className="mt-4 text-center font-body text-xs text-white/60">
                  14–16 October 2027 · Pune, India
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

type NavLinkProps = {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
};

function NavLink({ item, active, onNavigate }: NavLinkProps) {
  const external = isExternalLink(item.href);
  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-current={active && !item.children?.length ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group relative inline-flex min-h-11 items-center gap-1 rounded-button px-2.5 font-body text-[13px] font-semibold transition-colors duration-200",
        active ? "text-white" : "text-white/70 hover:text-white",
        focusRing,
      )}
    >
      {item.label}
      {external && <ArrowUpRight aria-hidden="true" className="size-3" />}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-2.5 bottom-1 h-0.5 origin-left rounded-full bg-brand-red transition-transform duration-200",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
        )}
      />
    </Link>
  );
}

function MobileLink({ item, active, onNavigate }: NavLinkProps) {
  const external = isExternalLink(item.href);
  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-current={active && !item.children?.length ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "flex min-h-13 flex-1 items-center gap-2 rounded-button py-3 font-body text-sm font-semibold",
        active ? "text-white" : "text-white/75 hover:text-white",
        focusRing,
      )}
    >
      {active && <span aria-hidden="true" className="h-4 w-0.5 rounded-full bg-brand-red" />}
      {item.label}
      {external && <ArrowUpRight aria-hidden="true" className="size-3.5" />}
    </Link>
  );
}
