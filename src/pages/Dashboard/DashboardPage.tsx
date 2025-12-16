import { useMetrics } from "../../hooks/useMetrics";
import MetricsTable from "../../components/Table/MetricsTable";

export default function DashboardPage() {
  const { data, loading, error } = useMetrics();

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ margin: 0 }}>Simple Metrics Dashboard</h1>
      <p style={{ marginTop: 8, color: "#555" }}>
        MVP en construcción — Día 2 (datos + estados)
      </p>

      {loading && <p>Cargando datos…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {!loading && !error && <MetricsTable rows={data} />}
    </div>
  );
}
