"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button type="button" onClick={() => setOpen(true)} className="relative inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white transition hover:bg-brand-700" aria-label={`Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`}>
      <ShoppingBag aria-hidden className="size-5" />
      <span className="hidden sm:inline">Carrinho</span>
      <span className="grid min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs text-ink">{count}</span>
    </button>
  );
}
