import { ReactNode } from "react";

export type Column<T> = {
  header: string;
  width?: string;
  align?: "left" | "right" | "center";
  mono?: boolean;
  render: (row: T) => ReactNode;
};

export function DataTable<T>({ rows, columns, getKey, empty }: {
  rows: T[];
  columns: Column<T>[];
  getKey: (row: T) => string;
  empty?: string;
}) {
  if (rows.length === 0) {
    return <div className="muted" style={{ padding: "var(--space-6)", textAlign: "center" }}>{empty ?? "No records."}</div>;
  }
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} style={{ textAlign: c.align ?? "left", width: c.width }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)}>
              {columns.map((c, i) => (
                <td
                  key={i}
                  style={{ textAlign: c.align ?? "left" }}
                  className={c.mono ? "mono" : ""}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
