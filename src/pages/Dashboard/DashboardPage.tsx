import { useProducts } from "../../hooks/useProducts";
import { useFilters } from "../../hooks/useFilters";
import Filters from "../../components/Table/Filters";
import ProductsTable from "../../components/Table/ProductsTable";
import KpiGrid from "../../components/KPI/KpiGrid";
import ExportButton from "../../components/Table/ExportButton";
import { toCSV, downloadCSV } from "../../utils/csv";

import {
  totalProducts,
  totalStock,
  lowStock,
  highestStock,
} from "../../utils/inventoryMetrics";

export default function DashboardPage() {
  const { data, loading, error } = useProducts();

  const {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filtered,
    reset,
  } = useFilters(data);

  const top = highestStock(filtered);
  const outOfStock = filtered.filter((p) => p.stock === 0).length;
  const low = filtered.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const inventoryValue = filtered.reduce(
    (acc, p) => acc + p.stock * p.price,
    0
  );

  const kpis = [
    { label: "Productos", value: String(filtered.length) },
    { label: "Valor inventario", value: `$${inventoryValue.toFixed(2)}` },
    { label: "Stock bajo", value: String(low) },
    { label: "Sin stock", value: String(outOfStock) },
  ];

  function handleExport() {
    const csv = toCSV(filtered);
    downloadCSV(csv, "inventario.csv");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">
              Inventory Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Control de stock de supermercado
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Mostrando {filtered.length} productos
            </p>
          </div>

          <div className="sm:pt-1">
            <ExportButton
              onClick={handleExport}
              disabled={filtered.length === 0}
            />
          </div>
        </div>

        {loading && <p className="mt-6 text-slate-300">Cargando productos…</p>}
        {error && <p className="mt-6 text-red-400">Error: {error}</p>}

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

            <KpiGrid items={kpis} />

            <ProductsTable rows={filtered} />
          </>
        )}
      </div>
    </div>
  );
}
