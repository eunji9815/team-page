import { KpiCard } from "../../components/KpiCard/KpiCard";
import { KpiGrid } from "../../components/KpiCard/KpiGrid";
import { useDashboardData } from "../../data/DataProvider";
import { buildOverviewSummary } from "../../logic/overview";

export function Advertising() {
  const dataset = useDashboardData();
  const summary = buildOverviewSummary(dataset);

  return (
    <KpiGrid>
      <KpiCard label="누적 광고비" value={summary.adSummary.totalCost} unit="원" />
      <KpiCard label="평균 증감률" value={summary.adSummary.averageGrowthRate} unit="%" />
    </KpiGrid>
  );
}
