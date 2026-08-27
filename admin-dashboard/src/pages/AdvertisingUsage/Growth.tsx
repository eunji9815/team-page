import { ChartCard } from "../../components/ChartCard/ChartCard";
import { DataTable } from "../../components/DataTable/DataTable";
import { LineChart } from "../../components/charts/LineChart";
import { useDashboardData } from "../../data/DataProvider";
import { attachAdSpendDerived, buildCostByPeriod, type AdSpendRow } from "../../logic/advertising";

export function Growth() {
  const dataset = useDashboardData();
  const rows = attachAdSpendDerived(dataset.adSpend);
  const periodPoints = buildCostByPeriod(dataset.adSpend);

  return (
    <>
      <ChartCard title="기간별 광고비 추이" description="기간에 따른 광고비 변화를 자동으로 계산하여 보여줍니다.">
        <LineChart
          series={
            periodPoints.length > 0
              ? [{ name: "총 광고비", points: periodPoints.map((p) => ({ x: p.period, y: p.totalCost })) }]
              : []
          }
          emptyTitle="광고비 증감 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 기간별 광고비 추이가 표시됩니다."
        />
      </ChartCard>

      <DataTable<AdSpendRow>
        rows={rows}
        getRowId={(row) => row.id}
        emptyTitle="광고비 증감률 데이터가 없습니다"
        emptyDescription="데이터가 연결되면 기간별 광고비 증감률이 자동으로 계산되어 표시됩니다."
        columns={[
          { key: "company", header: "회사", render: (row) => row.company ?? "-" },
          { key: "period", header: "기간", render: (row) => row.period ?? "-" },
          { key: "cost", header: "광고비", align: "right", render: (row) => row.cost?.toLocaleString("ko-KR") ?? "-" },
          {
            key: "previousCost",
            header: "이전 광고비",
            align: "right",
            render: (row) => row.previousCost?.toLocaleString("ko-KR") ?? "-",
          },
          {
            key: "costChange",
            header: "증감",
            align: "right",
            render: (row) => row.costChange?.toLocaleString("ko-KR") ?? "-",
          },
          {
            key: "growthRate",
            header: "증감률",
            align: "right",
            render: (row) => (row.growthRate != null ? `${row.growthRate.toFixed(1)}%` : "-"),
          },
        ]}
      />
    </>
  );
}
