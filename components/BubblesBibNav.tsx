"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BUBBLES_BIB_SECTIONS,
  getActiveBubblesBibSectionId,
} from "@/lib/bubbles-bib";

const PILL_BASE_CLASS =
  "shrink-0 rounded-full border-4 border-komma-black px-4 py-2.5 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-all sm:px-5 sm:py-3 sm:text-base";

const PILL_ACTIVE_CLASS =
  "bg-komma-pink text-white shadow-[4px_4px_0_0_#000]";

const PILL_INACTIVE_CLASS =
  "bg-white hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[4px_4px_0_0_#FF1493]";

export function BubblesBibNav() {
  const pathname = usePathname();
  const activeSectionId = getActiveBubblesBibSectionId(pathname);

  return (
    <div className="relative z-40 mb-8 sm:mb-10">
      <nav
        aria-label="Bubbles Bib afdelings"
        className="sticky top-[4.75rem] -mx-5 border-b-4 border-komma-black/10 bg-komma-yellow px-5 py-3 shadow-[0_8px_0_0_rgba(0,0,0,0.04)] backdrop-blur-sm sm:-mx-8 sm:px-8"
      >
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain py-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BUBBLES_BIB_SECTIONS.map((section) => {
            const isActive = activeSectionId === section.id;

            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={isActive ? "page" : undefined}
                className={`${PILL_BASE_CLASS} ${
                  isActive ? PILL_ACTIVE_CLASS : PILL_INACTIVE_CLASS
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
