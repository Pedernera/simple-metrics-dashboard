import { useEffect, useState } from "react";
import type { MetricRecord } from "../types/record";
import { getMetrics } from "../utils/api";

type State = {
  data: MetricRecord[];
  loading: boolean;
  error: string | null;
};

export function useMetrics() {
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
        const data = await getMetrics();
        if (cancelled) return;
        setState({ data, loading: false, error: null });
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Unknown error";
        setState({ data: [], loading: false, error: msg });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
