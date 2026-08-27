import type { ReactNode } from "react";
import styles from "./KpiGrid.module.css";

export function KpiGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
