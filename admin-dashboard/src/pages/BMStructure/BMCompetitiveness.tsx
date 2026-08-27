import { ChartCard } from "../../components/ChartCard/ChartCard";
import { DataTable } from "../../components/DataTable/DataTable";
import { ComparisonChart } from "../../components/charts/ComparisonChart";
import { useDashboardData } from "../../data/DataProvider";
import type { CompetitivenessScore } from "../../data/models";
import { buildCompetitivenessComparison } from "../../logic/comparison";

export function BMCompetitiveness() {
  const dataset = useDashboardData();
  const groups = buildCompetitivenessComparison(dataset.competitiveness);

  return (
    <>
      <ChartCard title="종합 경쟁력 비교" description="여러 지표를 종합하여 대상별 경쟁력을 비교합니다.">
        <ComparisonChart
          groups={groups}
          emptyTitle="경쟁력 비교 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 지표별 종합 경쟁력 비교가 표시됩니다."
        />
      </ChartCard>

      <DataTable<CompetitivenessScore>
        rows={dataset.competitiveness}
        getRowId={(row) => row.id}
        emptyTitle="경쟁력 지표 데이터가 없습니다"
        emptyDescription="데이터가 연결되면 세부 경쟁력 지표가 표시됩니다."
        columns={[
          { key: "subject", header: "대상", render: (row) => row.subject ?? "-" },
          { key: "metric", header: "지표", render: (row) => row.metric ?? "-" },
          { key: "score", header: "점수", align: "right", render: (row) => row.score ?? "-" },
          { key: "period", header: "기간", render: (row) => row.period ?? "-" },
        ]}
      />
    </>
  );
}
