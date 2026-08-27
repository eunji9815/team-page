import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createEmptyDataset, type DashboardDataset } from "./models";

/**
 * Application-wide data source.
 *
 * Today this simply provides an empty dataset (no data has been connected
 * yet), so every page renders its Skeleton/EmptyState. To connect a real
 * source later:
 *
 *   1. Fetch/read the raw data (CSV, JSON, API response, ...).
 *   2. Reduce it to RawRecord[] via `normalizer.ts`.
 *   3. Turn it into a DashboardDataset via `parser.ts` -> `buildDataset()`.
 *   4. Pass that dataset into <DataProvider dataset={...}>.
 *
 * No page, component, or logic module needs to change — they all read
 * from `useDashboardData()`.
 */

const DashboardDataContext = createContext<DashboardDataset | null>(null);

export function DataProvider({
  dataset,
  children,
}: {
  dataset?: DashboardDataset;
  children: ReactNode;
}) {
  const value = useMemo(() => dataset ?? createEmptyDataset(), [dataset]);
  return (
    <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>
  );
}

export function useDashboardData(): DashboardDataset {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error("useDashboardData must be used within a DataProvider");
  }
  return context;
}
