import type { Product } from "../../types/product";
import { getStockStatus } from "../../utils/stockStatus";

export default function ProductsTable({ rows }: { rows: Product[] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[760px]">
          <thead className="bg-slate-950">
            <tr>
              <Th>Producto</Th>
              <Th>Categoría</Th>
              <Th align="right">Stock</Th>
              <Th align="right">Precio</Th>
              <Th align="center">Estado</Th>
            </tr>
          </thead>

          <tbody className="bg-slate-800 text-slate-100">
            {rows.map((p) => {
              const status = getStockStatus(p);
              const isBad = status !== "OK";

              return (
                <tr
                  key={p.id}
                  className={[
                    "border-t border-slate-700/70 transition-colors",
                    "hover:bg-slate-700",
                    isBad ? "bg-slate-800/60" : "",
                  ].join(" ")}
                >
                  <Td className="font-medium text-slate-100">{p.name}</Td>
                  <Td className="text-slate-300">{p.category}</Td>

                  <Td
                    align="right"
                    className={
                      status === "SIN_STOCK"
                        ? "text-red-300 font-semibold"
                        : status === "BAJO"
                        ? "text-amber-300 font-semibold"
                        : "text-slate-100"
                    }
                  >
                    {p.stock}
                  </Td>

                  <Td align="right" className="text-slate-200">
                    ${p.price.toFixed(2)}
                  </Td>

                  <Td align="center">
                    <StatusBadge status={status} />
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "OK" | "BAJO" | "SIN_STOCK" }) {
  if (status === "SIN_STOCK") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-red-500/15 text-red-200 border border-red-500/30">
        Sin stock
      </span>
    );
  }
  if (status === "BAJO") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-amber-500/15 text-amber-200 border border-amber-500/30">
        Bajo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-200 border border-emerald-500/30">
      OK
    </span>
  );
}

/* helpers */
function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className={[
        "px-4 py-3 text-sm font-semibold text-slate-200 whitespace-nowrap",
        align === "right"
          ? "text-right"
          : align === "center"
          ? "text-center"
          : "text-left",
      ].join(" ")}
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
      className={[
        "px-4 py-3 text-[15px] whitespace-nowrap",
        align === "right"
          ? "text-right"
          : align === "center"
          ? "text-center"
          : "text-left",
        className,
      ].join(" ")}
    >
      {children}
    </td>
  );
}
