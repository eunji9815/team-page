import type { Game, Trend } from "../data/models";

export interface RankedGameRow extends Game {
  rankChange?: number;
  rankTrend: Trend;
}

export interface UserRankedGameRow extends Game {
  userCountChange?: number;
  userCountGrowthRate?: number;
  userCountTrend: Trend;
  /** rank change based on the userRank/previousUserRank axis (e.g. traffic-based ranking) */
  userRankChange?: number;
  userRankTrend: Trend;
}

/** Positive = moved up in rank (lower rank number is better). */
export function computeRankChange(current?: number, previous?: number): number | undefined {
  if (current == null || previous == null) return undefined;
  return previous - current;
}

export function deriveTrendFromDelta(delta?: number): Trend {
  if (delta == null) return "unknown";
  if (delta > 0) return "up";
  if (delta < 0) return "down";
  return "same";
}

export function attachRankChange(games: Game[]): RankedGameRow[] {
  return games.map((game) => {
    const rankChange = computeRankChange(game.currentRank, game.previousRank);
    return {
      ...game,
      rankChange,
      rankTrend: deriveTrendFromDelta(rankChange),
    };
  });
}

export function attachUserCountChange(games: Game[]): UserRankedGameRow[] {
  return games.map((game) => {
    const change =
      game.userCount != null && game.previousUserCount != null
        ? game.userCount - game.previousUserCount
        : undefined;
    const growthRate =
      change != null && game.previousUserCount ? (change / game.previousUserCount) * 100 : undefined;
    const userRankChange = computeRankChange(game.userRank, game.previousUserRank);
    return {
      ...game,
      userCountChange: change,
      userCountGrowthRate: growthRate,
      userCountTrend: deriveTrendFromDelta(change),
      userRankChange,
      userRankTrend: deriveTrendFromDelta(userRankChange),
    };
  });
}

/**
 * When `games` holds a full historical series (one row per game per
 * period), restricts it to only the most recent period — the "current
 * snapshot" a ranking table should show. If there's no period info at
 * all, returns the input unchanged.
 */
export function filterLatestPeriod(games: Game[]): Game[] {
  const periods = games.map((g) => g.period).filter((p): p is string => !!p);
  if (periods.length === 0) return games;
  const latest = periods.reduce((a, b) => (a > b ? a : b));
  return games.filter((g) => g.period === latest);
}

export function sortByCurrentRank(games: RankedGameRow[]): RankedGameRow[] {
  return [...games].sort((a, b) => (a.currentRank ?? Infinity) - (b.currentRank ?? Infinity));
}

export function sortByUserCount(games: UserRankedGameRow[]): UserRankedGameRow[] {
  return [...games].sort((a, b) => {
    if (a.userCount != null || b.userCount != null) {
      return (b.userCount ?? -Infinity) - (a.userCount ?? -Infinity);
    }
    return (a.userRank ?? Infinity) - (b.userRank ?? Infinity);
  });
}
