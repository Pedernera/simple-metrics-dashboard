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
    <div
      style={{
        display: "flex",
        gap: 12,
        marginTop: 16,
        flexWrap: "wrap",
      }}
    >
      <input
        placeholder="Buscar categoría…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          padding: "8px 10px",
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      />

      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        style={{
          padding: "8px 10px",
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <option value="all">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        onClick={onReset}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "white",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Limpiar
      </button>
    </div>
  );
}
