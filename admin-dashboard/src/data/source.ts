import { buildDataset, type RawDatasetInput } from "./parser";

/**
 * ============================================================
 *  실제 데이터는 이 파일에만 입력하면 됩니다.
 * ============================================================
 *
 * 아래 각 배열(games, adSpend, ...)에 객체를 추가하면, 사이드바의
 * 모든 메뉴(개요/이벤트 발생 및 순위비교/BM 구조/광고비 활용/...)의
 * KPI·차트·테이블에 자동으로 반영됩니다. 다른 파일은 건드릴 필요 없습니다.
 *
 * - 컬럼명은 아래 예시처럼 영문 snake_case(game_name)든, camelCase
 *   (gameName)든, 한글(게임명)이든 상관없이 자동으로 인식됩니다.
 *   (전체 별칭 목록: src/data/aliases.ts)
 * - 값을 모르는 필드는 그냥 생략하면 됩니다. (없으면 "-"로 표시됩니다)
 * - 저장하면 브라우저가 자동으로 새로고침됩니다.
 *
 * 예시:
 * games: [
 *   { game_name: "게임A", game_rank: 1, previous_rank: 3, user_count: 120000, period: "2026-07" },
 *   { game_name: "게임B", game_rank: 2, previous_rank: 1, user_count: 98000, period: "2026-07" },
 * ],
 */
const rawInput: RawDatasetInput = {
  // 게임순위 / 이용자수 순위 / 순위비교 (이벤트 발생 및 순위비교 메뉴)
  games: [
    // { game_name: "", game_rank: 0, previous_rank: 0, user_count: 0, previous_user_count: 0, platform: "", company: "", period: "" },
  ],

  // 광고비 / 타사비교 / 자사비교 / 광고비 증감률 (BM 구조, 광고비 활용 메뉴)
  adSpend: [
    // { company: "", game: "", platform: "", ad_cost: 0, previous_ad_cost: 0, period: "", is_own_company: true },
  ],

  // 플랫폼 (BM 구조 메뉴)
  platforms: [
    // { platform: "", user_count: 0, revenue: 0, ad_cost: 0, period: "" },
  ],

  // 종합 경쟁력 비교 (BM 구조 메뉴)
  competitiveness: [
    // { subject: "", metric: "", score: 0, period: "" },
  ],

  // 인사이트 (인사이트 및 결론 메뉴)
  insights: [
    // { title: "", content: "", category: "" },
  ],

  // 결론 (인사이트 및 결론 메뉴)
  conclusions: [
    // { title: "", content: "" },
  ],

  // 출처 (출처 메뉴)
  sources: [
    // { data_name: "", source: "", reference_date: "", link: "", note: "" },
  ],
};

export const dataset = buildDataset(rawInput);
