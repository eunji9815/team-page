import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Panel } from "../../components/Section/Section";
import { useDashboardData } from "../../data/DataProvider";
import { buildOverviewSummary } from "../../logic/overview";

export function Summary() {
  const dataset = useDashboardData();
  const summary = buildOverviewSummary(dataset);

  return (
    <Panel>
      {summary.hasAnyData ? (
        <p>연결된 데이터를 기반으로 한 종합 요약이 이곳에 표시됩니다.</p>
      ) : (
        <EmptyState
          title="종합 요약이 아직 없습니다"
          description="데이터가 연결되면 전체 분석 결과를 종합한 요약이 표시됩니다."
        />
      )}
    </Panel>
  );
}
