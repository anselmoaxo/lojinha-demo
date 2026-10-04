"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/content";
import { ProductCard } from "./ProductCard";

const normalize = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Catalog({ products, categories }: { products: Product[]; categories: string[] }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = normalize(query.trim());
    return products
      .filter((product) => category === "Todos" || product.category === category)
      .filter((product) => !term || normalize(`${product.name} ${product.description}`).includes(term))
      .sort((a, b) => Number(b.available) - Number(a.available));
  }, [products, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          {["Todos", ...categories].map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`chip ${category === item ? "chip-active" : ""}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produto" aria-label="Buscar produto" className="field pl-10" />
        </div>
      </div>
      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
