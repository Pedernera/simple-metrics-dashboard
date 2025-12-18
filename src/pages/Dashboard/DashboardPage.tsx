import { useInventoryFromSheet } from "../../hooks/useInventoryFromSheet";
import { useFilters } from "../../hooks/useFilters";
import Filters from "../../components/Table/Filters";
import ProductsTable from "../../components/Table/ProductsTable";
import ExportButton from "../../components/Table/ExportButton";
import { toCSV, downloadCSV } from "../../utils/csv";

export default function DashboardPage() {
  const { items, loading, error, adjustStock, syncFromSheet, resetLocal } =
    useInventoryFromSheet();

  const {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filtered,
    reset,
  } = useFilters(items);

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
              Control de stock (Google Sheets)
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Mostrando {filtered.length} productos
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={syncFromSheet}
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 hover:bg-slate-800"
            >
              Sincronizar
            </button>

            <button
              onClick={resetLocal}
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 hover:bg-slate-800"
            >
              Reset local
            </button>

            <ExportButton
              onClick={handleExport}
              disabled={filtered.length === 0}
            />
          </div>
        </div>

        {loading && <p className="mt-6 text-slate-300">Cargando inventario…</p>}
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

            <ProductsTable rows={filtered} onAdjustStock={adjustStock} />
          </>
        )}
      </div>
    </div>
  );
}
