"use client";

import { useId, useState } from "react";
import type { Product } from "@/content";
import { asset } from "@/lib/asset";
import { formatBRL, toCents } from "@/lib/order";
import { useCart } from "./CartProvider";

/** A row of the menu: round photo, name and description, price and the add button. */
export function MenuItem({ product, large = false }: { product: Product; large?: boolean }) {
  const { add } = useCart();
  const options = product.options ?? [];
  const [option, setOption] = useState(options[0] ?? "");
  const selectId = useId();

  return (
    <article className={large ? "flex flex-col gap-4" : "grid grid-cols-[5.5rem_1fr] gap-4 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(product.image)}
        alt={product.name}
        loading="lazy"
        className={large ? "aspect-[4/3] w-full rounded-[2rem] object-cover" : "aspect-square w-full rounded-full object-cover ring-4 ring-seda"}
      />
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className={large ? "text-[1.33rem] font-bold" : "text-lg font-bold"}>{product.name}</h3>
          <p className="font-bold text-morango">{formatBRL(toCents(product.price))}</p>
        </div>
        <p className="max-w-[60ch] text-cacau-soft">{product.description}</p>
        <div className="mt-1 flex flex-wrap items-end gap-3">
          {options.length > 0 ? (
            <div className="min-w-40">
              <label htmlFor={selectId} className="sr-only">Opção de {product.name}</label>
              <select id={selectId} value={option} onChange={(event) => setOption(event.target.value)} className="field py-2" disabled={!product.available}>
                {options.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          ) : null}
          {product.available ? (
            <button type="button" className="btn btn-cacau btn-small" onClick={() => add(product, option)}>Adicionar</button>
          ) : (
            <p className="rounded-full bg-seda px-4 py-2 text-sm font-bold">Esgotado no momento</p>
          )}
        </div>
      </div>
    </article>
  );
}
