import { ArrowRight, Clock, MapPin, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { siteUrl } from "@/config/site";
import { products, store } from "@/content";
import { asset } from "@/lib/asset";
import { formatBRL, toCents } from "@/lib/order";

const steps = [
  { icon: ShoppingBag, title: "Escolha", text: "Adicione os produtos ao carrinho." },
  { icon: Truck, title: "Entrega ou retirada", text: "Diga como quer receber e como vai pagar." },
  { icon: ArrowRight, title: "Envie", text: "O pedido chega pronto no nosso WhatsApp." },
];

export default function Home() {
  const featured = products.filter((product) => product.featured && product.available).slice(0, 6);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: store.name,
    description: store.description,
    url: siteUrl(),
    address: store.contact.address,
    openingHours: store.contact.hours,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="container-shell grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow text-brand-700">{store.hero.eyebrow}</p>
          <h1 className="display-title mt-4">{store.hero.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{store.hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/produtos/" className="button-primary">Ver cardápio <ArrowRight aria-hidden className="size-4" /></Link>
            <WhatsAppLink />
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(store.hero.image)} alt={store.hero.imageAlt} className="aspect-square w-full rounded-[2.5rem] object-cover shadow-xl" />
      </section>

      <section className="bg-soft py-14">
        <div className="container-shell grid gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-brand-700"><Icon aria-hidden className="size-5" /></span>
              <div>
                <p className="font-extrabold">{index + 1}. {title}</p>
                <p className="text-sm text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="container-shell py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title">Mais pedidos</h2>
            <Link href="/produtos/" className="button-quiet">Ver todos <ArrowRight aria-hidden className="size-4" /></Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      ) : null}

      <section className="container-shell grid gap-10 py-10 md:grid-cols-2" id="contato">
        <div>
          <h2 className="section-title">{store.about.title}</h2>
          <p className="mt-4 text-muted">{store.about.text}</p>
        </div>
        <div className="space-y-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
          <p className="flex gap-3"><MapPin aria-hidden className="size-5 shrink-0 text-brand-700" />{store.contact.address}</p>
          <p className="flex gap-3"><Clock aria-hidden className="size-5 shrink-0 text-brand-700" />{store.contact.hours}</p>
          <p className="flex gap-3"><Truck aria-hidden className="size-5 shrink-0 text-brand-700" />{store.orders.deliveryArea} Pedido mínimo de {formatBRL(toCents(store.orders.minimumOrder))}.</p>
          <WhatsAppLink className="button-whatsapp mt-2" />
        </div>
      </section>
    </>
  );
}
