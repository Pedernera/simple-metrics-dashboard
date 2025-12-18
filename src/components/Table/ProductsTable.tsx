import type { Product } from "../../types/product";

export default function ProductsTable({ rows }: { rows: Product[] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-slate-700">
      <table className="w-full border-collapse">
        <thead className="bg-slate-950">
          <tr>
            <Th>Producto</Th>
            <Th>Categoría</Th>
            <Th align="right">Stock</Th>
            <Th align="right">Precio</Th>
          </tr>
        </thead>

        <tbody className="bg-slate-800 text-slate-100">
          {rows.map((p) => (
            <tr
              key={p.id}
              className="border-t border-slate-700/70 hover:bg-slate-700 transition-colors"
            >
              {/* Producto */}
              <Td className="font-medium text-slate-100">{p.name}</Td>

              {/* Categoría */}
              <Td className="text-slate-300">{p.category}</Td>

              {/* Stock */}
              <Td
                align="right"
                className={
                  p.stock <= 10
                    ? "text-red-400 font-semibold"
                    : "text-slate-100"
                }
              >
                {p.stock}
              </Td>

              {/* Precio */}
              <Td align="right" className="text-slate-200">
                ${p.price.toFixed(2)}
              </Td>
            </tr>
          ))}
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
      className={`px-4 py-3 text-sm font-semibold text-slate-200 ${
        align === "right" ? "text-right" : "text-left"
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
      className={`px-4 py-3 text-[15px] ${
        align === "right" ? "text-right" : "text-left"
      } ${className}`}
    >
      {children}
    </td>
  );
}
