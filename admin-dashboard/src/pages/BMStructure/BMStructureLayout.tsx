import { Outlet } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { SubNavigation } from "../../components/SubNavigation/SubNavigation";
import { menuConfig } from "../../navigation/menuConfig";

const menu = menuConfig.find((m) => m.id === "bm-structure")!;

export function BMStructureLayout() {
  return (
    <>
      <PageHeader title={menu.label} description="비즈니스 모델 구조를 광고비, 플랫폼, 경쟁력 관점에서 분석합니다." />
      <SubNavigation items={menu.children ?? []} />
      <Outlet />
    </>
  );
}
