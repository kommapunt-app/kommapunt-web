"use client";

import { useEffect, useId, useState } from "react";
import { SiteMenuIcon } from "@/components/SiteMenuIcons";
import { SITE_MENU_ITEMS } from "@/lib/navigation";

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-white transition-transform hover:scale-105 active:scale-95"
        aria-label={open ? "Sluit menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 rounded-full bg-komma-black" />
          <span className="block h-0.5 w-5 rounded-full bg-komma-black" />
          <span className="block h-0.5 w-3 rounded-full bg-komma-black" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-komma-black/40"
            aria-label="Sluit menu"
            onClick={closeMenu}
          />

          <nav
            id={menuId}
            aria-label="Hoof navigasie"
            className="fixed right-0 top-0 flex h-dvh w-[70vw] min-w-[15.5rem] max-w-[18rem] flex-col border-l-4 border-komma-black bg-komma-yellow px-5 py-7 shadow-[-6px_0_0_0_#FF1493] sm:w-[22rem] sm:max-w-[22rem] sm:px-6 sm:py-8"
          >
            <div className="mb-7 flex justify-end sm:mb-8">
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Sluit menu"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-white text-xl font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                ×
              </button>
            </div>

            <ul className="flex w-full flex-col gap-3 sm:gap-4">
              {SITE_MENU_ITEMS.map((item) => (
                <li key={item.href} className="w-full">
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="flex w-full items-center gap-3 rounded-2xl border-4 border-komma-black bg-white px-4 py-3.5 text-left text-base font-extrabold shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#FF1493] active:scale-[0.98] active:shadow-[3px_3px_0_0_#000] sm:px-5 sm:py-4 sm:text-lg"
                  >
                    <SiteMenuIcon id={item.icon} />
                    <span className="min-w-0 leading-tight">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
