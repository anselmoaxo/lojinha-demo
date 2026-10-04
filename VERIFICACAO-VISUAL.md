# Revisão da loja — 04/10/2026

## Estrutura analisada

- Next.js 16, React 19, TypeScript, Tailwind CSS 4; fontes Figtree e Shrikhand locais.
- Exportação estática, com suporte a prefixo de caminho para GitHub Pages.
- Páginas: início, `/produtos/`, `/politica-de-privacidade/` e página não encontrada.
- Catálogo e configurações em JSON, editáveis pelo Decap CMS em `/admin/`.
- Componentes de cabeçalho, categorias, vitrine, destaque, contato, carrinho e links de WhatsApp.
- Dez produtos, cinco categorias, três destaques e uma cesta indisponível.
- Carrinho persistido no navegador; opções, quantidade, entrega/retirada, pagamento e observações; envio como mensagem pronta do WhatsApp.

## Alterações

Paleta creme, rosa e cacau, capa fotográfica, moldura suave, cartões com fotos maiores, botões consistentes e categorias com navegação direta. Menu acessível no celular, estados ilustrativo/indisponível, fallback de imagem, carrinho vazio e foco contido no diálogo com retorno ao fechar. Conteúdo de destaque usa o cadastro `featured`, sem alegar vendas.

As regras e cálculos continuam em `src/lib/order.ts`, com dados atuais resolvidos pelo `CartProvider`. Esta demo não possui API de pedidos nem banco; ela prepara uma mensagem e a confirmação continua pelo WhatsApp. Nenhuma camada inexistente foi adicionada. Rotas, integrações, regras, preços, opções e número configurado foram preservados.

O script de preparação do Decap CMS recebeu ajustes de compatibilidade com Windows: execução da CLI do npm pelo Node e extração do tarball com caminho relativo. A versão e a verificação criptográfica foram preservadas.

## Verificações realizadas

- `npm run lint`: sem erros ou avisos.
- `npm run typecheck`: passou.
- `npm test`: 10 testes existentes passaram, cobrindo catálogo, links, destaque, valores em centavos, quantidades, pedido mínimo, mensagem, retirada e URL do WhatsApp.
- `npm run build`: exportação de produção concluída.
- `node scripts/verify-local.mjs`: início, cardápio, privacidade, painel e seus arquivos locais, metadados, sitemap, robots e imagem social passaram.
- Navegador na versão de produção: telas de 320, 390, 768 e 1440 pixels; cartões, capa, categorias, privacidade e página não encontrada conferidos. Nenhuma rolagem horizontal da página nas larguras verificadas; categorias têm rolagem interna no celular.
- Carrinho: inclusão, opção “Caixa com 24”, quantidade, totais, taxa de entrega, retirada grátis, persistência após recarregar, esvaziar, estado vazio, Escape e ciclo de foco por teclado.
- Formulário: mensagens de nome/endereço obrigatórios e pedido mínimo de R$ 30,00 verificadas no navegador.
- Nenhuma imagem quebrada detectada nas páginas inspecionadas. Nenhum erro/aviso de console observado durante os fluxos do carrinho.
- A mensagem do pedido foi validada pelos testes automatizados. Não foi enviado pedido real nem mensagem para o número configurado.

## Pendências de conteúdo

As fontes, licenças e os seis produtos que ainda precisam de fotos próprias/licenciadas estão em [IMAGENS.md](IMAGENS.md). A foto de brigadeiro já fornecida permanece preservada; a licença original precisa ser confirmada pelo responsável para uso real. A loja continua sendo uma demonstração com os dados fictícios previamente cadastrados.
