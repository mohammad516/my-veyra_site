"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "../posts";

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 lg:space-y-5">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-colors duration-300 ${
              isOpen
                ? "border-blue-500/60 dark:border-blue-400/50 shadow-lg shadow-blue-500/5"
                : "border-neutral-200 dark:border-neutral-700"
            } bg-white dark:bg-neutral-800/50`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 sm:gap-5 px-4 sm:px-6 py-5 lg:py-6 text-left"
            >
              <span className="flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 text-white text-base lg:text-lg font-bold flex items-center justify-center shadow-md">
                {i + 1}
              </span>
              <span className="flex-1 text-base sm:text-lg lg:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 h-9 w-9 lg:h-10 lg:w-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "border-blue-500 text-blue-500 rotate-45"
                    : "border-neutral-300 dark:border-neutral-600 text-neutral-400 dark:text-neutral-500"
                }`}
              >
                <Plus className="h-5 w-5" strokeWidth={2.5} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 sm:px-6 pb-5 lg:pb-6 pl-[4.5rem] sm:pl-[5.25rem] lg:pl-[5.75rem] text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
