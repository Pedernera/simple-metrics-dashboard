type Props = {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  categories: string[];
  onCategory: (v: string) => void;
  onReset: () => void;
};

export default function Filters({
  search,
  onSearch,
  category,
  categories,
  onCategory,
  onReset,
}: Props) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex-1">
        <label className="block text-sm text-slate-300 mb-1">Buscar</label>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Ej: leche, frutas, almacén…"
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      <div className="min-w-[220px]">
        <label className="block text-sm text-slate-300 mb-1">Categoría</label>
        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="all">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:pt-6">
        <button
          onClick={onReset}
          className="w-full sm:w-auto rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 hover:bg-slate-800 transition-colors"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
