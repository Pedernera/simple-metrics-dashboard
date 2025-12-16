import { mockData } from "../data/mock";
import { sleep } from "./sleep";
import type { MetricRecord } from "../types/record";

export async function getMetrics(): Promise<MetricRecord[]> {
  // simula latencia real
  await sleep(600);

  // (más adelante lo cambiamos por una API real)
  return mockData;
}
