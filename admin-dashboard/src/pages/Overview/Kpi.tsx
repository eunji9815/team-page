import { KpiCard } from "../../components/KpiCard/KpiCard";
import { KpiGrid } from "../../components/KpiCard/KpiGrid";
import { useDashboardData } from "../../data/DataProvider";
import { buildOverviewSummary } from "../../logic/overview";

export function Kpi() {
  const dataset = useDashboardData();
  const summary = buildOverviewSummary(dataset);

  return (
    <KpiGrid>
      {summary.kpis.map((kpi) => (
        <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} />
      ))}
    </KpiGrid>
  );
}
