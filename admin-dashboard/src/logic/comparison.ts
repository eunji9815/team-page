import type { CompetitivenessScore, Game } from "../data/models";

/**
 * Generic "category with multiple named values" shape. Deliberately not
 * imported from the chart component — logic must not depend on UI, only
 * the other way around. `ComparisonChart` happens to accept this same
 * structural shape.
 */
export interface ComparisonGroup {
  category: string;
  values: { name: string; value: number }[];
}

export interface RankTrendPoint {
  period: string;
  rank: number;
}

export interface RankComparisonSeries {
  name: string;
  points: RankTrendPoint[];
}

/**
 * Groups games by name across periods into per-game rank series, suitable
 * for a rank-over-time line chart. Games/points missing rank or period
 * data are excluded rather than plotted as zero.
 */
export function buildRankComparisonSeries(games: Game[]): RankComparisonSeries[] {
  const byName = new Map<string, RankTrendPoint[]>();

  games.forEach((game) => {
    if (!game.name || game.currentRank == null || !game.period) return;
    const points = byName.get(game.name) ?? [];
    points.push({ period: game.period, rank: game.currentRank });
    byName.set(game.name, points);
  });

  return Array.from(byName.entries()).map(([name, points]) => ({
    name,
    points: points.sort((a, b) => a.period.localeCompare(b.period)),
  }));
}

export interface RankComparisonRow {
  name: string;
  currentRank?: number;
  previousRank?: number;
  rankChange?: number;
}

/**
 * Groups competitiveness scores by subject (game/company), with one value
 * per metric — suitable for a grouped comparison chart across subjects.
 */
export function buildCompetitivenessComparison(scores: CompetitivenessScore[]): ComparisonGroup[] {
  const bySubject = new Map<string, { name: string; value: number }[]>();

  scores.forEach((score) => {
    if (!score.subject || !score.metric || score.score == null) return;
    const values = bySubject.get(score.subject) ?? [];
    values.push({ name: score.metric, value: score.score });
    bySubject.set(score.subject, values);
  });

  return Array.from(bySubject.entries()).map(([category, values]) => ({ category, values }));
}

export function buildRankComparisonTable(games: Game[]): RankComparisonRow[] {
  return games.map((game) => ({
    name: game.name ?? "-",
    currentRank: game.currentRank,
    previousRank: game.previousRank,
    rankChange:
      game.currentRank != null && game.previousRank != null
        ? game.previousRank - game.currentRank
        : undefined,
  }));
}
