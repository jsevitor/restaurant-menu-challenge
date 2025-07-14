# QikServe Frontend Challenge - Restaurante Burgers

Este projeto é uma solução para o desafio técnico proposto pela [QikServe](https://github.com/qsengineers/frontend-challenge?tab=readme-ov-file), com o objetivo de criar uma aplicação de visualização de cardápio e gerenciamento de pedidos para um restaurante fictício.

O foco do desafio era simular uma experiência de pedidos online realista e personalizável — adaptável a diferentes restaurantes a partir de uma API pública.

Durante o desenvolvimento, fui além do escopo inicial para entregar uma experiência mais fluida, modular e responsiva. Aproveitei ferramentas como React (Next.js), Zustand, Tailwind CSS e uma API dinâmica para construir uma interface baseada em dados, com personalização visual, navegação mobile-friendly e gerenciamento de estado leve.

Foi uma ótima oportunidade para aplicar boas práticas de arquitetura frontend e reforçar meu domínio sobre temas como componentes reativos, design baseado em dados e performance em aplicações modernas.

## Preview

Acesse o projeto em: https://restaurant-menu-challenge.vercel.app/

## Screenshots

<img width="1907" height="918" alt="image" src="https://github.com/user-attachments/assets/7dc1713b-2efd-469e-ac22-10d2fbe97971" />
<img width="1920" height="914" alt="image" src="https://github.com/user-attachments/assets/c2d4e703-8567-44f1-887e-9473f64cce87" />
<img width="1908" height="915" alt="image" src="https://github.com/user-attachments/assets/b83d1ac0-d4f3-4046-bf0a-912d308e3b97" />

## Funcionalidades

- Visualização dinâmica do cardápio com seções (ex: Burgers, Drinks, Desserts)
- Modal para exibir e personalizar detalhes de cada item
- Adição e remoção de itens no carrinho com suporte a modificadores
- Total do pedido atualizado automaticamente
- Tema dinâmico com base no restaurante (cores, imagens, etc)
- Layout responsivo (mobile e desktop)
- Busca em tempo real de itens do menu
- Menu mobile com navegação entre seções e carrinho

## Tecnologias e Ferramentas

| Stack               | Descrição                                                                          |
| ------------------- | ---------------------------------------------------------------------------------- |
| **Next.js**         | Framework React usado para SSR e estrutura de pastas                               |
| **React 19**        | Biblioteca base para componentes da UI                                             |
| **Zustand**         | Gerenciamento de estado simples e eficiente (carrinho e dados de restaurante/menu) |
| **TypeScript**      | Tipagem estática para maior robustez e autocompletar                               |
| **Tailwind CSS**    | Estilização rápida e responsiva                                                    |
| **React Modal**     | Componente de modal acessível para detalhes e carrinho                             |
| **Bootstrap Icons** | Ícones utilizados na UI                                                            |
| **ESLint**          | Linter para manter código limpo e padronizado                                      |

## Aprendizados

Durante esse projeto, aprofundei meu conhecimento em:

- Gerenciamento de estado com **Zustand**, garantindo simplicidade e performance.
- Criação de temas dinâmicos com **Tailwind CSS** usando dados externos.
- Arquitetura de componentes reutilizáveis e acessíveis com **React Modal**.
- Otimização de UX mobile-first e implementação de busca em tempo real.
- Consumo de APIs REST com tipagem robusta via TypeScript.
- Geração automatizada de documentação técnica com Typedoc.

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

## Documentação

A documentação completa do projeto foi gerada com [TypeDoc](https://typedoc.org/) e está disponível em:

🔗 [Documentação Técnica (GitHub Pages)](https://jsevitor.github.io/restaurant-menu-challenge/)

Ela inclui descrições de tipos, estruturas, funções e lógica central do projeto — útil para entendimento rápido da base de código.

## Endpoints da API

- Restaurante (configurações do tema, nome, etc):
  [https://cdn-dev.preoday.com/challenge/venue/9](https://cdn-dev.preoday.com/challenge/venue/9)

- Cardápio completo:
  [https://cdn-dev.preoday.com/challenge/menu](https://cdn-dev.preoday.com/challenge/menu)

## Customização por restaurante

A UI se adapta automaticamente com base nas propriedades retornadas pela API:

| Propriedade                           | Utilização      |
| ------------------------------------- | --------------- |
| venue.webSettings.bannerImage         | Banner superior |
| venue.webSettings.navBackgroundColour | Cor do header   |
| venue.webSettings.primaryColour       | Cor dos botões  |

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
