"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function WaardesPlakkateCta() {
  return (
    <Link
      href="/plakkate"
      onClick={() => trackEvent({ name: "cta_waardes_to_plakkate" })}
      className="inline-flex items-center justify-center rounded-full border-4 border-komma-black bg-komma-yellow px-6 py-3 text-base font-extrabold shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#FF1493] sm:px-8 sm:py-4 sm:text-lg"
    >
      Verken al die Bubbleblaaie
    </Link>
  );
}
