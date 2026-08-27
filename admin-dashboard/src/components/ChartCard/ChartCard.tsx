import type { ReactNode } from "react";
import styles from "./ChartCard.module.css";

export interface ChartCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

/** Generic card shell for any chart/visualization content. */
export function ChartCard({ title, description, actions, children }: ChartCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.headingRow}>
        <div>
          <div className={styles.title}>{title}</div>
          {description ? <div className={styles.description}>{description}</div> : null}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
