export function toCSV<T extends Record<string, any>>(rows: T[]) {
  if (rows.length === 0) return "";

  const separator = ";";
  const headers = Object.keys(rows[0]).join(separator);

  const lines = rows.map((r) =>
    Object.values(r)
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(separator)
  );

  return [headers, ...lines].join("\n");
}

export function downloadCSV(csv: string, filename: string) {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
