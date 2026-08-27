import { ChartCard } from "../../components/ChartCard/ChartCard";
import { DataTable } from "../../components/DataTable/DataTable";
import { BarChart } from "../../components/charts/BarChart";
import { useDashboardData } from "../../data/DataProvider";
import { attachAdSpendDerived, splitByOwnership, type AdSpendRow } from "../../logic/advertising";

export function Competitor() {
  const dataset = useDashboardData();
  const { competitor } = splitByOwnership(dataset.adSpend);
  const rows = attachAdSpendDerived(competitor);

  const barData = rows
    .filter((r) => r.company && r.cost != null)
    .map((r) => ({ label: r.company as string, value: r.cost as number }));

  return (
    <>
      <ChartCard title="타사 광고비 비교" description="자사와 타사의 광고비 규모를 비교합니다.">
        <BarChart
          data={barData}
          colorIndex={2}
          emptyTitle="타사 광고비 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 타사 광고비 비교가 표시됩니다."
        />
      </ChartCard>

      <DataTable<AdSpendRow>
        rows={rows}
        getRowId={(row) => row.id}
        emptyTitle="타사비교 데이터가 없습니다"
        emptyDescription="데이터가 연결되면 타사 광고비 관련 지표가 표시됩니다."
        columns={[
          { key: "company", header: "회사", render: (row) => row.company ?? "-" },
          { key: "game", header: "게임", render: (row) => row.game ?? "-" },
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
