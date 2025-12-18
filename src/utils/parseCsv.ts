import type { Product } from "../types/product";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function parseProductsCSV(text: string): Product[] {
  // soporta ; o , como separador
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const sep = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(sep).map((h) => normalize(h));

  const idx = {
    id: headers.findIndex((h) => h === "id"),
    name: headers.findIndex((h) => ["name", "producto", "product"].includes(h)),
    category: headers.findIndex((h) =>
      ["category", "categoria", "categoría"].includes(h)
    ),
    stock: headers.findIndex((h) => ["stock", "cantidad", "qty"].includes(h)),
    price: headers.findIndex((h) => ["price", "precio"].includes(h)),
  };

  // name/stock/price son mínimos
  if (idx.name === -1 || idx.stock === -1 || idx.price === -1) {
    throw new Error(
      "CSV inválido. Requiere columnas: name/producto, stock, price/precio. (category opcional)"
    );
  }

  const out: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(sep).map((c) => c.replace(/^"|"$/g, "").trim());

    const name = cols[idx.name] ?? "";
    const category = idx.category !== -1 ? cols[idx.category] ?? "" : "";
    const stockRaw = cols[idx.stock] ?? "0";
    const priceRaw = cols[idx.price] ?? "0";

    const stock = Number(stockRaw.replace(",", "."));
    const price = Number(priceRaw.replace(",", "."));

    if (!name) continue;
    if (!Number.isFinite(stock) || !Number.isFinite(price)) continue;

    out.push({
      id: idx.id !== -1 ? cols[idx.id] ?? String(i) : String(i),
      name,
      category: category || "Sin categoría",
      stock: Math.max(0, Math.floor(stock)),
      price: Math.max(0, price),
    });
  }

  return out;
}
