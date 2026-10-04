import Link from "next/link";
import { store } from "@/content";
import { CartButton } from "./CartButton";

export function Header() {
  return (
    <header className="store-header sticky top-0 z-40 bg-paper/95 backdrop-blur">
      <div className="shell flex h-18 items-center justify-between gap-4">
        <Link href="/" className="brand font-display text-2xl leading-none">{store.name}<span className="brand-subtitle">Confeitaria artesanal</span></Link>
        <nav aria-label="Principal" className="flex items-center gap-2 sm:gap-5">
          <Link href="/produtos/" className="link hidden sm:inline">Cardápio</Link>
          <Link href="/#onde" className="link hidden sm:inline">Onde estamos</Link>
          <CartButton />
        </nav>
      </div>
      <nav aria-label="Navegação no celular" className="mobile-nav shell flex gap-6 pb-3 sm:hidden">
        <Link href="/produtos/">Cardápio</Link>
        <Link href="/#categorias-titulo">Categorias</Link>
        <Link href="/#onde">Contato</Link>
      </nav>
    </header>
  );
}
