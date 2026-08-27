import { DataTable } from "../../components/DataTable/DataTable";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { KpiCard } from "../../components/KpiCard/KpiCard";
import { KpiGrid } from "../../components/KpiCard/KpiGrid";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Panel, Section } from "../../components/Section/Section";
import { useDashboardData } from "../../data/DataProvider";
import { buildOverviewSummary } from "../../logic/overview";
import type { RankedGameRow } from "../../logic/ranking";

export function Overview() {
  const dataset = useDashboardData();
  const summary = buildOverviewSummary(dataset);

  return (
    <>
      <PageHeader
        title="개요"
        description="전체 분석 결과를 요약하는 대시보드입니다. 데이터가 연결되면 아래 영역에 핵심 지표가 자동으로 표시됩니다."
      />

      <Section title="핵심 KPI">
        <KpiGrid>
          {summary.kpis.map((kpi) => (
            <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} unit={kpi.unit} />
          ))}
        </KpiGrid>
      </Section>

      <Section title="주요 이벤트">
        <Panel>
          <EmptyState
            title="주요 이벤트가 없습니다"
            description="데이터가 연결되면 최근 발생한 주요 이벤트가 표시됩니다."
          />
        </Panel>
      </Section>

      <Section title="주요 순위">
        <DataTable<RankedGameRow>
          rows={summary.topGames}
          getRowId={(row) => row.id}
          emptyTitle="게임 순위 데이터가 없습니다"
          emptyDescription="데이터가 연결되면 상위 게임 순위가 표시됩니다."
          columns={[
            { key: "name", header: "게임명", render: (row) => row.name ?? "-" },
            { key: "rank", header: "현재 순위", align: "right", render: (row) => row.currentRank ?? "-" },
            {
              key: "change",
              header: "순위 변동",
              align: "right",
              render: (row) => (row.rankChange != null ? row.rankChange : "-"),
            },
          ]}
        />
      </Section>

      <Section title="광고비 요약">
        <KpiGrid>
          <KpiCard label="누적 광고비" value={summary.adSummary.totalCost} unit="원" />
          <KpiCard label="평균 증감률" value={summary.adSummary.averageGrowthRate} unit="%" />
        </KpiGrid>
      </Section>

      <Section title="주요 인사이트">
        <Panel>
          {summary.insightCount === 0 ? (
            <EmptyState
              title="등록된 인사이트가 없습니다"
              description="인사이트 및 결론 메뉴에서 데이터가 연결되면 표시됩니다."
            />
          ) : (
            <p>등록된 인사이트 {summary.insightCount}건</p>
          )}
        </Panel>
      </Section>

      <Section title="종합 요약">
        <Panel>
          {summary.hasAnyData ? (
            <p>연결된 데이터를 기반으로 한 종합 요약이 이곳에 표시됩니다.</p>
          ) : (
            <EmptyState
              title="종합 요약이 아직 없습니다"
              description="데이터가 연결되면 전체 분석 결과를 종합한 요약이 표시됩니다."
            />
          )}
        </Panel>
      </Section>
    </>
  );
}
