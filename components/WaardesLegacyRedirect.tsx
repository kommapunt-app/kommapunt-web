"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function WaardesLegacyRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const valueId = searchParams.get("value");
    const hash = window.location.hash;

    if (valueId || hash === "#die-bubbles") {
      const params = valueId
        ? `?value=${encodeURIComponent(valueId)}`
        : "";
      router.replace(`/waardes/die-bubbles${params}`);
    }
  }, [router, searchParams]);

  return null;
}
