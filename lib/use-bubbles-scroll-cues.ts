"use client";

import { useEffect, useState } from "react";
import { useMobileViewport } from "@/lib/use-mobile-viewport";

const SCROLL_HIDE_THRESHOLD = 120;

export function useBubblesScrollCuesActive(
  showSelection: boolean,
  isSelectionComplete: boolean,
  hasCategories: boolean,
) {
  const isMobile = useMobileViewport();
  const [scrolledPastCue, setScrolledPastCue] = useState(false);

  useEffect(() => {
    if (!showSelection || isSelectionComplete) {
      return;
    }

    function handleScroll() {
      if (window.scrollY > SCROLL_HIDE_THRESHOLD) {
        setScrolledPastCue(true);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSelection, isSelectionComplete]);

  useEffect(() => {
    if (!showSelection) {
      setScrolledPastCue(false);
    }
  }, [showSelection]);

  return (
    isMobile &&
    showSelection &&
    !isSelectionComplete &&
    !scrolledPastCue &&
    hasCategories
  );
}
