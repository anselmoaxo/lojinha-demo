"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Product } from "@/content";
import { asset } from "@/lib/asset";
import { formatBRL, toCents } from "@/lib/order";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const options = product.options ?? [];
  const [option, setOption] = useState(options[0] ?? "");
  const selectId = useId();

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
      <div className="relative aspect-square bg-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(product.image)} alt={product.name} loading="lazy" className="size-full object-cover" />
        {!product.available ? <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">Esgotado</span> : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="eyebrow text-brand-700">{product.category}</p>
          <h3 className="mt-1 text-lg font-bold leading-tight">{product.name}</h3>
          <p className="mt-2 text-sm text-muted">{product.description}</p>
        </div>
        {options.length > 0 ? (
          <div>
            <label htmlFor={selectId} className="field-label">Opção</label>
            <select id={selectId} value={option} onChange={(event) => setOption(event.target.value)} className="field" disabled={!product.available}>
              {options.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="text-xl font-extrabold">{formatBRL(toCents(product.price))}</p>
          <button type="button" className="button-primary" disabled={!product.available} onClick={() => add(product, option)}>
            <Plus aria-hidden className="size-4" />
            {product.available ? "Adicionar" : "Indisponível"}
          </button>
        </div>
      </div>
    </article>
  );
}
