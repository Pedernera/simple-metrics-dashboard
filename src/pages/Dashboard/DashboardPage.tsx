import { useMetrics } from "../../hooks/useMetrics";
import { useFilters } from "../../hooks/useFilters";
import MetricsTable from "../../components/Table/MetricsTable";
import Filters from "../../components/Table/Filters";
import ExportButton from "../../components/Table/ExportButton";
import KpiGrid from "../../components/KPI/KpiGrid";
import { avgAmount, maxAmount, sumAmount } from "../../utils/metrics";
import { formatNumber } from "../../utils/format";
import { toCSV, downloadCSV } from "../../utils/csv";

export default function DashboardPage() {
  const { data, loading, error } = useMetrics();
  const {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filtered,
    reset,
  } = useFilters(data);

  const kpis = [
    { label: "Registros", value: String(filtered.length) },
    { label: "Total", value: formatNumber(sumAmount(filtered)) },
    { label: "Promedio", value: formatNumber(avgAmount(filtered)) },
    { label: "Máximo", value: formatNumber(maxAmount(filtered)) },
  ];

  function handleExport() {
    const csv = toCSV(filtered);
    downloadCSV(csv, "metrics.csv");
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ margin: 0 }}>Simple Metrics Dashboard</h1>
      <p style={{ marginTop: 8, color: "#555" }}>MVP — Día 5 (export CSV)</p>

      {loading && <p>Cargando datos…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <Filters
            search={search}
            onSearch={setSearch}
            category={category}
            categories={categories}
            onCategory={setCategory}
            onReset={reset}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <KpiGrid items={kpis} />
            <ExportButton onClick={handleExport} />
          </div>

          <MetricsTable rows={filtered} />
        </>
      )}
    </div>
  );
}
