"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-grey-light rounded-xl border border-grey-light bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={buttonId}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-red transition-transform", isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm leading-relaxed text-grey-medium"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
