import type { Trend } from "../../data/models";
import { Skeleton } from "../Skeleton/Skeleton";
import styles from "./KpiCard.module.css";

export interface KpiCardProps {
  label: string;
  value?: number;
  unit?: string;
  deltaLabel?: string;
  trend?: Trend;
  formatValue?: (value: number) => string;
}

const trendClassName: Record<Trend, string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  same: styles.deltaSame,
  unknown: styles.deltaSame,
};

/**
 * Displays a single KPI. Pass `value={undefined}` (no data connected yet)
 * and it renders a Skeleton instead of a number — it never falls back to
 * "0" or a fabricated placeholder value.
 */
export function KpiCard({ label, value, unit, deltaLabel, trend, formatValue }: KpiCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      {value === undefined ? (
        <Skeleton width="60%" height={32} />
      ) : (
        <div className={styles.valueRow}>
          <span className={styles.value}>{formatValue ? formatValue(value) : value.toLocaleString("ko-KR")}</span>
          {unit ? <span className={styles.unit}>{unit}</span> : null}
        </div>
      )}
      {deltaLabel && trend ? (
        <span className={`${styles.delta} ${trendClassName[trend]}`}>{deltaLabel}</span>
      ) : null}
    </div>
  );
}
