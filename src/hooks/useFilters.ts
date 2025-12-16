import { useMemo, useState } from "react";
import type { MetricRecord } from "../types/record";

export function useFilters(data: MetricRecord[]) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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

  return {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filtered,
  };
}
