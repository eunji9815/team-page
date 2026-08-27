import { Outlet } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { SubNavigation } from "../../components/SubNavigation/SubNavigation";
import { menuConfig } from "../../navigation/menuConfig";

const menu = menuConfig.find((m) => m.id === "advertising-usage")!;

export function AdvertisingUsageLayout() {
  return (
    <>
      <PageHeader title={menu.label} description="광고비 집행 현황을 타사/자사/증감률 관점에서 분석합니다." />
      <SubNavigation items={menu.children ?? []} />
      <Outlet />
    </>
  );
}
