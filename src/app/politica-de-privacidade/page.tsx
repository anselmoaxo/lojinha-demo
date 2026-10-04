import type { Metadata } from "next";
import { siteUrl } from "@/config/site";
import { store } from "@/content";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${store.name} trata os dados de quem visita o site e faz pedidos.`,
  alternates: { canonical: siteUrl("/politica-de-privacidade/") },
};

export default function PrivacyPage() {
  return (
    <section className="shell prose-text py-12">
      <h1 className="type-title">Política de privacidade</h1>
      <h2>1. Pedidos</h2>
      <p>O carrinho fica salvo só no seu navegador. Quando você clica em &quot;Enviar pedido pelo WhatsApp&quot;, o WhatsApp abre com uma mensagem pronta contendo os produtos, seu nome, a forma de pagamento e, se escolher entrega, o endereço. Nada é enviado até você mandar essa mensagem.</p>
      <h2>2. O que guardamos</h2>
      <p>Usamos os dados da conversa apenas para preparar e entregar o pedido. Não vendemos nem compartilhamos seus dados.</p>
      <h2>3. Estatísticas</h2>
      <p>Podemos usar o Umami para contar visitas e cliques de forma anônima, sem cookies e sem identificar você.</p>
      <h2>4. Contato</h2>
      <p>Para pedir a exclusão dos seus dados, escreva para {store.contact.email}.</p>
    </section>
  );
}
