import { ChartCard } from "../../components/ChartCard/ChartCard";
import { DataTable } from "../../components/DataTable/DataTable";
import { BarChart } from "../../components/charts/BarChart";
import { useDashboardData } from "../../data/DataProvider";
import { attachAdSpendDerived, splitByOwnership, type AdSpendRow } from "../../logic/advertising";

export function Company() {
  const dataset = useDashboardData();
  const { own } = splitByOwnership(dataset.adSpend);
  const rows = attachAdSpendDerived(own);

  const barData = rows
    .filter((r) => r.game && r.cost != null)
    .map((r) => ({ label: r.game as string, value: r.cost as number }));

  return (
    <>
      <ChartCard title="자사 게임/서비스별 광고비" description="자사 내부 게임 또는 서비스별 광고비를 비교합니다.">
        <BarChart
          data={barData}
          colorIndex={4}
          emptyTitle="자사 광고비 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 자사 게임/서비스별 광고비가 표시됩니다."
        />
      </ChartCard>

      <DataTable<AdSpendRow>
        rows={rows}
        getRowId={(row) => row.id}
        emptyTitle="자사비교 데이터가 없습니다"
        emptyDescription="데이터가 연결되면 자사 내부 광고비 관련 지표가 표시됩니다."
        columns={[
          { key: "game", header: "게임/서비스", render: (row) => row.game ?? "-" },
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
