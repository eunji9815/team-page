import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Panel } from "../../components/Section/Section";
import { useDashboardData } from "../../data/DataProvider";
import { groupInsightsByCategory } from "../../logic/insight";
import styles from "./InsightList.module.css";

export function Insights() {
  const dataset = useDashboardData();
  const groups = groupInsightsByCategory(dataset.insights);

  if (groups.length === 0) {
    return (
      <Panel>
        <EmptyState
          title="등록된 인사이트가 없습니다"
          description="데이터가 연결되면 분석을 통해 도출된 주요 인사이트가 이곳에 표시됩니다."
        />
      </Panel>
    );
  }

  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <Panel key={group.category}>
          <h3 className={styles.category}>{group.category}</h3>
          <ul className={styles.list}>
            {group.items.map((item) => (
              <li key={item.id} className={styles.item}>
                <p className={styles.itemTitle}>{item.title ?? "-"}</p>
                <p className={styles.itemContent}>{item.content ?? "-"}</p>
              </li>
            ))}
          </ul>
        </Panel>
      ))}
    </div>
  );
}
