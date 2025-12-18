import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../utils/api";

type State = {
  data: Product[];
  loading: boolean;
  error: string | null;
};

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
        const data = await getProducts();
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: "Error cargando products",
          });
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}
