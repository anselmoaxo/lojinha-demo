import Link from "next/link";
import { store } from "@/content";
import { CartButton } from "./CartButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur">
      <div className="shell flex h-18 items-center justify-between gap-4">
        <Link href="/" className="font-display text-2xl leading-none">{store.name}</Link>
        <nav aria-label="Principal" className="flex items-center gap-2 sm:gap-5">
          <Link href="/produtos/" className="link hidden sm:inline">Cardápio</Link>
          <Link href="/#onde" className="link hidden sm:inline">Onde estamos</Link>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
