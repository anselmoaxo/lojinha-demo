import type { Metadata } from "next";
import { MarketplaceLinks } from "@/components/MarketplaceLinks";
import { MenuItem } from "@/components/MenuItem";
import { siteUrl } from "@/config/site";
import { productCategories, products, store } from "@/content";
import { slugify } from "@/lib/slugify";

export const metadata: Metadata = {
  title: "Cardápio",
  description: `Todos os produtos da ${store.name}. Monte o pedido e envie pelo WhatsApp.`,
  alternates: { canonical: siteUrl("/produtos/") },
};

export default function ProductsPage() {
  const categories = productCategories();

  return (
    <>
      <section className="bg-seda">
        <div className="shell py-12">
          <p className="eyebrow mb-3">Escolha seus favoritos</p>
          <h1 className="type-title">Nosso cardápio</h1>
          <p className="type-lead mt-3">{store.orders.notice}</p>
          <MarketplaceLinks className="mt-6" />
        </div>
      </section>

      <nav aria-label="Categorias do cardápio" className="menu-nav sticky top-18 z-30 border-b-2 border-seda bg-paper/95 backdrop-blur">
        <ul className="shell flex gap-1 overflow-x-auto py-2">
          {categories.map((category) => (
            <li key={category}><a href={`#${slugify(category)}`}>{category}</a></li>
          ))}
        </ul>
      </nav>

      <div className="shell">
        {categories.map((category) => {
          const items = products.filter((product) => product.category === category).sort((a, b) => Number(b.available) - Number(a.available));
          return (
            <section key={category} id={slugify(category)} className="pt-12" aria-labelledby={`${slugify(category)}-titulo`}>
              <h2 id={`${slugify(category)}-titulo`} className="type-section">{category}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => <MenuItem key={product.id} product={product} />)}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
