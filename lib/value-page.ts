import type { Metadata } from "next";
import type { ValueGuideEntry } from "@/lib/values-guide";

export function getValuePageUrl(valueId: string): string {
  return `/waardes/${encodeURIComponent(valueId)}`;
}

export function getValuePageTitle(value: ValueGuideEntry): string {
  return `${value.nameAf} | KommaPunt`;
}

export function getValuePageDescription(value: ValueGuideEntry): string {
  return `What does ${value.nameEn} mean? Learn how this value influences decisions, priorities and viewpoints.`;
}

export function getValuePageMetadata(value: ValueGuideEntry): Metadata {
  const title = getValuePageTitle(value);
  const description = getValuePageDescription(value);
  const url = getValuePageUrl(value.id);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
