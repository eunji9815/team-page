import type { AdSpend, Trend } from "../data/models";
import { deriveTrendFromDelta } from "./ranking";

export interface AdSpendRow extends AdSpend {
  costChange?: number;
  growthRate?: number;
  trend: Trend;
}

export function computeGrowthRate(current?: number, previous?: number): number | undefined {
  if (current == null || previous == null || previous === 0) return undefined;
  return ((current - previous) / previous) * 100;
}

export function attachAdSpendDerived(records: AdSpend[]): AdSpendRow[] {
  return records.map((record) => {
    const costChange =
      record.cost != null && record.previousCost != null
        ? record.cost - record.previousCost
        : undefined;
    const growthRate = computeGrowthRate(record.cost, record.previousCost);
    return {
      ...record,
      costChange,
      growthRate,
      trend: deriveTrendFromDelta(costChange),
    };
  });
}

export function splitByOwnership(records: AdSpend[]): {
  own: AdSpend[];
  competitor: AdSpend[];
} {
  return {
    own: records.filter((r) => r.isOwnCompany === true),
    competitor: records.filter((r) => r.isOwnCompany === false),
  };
}

export interface AdSpendSummary {
  totalCost?: number;
  averageGrowthRate?: number;
  recordCount: number;
}

export function summarizeAdSpend(records: AdSpend[]): AdSpendSummary {
  const costs = records.map((r) => r.cost).filter((v): v is number => v != null);
  const rows = attachAdSpendDerived(records);
  const growthRates = rows.map((r) => r.growthRate).filter((v): v is number => v != null);

  return {
    totalCost: costs.length > 0 ? costs.reduce((sum, c) => sum + c, 0) : undefined,
    averageGrowthRate:
      growthRates.length > 0 ? growthRates.reduce((sum, g) => sum + g, 0) / growthRates.length : undefined,
    recordCount: records.length,
  };
}

export interface PeriodCostPoint {
  period: string;
  totalCost: number;
}

/** Aggregates total ad cost per period, sorted chronologically by label. */
export function buildCostByPeriod(records: AdSpend[]): PeriodCostPoint[] {
  const byPeriod = new Map<string, number>();
  records.forEach((record) => {
    if (!record.period || record.cost == null) return;
    byPeriod.set(record.period, (byPeriod.get(record.period) ?? 0) + record.cost);
  });
  return Array.from(byPeriod.entries())
    .map(([period, totalCost]) => ({ period, totalCost }))
    .sort((a, b) => a.period.localeCompare(b.period));
}

export interface GameSeries {
  name: string;
  points: { x: string; y: number }[];
}

/** Groups per-game creative-count records by game across periods, for a trend chart. */
export function buildCreativeCountSeries(records: AdSpend[]): GameSeries[] {
  const byGame = new Map<string, { x: string; y: number }[]>();
  records.forEach((record) => {
    if (!record.game || !record.period || record.creativeCount == null) return;
    const points = byGame.get(record.game) ?? [];
    points.push({ x: record.period, y: record.creativeCount });
    byGame.set(record.game, points);
  });
  return Array.from(byGame.entries()).map(([name, points]) => ({
    name,
    points: points.sort((a, b) => a.x.localeCompare(b.x)),
  }));
}
