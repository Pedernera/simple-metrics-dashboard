import type { MetricRecord } from "../types/record";

export const mockData: MetricRecord[] = [
  { id: "1", date: "2025-12-01", category: "Ventas", amount: 120 },
  { id: "2", date: "2025-12-02", category: "Ventas", amount: 80 },
  { id: "3", date: "2025-12-02", category: "Marketing", amount: 50 },
  { id: "4", date: "2025-12-03", category: "Soporte", amount: 30 },
  { id: "5", date: "2025-12-03", category: "Ventas", amount: 200 },
];
