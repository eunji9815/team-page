import { ChartCard } from "../../components/ChartCard/ChartCard";
import { DataTable } from "../../components/DataTable/DataTable";
import { LineChart } from "../../components/charts/LineChart";
import { useDashboardData } from "../../data/DataProvider";
import { buildRankComparisonSeries, buildRankComparisonTable } from "../../logic/comparison";
import type { RankComparisonRow } from "../../logic/comparison";

export function RankComparison() {
  const dataset = useDashboardData();
  const series = buildRankComparisonSeries(dataset.games);
  const rows = buildRankComparisonTable(dataset.games);

  return (
    <>
      <ChartCard title="기간별 순위 변화" description="게임별 순위 추이를 기간에 따라 비교합니다.">
        <LineChart
          series={series.map((s) => ({ name: s.name, points: s.points.map((p) => ({ x: p.period, y: p.rank })) }))}
          emptyTitle="순위 변화 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 게임별 순위 변화 추이가 표시됩니다."
        />
      </ChartCard>

      <DataTable<RankComparisonRow>
        rows={rows}
        getRowId={(row) => row.name}
        emptyTitle="순위 비교 데이터가 없습니다"
        emptyDescription="데이터가 연결되면 게임별 순위 비교표가 표시됩니다."
        columns={[
          { key: "name", header: "게임명", render: (row) => row.name },
          { key: "currentRank", header: "현재 순위", align: "right", render: (row) => row.currentRank ?? "-" },
          { key: "previousRank", header: "이전 순위", align: "right", render: (row) => row.previousRank ?? "-" },
          {
            key: "rankChange",
            header: "상승/하락",
            align: "right",
            render: (row) =>
              row.rankChange == null ? "-" : row.rankChange > 0 ? `▲ ${row.rankChange}` : row.rankChange < 0 ? `▼ ${Math.abs(row.rankChange)}` : "- 동일",
          },
        ]}
      />
    </>
  );
}
