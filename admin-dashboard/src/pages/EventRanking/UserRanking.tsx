import { DataTable } from "../../components/DataTable/DataTable";
import { useDashboardData } from "../../data/DataProvider";
import { attachUserCountChange, filterLatestPeriod, sortByUserCount } from "../../logic/ranking";
import type { Trend } from "../../data/models";
import type { UserRankedGameRow } from "../../logic/ranking";

const trendLabel: Record<Trend, string> = {
  up: "▲ 상승",
  down: "▼ 하락",
  same: "- 동일",
  unknown: "-",
};

export function UserRanking() {
  const dataset = useDashboardData();
  const rows = sortByUserCount(attachUserCountChange(filterLatestPeriod(dataset.games)));

  return (
    <DataTable<UserRankedGameRow>
      rows={rows}
      getRowId={(row) => row.id}
      emptyTitle="이용자수 순위 데이터가 없습니다"
      emptyDescription="데이터가 연결되면 이용자수 기준 순위가 표시됩니다."
      columns={[
        { key: "name", header: "게임명", render: (row) => row.name ?? "-" },
        {
          key: "userRank",
          header: "현재 순위 (이용자수 기준)",
          align: "right",
          render: (row) => row.userRank ?? "-",
        },
        {
          key: "previousUserRank",
          header: "이전 순위",
          align: "right",
          render: (row) => row.previousUserRank ?? "-",
        },
        {
          key: "userRankChange",
          header: "순위 변동",
          align: "right",
          render: (row) => trendLabel[row.userRankTrend],
        },
        {
          key: "userCount",
          header: "이용자수",
          align: "right",
          render: (row) => row.userCount?.toLocaleString("ko-KR") ?? "-",
        },
        {
          key: "userCountGrowthRate",
          header: "증감률",
          align: "right",
          render: (row) => (row.userCountGrowthRate != null ? `${row.userCountGrowthRate.toFixed(1)}%` : "-"),
        },
        { key: "period", header: "기간", render: (row) => row.period ?? "-" },
      ]}
    />
  );
}
