import { DataTable } from "../../components/DataTable/DataTable";
import { KpiCard } from "../../components/KpiCard/KpiCard";
import { KpiGrid } from "../../components/KpiCard/KpiGrid";
import { useDashboardData } from "../../data/DataProvider";
import type { MarketingEvent } from "../../data/models";
import { sortEventsByDateDesc, summarizeEvents } from "../../logic/events";

export function Events() {
  const dataset = useDashboardData();
  const rows = sortEventsByDateDesc(dataset.marketingEvents);
  const summary = summarizeEvents(dataset.marketingEvents);

  return (
    <>
      <KpiGrid>
        <KpiCard label="이벤트(영상/소재) 건수" value={summary.totalCount || undefined} unit="건" />
        <KpiCard label="총 조회수" value={summary.totalViewCount} unit="회" />
      </KpiGrid>

      <DataTable<MarketingEvent>
        rows={rows}
        getRowId={(row) => row.id}
        emptyTitle="주요 이벤트가 없습니다"
        emptyDescription="데이터가 연결되면 최근 발생한 주요 이벤트가 표시됩니다."
        columns={[
          { key: "date", header: "날짜", render: (row) => row.date ?? "-" },
          { key: "game", header: "게임", render: (row) => row.game ?? "-" },
          { key: "type", header: "구분", render: (row) => row.type ?? "-" },
          {
            key: "viewCount",
            header: "조회수",
            align: "right",
            render: (row) => row.viewCount?.toLocaleString("ko-KR") ?? "-",
          },
          { key: "description", header: "내용", render: (row) => row.description ?? "-" },
        ]}
      />
    </>
  );
}
