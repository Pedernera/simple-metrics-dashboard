import type { Product } from "../types/product";
import { parseProductsCsv } from "./productsFromCsv";

export async function getProducts(): Promise<Product[]> {
  const url = import.meta.env.VITE_PRODUCTS_CSV_URL as string | undefined;

  if (!url) {
    throw new Error("Falta VITE_PRODUCTS_CSV_URL en .env");
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`No pude cargar el CSV (${res.status})`);
  }

  const text = await res.text();
  const items = parseProductsCsv(text);

  if (items.length === 0) {
    throw new Error("El CSV está vacío o no tiene filas válidas.");
  }

  return items;
}
