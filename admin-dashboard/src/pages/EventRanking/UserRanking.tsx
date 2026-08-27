import { DataTable } from "../../components/DataTable/DataTable";
import { useDashboardData } from "../../data/DataProvider";
import { attachUserCountChange, sortByUserCount } from "../../logic/ranking";
import type { UserRankedGameRow } from "../../logic/ranking";

export function UserRanking() {
  const dataset = useDashboardData();
  const rows = sortByUserCount(attachUserCountChange(dataset.games));

  return (
    <DataTable<UserRankedGameRow>
      rows={rows}
      getRowId={(row) => row.id}
      emptyTitle="이용자수 순위 데이터가 없습니다"
      emptyDescription="데이터가 연결되면 이용자수 순위가 표시됩니다."
      columns={[
        { key: "name", header: "게임명", render: (row) => row.name ?? "-" },
        {
          key: "userCount",
          header: "이용자수",
          align: "right",
          render: (row) => row.userCount?.toLocaleString("ko-KR") ?? "-",
        },
        { key: "rank", header: "순위", align: "right", render: (row) => row.currentRank ?? "-" },
        {
          key: "previousUserCount",
          header: "이전 기간 이용자수",
          align: "right",
          render: (row) => row.previousUserCount?.toLocaleString("ko-KR") ?? "-",
        },
        {
          key: "userCountChange",
          header: "증감",
          align: "right",
          render: (row) => row.userCountChange?.toLocaleString("ko-KR") ?? "-",
        },
        {
          key: "userCountGrowthRate",
          header: "증감률",
          align: "right",
          render: (row) => (row.userCountGrowthRate != null ? `${row.userCountGrowthRate.toFixed(1)}%` : "-"),
        },
      ]}
    />
  );
}
