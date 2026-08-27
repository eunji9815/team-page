/** Cycles through the design system's categorical chart palette (tokens.css). */
export function seriesColor(index: number): string {
  const slot = (index % 6) + 1;
  return `var(--chart-series-${slot})`;
}
