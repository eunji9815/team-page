/**
 * Internal (normalized) data models.
 *
 * Every page/component in this app depends ONLY on these types —
 * never on raw source column names (CSV headers, API field names, etc).
 * When a real data source is connected, only `mapper.ts` / `parser.ts`
 * need to change; these model shapes and everything downstream
 * (logic, components, pages) stay the same.
 */

export type Trend = "up" | "down" | "same" | "unknown";

export interface Game {
  id: string;
  name?: string;
  currentRank?: number;
  previousRank?: number;
  userCount?: number;
  previousUserCount?: number;
  platform?: string;
  company?: string;
  period?: string;
  /** any additional source columns that didn't map to a known field */
  extra?: Record<string, unknown>;
}

export interface AdSpend {
  id: string;
  company?: string;
  game?: string;
  platform?: string;
  cost?: number;
  previousCost?: number;
  period?: string;
  isOwnCompany?: boolean;
  extra?: Record<string, unknown>;
}

export interface PlatformMetric {
  id: string;
  name?: string;
  userCount?: number;
  revenue?: number;
  adCost?: number;
  period?: string;
  extra?: Record<string, unknown>;
}

export interface CompetitivenessScore {
  id: string;
  subject?: string;
  metric?: string;
  score?: number;
  period?: string;
}

export interface InsightEntry {
  id: string;
  title?: string;
  content?: string;
  category?: string;
}

export interface ConclusionEntry {
  id: string;
  title?: string;
  content?: string;
}

export interface SourceEntry {
  id: string;
  dataName?: string;
  source?: string;
  referenceDate?: string;
  link?: string;
  note?: string;
}

/** Raw record shape before normalization: arbitrary string-keyed values. */
export type RawRecord = Record<string, unknown>;

/** The full normalized dataset the dashboard operates on. */
export interface DashboardDataset {
  games: Game[];
  adSpend: AdSpend[];
  platforms: PlatformMetric[];
  competitiveness: CompetitivenessScore[];
  insights: InsightEntry[];
  conclusions: ConclusionEntry[];
  sources: SourceEntry[];
}

export function createEmptyDataset(): DashboardDataset {
  return {
    games: [],
    adSpend: [],
    platforms: [],
    competitiveness: [],
    insights: [],
    conclusions: [],
    sources: [],
  };
}
