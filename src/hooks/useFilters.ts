import { useMemo } from "react";
import type { MetricRecord } from "../types/record";
import { useLocalStorage } from "./useLocalStorage";

export function useFilters(data: MetricRecord[]) {
  const [search, setSearch] = useLocalStorage<string>("smd.search", "");
  const [category, setCategory] = useLocalStorage<string>(
    "smd.category",
    "all"
  );

  const categories = useMemo(() => {
    const set = new Set(data.map((d) => d.category));
    return Array.from(set);
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const matchSearch =
        search === "" ||
        r.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "all" || r.category === category;

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
