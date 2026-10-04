"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/content";
import { trackEvent } from "@/config/analytics";
import { clampQuantity, type CartLine } from "@/lib/order";

type StoredLine = { productId: string; option: string; quantity: number };
export type ResolvedLine = CartLine & { key: string; product: Product };

type CartContextValue = {
  lines: ResolvedLine[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, option?: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "lojinha-carrinho";
const CartContext = createContext<CartContextValue | null>(null);
const lineKey = (productId: string, option: string) => `${productId}::${option}`;

function readStored(): StoredLine[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((line) => line && typeof line.productId === "string" && typeof line.option === "string")
      .map((line) => ({ productId: line.productId, option: line.option, quantity: clampQuantity(Number(line.quantity)) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Restoring the saved cart after hydration keeps server and client HTML identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStored(readStored());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* Private mode or blocked storage: the cart still works for this visit. */
    }
  }, [stored, loaded]);

  // Prices and names always come from the current catalog, so edits in the panel apply to saved carts
  // and products that were removed or marked unavailable drop out.
  const lines = useMemo<ResolvedLine[]>(
    () =>
      stored.flatMap((line) => {
        const product = products.find((item) => item.id === line.productId);
        if (!product || !product.available) return [];
        const option = product.options.includes(line.option) ? line.option : "";
        if (product.options.length > 0 && !option) return [];
        return [{ key: lineKey(product.id, option), product, name: product.name, option: option || undefined, unitPrice: product.price, quantity: line.quantity }];
      }),
    [stored],
  );

  const add = useCallback((product: Product, option = "") => {
    setStored((current) => {
      const existing = current.find((line) => line.productId === product.id && line.option === option);
      if (existing) return current.map((line) => (line === existing ? { ...line, quantity: clampQuantity(line.quantity + 1) } : line));
      return [...current, { productId: product.id, option, quantity: 1 }];
    });
    trackEvent("Adicionou ao carrinho", { produto: product.name });
    setOpen(true);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setStored((current) => current.map((line) => (lineKey(line.productId, line.option) === key ? { ...line, quantity: clampQuantity(quantity) } : line)));
  }, []);

  const remove = useCallback((key: string) => {
    setStored((current) => current.filter((line) => lineKey(line.productId, line.option) !== key));
  }, []);

  const clear = useCallback(() => setStored([]), []);

  const value = useMemo(
    () => ({ lines, count: lines.reduce((sum, line) => sum + line.quantity, 0), open, setOpen, add, setQuantity, remove, clear }),
    [lines, open, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
