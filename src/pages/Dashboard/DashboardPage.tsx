import { useMetrics } from "../../hooks/useMetrics";
import { useFilters } from "../../hooks/useFilters";
import MetricsTable from "../../components/Table/MetricsTable";
import Filters from "../../components/Table/Filters";
import KpiGrid from "../../components/KPI/KpiGrid";
import { avgAmount, maxAmount, sumAmount } from "../../utils/metrics";
import { formatNumber } from "../../utils/format";

export default function DashboardPage() {
  const { data, loading, error } = useMetrics();
  const { search, setSearch, category, setCategory, categories, filtered } =
    useFilters(data);

  const kpis = [
    { label: "Registros", value: String(filtered.length) },
    { label: "Total", value: formatNumber(sumAmount(filtered)) },
    { label: "Promedio", value: formatNumber(avgAmount(filtered)) },
    { label: "Máximo", value: formatNumber(maxAmount(filtered)) },
  ];

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1000 }}>
      <h1 style={{ margin: 0 }}>Simple Metrics Dashboard</h1>
      <p style={{ marginTop: 8, color: "#555" }}>
        MVP — Día 4 (búsqueda + filtro)
      </p>

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
          />

          <KpiGrid items={kpis} />
          <MetricsTable rows={filtered} />
        </>
      )}
    </div>
  );
}
