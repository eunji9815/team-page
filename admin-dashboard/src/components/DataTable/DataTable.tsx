import type { ReactNode } from "react";
import { EmptyState } from "../EmptyState/EmptyState";
import { Skeleton } from "../Skeleton/Skeleton";
import styles from "./DataTable.module.css";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  emptyTitle: string;
  emptyDescription?: string;
  loading?: boolean;
}

const alignClass = {
  left: "",
  right: "alignRight",
  center: "alignCenter",
} as const;

/**
 * Fully data-driven table: columns + rows are plain data/render-function
 * props. Any page can reuse this for its own model shape without
 * duplicating table markup or styling.
 */
export function DataTable<T>({
  columns,
  rows,
  getRowId,
  emptyTitle,
  emptyDescription,
  loading,
}: DataTableProps<T>) {
  if (!loading && rows.length === 0) {
    return (
      <div className={styles.wrapper}>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headRow}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${styles.th} ${column.align ? styles[alignClass[column.align]] : ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className={styles.row}>
                    {columns.map((column) => (
                      <td key={column.key} className={styles.td}>
                        <Skeleton height={14} />
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((row) => (
                  <tr key={getRowId(row)} className={styles.row}>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${styles.td} ${column.align ? styles[alignClass[column.align]] : ""}`}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
