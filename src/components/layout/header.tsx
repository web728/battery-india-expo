
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import {
  BOOK_STAND_URL,
  REGISTER_URL,
  isExactActive,
  isExternalLink,
  isNavGroupActive,
  mainNav,
  type NavItem,
} from "@/lib/content/nav";

import { cn } from "@/lib/utils";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138]";

export function Header() {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<
    string | null
  >(null);
  const [mobileSection, setMobileSection] = useState<
    string | null
  >(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileTriggerRef.current?.focus();
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusables =
          drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          );

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!first || !last) return;

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
    };

    document.addEventListener(
      "keydown",
      closeOnEscape
    );

    drawerRef.current
      ?.querySelector<HTMLButtonElement>(
        '[data-mobile-close]'
      )
      ?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener(
        "keydown",
        closeOnEscape
      );
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openDropdown) return;

    const closeOutside = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpenDropdown(null);
      }
    };

    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      closeOutside
    );
    document.addEventListener(
      "keydown",
      closeEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeOutside
      );
      document.removeEventListener(
        "keydown",
        closeEscape
      );
    };
  }, [openDropdown]);

  const transparent =
    pathname === "/" && !scrolled && !mobileOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b",
          "transition-[background-color,border-color,box-shadow] duration-300",
          transparent
            ? "border-white/10 bg-[#121214]/35 backdrop-blur-md"
            : "border-white/10 bg-[#18181b]/95 shadow-[0_12px_35px_rgba(0,0,0,0.14)] backdrop-blur-xl"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4",
            "px-4 sm:px-6 xl:px-10",
            scrolled ? "h-[70px]" : "h-[78px]",
            "transition-[height] duration-300"
          )}
        >
      <Link
  href="/"
  aria-label="India Battery International Show home"
  onClick={() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }}
  className={cn(
    "relative flex shrink-0 items-center rounded-md",
    focusStyle
  )}
>
  <Image
    src="/logo/battery-white.png"
    alt="India Battery International Show"
    width={210}
    height={80}
    priority
    className={cn(
      "w-auto object-contain transition-[height] duration-300",
      scrolled ? "h-12" : "h-14"
    )}
  />
