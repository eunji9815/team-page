import { Outlet } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { SubNavigation } from "../../components/SubNavigation/SubNavigation";
import { menuConfig } from "../../navigation/menuConfig";

const menu = menuConfig.find((m) => m.id === "overview")!;

export function OverviewLayout() {
  return (
    <>
      <PageHeader
        title={menu.label}
        description="전체 분석 결과를 요약하는 대시보드입니다. 데이터가 연결되면 아래 항목별로 핵심 지표가 자동으로 표시됩니다."
      />
      <SubNavigation items={menu.children ?? []} />
      <Outlet />
    </>
  );
}
