"use client";

import Link from "next/link";
import { products, store } from "@/content";
import { ProductImage } from "./ProductImage";
import { formatBRL, toCents } from "@/lib/order";
import { useCart } from "./CartProvider";

/** Weekly highlight edited in the panel (Configurações da loja → Destaque da semana). */
export function PromoBanner() {
  const { add } = useCart();
  const promo = store.promo;
  if (!promo?.active) return null;
  const product = products.find((item) => item.id === promo.productId && item.available);

  return (
    <section className="bg-cacau text-paper" aria-labelledby="destaque-titulo">
      <div className="shell grid items-center gap-8 py-12 md:grid-cols-[1fr_1.2fr] md:py-16">
        <div className="promo-photo"><ProductImage src={promo.image} alt={promo.imageAlt} />{promo.image.endsWith(".svg") ? <span className="photo-badge">Imagem ilustrativa</span> : null}</div>
        <div>
          <p className="font-bold text-pistache">Destaque da semana</p>
          <h2 id="destaque-titulo" className="type-title mt-2">{promo.title}</h2>
          <p className="mt-4 max-w-[48ch] text-lg text-seda">{promo.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {product ? (
              <>
                <button type="button" className="btn bg-paper text-cacau hover:bg-seda" onClick={() => add(product, product.options[0] ?? "")}>
                  Adicionar ao pedido
                </button>
                <span className="text-xl font-bold">{formatBRL(toCents(product.price))}</span>
              </>
            ) : (
              <Link href="/produtos/" className="btn bg-paper text-cacau hover:bg-seda">Ver o cardápio</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
