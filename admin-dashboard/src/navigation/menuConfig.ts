/**
 * Single source of truth for navigation.
 *
 * Both the Sidebar (UI) and the Router (functionality) are generated from
 * this one config. Adding/renaming/reordering a menu or submenu happens
 * here once; the sidebar UI and the URL routes update automatically and
 * stay in sync by construction — there is no second place to edit.
 */

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  children?: SubMenuItem[];
}

export const menuConfig: MenuItem[] = [
  {
    id: "overview",
    label: "개요",
    path: "/overview",
    children: [
      { id: "kpi", label: "핵심 KPI", path: "/overview/kpi" },
      { id: "events", label: "주요 이벤트", path: "/overview/events" },
      { id: "ranking", label: "주요 순위", path: "/overview/ranking" },
      { id: "advertising", label: "광고비 요약", path: "/overview/advertising" },
      { id: "insights", label: "주요 인사이트", path: "/overview/insights" },
      { id: "summary", label: "종합 요약", path: "/overview/summary" },
    ],
  },
  {
    id: "event-ranking",
    label: "이벤트 발생 및 순위비교",
    path: "/event-ranking",
    children: [
      { id: "game", label: "게임순위", path: "/event-ranking/game" },
      { id: "users", label: "이용자수 순위", path: "/event-ranking/users" },
      { id: "comparison", label: "순위비교", path: "/event-ranking/comparison" },
    ],
  },
  {
    id: "bm-structure",
    label: "BM 구조",
    path: "/bm",
    children: [
      { id: "advertising", label: "광고비", path: "/bm/advertising" },
      { id: "platform", label: "플랫폼", path: "/bm/platform" },
      { id: "competitiveness", label: "종합 경쟁력 비교", path: "/bm/competitiveness" },
    ],
  },
  {
    id: "advertising-usage",
    label: "광고비 활용",
    path: "/advertising",
    children: [
      { id: "competitor", label: "타사비교", path: "/advertising/competitor" },
      { id: "company", label: "자사비교", path: "/advertising/company" },
      { id: "growth", label: "광고비 증감률", path: "/advertising/growth" },
    ],
  },
  {
    id: "insight-conclusion",
    label: "인사이트 및 결론",
    path: "/insight",
    children: [
      { id: "insights", label: "인사이트", path: "/insight/insights" },
      { id: "conclusion", label: "결론", path: "/insight/conclusion" },
    ],
  },
  {
    id: "sources",
    label: "출처",
    path: "/sources",
  },
];

export function findMenuByPath(pathname: string): MenuItem | undefined {
  return menuConfig.find(
    (menu) => pathname === menu.path || pathname.startsWith(`${menu.path}/`),
  );
}
