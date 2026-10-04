import Link from "next/link";
import { store } from "@/content";
import { ProductImage } from "./ProductImage";

export function BoxHero() {
  return (
    <div className="hero-photo">
      <ProductImage src={store.hero.image} alt={store.hero.imageAlt} priority sizes="(min-width: 768px) 50vw, 100vw" />
      <Link href="/produtos/#bolos" className="hero-caption">
        <span className="eyebrow">Um doce para cada ocasião</span>
        <span className="mt-1 block text-xl font-bold">Conheça nossos bolos <span aria-hidden>↗</span></span>
      </Link>
    </div>
  );
}
