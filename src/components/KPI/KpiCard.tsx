type Props = {
  label: string;
  value: string;
};

export default function KpiCard({ label, value }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col gap-1 shadow-sm">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-2xl font-bold text-slate-100">{value}</span>
    </div>
  );
}
