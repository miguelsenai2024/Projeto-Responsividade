# Escala — Guia interativo de responsividade web

Projeto da disciplina de Frameworks Front-end. O guia usa exemplos de código e laboratórios interativos para demonstrar como uma interface se adapta a diferentes tamanhos de tela.

- [Site na Netlify](https://projetorespon.netlify.app)
- [Repositório no GitHub](https://github.com/miguelsenai2024/Projeto-Responsividade)

## Integrantes

- Miguel Oliveira de Almeida
- Davi Marcondes Paes de Souza

## Conteúdo

Os cinco cadernos incluem uma explicação, um laboratório interativo, código comentado, uma pergunta-guia respondida e referências. A sexta rota traz o desafio final.

| Caderno | Conteúdo |
| --- | --- |
| Viewport | Meta viewport e abordagem mobile-first. |
| Unidades CSS | Unidades absolutas e relativas, com uma régua tipográfica para comparar `px` e `rem`. |
| Flexbox e Grid | Alinhamento, distribuição de elementos e mudança no número de colunas conforme a largura do contêiner. |
| Imagens responsivas | Reserva de espaço para reduzir CLS, seleção de imagens com `srcset` e comparação entre `cover` e `contain`. O exemplo de código também mostra `loading="lazy"`. |
| Boas práticas em Vue | Organização de componentes, props e eventos tipados, chaves no `v-for`, carregamento de rotas sob demanda e Core Web Vitals. |
| Desafio | Descobrir a largura mínima para três gravuras caberem na mesma linha e conferir a resposta no guia. |

## Tecnologias

- **Vue 3 e TypeScript** para os componentes, com Composition API e `<script setup>`.
- **Vite** para desenvolvimento e build.
- **Vue Router** para navegação por hash e carregamento das páginas sob demanda.
- **Pinia** para guardar as lições e o estado do desafio.
- **Prism.js** para destacar a sintaxe dos exemplos de código.
- **CSS puro** com abordagem mobile-first, media queries com `min-width`, unidades `rem` e variáveis em `:root`.

O guia usa `fetch` para carregar as lições de um arquivo JSON do próprio projeto e consultar a API pública do GitHub para exibir a versão mais recente do Vue.

## Como rodar localmente

Use Node.js 22.18 ou superior na linha 22, ou Node.js 24.12 ou superior.

```bash
git clone https://github.com/miguelsenai2024/Projeto-Responsividade.git
cd Projeto-Responsividade
npm ci
npm run dev
```

Abra o endereço exibido no terminal, geralmente `http://localhost:5173`. Para gerar a versão de produção na pasta `dist`, execute `npm run build`.
