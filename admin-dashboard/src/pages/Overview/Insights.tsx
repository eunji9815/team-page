import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Panel } from "../../components/Section/Section";
import { useDashboardData } from "../../data/DataProvider";
import { buildOverviewSummary } from "../../logic/overview";

export function Insights() {
  const dataset = useDashboardData();
  const summary = buildOverviewSummary(dataset);

  return (
    <Panel>
      {summary.insightCount === 0 ? (
        <EmptyState
          title="등록된 인사이트가 없습니다"
          description="인사이트 및 결론 메뉴에서 데이터가 연결되면 표시됩니다."
        />
      ) : (
        <p>등록된 인사이트 {summary.insightCount}건</p>
      )}
    </Panel>
  );
}
