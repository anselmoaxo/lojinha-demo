import productsContent from "./content/products.json" with { type: "json" };
import storeContent from "./content/store.json" with { type: "json" };

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  featured?: boolean;
  options?: string[];
};

export type Store = typeof storeContent;

export const store: Store = storeContent;
export const products = (productsContent.items as Product[]).map((product) => ({
  ...product,
  options: (product.options ?? []).filter(Boolean),
}));

export function productCategories(): string[] {
  const used = new Set(products.map((product) => product.category));
  return [...store.categories.filter((category) => used.has(category)), ...[...used].filter((category) => !store.categories.includes(category))];
}
