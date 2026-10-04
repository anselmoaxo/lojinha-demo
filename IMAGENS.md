# Fotografias da loja demo

As imagens são fotografias de referência, não fotos de encomendas da Doce Encanto. Nenhuma imagem foi gerada por IA. Os nomes, preços, descrições, opções e disponibilidade do catálogo foram preservados.

| Arquivo em `public/images/photos` | Uso | Fotógrafo e fonte |
| --- | --- | --- |
| `bolo-chocolate*.webp` | Bolo de chocolate com morango, categoria Bolos e capa inicial | Phạm Thành Đạt — [Pexels 4403073](https://www.pexels.com/photo/chocolate-cake-with-strawberry-on-top-4403073/) |
| `bolo-cenoura*.webp` | Bolo de cenoura com cobertura de chocolate | Caio Niceas — [Pexels 37711037](https://www.pexels.com/photo/delicious-brazilian-carrot-cake-with-chocolate-drizzle-37711037/) |
| `brigadeiros*.webp` | Brigadeiros gourmet sortidos; referência visual de uma caixa com variedades, sem representar cada sabor descrito | Gustavo Peres — [Pexels 6441134](https://www.pexels.com/photo/6441134/) |
| `brigadeiro-tradicional*.webp` | Brigadeiro tradicional e categoria Brigadeiros | Foto já fornecida em `public/images/uploads/360_f_1894515411_7ydjf3nktx9itevksty3of7iarr5hyvu.jpg`; [origem configurada no catálogo](https://t3.ftcdn.net/jpg/18/94/51/54/360_F_1894515411_7yDjF3nktx9ItevKSty3oF7Iarr5hyVu.jpg) |

## Licença e preservação

As três novas fotografias usam a [licença Pexels](https://www.pexels.com/license/), que permite uso gratuito e edição. As páginas e os autores são registrados acima. Download em 04/10/2026. Não se presume que os fotógrafos endossem esta loja.

A foto previamente fornecida de brigadeiro foi mantida, copiada para versões otimizadas locais e deixou de depender da URL externa. O arquivo original permanece intacto. Não foi fornecido comprovante de licença dessa imagem de Adobe Stock: o responsável deve confirmar sua licença antes de publicar uma loja real.

Beijinho, bolo no pote, caixa presente, cesta, coxinhas e limonada mantêm as ilustrações existentes, identificadas como imagens ilustrativas. É necessário fornecer fotos próprias/licenciadas desses seis itens para completar a vitrine com fotografia fiel, especialmente dos kits com composição específica. Não foram adicionados cupcakes ou tortas, pois não existem no catálogo.

## Otimização e manutenção

- Fontes JPG locais; versões WebP em 480, 800 e 1400 pixels, proporção 4:3 e qualidade 80.
- `node scripts/prepare-photos.mjs` recria as versões com Sharp, já presente na instalação do Next.js. Não foi adicionada dependência.
- `ProductImage` usa `picture`, `srcset` e `sizes` nas fotos preparadas. A hospedagem é estática, sem servidor para otimização em tempo de execução.
- Imagens do painel continuam aceitando caminhos locais e URLs HTTPS, respeitando `NEXT_PUBLIC_BASE_PATH`.
- Capa com prioridade alta; demais fotos com carregamento sob demanda, área reservada, texto alternativo e mensagem de falha.
- O recorte não altera ingredientes nem inclui elementos gerados. A apresentação de cada encomenda pode variar, conforme aviso no rodapé.

## Conteúdo existente

História, endereço, horários, formas de pagamento, WhatsApp, taxa e pedido mínimo são os dados previamente cadastrados. O aviso de demonstração permanece visível. Revise esses dados fictícios antes de adaptar a demo para uma confeitaria real.
