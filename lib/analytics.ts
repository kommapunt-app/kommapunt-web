export type AnalyticsEvent =
  | { name: "poster_opened"; posterId: string }
  | { name: "poster_downloaded"; posterId: string }
  | { name: "poster_search"; query: string }
  | { name: "cta_waardes_to_plakkate" }
  | { name: "cta_plakkate_to_waardes" }
  | { name: "cta_poster_to_value_map"; posterId: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("komma:analytics", {
      detail: event,
    }),
  );

  if (process.env.NODE_ENV === "development") {
    console.info("[komma analytics]", event);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: event.name,
      ...event,
    });
  }
}
