import type { Product } from "../types/product";

export function totalProducts(items: Product[]) {
  return items.length;
}

export function totalStock(items: Product[]) {
  return items.reduce((acc, p) => acc + p.stock, 0);
}

export function lowStock(items: Product[], limit = 10) {
  return items.filter((p) => p.stock <= limit).length;
}

export function highestStock(items: Product[]) {
  if (items.length === 0) return null;
  return items.reduce((a, b) => (b.stock > a.stock ? b : a));
}
