import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useLocalStorage } from "./useLocalStorage";
import { getProducts } from "../utils/api";

type State = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

export function useInventoryFromSheet() {
  const [stored, setStored] = useLocalStorage<Product[]>("inv.items", []);
  const [state, setState] = useState<State>({
    items: stored,
    loading: stored.length === 0,
    error: null,
  });

  // si no hay nada guardado, trae desde sheet una vez
  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (stored.length > 0) return;

      try {
        const data = await getProducts();
        if (cancelled) return;
        setStored(data);
        setState({ items: data, loading: false, error: null });
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "Error cargando inventario";
        if (!cancelled) setState({ items: [], loading: false, error: msg });
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [stored.length, setStored]);

  function syncFromSheet() {
    setState((s) => ({ ...s, loading: true, error: null }));
    return getProducts()
      .then((data) => {
        setStored(data);
        setState({ items: data, loading: false, error: null });
      })
      .catch((e) => {
        const msg = e instanceof Error ? e.message : "Error sincronizando";
        setState((s) => ({ ...s, loading: false, error: msg }));
      });
  }

  function adjustStock(id: string, delta: number) {
    setStored((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      );
      setState((s) => ({ ...s, items: next }));
      return next;
    });
  }

  function resetLocal() {
    setStored([]);
    setState({ items: [], loading: true, error: null });
    // al quedar vacío, el useEffect lo vuelve a traer desde Sheets
  }

  return {
    items: state.items,
    loading: state.loading,
    error: state.error,
    adjustStock,
    syncFromSheet,
    resetLocal,
  };
}
