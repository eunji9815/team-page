import { EmptyState } from "../EmptyState/EmptyState";
import { seriesColor } from "./chartColors";
import styles from "./Chart.module.css";

export interface LineChartSeries {
  name: string;
  points: { x: string; y: number }[];
}

export interface LineChartProps {
  series: LineChartSeries[];
  height?: number;
  emptyTitle: string;
  emptyDescription?: string;
}

const WIDTH = 640;
const PAD_X = 40;
const PAD_Y = 24;
const TICKS = 4;

/**
 * Minimal dependency-free SVG line chart. Consumes plain `{x, y}` series
 * data only — no coupling to any specific data model, so any page can
 * feed it whatever it has computed.
 */
export function LineChart({ series, height = 260, emptyTitle, emptyDescription }: LineChartProps) {
  const categories = Array.from(new Set(series.flatMap((s) => s.points.map((p) => p.x)))).sort();
  const values = series.flatMap((s) => s.points.map((p) => p.y));

  if (categories.length === 0 || values.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const yRange = maxY - minY || 1;
  const plotW = WIDTH - PAD_X * 2;
  const plotH = height - PAD_Y * 2;

  const xFor = (category: string) => {
    const idx = categories.indexOf(category);
    return PAD_X + (categories.length === 1 ? plotW / 2 : (idx / (categories.length - 1)) * plotW);
  };
  const yFor = (value: number) => PAD_Y + plotH - ((value - minY) / yRange) * plotH;

  const ticks = Array.from({ length: TICKS + 1 }, (_, i) => minY + (yRange * i) / TICKS);

  return (
    <div>
      <svg className={styles.svg} viewBox={`0 0 ${WIDTH} ${height}`} role="img" aria-label="line chart">
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              className={styles.axisLine}
              x1={PAD_X}
              x2={WIDTH - PAD_X}
              y1={yFor(tick)}
              y2={yFor(tick)}
            />
            <text className={styles.axisText} x={4} y={yFor(tick) + 4}>
              {Math.round(tick).toLocaleString("ko-KR")}
            </text>
          </g>
        ))}

        {categories.map((category) => (
          <text
            key={category}
            className={styles.axisText}
            x={xFor(category)}
            y={height - 4}
            textAnchor="middle"
          >
            {category}
          </text>
        ))}

        {series.map((s, idx) => {
          const color = seriesColor(idx);
          const points = s.points
            .filter((p) => categories.includes(p.x))
            .map((p) => `${xFor(p.x)},${yFor(p.y)}`)
            .join(" ");
          return (
            <g key={s.name}>
              <polyline points={points} fill="none" stroke={color} strokeWidth={2} />
              {s.points.map((p) => (
                <circle key={p.x} cx={xFor(p.x)} cy={yFor(p.y)} r={3} fill={color} />
              ))}
            </g>
          );
        })}
      </svg>

      <div className={styles.legend}>
        {series.map((s, idx) => (
          <span key={s.name} className={styles.legendItem}>
            <span className={styles.legendSwatch} style={{ backgroundColor: seriesColor(idx) }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
