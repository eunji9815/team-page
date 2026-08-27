import type { MarketingEvent } from "../data/models";

export function sortEventsByDateDesc(events: MarketingEvent[]): MarketingEvent[] {
  return [...events].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export interface EventSummary {
  totalCount: number;
  totalViewCount?: number;
}

export function summarizeEvents(events: MarketingEvent[]): EventSummary {
  const viewCounts = events.map((e) => e.viewCount).filter((v): v is number => v != null);
  return {
    totalCount: events.length,
    totalViewCount: viewCounts.length > 0 ? viewCounts.reduce((sum, v) => sum + v, 0) : undefined,
  };
}
