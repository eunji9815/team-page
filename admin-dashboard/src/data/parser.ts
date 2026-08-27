import {
  adSpendAliases,
  competitivenessAliases,
  conclusionAliases,
  gameAliases,
  insightAliases,
  platformAliases,
  sourceAliases,
} from "./aliases";
import { mapRecord, toBoolean, toNumber, toStringField } from "./mapper";
import type {
  AdSpend,
  CompetitivenessScore,
  ConclusionEntry,
  DashboardDataset,
  Game,
  InsightEntry,
  PlatformMetric,
  RawRecord,
  SourceEntry,
} from "./models";
import { createEmptyDataset } from "./models";

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export function parseGames(rawRows: RawRecord[]): Game[] {
  return rawRows.map((raw) => {
    const { mapped, extra } = mapRecord(raw, gameAliases);
    return {
      id: nextId("game"),
      name: toStringField(mapped.name),
      currentRank: toNumber(mapped.currentRank),
      previousRank: toNumber(mapped.previousRank),
      userCount: toNumber(mapped.userCount),
      previousUserCount: toNumber(mapped.previousUserCount),
      platform: toStringField(mapped.platform),
      company: toStringField(mapped.company),
      period: toStringField(mapped.period),
      extra: Object.keys(extra).length > 0 ? extra : undefined,
    };
  });
}

export function parseAdSpend(rawRows: RawRecord[]): AdSpend[] {
  return rawRows.map((raw) => {
    const { mapped, extra } = mapRecord(raw, adSpendAliases);
    return {
      id: nextId("ad"),
      company: toStringField(mapped.company),
      game: toStringField(mapped.game),
      platform: toStringField(mapped.platform),
      cost: toNumber(mapped.cost),
      previousCost: toNumber(mapped.previousCost),
      period: toStringField(mapped.period),
      isOwnCompany: toBoolean(mapped.isOwnCompany),
      extra: Object.keys(extra).length > 0 ? extra : undefined,
    };
  });
}

export function parsePlatforms(rawRows: RawRecord[]): PlatformMetric[] {
  return rawRows.map((raw) => {
    const { mapped, extra } = mapRecord(raw, platformAliases);
    return {
      id: nextId("platform"),
      name: toStringField(mapped.name),
      userCount: toNumber(mapped.userCount),
      revenue: toNumber(mapped.revenue),
      adCost: toNumber(mapped.adCost),
      period: toStringField(mapped.period),
      extra: Object.keys(extra).length > 0 ? extra : undefined,
    };
  });
}

export function parseCompetitiveness(rawRows: RawRecord[]): CompetitivenessScore[] {
  return rawRows.map((raw) => {
    const { mapped } = mapRecord(raw, competitivenessAliases);
    return {
      id: nextId("competitiveness"),
      subject: toStringField(mapped.subject),
      metric: toStringField(mapped.metric),
      score: toNumber(mapped.score),
      period: toStringField(mapped.period),
    };
  });
}

export function parseInsights(rawRows: RawRecord[]): InsightEntry[] {
  return rawRows.map((raw) => {
    const { mapped } = mapRecord(raw, insightAliases);
    return {
      id: nextId("insight"),
      title: toStringField(mapped.title),
      content: toStringField(mapped.content),
      category: toStringField(mapped.category),
    };
  });
}

export function parseConclusions(rawRows: RawRecord[]): ConclusionEntry[] {
  return rawRows.map((raw) => {
    const { mapped } = mapRecord(raw, conclusionAliases);
    return {
      id: nextId("conclusion"),
      title: toStringField(mapped.title),
      content: toStringField(mapped.content),
    };
  });
}

export function parseSources(rawRows: RawRecord[]): SourceEntry[] {
  return rawRows.map((raw) => {
    const { mapped } = mapRecord(raw, sourceAliases);
    return {
      id: nextId("source"),
      dataName: toStringField(mapped.dataName),
      source: toStringField(mapped.source),
      referenceDate: toStringField(mapped.referenceDate),
      link: toStringField(mapped.link),
      note: toStringField(mapped.note),
    };
  });
}

/** Raw input bundle: one raw-record array per dataset, all optional. */
export interface RawDatasetInput {
  games?: RawRecord[];
  adSpend?: RawRecord[];
  platforms?: RawRecord[];
  competitiveness?: RawRecord[];
  insights?: RawRecord[];
  conclusions?: RawRecord[];
  sources?: RawRecord[];
}

/**
 * Single entry point that turns a raw input bundle (of any source origin,
 * already reduced to record arrays via `normalizer.ts`) into the fully
 * normalized `DashboardDataset` the rest of the app consumes.
 */
export function buildDataset(input: RawDatasetInput): DashboardDataset {
  const empty = createEmptyDataset();
  return {
    games: input.games ? parseGames(input.games) : empty.games,
    adSpend: input.adSpend ? parseAdSpend(input.adSpend) : empty.adSpend,
    platforms: input.platforms ? parsePlatforms(input.platforms) : empty.platforms,
    competitiveness: input.competitiveness
      ? parseCompetitiveness(input.competitiveness)
      : empty.competitiveness,
    insights: input.insights ? parseInsights(input.insights) : empty.insights,
    conclusions: input.conclusions ? parseConclusions(input.conclusions) : empty.conclusions,
    sources: input.sources ? parseSources(input.sources) : empty.sources,
  };
}
