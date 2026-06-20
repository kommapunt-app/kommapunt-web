"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  PotgooiIconRow,
  PotgooiIconWrapper,
  PotgooiMobileConnector,
} from "@/components/KommaPuntIcons";
import { POTGOOI_SYMBOLS, type PotgooiSymbolBlock } from "@/lib/potgooi-content";

function SymbolCardBody({ blocks }: { blocks: readonly PotgooiSymbolBlock[] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-komma-black/85 sm:text-lg">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return <p key={index}>{block.text}</p>;
        }

        return (
          <ul
            key={index}
            className="space-y-1 font-semibold text-komma-black/90"
            aria-label="Kernpunte"
          >
            {block.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

function SymbolCard({
  title,
  blocks,
  columnIndex,
  cardRef,
}: {
  title: string;
  blocks: readonly PotgooiSymbolBlock[];
  columnIndex: number;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      className={`potgooi-col potgooi-col-${columnIndex} group w-full rounded-[2rem] border-4 border-komma-black bg-white p-5 shadow-[6px_6px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:border-komma-pink/40 hover:shadow-[6px_6px_0_0_#FF1493] active:-translate-y-1 active:shadow-[6px_6px_0_0_#FF1493] sm:p-6`}
    >
      <h3 className="mb-4 text-xl font-extrabold tracking-tight sm:text-2xl">
        {title}
      </h3>
      <SymbolCardBody blocks={blocks} />
    </article>
  );
}

type ConnectorPath = {
  d: string;
  index: number;
};

function buildRoundedConnectorPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  index: number,
): string {
  const radius = 8;
  const drop = 18 + index * 14;
  const bendY = Math.min(startY + drop, endY - radius * 2);

  if (Math.abs(endX - startX) < 1) {
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  const goingRight = endX > startX;

  return [
    `M ${startX} ${startY}`,
    `L ${startX} ${bendY - radius}`,
    `Q ${startX} ${bendY} ${startX + (goingRight ? radius : -radius)} ${bendY}`,
    `L ${endX + (goingRight ? -radius : radius)} ${bendY}`,
    `Q ${endX} ${bendY} ${endX} ${bendY + radius}`,
    `L ${endX} ${endY}`,
  ].join(" ");
}

function PotgooiMobileColumn({
  id,
  title,
  blocks,
  columnIndex,
}: {
  id: (typeof POTGOOI_SYMBOLS)[number]["id"];
  title: string;
  blocks: readonly PotgooiSymbolBlock[];
  columnIndex: number;
}) {
  return (
    <div className="group flex flex-col items-center overflow-visible">
      <PotgooiIconWrapper
        id={id}
        className="pt-6 pb-4 transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-105"
      />
      <PotgooiMobileConnector className="group-hover:text-komma-pink group-active:text-komma-pink" />
      <SymbolCard title={title} blocks={blocks} columnIndex={columnIndex} />
    </div>
  );
}

function PotgooiDesktopDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [connectorPaths, setConnectorPaths] = useState<ConnectorPath[]>([]);

  useLayoutEffect(() => {
    function updateConnectors() {
      const diagram = diagramRef.current;
      if (!diagram) return;

      const diagramRect = diagram.getBoundingClientRect();
      const paths: ConnectorPath[] = [];

      POTGOOI_SYMBOLS.forEach((_, index) => {
        const iconEl = iconRefs.current[index];
        const cardEl = cardRefs.current[index];
        if (!iconEl || !cardEl) return;

        const iconRect = iconEl.getBoundingClientRect();
        const cardRect = cardEl.getBoundingClientRect();

        const startX = iconRect.left + iconRect.width / 2 - diagramRect.left;
        const startY = iconRect.bottom - diagramRect.top;
        const endX = cardRect.left + cardRect.width / 2 - diagramRect.left;
        const endY = cardRect.top - diagramRect.top + 2;

        paths.push({
          index,
          d: buildRoundedConnectorPath(startX, startY, endX, endY, index),
        });
      });

      setConnectorPaths(paths);
    }

    updateConnectors();

    const observer = new ResizeObserver(updateConnectors);
    if (diagramRef.current) {
      observer.observe(diagramRef.current);
    }

    window.addEventListener("resize", updateConnectors);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateConnectors);
    };
  }, []);

  return (
    <div
      ref={diagramRef}
      className="potgooi-diagram relative mx-auto w-full max-w-6xl overflow-visible"
    >
      <PotgooiIconRow icons={POTGOOI_SYMBOLS} iconRefs={iconRefs} />

      {connectorPaths.length > 0 ? (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 h-full w-full text-komma-black"
          style={{ overflow: "visible" }}
        >
          {connectorPaths.map(({ d, index }) => (
            <path
              key={index}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`potgooi-connector-path potgooi-connector-path-${index}`}
            />
          ))}
        </svg>
      ) : null}

      <div className="relative z-10 grid grid-cols-4 gap-6 pt-16 xl:gap-8">
        {POTGOOI_SYMBOLS.map((symbol, index) => (
          <SymbolCard
            key={symbol.id}
            title={symbol.title}
            blocks={symbol.blocks}
            columnIndex={index}
            cardRef={(el) => {
              cardRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function PotgooiDiagram() {
  return (
    <>
      <div className="space-y-14 overflow-visible sm:space-y-16 lg:hidden">
        {POTGOOI_SYMBOLS.map((symbol, index) => (
          <PotgooiMobileColumn
            key={symbol.id}
            id={symbol.id}
            title={symbol.title}
            blocks={symbol.blocks}
            columnIndex={index}
          />
        ))}
      </div>

      <div className="hidden overflow-visible lg:block">
        <PotgooiDesktopDiagram />
      </div>
    </>
  );
}
