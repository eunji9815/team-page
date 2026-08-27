import type { DashboardDataset } from "../data/models";
import { summarizeAdSpend } from "./advertising";
import { attachRankChange, sortByCurrentRank } from "./ranking";

export interface KpiSummary {
  label: string;
  value?: number;
  unit?: string;
}

export interface OverviewSummary {
  hasAnyData: boolean;
  kpis: KpiSummary[];
  topGames: ReturnType<typeof sortByCurrentRank>;
  adSummary: ReturnType<typeof summarizeAdSpend>;
  insightCount: number;
  conclusionCount: number;
}

/**
 * Aggregates every domain dataset into the small summary shape the
 * Overview page renders. Any field left `undefined` (because no data has
 * been connected yet) is rendered as a Skeleton/EmptyState by the UI —
 * this layer never invents a placeholder number.
 */
export function buildOverviewSummary(dataset: DashboardDataset): OverviewSummary {
  const rankedGames = sortByCurrentRank(attachRankChange(dataset.games));
  const adSummary = summarizeAdSpend(dataset.adSpend);

  const kpis: KpiSummary[] = [
    { label: "추적 중인 게임 수", value: dataset.games.length || undefined, unit: "개" },
    { label: "누적 광고비", value: adSummary.totalCost, unit: "원" },
    {
      label: "평균 광고비 증감률",
      value: adSummary.averageGrowthRate,
      unit: "%",
    },
    { label: "등록된 인사이트", value: dataset.insights.length || undefined, unit: "건" },
  ];

  return {
    hasAnyData:
      dataset.games.length > 0 ||
      dataset.adSpend.length > 0 ||
      dataset.platforms.length > 0 ||
      dataset.insights.length > 0,
    kpis,
    topGames: rankedGames.slice(0, 5),
    adSummary,
    insightCount: dataset.insights.length,
    conclusionCount: dataset.conclusions.length,
  };
}
