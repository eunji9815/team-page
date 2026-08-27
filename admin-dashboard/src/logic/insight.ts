import type { ConclusionEntry, InsightEntry } from "../data/models";

export interface InsightGroup {
  category: string;
  items: InsightEntry[];
}

export function groupInsightsByCategory(entries: InsightEntry[]): InsightGroup[] {
  const byCategory = new Map<string, InsightEntry[]>();
  entries.forEach((entry) => {
    const category = entry.category ?? "기타";
    const items = byCategory.get(category) ?? [];
    items.push(entry);
    byCategory.set(category, items);
  });
  return Array.from(byCategory.entries()).map(([category, items]) => ({ category, items }));
}

export function hasConclusions(entries: ConclusionEntry[]): boolean {
  return entries.length > 0;
}
