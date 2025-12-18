import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../utils/api";

type State = { data: Product[]; loading: boolean; error: string | null };

export function useProducts() {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setState((s) => ({ ...s, loading: true, error: null }));
        const data = await getProducts();
        if (!cancelled) setState({ data, loading: false, error: null });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Error cargando productos";
        if (!cancelled) setState({ data: [], loading: false, error: msg });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
