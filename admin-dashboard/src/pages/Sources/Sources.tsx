import { DataTable } from "../../components/DataTable/DataTable";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { useDashboardData } from "../../data/DataProvider";
import type { SourceEntry } from "../../data/models";

export function Sources() {
  const dataset = useDashboardData();

  return (
    <>
      <PageHeader title="출처" description="대시보드에서 사용하는 데이터의 출처를 관리합니다." />

      <DataTable<SourceEntry>
        rows={dataset.sources}
        getRowId={(row) => row.id}
        emptyTitle="등록된 출처가 없습니다"
        emptyDescription="데이터가 연결되면 각 데이터의 출처, 기준일, 링크가 이곳에 표시됩니다."
        columns={[
          { key: "dataName", header: "데이터", render: (row) => row.dataName ?? "-" },
          { key: "source", header: "출처", render: (row) => row.source ?? "-" },
          { key: "referenceDate", header: "기준일", render: (row) => row.referenceDate ?? "-" },
          {
            key: "link",
            header: "링크",
            render: (row) =>
              row.link ? (
                <a href={row.link} target="_blank" rel="noreferrer">
                  {row.link}
                </a>
              ) : (
                "-"
              ),
          },
          { key: "note", header: "비고", render: (row) => row.note ?? "-" },
        ]}
      />
    </>
  );
}
