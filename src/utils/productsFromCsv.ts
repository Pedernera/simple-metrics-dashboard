import type { Product } from "../types/product";

function splitCsvLine(line: string, sep: string) {
  // simple y suficiente para CSV de Sheets
  return line.split(sep).map((c) => c.replace(/^"|"$/g, "").trim());
}

export function parseProductsCsv(text: string): Product[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const sep = lines[0].includes(";") ? ";" : ",";
  const headers = splitCsvLine(lines[0], sep).map((h) => h.toLowerCase());

  const idx = {
    id: headers.indexOf("id"),
    name: headers.indexOf("name"),
    category: headers.indexOf("category"),
    stock: headers.indexOf("stock"),
    price: headers.indexOf("price"),
  };

  // requerimos mínimo esto:
  if (idx.name === -1 || idx.stock === -1 || idx.price === -1) {
    throw new Error(
      "CSV inválido. Necesita columnas: name, stock, price (category opcional)."
    );
  }

  const out: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i], sep);

    const name = cols[idx.name] ?? "";
    if (!name) continue;

    const category =
      idx.category !== -1
        ? cols[idx.category] ?? "Sin categoría"
        : "Sin categoría";

    const stockRaw = cols[idx.stock] ?? "0";
    const priceRaw = cols[idx.price] ?? "0";

    const stock = Number(stockRaw.replace(",", "."));
    const price = Number(priceRaw.replace(",", "."));

    if (!Number.isFinite(stock) || !Number.isFinite(price)) continue;

    out.push({
      id: idx.id !== -1 ? cols[idx.id] ?? String(i) : String(i),
      name,
      category,
      stock: Math.max(0, Math.floor(stock)),
      price: Math.max(0, price),
    });
  }

  return out;
}
