import { DataTable } from "../../components/DataTable/DataTable";
import { useDashboardData } from "../../data/DataProvider";
import { buildOverviewSummary } from "../../logic/overview";
import type { RankedGameRow } from "../../logic/ranking";

export function Ranking() {
  const dataset = useDashboardData();
  const summary = buildOverviewSummary(dataset);

  return (
    <DataTable<RankedGameRow>
      rows={summary.topGames}
      getRowId={(row) => row.id}
      emptyTitle="게임 순위 데이터가 없습니다"
      emptyDescription="데이터가 연결되면 상위 게임 순위가 표시됩니다."
      columns={[
        { key: "name", header: "게임명", render: (row) => row.name ?? "-" },
        { key: "rank", header: "현재 순위", align: "right", render: (row) => row.currentRank ?? "-" },
        {
          key: "change",
          header: "순위 변동",
          align: "right",
          render: (row) => (row.rankChange != null ? row.rankChange : "-"),
        },
      ]}
    />
  );
}
