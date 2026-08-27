import { EmptyState } from "../EmptyState/EmptyState";
import { seriesColor } from "./chartColors";
import styles from "./Chart.module.css";

export interface ComparisonGroup {
  category: string;
  values: { name: string; value: number }[];
}

export interface ComparisonChartProps {
  groups: ComparisonGroup[];
  height?: number;
  emptyTitle: string;
  emptyDescription?: string;
}

const WIDTH = 640;
const PAD_X = 40;
const PAD_Y = 24;
const GROUP_GAP_RATIO = 0.3;
const BAR_GAP = 3;

/** Grouped bar chart: compares multiple named series against each other, per category. */
export function ComparisonChart({ groups, height = 280, emptyTitle, emptyDescription }: ComparisonChartProps) {
  const seriesNames = Array.from(new Set(groups.flatMap((g) => g.values.map((v) => v.name))));
  const allValues = groups.flatMap((g) => g.values.map((v) => v.value));

  if (groups.length === 0 || seriesNames.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const maxValue = Math.max(...allValues, 0);
  const plotW = WIDTH - PAD_X * 2;
  const plotH = height - PAD_Y * 2;
  const groupSlot = plotW / groups.length;
  const groupWidth = groupSlot * (1 - GROUP_GAP_RATIO);
  const barWidth = (groupWidth - BAR_GAP * (seriesNames.length - 1)) / seriesNames.length;

  return (
    <div>
      <svg className={styles.svg} viewBox={`0 0 ${WIDTH} ${height}`} role="img" aria-label="comparison chart">
        <line
          className={styles.axisLine}
          x1={PAD_X}
          x2={WIDTH - PAD_X}
          y1={PAD_Y + plotH}
          y2={PAD_Y + plotH}
        />
        {groups.map((group, groupIdx) => {
          const groupX = PAD_X + groupIdx * groupSlot + (groupSlot - groupWidth) / 2;
          return (
            <g key={group.category}>
              {seriesNames.map((name, seriesIdx) => {
                const entry = group.values.find((v) => v.name === name);
                const value = entry?.value ?? 0;
                const barHeight = maxValue > 0 ? (value / maxValue) * plotH : 0;
                const x = groupX + seriesIdx * (barWidth + BAR_GAP);
                const y = PAD_Y + plotH - barHeight;
                return (
                  <rect
                    key={name}
                    x={x}
                    y={y}
                    width={Math.max(barWidth, 0)}
                    height={barHeight}
                    fill={seriesColor(seriesIdx)}
                    rx={3}
                  />
                );
              })}
              <text
                className={styles.axisText}
                x={groupX + groupWidth / 2}
                y={height - 4}
                textAnchor="middle"
              >
                {group.category}
              </text>
            </g>
          );
        })}
      </svg>

      <div className={styles.legend}>
        {seriesNames.map((name, idx) => (
          <span key={name} className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ backgroundColor: seriesColor(idx) }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
