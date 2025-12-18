import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Product } from "../types/product";

export function useFilters(data: Product[]) {
  const [search, setSearch] = useLocalStorage<string>("inv.search", "");
  const [category, setCategory] = useLocalStorage<string>("inv.category", "all");

  const categories = useMemo(() => {
    const set = new Set(data.map((d) => d.category));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return data.filter((p) => {
      const matchSearch =
        s === "" ||
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s);

      const matchCategory = category === "all" || p.category === category;

      return matchSearch && matchCategory;
    });
  }, [data, search, category]);

  function reset() {
    setSearch("");
    setCategory("all");
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filtered,
    reset,
  };
}
