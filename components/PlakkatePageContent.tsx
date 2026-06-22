"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { PosterViewerModal } from "@/components/PosterViewerModal";
import {
  type ValuePosterEntry,
  VALUE_POSTERS,
  searchValuePosters,
} from "@/data/value-posters";
import { trackEvent } from "@/lib/analytics";

export function PlakkatePageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activePosterId, setActivePosterId] = useState<string | null>(null);
  const lastTrackedSearch = useRef("");
  const lastOpenedPoster = useRef<string | null>(null);

  const filteredPosters = useMemo(() => searchValuePosters(query), [query]);

  const activePoster = activePosterId
    ? VALUE_POSTERS.find((poster) => poster.id === activePosterId) ?? null
    : null;

  useEffect(() => {
    const posterId = searchParams.get("poster");

    if (!posterId) {
      return;
    }

    setActivePosterId(posterId);
  }, [searchParams]);

  useEffect(() => {
    if (!activePosterId || activePosterId === lastOpenedPoster.current) {
      return;
    }

    lastOpenedPoster.current = activePosterId;
    trackEvent({ name: "poster_opened", posterId: activePosterId });
  }, [activePosterId]);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      lastTrackedSearch.current = "";
      return;
    }

    const timer = window.setTimeout(() => {
      if (normalizedQuery === lastTrackedSearch.current) {
        return;
      }

      lastTrackedSearch.current = normalizedQuery;
      trackEvent({ name: "poster_search", query: normalizedQuery });
    }, 600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <header className="mb-8 sm:mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Bubbleblaaie
        </h1>
        <p className="mt-3 max-w-2xl text-base text-komma-black/80 sm:text-lg">
          KommaPunt Bubbleblaaie &mdash; eenblad-opsommings van individuele
          waardes.
        </p>

        <div className="mt-5">
          <Link
            href="/waardes#die-bubbles"
            onClick={() => trackEvent({ name: "cta_plakkate_to_waardes" })}
            className="inline-flex items-center justify-center rounded-full border-4 border-komma-black bg-white px-6 py-3 text-base font-extrabold shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[5px_5px_0_0_#FF1493] sm:px-8 sm:py-3.5 sm:text-lg"
          >
            Verken die Waardekaart
          </Link>
        </div>

        <label className="mt-6 block">
          <span className="sr-only">Soek vir &apos;n waarde</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Soek vir 'n waarde..."
            className="w-full rounded-2xl border-4 border-komma-black bg-white px-5 py-4 text-base font-semibold shadow-[4px_4px_0_0_#000] outline-none transition-shadow placeholder:text-komma-black/40 focus:shadow-[5px_5px_0_0_#FF1493] sm:text-lg"
          />
        </label>
      </header>

      {filteredPosters.length === 0 ? (
        <div className="rounded-[2rem] border-4 border-komma-black bg-[#F5F5F0] px-6 py-10 text-center shadow-[6px_6px_0_0_#000] sm:px-8">
          <p className="text-lg font-extrabold sm:text-xl">
            🧐 Geen Bubbleblaaie gevind nie.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 rounded-full border-4 border-komma-black bg-komma-yellow px-6 py-3 text-base font-extrabold shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#FF1493]"
          >
            Maak soektog skoon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredPosters.map((poster) => (
            <PosterCard
              key={poster.id}
              poster={poster}
              onOpen={() => setActivePosterId(poster.id)}
            />
          ))}
        </div>
      )}

      <PosterViewerModal
        open={activePoster !== null}
        poster={activePoster}
        onClose={() => setActivePosterId(null)}
      />
    </>
  );
}

function PosterCard({
  poster,
  onOpen,
}: {
  poster: ValuePosterEntry;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group overflow-hidden rounded-[1.5rem] border-4 border-komma-black bg-white text-left shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:border-komma-pink hover:shadow-[6px_6px_0_0_#FF1493]"
    >
      <div className="flex items-center justify-center bg-[#F5F5F0] p-3 sm:p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster.image_url}
          alt={`${poster.name_af} Bubbleblad`}
          className="aspect-[3/4] w-full max-w-[280px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="border-t-4 border-komma-black px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-base font-extrabold sm:text-lg">{poster.name_af}</p>
        <p className="mt-1 text-sm font-semibold text-komma-pink sm:text-base">
          {poster.name_en}
        </p>
      </div>
    </button>
  );
}
