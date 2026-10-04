import Link from "next/link";
import { store } from "@/content";
import { CartButton } from "./CartButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">{store.name}</Link>
        <nav aria-label="Principal" className="flex items-center gap-5">
          <Link href="/produtos/" className="nav-link">Cardápio</Link>
          <Link href="/#contato" className="nav-link hidden sm:inline">Contato</Link>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
