import KpiCard from "./KpiCard";

type Item = { label: string; value: string };

export default function KpiGrid({ items }: { items: Item[] }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 16,
      }}
    >
      {items.map((it) => (
        <KpiCard key={it.label} label={it.label} value={it.value} />
      ))}
    </div>
  );
}
