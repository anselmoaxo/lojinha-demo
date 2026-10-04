# Lojinha demo (Doce Encanto)

Modelo de loja pequena sem servidor e sem banco de dados: catálogo, carrinho e pedido enviado pelo WhatsApp.
Os produtos são fictícios. É a vitrine para mostrar a clientes.

- **Site:** Next.js com export estático, publicado no GitHub Pages pelo workflow "Deploy GitHub Pages".
- **Produtos e textos:** `src/content/products.json` e `src/content/store.json`, editáveis pelo painel em `/admin/` (Decap CMS + DecapBridge).
- **Carrinho:** fica no navegador do cliente. "Enviar pedido" abre o WhatsApp da loja com itens, total, entrega ou retirada, pagamento e observações.
- **Estatísticas (opcional):** Umami, eventos "Adicionou ao carrinho", "Enviou pedido" e "Clique no WhatsApp". Coloque o Website ID em `src/config/analytics.ts`.

## Colocar no ar
1. Settings → Pages → Source: **GitHub Actions**.
2. Cada push na `main` publica o site. Endereço atual: https://loja-demo.anselmotech.com.br. Sem domínio próprio, o endereço seria `https://<usuario>.github.io/<repositorio>/`; o prefixo é aplicado sozinho.
3. Painel: crie o site no DecapBridge apontando para este repositório e troque `SITE_ID` em `public/admin/config.yml`.

## Adaptar para um cliente
- Nome, contato, WhatsApp, entrega, pagamento e categorias: `src/content/store.json` (ou pelo painel).
- Produtos: `src/content/products.json` (ou pelo painel). Fotos em `public/images/`.
- Cores: `src/app/globals.css` (`--color-*`). Ícone: `src/app/icon.svg`. Imagem de compartilhamento: `public/og-image.png`.
- Para aparecer no Google, mude `NEXT_PUBLIC_SITE_INDEXABLE` para `"true"` em `.github/workflows/deploy-pages.yml`.

## Verificar
```
npm ci
npm test && npm run lint && npm run typecheck && npm run build && node scripts/check-runtime.mjs
```
