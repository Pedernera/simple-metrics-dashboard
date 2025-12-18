import { useProducts } from "../../hooks/useProducts";
import { useFilters } from "../../hooks/useFilters";
import Filters from "../../components/Table/Filters";
import ProductsTable from "../../components/Table/ProductsTable";
import ExportButton from "../../components/Table/ExportButton";
import { toCSV, downloadCSV } from "../../utils/csv";

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
            <ProductsTable rows={filtered} />
          </>
        )}
      </div>
    </div>
  );
}
