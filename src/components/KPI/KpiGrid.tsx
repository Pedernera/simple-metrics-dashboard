import KpiCard from "./KpiCard";

type Item = { label: string; value: string };

export default function KpiGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {items.map((it) => (
        <KpiCard key={it.label} label={it.label} value={it.value} />
      ))}
    </div>
  );
}
