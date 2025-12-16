import type { MetricRecord } from "../../types/record";

type Props = {
  rows: MetricRecord[];
};

export default function MetricsTable({ rows }: Props) {
  return (
    <div style={{ marginTop: 16, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Fecha</Th>
            <Th>Categoría</Th>
            <Th align="right">Monto</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <Td>{r.id}</Td>
              <Td>{r.date}</Td>
              <Td>{r.category}</Td>
              <Td align="right">{r.amount}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      style={{
        textAlign: align ?? "left",
        borderBottom: "1px solid #ddd",
        padding: "10px 8px",
        fontWeight: 600,
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      style={{
        textAlign: align ?? "left",
        borderBottom: "1px solid #f0f0f0",
        padding: "10px 8px",
      }}
    >
      {children}
    </td>
  );
}
