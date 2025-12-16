import type { MetricRecord } from "../types/record";

export function sumAmount(rows: MetricRecord[]) {
  return rows.reduce((acc, r) => acc + r.amount, 0);
}

export function avgAmount(rows: MetricRecord[]) {
  if (rows.length === 0) return 0;
  return sumAmount(rows) / rows.length;
}

export function maxAmount(rows: MetricRecord[]) {
  if (rows.length === 0) return 0;
  return rows.reduce((m, r) => (r.amount > m ? r.amount : m), rows[0].amount);
}
