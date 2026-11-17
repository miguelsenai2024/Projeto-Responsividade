# Escala · Guia de responsividade

Guia interativo de Vue 3 criado com `npm create vue@latest`, Vite, TypeScript, Vue Router e Pinia. Cada capítulo reúne um laboratório, explicação, código comentado, pergunta-guia respondida e referências.

## Rodar no computador

Com Node.js 24.12 ou superior, execute `npm ci` e `npm run dev`. Para testar a versão de produção, execute `npm run build` e `npm run preview`. Para testar no celular pela mesma rede Wi-Fi, use `npm run dev -- --host` e abra o endereço Network exibido pelo Vite.

## Laboratórios para a apresentação

| Tela | O que fazer | O que observar |
|---|---|---|
| Viewport | Mover a régua de 599 para 600 px | A vitrine interna passa de uma coluna para três pela media query. |
| Unidades CSS | Mudar a raiz de 16 para 20 px | A amostra de 1,5rem passa de 24 para 30 px. |
| Flexbox e Grid | Comparar 463 e 464 px | A segunda coluna cabe quando há espaço para duas peças e um intervalo. Use as setas do teclado para ajustar 1 px. |
| Imagens | Alternar cover e contain | As marcas TOPO e BASE mostram o que o recorte esconde. |
| Boas práticas Vue | Digitar na segunda ficha e remover a primeira | Comparar o vínculo do campo com chave por posição e com chave estável. |
| Desafio | Investigar a primeira largura com três colunas | Digitar uma hipótese e conferir o resultado. |

## Organização

As páginas ficam em `src/views`, os experimentos em `src/components` e a navegação em `src/router`. O Pinia armazena as lições obtidas por HTTP de `public/api/licoes.json`. A seção Vue também consulta a API pública do GitHub para exibir a última versão publicada do framework. Se essa consulta falhar, o laboratório continua disponível.

O projeto usa CSS mobile-first, navegação por hash e caminhos relativos para funcionar no subdiretório do GitHub Pages. A identidade visual segue a skill [visual-design-foundations](https://github.com/miguelsenai2024/Minhas-Skills/blob/main/Design%20e%20UX/GitHub-wshobson--agents/visual-design-foundations/SKILL.md).

## Publicar no GitHub Pages

1. Abra **Settings → Pages** e selecione **GitHub Actions** como origem. Em repositório privado, a disponibilidade depende do plano da conta.
2. Na aba **Actions**, escolha **Publicar guia no GitHub Pages → Run workflow**, selecione `main` e confirme.
3. Quando a execução terminar, abra o endereço do ambiente **github-pages**. Esse é o link do site para entregar.
4. Abra esse endereço no celular da dupla e faça uma captura com o laboratório visível. Cada integrante entrega os dois links e a captura.

Para publicar uma alteração, execute o mesmo workflow novamente.
