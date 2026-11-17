
"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   COMPONENT: FAQ ACCORDION
   FILE: components/ui/accordion.tsx

   DESIGN SYSTEM:
   Hybrid Industrial Editorial

   COLORS:
   - Heading: #191C21
   - Muted text: #626873
   - Brand red: #C62832
   - Border: #E4E2DE

   FEATURES:
   - Accessible interactive questions
   - One question open at a time
   - First question open by default
   - Smooth CSS-only transitions
   - Reduced-motion support
   - No Framer Motion dependency

   Compatible with:
   <Accordion items={group.items} />
================================================== */

export type AccordionItem = {
  question: string;
  answer: string;
};

export type AccordionProps = {
  items: readonly AccordionItem[];
  defaultOpenIndex?: number | null;
};

export function Accordion({
  items,
  defaultOpenIndex = 0,
}: AccordionProps) {
  const baseId = useId();

  const [openIndex, setOpenIndex] =
    useState<number | null>(defaultOpenIndex);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={buttonId}
            className={[
              "border-b border-[#E4E2DE]",
              "last:border-b-0",
            ].join(" ")}
          >
            {/* FAQ QUESTION */}

            <h4 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenIndex(
                    isOpen ? null : index
                  )
                }
                className={[
                  "group flex w-full",
                  "min-h-[68px]",
                  "items-center justify-between",
                  "gap-5",
                  "py-5",
                  "text-left",
                  "font-heading",
                  "text-[15px] font-bold",
                  "leading-[1.55]",
                  "tracking-[-0.015em]",
                  "text-foreground",
                  "transition-colors duration-200",
                  "hover:text-brand-red",
                  "focus-visible:rounded-sm",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-2",
                  "focus-visible:outline-brand-red",
                  "sm:text-base",
                ].join(" ")}
              >
                <span className="min-w-0 flex-1">
                  {item.question}
                </span>

                {/* Expand / collapse icon */}

                <span
                  aria-hidden="true"
                  className={[
                    "flex h-8 w-8",
                    "shrink-0",
                    "items-center justify-center",
                    "rounded-md",
                    "border",
                    "transition-[background-color,border-color,color]",
                    "duration-200",
                    isOpen
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-[#E4E2DE] bg-background text-muted group-hover:border-brand-red group-hover:text-brand-red",
                  ].join(" ")}
                >
                  <ChevronDown
                    className={[
                      "h-4 w-4",
                      "transition-transform duration-200",
                      "motion-reduce:transition-none",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                    strokeWidth={1.8}
                  />
                </span>
              </button>
            </h4>

            {/* FAQ ANSWER */}

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={[
                "grid",
                "transition-[grid-template-rows,opacity]",
                "duration-300",
                "ease-out",
                "motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[850px] pb-6 pr-10 font-body text-sm leading-[1.85] text-muted sm:text-[15px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
