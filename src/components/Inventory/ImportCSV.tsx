import { useState } from "react";
import type { Product } from "../../types/product";
import { parseProductsCSV } from "../../utils/parseProductsCsv";

export default function ImportCSV({
  onImport,
}: {
  onImport: (items: Product[]) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const items = parseProductsCSV(text);
      if (items.length === 0)
        throw new Error("No se encontraron filas válidas.");
      onImport(items);
      e.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error importando CSV");
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-300">
        <span className="font-semibold text-slate-100">Importar CSV</span>{" "}
        (producto, categoría opcional, stock, precio)
      </div>

      <label className="cursor-pointer rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 hover:bg-slate-800 w-fit">
        Elegir archivo
        <input
          className="hidden"
          type="file"
          accept=".csv,text/csv"
          onChange={handleFile}
        />
      </label>

      {error && <div className="text-sm text-red-300">{error}</div>}
    </div>
  );
}
