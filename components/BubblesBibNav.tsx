"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BUBBLES_BIB_SECTIONS,
  type BubblesBibSectionId,
} from "@/lib/bubbles-bib";

function scrollToSection(id: BubblesBibSectionId) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function BubblesBibNav() {
  const [activeSection, setActiveSection] =
    useState<BubblesBibSectionId>("wat-is-bubbles");

  const observeSections = useCallback(() => {
    const sectionElements = BUBBLES_BIB_SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visible[0];

        if (topEntry?.target.id) {
          setActiveSection(topEntry.target.id as BubblesBibSectionId);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.08, 0.2, 0.4],
      },
    );

    for (const element of sectionElements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observeSections();
    return cleanup;
  }, [observeSections]);

  return (
    <div className="relative z-40 mb-8 sm:mb-10">
      <nav
        aria-label="Bubbles Bib afdelings"
        className="sticky top-[4.75rem] -mx-5 border-b-4 border-komma-black/10 bg-komma-yellow px-5 py-3 shadow-[0_8px_0_0_rgba(0,0,0,0.04)] backdrop-blur-sm sm:-mx-8 sm:px-8"
      >
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain py-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BUBBLES_BIB_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "shrink-0 rounded-full border-4 border-komma-black px-4 py-2.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-all sm:px-5 sm:py-3 sm:text-base",
                  isActive
                    ? "bg-komma-pink text-white shadow-[4px_4px_0_0_#000]"
                    : "bg-white hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493]",
                ].join(" ")}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
