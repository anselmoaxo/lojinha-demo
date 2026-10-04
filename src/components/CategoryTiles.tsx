import Link from "next/link";
import { productCategories, products } from "@/content";
import { asset } from "@/lib/asset";
import { slugify } from "@/lib/slugify";

/** One tile per menu category, using the photo of its first available product. */
export function CategoryTiles() {
  const tiles = productCategories().map((category) => {
    const items = products.filter((product) => product.category === category);
    const cover = items.find((product) => product.available) ?? items[0];
    return { category, count: items.length, image: cover.image };
  });

  return (
    <section className="shell py-10" aria-labelledby="categorias-titulo">
      <h2 id="categorias-titulo" className="type-title">O que você procura?</h2>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tiles.map((tile) => (
          <li key={tile.category}>
            <Link href={`/produtos/#${slugify(tile.category)}`} className="group block rounded-[1.75rem] bg-seda p-3 transition-colors hover:bg-seda-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(tile.image)} alt="" loading="lazy" className="aspect-square w-full rounded-[1.25rem] object-cover" />
              <span className="mt-3 block px-1 text-lg font-bold">{tile.category}</span>
              <span className="block px-1 pb-1 text-sm text-cacau-soft">{tile.count} {tile.count === 1 ? "opção" : "opções"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
