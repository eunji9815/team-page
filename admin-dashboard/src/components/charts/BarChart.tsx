import { EmptyState } from "../EmptyState/EmptyState";
import { seriesColor } from "./chartColors";
import styles from "./Chart.module.css";

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDatum[];
  height?: number;
  emptyTitle: string;
  emptyDescription?: string;
  colorIndex?: number;
}

const WIDTH = 640;
const PAD_X = 40;
const PAD_Y = 24;
const BAR_GAP_RATIO = 0.35;

/** Minimal dependency-free SVG bar chart for a single category/value series. */
export function BarChart({ data, height = 260, emptyTitle, emptyDescription, colorIndex = 0 }: BarChartProps) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const maxValue = Math.max(...data.map((d) => d.value), 0);
  const plotW = WIDTH - PAD_X * 2;
  const plotH = height - PAD_Y * 2;
  const slot = plotW / data.length;
  const barWidth = slot * (1 - BAR_GAP_RATIO);
  const color = seriesColor(colorIndex);

  return (
    <svg className={styles.svg} viewBox={`0 0 ${WIDTH} ${height}`} role="img" aria-label="bar chart">
      <line className={styles.axisLine} x1={PAD_X} x2={WIDTH - PAD_X} y1={PAD_Y + plotH} y2={PAD_Y + plotH} />
      {data.map((d, idx) => {
        const barHeight = maxValue > 0 ? (d.value / maxValue) * plotH : 0;
        const x = PAD_X + idx * slot + (slot - barWidth) / 2;
        const y = PAD_Y + plotH - barHeight;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill={color} rx={4} />
            <text className={styles.axisText} x={x + barWidth / 2} y={height - 4} textAnchor="middle">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
