# QikServe Frontend Challenge - Restaurante Burgers

Este projeto é uma solução personalizada de um desafio técnico proposto pela [QikServe](https://github.com/qsengineers/frontend-challenge?tab=readme-ov-file), encontrado em uma oportunidade de emprego. A proposta consistia em desenvolver uma aplicação em React (Next.js) para visualização de cardápio e gerenciamento de carrinho de compras de um restaurante. Durante o desenvolvimento, foram aplicadas melhorias e personalizações além do escopo original, com o objetivo de entregar uma solução mais refinada, com melhor experiência de uso, responsividade e fidelidade ao conceito de personalização por restaurante (cores, imagens, layout e comportamento dinâmico definidos pela API).

## Preview

🚧 *Demo em construção*


## Screenshots

*Em breve*

## Funcionalidades

- Visualização dinâmica do cardápio com seções (ex: Burgers, Drinks, Desserts)
- Modal para exibir e personalizar detalhes de cada item
- Adição e remoção de itens no carrinho com suporte a modificadores
- Total do pedido atualizado automaticamente
- Tema dinâmico com base no restaurante (cores, imagens, etc)
- Layout responsivo (mobile e desktop)
- Busca em tempo real de itens do menu
- Menu mobile com navegação entre seções e carrinho

## 🧩 Tecnologias e Ferramentas

| Stack | Descrição |
|-------|-----------|
| **Next.js** | Framework React usado para SSR e estrutura de pastas |
| **React 19** | Biblioteca base para componentes da UI |
| **Zustand** | Gerenciamento de estado simples e eficiente (carrinho e dados de restaurante/menu) |
| **TypeScript** | Tipagem estática para maior robustez e autocompletar |
| **Tailwind CSS** | Estilização rápida e responsiva |
| **React Modal** | Componente de modal acessível para detalhes e carrinho |
| **Bootstrap Icons** | Ícones utilizados na UI |
| **ESLint** | Linter para manter código limpo e padronizado |

## Instalação

- Clone o repositório
  ```bash
  git clone https://github.com/seu-usuario/frontend-qikserve-challenge.git
  ```
- Instale as dependências
  ```bash
  npm install
  ```
- Rode localmente
  ```bash
  npm run dev
  ```
  
## Endpoints da API
- Restaurante (configurações do tema, nome, etc):
  [https://cdn-dev.preoday.com/challenge/venue/9](https://cdn-dev.preoday.com/challenge/venue/9)

- Cardápio completo:
[https://cdn-dev.preoday.com/challenge/menu](https://cdn-dev.preoday.com/challenge/menu)

## Customização por restaurante

A UI se adapta automaticamente com base nas propriedades retornadas pela API:

| Propriedade |	Utilização |
|-------|-----------|
| venue.webSettings.bannerImage |	Banner superior
| venue.webSettings.navBackgroundColour |	Cor do header
| venue.webSettings.primaryColour |	Cor dos botões

## Possibilidades de melhoria

- Persistência do carrinho com localStorage
- Integração com API de pedidos (checkout)
- Feedback visual com toast para ações do usuário
- Autenticação e rotas protegidas (login)

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto é apenas para fins de avaliação técnica.

## Contato

Caso queira entrar em contato, me encontre em:

- LinkedIn: [linkedin.com/in/josevitoroliveira](https://linkedin.com/in/josevitoroliveira)
- E-mail: [vitorjseo@gmail.com](mailto:vitorjseo@gmail.com)

---
Desenvolvido por **Vitor Oliveira**.
