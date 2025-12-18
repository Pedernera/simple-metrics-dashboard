import { useProducts } from "../../hooks/useProducts";
import { useFilters } from "../../hooks/useFilters";
import Filters from "../../components/Table/Filters";
import ProductsTable from "../../components/Table/ProductsTable";

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

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-slate-800 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-100">
          Inventory Dashboard
        </h1>
        <p className="text-slate-400 mt-1">Control de stock</p>

        {loading && <p className="mt-6">Cargando…</p>}
        {error && <p className="mt-6 text-red-400">{error}</p>}

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
