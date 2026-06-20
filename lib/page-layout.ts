/**
 * Shared Komma page grid — keep logo, titles, and content on one left edge.
 *
 * Usage:
 * <header><PageContainer className="...">logo</PageContainer></header>
 * <main><PageContainer className="...">title</PageContainer></main>
 */

/** Horizontal inset from viewport edge: 20px mobile, 32px desktop */
export const PAGE_GUTTER_CLASS = "px-5 sm:px-8";

/** Centered content column width */
export const PAGE_MAX_WIDTH_CLASS = "mx-auto w-full max-w-7xl";

/** Inner column — place inside an element with PAGE_GUTTER_CLASS */
export const PAGE_CONTAINER_CLASS = PAGE_MAX_WIDTH_CLASS;

/** Aligns children to the shared right edge of the page grid */
export const PAGE_RIGHT_RAIL_CLASS = `${PAGE_CONTAINER_CLASS} flex justify-end`;
