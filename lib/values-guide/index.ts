export * from "./types";
export * from "./intro";
export * from "./categories";
export * from "./labels";
export * from "./values";
export * from "./bubble-category";

import { VALUE_GUIDE_CATEGORIES } from "./categories";
import type { ValueGuideCategoryId, ValueGuideEntry } from "./types";
import { VALUE_GUIDE } from "./values";

export function groupValuesGuideByCategory(values: ValueGuideEntry[]) {
  return VALUE_GUIDE_CATEGORIES.map((category) => ({
    category,
    values: values.filter((value) => value.category === category.id),
  })).filter((group) => group.values.length > 0);
}

export function getCategoryById(id: ValueGuideCategoryId) {
  return VALUE_GUIDE_CATEGORIES.find((category) => category.id === id);
}

export function getAllValueGuideIds() {
  return VALUE_GUIDE.map((entry) => entry.id);
}
