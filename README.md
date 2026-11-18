# Escala · Guia de responsividade

[Abrir o guia no Netlify](https://projetorespon.netlify.app/)

Guia interativo sobre como adaptar interfaces ao tamanho da tela. Cada capítulo reúne um laboratório, explicação, código comentado, pergunta-guia respondida e referências.

## Rodar no computador

Com Node.js 24.12 ou superior, execute na raiz do projeto:

```sh
npm install
npm run dev
```

Abra o endereço local exibido pelo Vite. Para testar a versão de produção, execute `npm run build` e `npm run preview`. Para testar no celular pela mesma rede Wi-Fi, use `npm run dev -- --host` e abra o endereço Network exibido pelo Vite.

## Laboratórios para a apresentação

| Seção e rota | O que fazer | O que observar |
|---|---|---|
| Viewport · `/viewport` | Mover a régua de 599 para 600 px | A vitrine interna passa de uma coluna para três pela media query. |
| Unidades CSS · `/unidades` | Mudar a raiz de 16 para 20 px | A amostra de 1,5rem passa de 24 para 30 px. |
| Flexbox e Grid · `/layout` | Comparar 463 e 464 px | A segunda coluna cabe quando há espaço para duas peças e um intervalo. Use as setas do teclado para ajustar 1 px. |
| Imagens · `/imagens` | Alternar `cover`, `contain` e `fill`, trocar a proporção e simular o carregamento | As marcas TOPO e BASE revelam o recorte ou a distorção. A legenda muda de posição durante a simulação quando a reserva de espaço está desligada. |
| Boas práticas Vue · `/boas-praticas` | Digitar na segunda ficha e remover a primeira | Comparar o vínculo do campo com chave por posição e com chave estável. |
| Desafio · `/desafio` | Investigar a primeira largura com três colunas | Digitar uma hipótese e conferir o resultado. |

## Organização

A interface usa Vue 3 com Composition API e `<script setup lang="ts">`. O Vite compila o projeto. Em `src/router/index.ts`, o Vue Router declara cada rota e carrega a view sob demanda com `() => import(...)`. A navegação por hash permite abrir um capítulo diretamente, por exemplo, `/#/layout`.

- **Conteúdo.** A store Pinia `useGuideStore`, em `src/stores/guide.ts`, carrega as cinco lições de `public/api/licoes.json`. A `ChapterView.vue` apresenta a explicação, o código comentado, a pergunta-guia e as fontes. Em Boas práticas Vue, `VueRelease.vue` consulta a API pública do GitHub e emite a versão encontrada. A página inclui as notas da versão entre as fontes quando a consulta funciona.
- **Laboratórios.** `src/components/LabPanel.vue` monta o experimento de cada seção. A bancada e o desafio usam `src/gridLab.ts` para calcular quantas colunas cabem e qual largura elas exigem. Com raiz de 16 px, mínimo de 14 rem e intervalo de 1 rem, duas gravuras ocupam 464 px e três ocupam 704 px.
- **Estilos.** `src/style.css` usa CSS mobile-first. Cores, espaçamentos, tamanhos de fonte e raios são design tokens em `:root`. O menu abre por botão no celular e fica visível a partir de 48 rem.

O projeto usa caminhos relativos para funcionar também no subdiretório do GitHub Pages. A identidade visual segue a skill [visual-design-foundations](https://github.com/miguelsenai2024/Minhas-Skills/blob/main/Design%20e%20UX/GitHub-wshobson--agents/visual-design-foundations/SKILL.md).

## Publicar no GitHub Pages

1. Abra **Settings → Pages** e selecione **GitHub Actions** como origem. Em repositório privado, a disponibilidade depende do plano da conta.
2. Na aba **Actions**, escolha **Publicar guia no GitHub Pages → Run workflow**, selecione `main` e confirme.
3. Quando a execução terminar, abra o endereço do ambiente **github-pages**.
4. Abra esse endereço no celular da dupla e faça uma captura com o laboratório visível. Cada integrante entrega os dois links e a captura.

Para publicar uma alteração, execute o mesmo workflow novamente.
