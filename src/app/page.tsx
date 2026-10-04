import Link from "next/link";
import { BoxHero } from "@/components/BoxHero";
import { CategoryTiles } from "@/components/CategoryTiles";
import { PromoBanner } from "@/components/PromoBanner";
import { MenuItem } from "@/components/MenuItem";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { siteUrl } from "@/config/site";
import { products, store } from "@/content";
import { formatBRL, toCents } from "@/lib/order";

const steps = [
  { title: "Escolha no cardápio", text: "Adicione o que quiser ao pedido." },
  { title: "Diga como quer receber", text: "Entrega ou retirada, e a forma de pagamento." },
  { title: "Envie pelo WhatsApp", text: "A mensagem vai pronta. A gente confirma o horário." },
];

export default function Home() {
  const featured = products.filter((product) => product.featured && product.available).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: store.name,
    description: store.description,
    url: siteUrl(),
    address: store.contact.address,
    openingHours: store.contact.hours,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="bg-seda">
        <div className="shell grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
          <div>
            <h1 className="type-hero">{store.hero.title}</h1>
            <p className="type-lead mt-6">{store.hero.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/produtos/" className="btn btn-cacau">Ver o cardápio</Link>
              <WhatsAppLink />
            </div>
          </div>
          <BoxHero />
        </div>
      </section>

      <section className="shell py-14" aria-labelledby="como-pedir">
        <h2 id="como-pedir" className="sr-only">Como pedir</h2>
        <ol className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="font-display text-4xl leading-none text-morango" aria-hidden>{index + 1}</span>
              <div>
                <p className="font-bold">{step.title}</p>
                <p className="text-cacau-soft">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CategoryTiles />

      {featured.length > 0 ? (
        <section className="shell py-10" aria-labelledby="mais-pedidos">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="mais-pedidos" className="type-title">Os mais pedidos</h2>
            <Link href="/produtos/" className="link">Ver o cardápio completo</Link>
          </div>
          <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8">
            {featured.map((product) => <MenuItem key={product.id} product={product} large />)}
          </div>
        </section>
      ) : null}

      <div className="mt-10"><PromoBanner /></div>

      <section id="onde" className="shell grid gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="type-section">{store.about.title}</h2>
          <p className="mt-4 max-w-[60ch] text-cacau-soft">{store.about.text}</p>
        </div>
        <div>
          <h2 className="type-section">Onde estamos</h2>
          <dl className="mt-4 space-y-3">
            <div><dt className="font-bold">Endereço</dt><dd className="text-cacau-soft">{store.contact.address}</dd></div>
            <div><dt className="font-bold">Horário</dt><dd className="text-cacau-soft">{store.contact.hours}</dd></div>
            {store.orders.delivery ? (
              <div><dt className="font-bold">Entrega</dt><dd className="text-cacau-soft">{store.orders.deliveryArea} Taxa de {formatBRL(toCents(store.orders.deliveryFee))}.</dd></div>
            ) : null}
            {store.orders.minimumOrder > 0 ? (
              <div><dt className="font-bold">Pedido mínimo</dt><dd className="text-cacau-soft">{formatBRL(toCents(store.orders.minimumOrder))}</dd></div>
            ) : null}
          </dl>
          <WhatsAppLink className="btn btn-whatsapp mt-6" />
        </div>
      </section>
    </>
  );
}