</Link>

          {/* Desktop */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 xl:flex"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {mainNav.map((item) => {
              const hasChildren =
                Boolean(item.children?.length);
              const isOpen =
                openDropdown === item.href;
              const active = isNavGroupActive(
                pathname,
                item
              );

              return (
                <div
                  key={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() =>
                    setOpenDropdown(
                      hasChildren ? item.href : null
                    )
                  }
                  onFocusCapture={() => {
                    if (hasChildren) {
                      setOpenDropdown(item.href);
                    }
                  }}
                  onBlurCapture={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null
                      )
                    ) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <NavAnchor
                    item={item}
                    active={active}
                    close={() => setOpenDropdown(null)}
                  />

                  {hasChildren && (
                    <>
                      <button
                        type="button"
                        aria-label={`${item.label} submenu`}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls={`nav-${item.href.slice(1)}`}
                        onClick={() =>
                          setOpenDropdown(
                            isOpen ? null : item.href
                          )
                        }
                        className={cn(
                          "-ml-1 flex h-10 w-6 items-center justify-center rounded-sm text-white/65 transition-colors hover:text-white",
                          focusStyle
                        )}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            isOpen && "rotate-180 text-[#ed3138]"
                          )}
                        />
                      </button>

                      <div
                        id={`nav-${item.href.slice(1)}`}
                        className={cn(
                          "absolute left-1/2 top-full w-[260px] -translate-x-1/2 pt-3",
                          "transition-[opacity,visibility,transform] duration-200",
                          isOpen
                            ? "visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible -translate-y-1 opacity-0"
                        )}
                      >
                        <div className="overflow-hidden rounded-lg border border-[#e8e8e8] bg-white p-1.5 shadow-[0_20px_55px_rgba(0,0,0,0.17)]">
                          {item.children?.map((child) => {
                            const childActive =
                              isExactActive(
                                pathname,
                                child.href
                              );

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                aria-current={
                                  childActive
                                    ? "page"
                                    : undefined
                                }
                                tabIndex={isOpen ? 0 : -1}
                                onClick={() =>
                                  setOpenDropdown(null)
                                }
                                className={cn(
                                  "block rounded-md px-3.5 py-3 font-heading text-[13px]",
                                  "transition-colors duration-200",
                                  childActive
                                    ? "bg-[#fff0f0] font-bold text-[#d52d35]"
                                    : "font-medium text-[#44444a] hover:bg-[#f6f6f6] hover:text-[#d52d35]",
                                  focusStyle
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Link
              href="/exhibit/book-a-stand"
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-md border border-white/25 px-4",
                "font-heading text-xs font-bold text-white transition-colors hover:border-white/60 hover:bg-white/10",
                isExactActive(pathname, "/exhibit/book-a-stand") &&
                  "border-[#ed3138] bg-white/10",
                focusStyle
              )}
            >
              Book a Stand
            </Link>

            <Link
              href="/visit/register"
              className={cn(
                "inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-[#ed3138] px-4",
                "font-heading text-xs font-bold text-white transition-colors hover:bg-[#cf252d]",
                focusStyle
              )}
            >
              Register to Visit
              <ArrowUpRight
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Mobile / tablet trigger */}
          <button
            ref={mobileTriggerRef}
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileOpen(true);
              setOpenDropdown(null);
            }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white",
              "transition-colors hover:bg-white/10 xl:hidden",
              focusStyle
            )}
          >
            <Menu
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/65"
            onClick={() => setMobileOpen(false)}
          />

          <div
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute inset-y-0 right-0 flex w-[min(100%,390px)] flex-col bg-[#18181b] text-white shadow-2xl"
          >
            <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={focusStyle}
              >
              <Image
  src="/logo/battery-white.png"
  alt="India Battery International Show"
  width={220}
  height={100}
  className="h-18 w-auto object-contain"
/>
              </Link>

              <button
                data-mobile-close
                type="button"
                aria-label="Close menu"
                onClick={() => {
                  setMobileOpen(false);
                  mobileTriggerRef.current?.focus();
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md border border-white/15",
                  focusStyle
                )}
              >
                <X
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>

            <nav
              aria-label="Mobile primary navigation"
              className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
            >
              {mainNav.map((item) => {
                const hasChildren =
                  Boolean(item.children?.length);
                const expanded =
                  mobileSection === item.href;
                const active = isNavGroupActive(
                  pathname,
                  item
                );

                return (
                  <div
                    key={item.href}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center">
                      <MobileAnchor
                        item={item}
                        active={active}
                        close={() => setMobileOpen(false)}
                      />

                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`Toggle ${item.label} links`}
                          aria-expanded={expanded}
                          onClick={() =>
                            setMobileSection(
                              expanded ? null : item.href
                            )
                          }
                          className={cn(
                            "flex h-12 w-11 shrink-0 items-center justify-center text-white/70",
                            focusStyle
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expanded && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && expanded && (
                      <div className="space-y-1 pb-3 pl-4">
                        {item.children?.map((child) => {
                          const childActive =
                            isExactActive(
                              pathname,
                              child.href
                            );

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              aria-current={
                                childActive
                                  ? "page"
                                  : undefined
                              }
                              onClick={() =>
                                setMobileOpen(false)
                              }
                              className={cn(
                                "block rounded-md px-3 py-2.5 text-[13px] transition-colors",
                                childActive
                                  ? "bg-white/10 font-bold text-[#ff656b]"
                                  : "text-white/65 hover:bg-white/5 hover:text-white",
                                focusStyle
                              )}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="shrink-0 border-t border-white/10 bg-[#202023] p-5">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={BOOK_STAND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center rounded-md border border-white/25 px-3 text-center text-xs font-bold text-white"
                >
                  Book a Stand
                </a>

                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center rounded-md bg-[#ed3138] px-3 text-center text-xs font-bold text-white"
                >
                  Register to Visit
                </a>
              </div>

              <p className="mt-4 text-center text-xs text-white/45">
                14–16 October 2027 · Pune, India
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavAnchor({
  item,
  active,
  close,
}: {
  item: NavItem;
  active: boolean;
  close: () => void;
}) {
  const external = isExternalLink(item.href);

  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-current={
        active && !item.children ? "page" : undefined
      }
      onClick={close}
      className={cn(
        "group relative flex h-11 items-center gap-1 rounded-md px-3 font-heading text-[13px] font-semibold",
        "transition-colors duration-200",
        active
          ? "text-white"
          : "text-white/70 hover:text-white",
        focusStyle
      )}
    >
      {item.label}

      {external && (
        <ArrowUpRight
          className="h-3 w-3 text-white/60"
          aria-hidden="true"
        />
      )}

      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-1 left-3 right-3 h-[2px] origin-left rounded-full bg-[#ed3138]",
          "transition-transform duration-200",
          active
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}

function MobileAnchor({
  item,
  active,
  close,
}: {
  item: NavItem;
  active: boolean;
  close: () => void;
}) {
  const external = isExternalLink(item.href);

  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-current={
        active && !item.children ? "page" : undefined
      }
      onClick={close}
      className={cn(
        "flex min-h-12 flex-1 items-center gap-2 py-3 font-heading text-sm font-semibold",
        active
          ? "text-[#ff656b]"
          : "text-white/80",
        focusStyle
      )}
    >
      {item.label}
      {external && (
        <ArrowUpRight
          className="h-3.5 w-3.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
