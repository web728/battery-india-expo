"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { X, ChevronDown } from "lucide-react";
import { mainNav } from "@/lib/content/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  // Memoize navigation links to prevent array drop or filter glitches on client-side page change
  const cachedNav = useMemo(() => {
    return Array.isArray(mainNav) ? [...mainNav] : [];
  }, []);

  useEffect(() => {
    // Body scroll freeze
    document.body.style.overflow = "hidden";
    
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[60] flex flex-col bg-navy-dark lg:hidden" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Mobile navigation"
    >
      {/* Top Bar Wrapper - Layout Edges Fix */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-lg font-bold text-white">Menu</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Nav Scroller Grid */}
      <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6">
        <ul className="flex flex-col divide-y divide-white/10">
          {cachedNav.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isCurrentOpen = openItem === item.href;

            return (
              <li key={item.href} className="block">
                <div className="flex items-center justify-between py-3.5">
                  <Link 
                    href={item.href} 
                    onClick={onClose}
                    className="flex-1 text-base font-medium text-white/90 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>

                  {hasChildren && (
                    <button
                      type="button"
                      aria-expanded={isCurrentOpen}
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() => setOpenItem(isCurrentOpen ? null : item.href)}
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-white/70 transition-colors hover:text-white"
                    >
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 transition-transform duration-200", 
                          isCurrentOpen && "rotate-180 text-red"
                        )} 
                      />
                    </button>
                  )}
                </div>

                {/* Submenu rendering logic */}
               {/* Submenu rendering logic - Safe TypeScript Array check */}
{hasChildren && item.children && (
  <ul className="mb-3 mt-1 flex flex-col gap-1 border-l-2 border-white/10 pl-4">
    {item.children.map((child) => (
      <li key={child.href}>
        <Link
          href={child.href}
          onClick={onClose}
          className="block py-2.5 text-sm text-white/70 transition-colors hover:text-white"
        >
          {child.label}
        </Link>
      </li>
    ))}
  </ul>
)}
              </li>
            );
          })}
        </ul>

        {/* Action Buttons Footer inside Mobile Menu */}
        <div className="mt-8 flex flex-col gap-3">
          <Button 
            href="/exhibit/book-a-stand" 
            variant="primary" 
            className="w-full justify-center py-3"
          >
            Book a Stand
          </Button>
          <Button 
            href="/visit/register" 
            variant="outline-white" 
            className="w-full justify-center py-3"
          >
            Register to Visit
          </Button>
        </div>
      </nav>
    </div>
  );
}