import { ChartCard } from "../../components/ChartCard/ChartCard";
import { DataTable } from "../../components/DataTable/DataTable";
import { KpiCard } from "../../components/KpiCard/KpiCard";
import { KpiGrid } from "../../components/KpiCard/KpiGrid";
import { BarChart } from "../../components/charts/BarChart";
import { useDashboardData } from "../../data/DataProvider";
import { attachAdSpendDerived, summarizeAdSpend, type AdSpendRow } from "../../logic/advertising";

export function BMAdvertising() {
  const dataset = useDashboardData();
  const rows = attachAdSpendDerived(dataset.adSpend);
  const summary = summarizeAdSpend(dataset.adSpend);

  const barData = rows
    .filter((r) => r.company && r.cost != null)
    .map((r) => ({ label: r.company as string, value: r.cost as number }));

  return (
    <>
      <KpiGrid>
        <KpiCard label="누적 광고비" value={summary.totalCost} unit="원" />
        <KpiCard label="평균 증감률" value={summary.averageGrowthRate} unit="%" />
        <KpiCard label="집계 건수" value={summary.recordCount || undefined} unit="건" />
      </KpiGrid>

      <ChartCard title="회사별 광고비" description="회사별 광고비 규모를 비교합니다.">
        <BarChart
          data={barData}
          emptyTitle="광고비 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 회사별 광고비가 표시됩니다."
        />
      </ChartCard>

      <DataTable<AdSpendRow>
        rows={rows}
        getRowId={(row) => row.id}
        emptyTitle="광고비 데이터가 없습니다"
        emptyDescription="데이터가 연결되면 광고비 관련 테이블이 표시됩니다."
        columns={[
          { key: "company", header: "회사", render: (row) => row.company ?? "-" },
          { key: "game", header: "게임", render: (row) => row.game ?? "-" },
          { key: "platform", header: "플랫폼", render: (row) => row.platform ?? "-" },
          { key: "cost", header: "광고비", align: "right", render: (row) => row.cost?.toLocaleString("ko-KR") ?? "-" },
          {
            key: "growthRate",
            header: "증감률",
            align: "right",
            render: (row) => (row.growthRate != null ? `${row.growthRate.toFixed(1)}%` : "-"),
          },
          { key: "period", header: "기간", render: (row) => row.period ?? "-" },
        ]}
      />
    </>
  );
}
