import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Panel } from "../../components/Section/Section";
import { useDashboardData } from "../../data/DataProvider";
import styles from "./InsightList.module.css";

export function Conclusion() {
  const dataset = useDashboardData();

  if (dataset.conclusions.length === 0) {
    return (
      <Panel>
        <EmptyState
          title="등록된 결론이 없습니다"
          description="데이터가 연결되면 전체 분석 결과를 종합한 결론이 이곳에 표시됩니다."
        />
      </Panel>
    );
  }

  return (
    <Panel>
      <ul className={styles.list}>
        {dataset.conclusions.map((entry) => (
          <li key={entry.id} className={styles.item}>
            <p className={styles.itemTitle}>{entry.title ?? "-"}</p>
            <p className={styles.itemContent}>{entry.content ?? "-"}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
