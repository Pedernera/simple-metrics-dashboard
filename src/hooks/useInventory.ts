import { useLocalStorage } from "./useLocalStorage";
import type { Product } from "../types/product";

export function useInventory() {
  const [items, setItems] = useLocalStorage<Product[]>("inv.items", []);

  function setAll(next: Product[]) {
    setItems(next);
  }

  function addItem(p: Product) {
    setItems((prev) => [p, ...prev]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function adjustStock(id: string, delta: number) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  }

  function updatePrice(id: string, price: number) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: Math.max(0, price) } : p))
    );
  }

  return { items, setAll, addItem, removeItem, adjustStock, updatePrice };
}
