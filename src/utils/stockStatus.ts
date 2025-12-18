import type { Product } from "../types/product";

export type StockStatus = "OK" | "BAJO" | "SIN_STOCK";

export function getStockStatus(p: Product): StockStatus {
  if (p.stock === 0) return "SIN_STOCK";
  if (p.stock <= 10) return "BAJO";
  return "OK";
}
