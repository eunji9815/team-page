import { Outlet } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { SubNavigation } from "../../components/SubNavigation/SubNavigation";
import { menuConfig } from "../../navigation/menuConfig";

const menu = menuConfig.find((m) => m.id === "event-ranking")!;

export function EventRankingLayout() {
  return (
    <>
      <PageHeader title={menu.label} description="게임별 이벤트 발생 현황과 순위를 비교합니다." />
      <SubNavigation items={menu.children ?? []} />
      <Outlet />
    </>
  );
}
