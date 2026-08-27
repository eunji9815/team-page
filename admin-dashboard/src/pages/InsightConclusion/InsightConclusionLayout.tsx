import { Outlet } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { SubNavigation } from "../../components/SubNavigation/SubNavigation";
import { menuConfig } from "../../navigation/menuConfig";

const menu = menuConfig.find((m) => m.id === "insight-conclusion")!;

export function InsightConclusionLayout() {
  return (
    <>
      <PageHeader title={menu.label} description="데이터 분석을 통해 도출된 인사이트와 결론을 정리합니다." />
      <SubNavigation items={menu.children ?? []} />
      <Outlet />
    </>
  );
}
