/**
 * Column alias configuration.
 *
 * Maps each internal model field to every raw column name it might arrive
 * as (English snake_case, camelCase, Korean labels, spaced variants, ...).
 * Extending support for a new incoming column name is a one-line change
 * here — no component or page ever needs to change.
 */

export type AliasMap<TFieldKeys extends string> = Record<TFieldKeys, string[]>;

export const gameAliases: AliasMap<
  | "name"
  | "currentRank"
  | "previousRank"
  | "userCount"
  | "previousUserCount"
  | "userRank"
  | "previousUserRank"
  | "platform"
  | "company"
  | "period"
> = {
  name: ["game_name", "gameName", "게임명", "게임 이름", "name"],
  currentRank: [
    "game_rank",
    "current_rank",
    "currentRank",
    "rank",
    "순위",
    "현재순위",
    "현재 순위",
  ],
  previousRank: ["previous_rank", "previousRank", "이전순위", "이전 순위"],
  userCount: ["user_count", "userCount", "이용자수", "이용자 수"],
  previousUserCount: [
    "previous_user_count",
    "previousUserCount",
    "이전이용자수",
    "이전 이용자수",
  ],
  userRank: [
    "user_rank",
    "userRank",
    "이용자수순위",
    "이용자수 순위",
    "user_count_rank",
  ],
  previousUserRank: [
    "previous_user_rank",
    "previousUserRank",
    "이전이용자수순위",
    "이전 이용자수 순위",
  ],
  platform: ["platform", "플랫폼"],
  company: ["company", "회사", "업체", "회사명"],
  period: ["period", "기간", "기준일", "date"],
};

export const adSpendAliases: AliasMap<
  | "company"
  | "game"
  | "platform"
  | "cost"
  | "previousCost"
  | "period"
  | "isOwnCompany"
  | "creativeCount"
  | "platformCount"
> = {
  company: ["company", "회사", "업체", "advertiser", "회사명"],
  game: ["game_name", "gameName", "game", "게임명"],
  platform: ["platform", "플랫폼"],
  cost: ["ad_cost", "adCost", "cost", "광고비", "spend"],
  previousCost: [
    "previous_ad_cost",
    "previous_cost",
    "previousCost",
    "이전광고비",
    "이전 광고비",
  ],
  period: ["period", "기간", "date"],
  isOwnCompany: ["is_own_company", "isOwnCompany", "자사여부", "구분"],
  creativeCount: [
    "creative_count",
    "creativeCount",
    "소재수",
    "소재 수",
    "신규소재수",
    "신규 게재 소재 수",
    "재사용소재수",
    "재사용 소재 수",
  ],
  platformCount: [
    "platform_count",
    "platformCount",
    "플랫폼수",
    "플랫폼 수",
    "노출플랫폼수",
    "노출 플랫폼 수",
    "평균노출플랫폼수",
    "평균 노출 플랫폼 수",
  ],
};

export const marketingEventAliases: AliasMap<
  "game" | "date" | "type" | "description" | "viewCount"
> = {
  game: ["game_name", "gameName", "game", "게임명", "게임"],
  date: ["date", "영상날짜", "게재시작일", "게재 시작일", "event_date"],
  type: ["type", "구분", "종류"],
  description: ["description", "요약", "테마/문구 요약", "내용"],
  viewCount: ["view_count", "viewCount", "조회수"],
};

export const platformAliases: AliasMap<
  "name" | "userCount" | "revenue" | "adCost" | "period"
> = {
  name: ["platform", "platform_name", "platformName", "플랫폼", "플랫폼명"],
  userCount: ["user_count", "userCount", "이용자수"],
  revenue: ["revenue", "매출"],
  adCost: ["ad_cost", "adCost", "광고비"],
  period: ["period", "기간"],
};

export const competitivenessAliases: AliasMap<
  "subject" | "metric" | "score" | "period"
> = {
  subject: ["subject", "game_name", "company", "대상", "게임명", "회사"],
  metric: ["metric", "지표"],
  score: ["score", "점수"],
  period: ["period", "기간"],
};

export const insightAliases: AliasMap<"title" | "content" | "category"> = {
  title: ["title", "제목"],
  content: ["content", "내용", "insight", "인사이트"],
  category: ["category", "분류"],
};

export const conclusionAliases: AliasMap<"title" | "content"> = {
  title: ["title", "제목"],
  content: ["content", "내용", "결론"],
};

export const sourceAliases: AliasMap<
  "dataName" | "source" | "referenceDate" | "link" | "note"
> = {
  dataName: ["data_name", "dataName", "데이터", "데이터명"],
  source: ["source", "출처"],
  referenceDate: [
    "reference_date",
    "referenceDate",
    "기준일",
    "기준 일자",
  ],
  link: ["link", "url", "링크"],
  note: ["note", "remark", "비고"],
};
