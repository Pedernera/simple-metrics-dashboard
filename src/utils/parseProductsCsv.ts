import type { Product } from "../types/product";

const norm = (s: string) => s.trim().toLowerCase();

export function parseProductsCSV(text: string): Product[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const sep = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(sep).map(norm);

  const iName = headers.findIndex((h) =>
    ["producto", "product", "name"].includes(h)
  );
  const iCat = headers.findIndex((h) =>
    ["categoria", "categoría", "category"].includes(h)
  );
  const iStock = headers.findIndex((h) =>
    ["stock", "cantidad", "qty"].includes(h)
  );
  const iPrice = headers.findIndex((h) => ["precio", "price"].includes(h));
  const iId = headers.findIndex((h) => h === "id");

  if (iName === -1 || iStock === -1 || iPrice === -1) {
    throw new Error(
      "CSV inválido. Columnas mínimas: producto/name, stock, precio/price."
    );
  }

  const out: Product[] = [];

  for (let r = 1; r < lines.length; r++) {
    const cols = lines[r].split(sep).map((c) => c.replace(/^"|"$/g, "").trim());

    const name = cols[iName] ?? "";
    if (!name) continue;

    const category =
      iCat !== -1 ? cols[iCat] ?? "Sin categoría" : "Sin categoría";
    const stock = Number((cols[iStock] ?? "0").replace(",", "."));
    const price = Number((cols[iPrice] ?? "0").replace(",", "."));

    if (!Number.isFinite(stock) || !Number.isFinite(price)) continue;

    out.push({
      id: iId !== -1 ? cols[iId] || String(r) : String(r),
      name,
      category,
      stock: Math.max(0, Math.floor(stock)),
      price: Math.max(0, price),
    });
  }

  return out;
}
