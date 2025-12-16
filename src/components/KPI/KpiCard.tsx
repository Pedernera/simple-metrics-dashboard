type Props = {
  label: string;
  value: string;
};

export default function KpiCard({ label, value }: Props) {
  return (
    <div
      style={{
        border: "1px solid #e8e8e8",
        borderRadius: 12,
        padding: 14,
        minWidth: 180,
        background: "white",
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}
