import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { siteUrl } from "@/config/site";
import { productCategories, products, store } from "@/content";

export const metadata: Metadata = {
  title: "Cardápio",
  description: `Todos os produtos da ${store.name}. Monte o carrinho e envie o pedido pelo WhatsApp.`,
  alternates: { canonical: siteUrl("/produtos/") },
};

export default function ProductsPage() {
  return (
    <section className="container-shell py-12">
      <h1 className="display-title">Cardápio</h1>
      <p className="mt-4 max-w-2xl text-muted">{store.orders.notice}</p>
      <div className="mt-10">
        <Catalog products={products} categories={productCategories()} />
      </div>
    </section>
  );
}
