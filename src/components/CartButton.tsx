"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, setOpen } = useCart();
  const [bump, setBump] = useState(false);
  const previous = useRef(count);

  useEffect(() => {
    if (count > previous.current) {
      setBump(true);
      const timer = window.setTimeout(() => setBump(false), 320);
      previous.current = count;
      return () => window.clearTimeout(timer);
    }
    previous.current = count;
  }, [count]);

  return (
    <button type="button" onClick={() => setOpen(true)} className="btn btn-cacau btn-small" aria-label={`Ver pedido, ${count} ${count === 1 ? "item" : "itens"}`}>
      Seu pedido
      <span className={`grid min-w-7 place-items-center rounded-full bg-seda px-2 text-sm text-cacau ${bump ? "bump" : ""}`}>{count}</span>
    </button>
  );
}
