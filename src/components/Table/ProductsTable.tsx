import type { Product } from "../../types/product";

export default function ProductsTable({ rows }: { rows: Product[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-700">
      <table className="w-full border-collapse">
        <thead className="bg-slate-950">
          <tr>
            <Th>Producto</Th>
            <Th>Categoría</Th>
            <Th align="right">Stock</Th>
            <Th align="center">Estado</Th>
            <Th align="right">Precio</Th>
          </tr>
        </thead>

        <tbody className="bg-slate-800 text-slate-100">
          {rows.map((p) => {
            const status =
              p.stock === 0 ? "SIN STOCK" : p.stock <= 10 ? "BAJO" : "OK";

            return (
              <tr
                key={p.id}
                className="border-t border-slate-700 hover:bg-slate-700/40"
              >
                <Td className="font-medium">{p.name}</Td>
                <Td className="text-slate-300">{p.category}</Td>

                <Td align="right" className="font-semibold">
                  {p.stock}
                </Td>

                <Td align="center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold
                      ${
                        status === "OK"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : status === "BAJO"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                  >
                    {status}
                  </span>
                </Td>

                <Td align="right">${p.price.toFixed(2)}</Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className={`px-4 py-3 text-sm font-semibold text-slate-300 ${
        align === "right"
          ? "text-right"
          : align === "center"
          ? "text-center"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <td
      className={`px-4 py-3 text-sm ${
        align === "right"
          ? "text-right"
          : align === "center"
          ? "text-center"
          : "text-left"
      } ${className}`}
    >
      {children}
    </td>
  );
}
