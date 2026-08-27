import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Panel } from "../../components/Section/Section";

export function Events() {
  return (
    <Panel>
      <EmptyState
        title="주요 이벤트가 없습니다"
        description="데이터가 연결되면 최근 발생한 주요 이벤트가 표시됩니다."
      />
    </Panel>
  );
}
