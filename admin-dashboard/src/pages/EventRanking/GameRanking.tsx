import { DataTable } from "../../components/DataTable/DataTable";
import { useDashboardData } from "../../data/DataProvider";
import { attachRankChange, sortByCurrentRank } from "../../logic/ranking";
import type { RankedGameRow } from "../../logic/ranking";

const trendLabel: Record<RankedGameRow["rankTrend"], string> = {
  up: "▲ 상승",
  down: "▼ 하락",
  same: "- 동일",
  unknown: "-",
};

export function GameRanking() {
  const dataset = useDashboardData();
  const rows = sortByCurrentRank(attachRankChange(dataset.games));

  return (
    <DataTable<RankedGameRow>
      rows={rows}
      getRowId={(row) => row.id}
      emptyTitle="게임순위 데이터가 없습니다"
      emptyDescription="데이터가 연결되면 게임별 순위가 표시됩니다."
      columns={[
        { key: "name", header: "게임명", render: (row) => row.name ?? "-" },
        { key: "currentRank", header: "현재 순위", align: "right", render: (row) => row.currentRank ?? "-" },
        { key: "previousRank", header: "이전 순위", align: "right", render: (row) => row.previousRank ?? "-" },
        {
          key: "rankChange",
          header: "순위 변동",
          align: "right",
          render: (row) => trendLabel[row.rankTrend],
        },
        { key: "period", header: "기간", render: (row) => row.period ?? "-" },
        { key: "platform", header: "플랫폼", render: (row) => row.platform ?? "-" },
      ]}
    />
  );
}
