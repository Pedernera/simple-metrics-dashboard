import { useMetrics } from "../../hooks/useMetrics";
import MetricsTable from "../../components/Table/MetricsTable";
import KpiGrid from "../../components/KPI/KpiGrid";
import { avgAmount, maxAmount, sumAmount } from "../../utils/metrics";
import { formatNumber } from "../../utils/format";

export default function DashboardPage() {
  const { data, loading, error } = useMetrics();

  const kpis = [
    { label: "Registros", value: String(data.length) },
    { label: "Total", value: formatNumber(sumAmount(data)) },
    { label: "Promedio", value: formatNumber(avgAmount(data)) },
    { label: "Máximo", value: formatNumber(maxAmount(data)) },
  ];

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ margin: 0 }}>Simple Metrics Dashboard</h1>
      <p style={{ marginTop: 8, color: "#555" }}>
        MVP en construcción — Día 3 (KPIs)
      </p>

      {loading && <p>Cargando datos…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <KpiGrid items={kpis} />
          <MetricsTable rows={data} />
        </>
      )}
    </div>
  );
}
