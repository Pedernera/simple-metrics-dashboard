export function formatNumber(n: number) {
  return new Intl.NumberFormat().format(Math.round(n * 100) / 100);
}
