"use client";

import { useId, useState } from "react";
import type { Product } from "@/content";
import { ProductImage } from "./ProductImage";
import { formatBRL, toCents } from "@/lib/order";
import { useCart } from "./CartProvider";

/** A row of the menu: round photo, name and description, price and the add button. */
export function MenuItem({ product, large = false }: { product: Product; large?: boolean }) {
  const { add } = useCart();
  const options = product.options ?? [];
  const [option, setOption] = useState(options[0] ?? "");
  const selectId = useId();

  return (
    <article className={`product-card ${large ? "product-featured" : ""}`}>
      <div className="product-photo">
        <ProductImage src={product.image} alt={`${product.image.endsWith(".svg") ? "Ilustração" : "Fotografia"} de ${product.name}`} />
        {!product.available ? <span className="photo-badge">Indisponível</span> : product.image.endsWith(".svg") ? <span className="photo-badge">Imagem ilustrativa</span> : null}
      </div>
      <div className="product-details flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className={large ? "text-[1.33rem] font-bold" : "text-lg font-bold"}>{product.name}</h3>
          <p className="font-bold text-morango">{formatBRL(toCents(product.price))}</p>
        </div>
        <p className="max-w-[60ch] text-cacau-soft">{product.description}</p>
        <div className="product-actions mt-auto flex flex-wrap items-end gap-3 pt-4">
          {options.length > 0 ? (
            <div className="w-full min-w-0">
              <label htmlFor={selectId} className="sr-only">Opção de {product.name}</label>
              <select id={selectId} value={option} onChange={(event) => setOption(event.target.value)} className="field py-2" disabled={!product.available}>
                {options.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          ) : null}
          {product.available ? (
            <button type="button" className="btn btn-cacau w-full" aria-label={`Adicionar ${product.name} ao pedido`} onClick={() => add(product, option)}>Adicionar ao pedido <span aria-hidden>+</span></button>
          ) : (
            <p className="rounded-full bg-seda px-4 py-2 text-sm font-bold">Esgotado no momento</p>
          )}
        </div>
      </div>
    </article>
  );
}
