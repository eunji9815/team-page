import type { Game, Trend } from "../data/models";

export interface RankedGameRow extends Game {
  rankChange?: number;
  rankTrend: Trend;
}

export interface UserRankedGameRow extends Game {
  userCountChange?: number;
  userCountGrowthRate?: number;
  userCountTrend: Trend;
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
    return {
      ...game,
      userCountChange: change,
      userCountGrowthRate: growthRate,
      userCountTrend: deriveTrendFromDelta(change),
    };
  });
}

export function sortByCurrentRank(games: RankedGameRow[]): RankedGameRow[] {
  return [...games].sort((a, b) => (a.currentRank ?? Infinity) - (b.currentRank ?? Infinity));
}

export function sortByUserCount(games: UserRankedGameRow[]): UserRankedGameRow[] {
  return [...games].sort((a, b) => (b.userCount ?? -Infinity) - (a.userCount ?? -Infinity));
}
