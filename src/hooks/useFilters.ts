import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Product } from "../types/product";

export function useFilters(data: Product[]) {
  const [search, setSearch] = useLocalStorage("inv.search", "");
  const [category, setCategory] = useLocalStorage("inv.category", "all");
  const [onlyCritical, setOnlyCritical] = useLocalStorage(
    "inv.onlyCritical",
    false
  );
  const [lowLimit, setLowLimit] = useLocalStorage<number>("inv.lowLimit", 10);

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

      const isCritical = p.stock === 0 || p.stock <= lowLimit;
      const matchCritical = !onlyCritical || isCritical;

      return matchSearch && matchCategory && matchCritical;
    });
  }, [data, search, category, onlyCritical, lowLimit]);

  function reset() {
    setSearch("");
    setCategory("all");
    setOnlyCritical(false);
    setLowLimit(10);
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    onlyCritical,
    setOnlyCritical,
    lowLimit,
    setLowLimit,
    filtered,
    reset,
  };
}
