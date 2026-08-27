import { ChartCard } from "../../components/ChartCard/ChartCard";
import { DataTable } from "../../components/DataTable/DataTable";
import { BarChart } from "../../components/charts/BarChart";
import { useDashboardData } from "../../data/DataProvider";
import type { PlatformMetric } from "../../data/models";

export function BMPlatform() {
  const dataset = useDashboardData();
  const rows = dataset.platforms;

  const barData = rows
    .filter((r) => r.name && r.userCount != null)
    .map((r) => ({ label: r.name as string, value: r.userCount as number }));

  return (
    <>
      <ChartCard title="플랫폼별 이용자수" description="플랫폼 간 이용자수 규모를 비교합니다.">
        <BarChart
          data={barData}
          colorIndex={1}
          emptyTitle="플랫폼 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 플랫폼별 이용자수가 표시됩니다."
        />
      </ChartCard>

      <DataTable<PlatformMetric>
        rows={rows}
        getRowId={(row) => row.id}
        emptyTitle="플랫폼 데이터가 없습니다"
        emptyDescription="데이터가 연결되면 플랫폼별 상세 지표가 표시됩니다."
        columns={[
          { key: "name", header: "플랫폼", render: (row) => row.name ?? "-" },
          {
            key: "userCount",
            header: "이용자수",
            align: "right",
            render: (row) => row.userCount?.toLocaleString("ko-KR") ?? "-",
          },
          {
            key: "revenue",
            header: "매출",
            align: "right",
            render: (row) => row.revenue?.toLocaleString("ko-KR") ?? "-",
          },
          {
            key: "adCost",
            header: "광고비",
            align: "right",
            render: (row) => row.adCost?.toLocaleString("ko-KR") ?? "-",
          },
          { key: "period", header: "기간", render: (row) => row.period ?? "-" },
        ]}
      />
    </>
  );
}
