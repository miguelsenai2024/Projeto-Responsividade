# Escala. — Guia Interativo de Responsividade Web



Guia prático e interativo desenvolvido em Vue 3 para demonstrar, na prática, conceitos essenciais de design responsivo, unidades de medida, layouts flexíveis, imagens otimizadas e boas práticas de arquitetura front-end.



* **Acesse o projeto publicado:** https://projetorespon.netlify.app

* **Repositório no GitHub:** https://github.com/miguelsenai2024/Projeto-Responsividade



---



## Integrantes da Dupla



* **Miguel Oliveira De Almeida**

* **[Nome Completo do Integrante 2]**



---



## Estrutura do Guia (Cadernos)



O aplicativo está dividido em seis rotas independentes, cada uma contendo explicação acessível, experimento interativo, exemplo de código comentado, resposta à pergunta-guia e referências oficiais:



1. **Caderno 01 — Viewport:** Importância do design responsivo, funcionamento da tag `<meta name="viewport">` e abordagem mobile-first com o experimento *Mesa de viewport*.

2. **Caderno 02 — Unidades CSS:** Diferenças entre unidades absolutas e relativas (`px`, `rem`, `em`, `%`, `fr`, `vw`, `vh`, `dvh` e `ch`) com a *Régua tipográfica* interativa.

3. **Caderno 03 — Flexbox e Grid:** Layouts unidimensionais e bidimensionais, alinhamentos e grids fluidos com `repeat(auto-fit, minmax())` na *Bancada de Grid*.

4. **Caderno 04 — Imagens Responsivas:** Prevenção de deslocamento de layout (CLS), atributos `width` e `height`, `aspect-ratio`, `object-fit` (`cover` e `contain`), `loading="lazy"` e `srcset` na *Janela de recorte*.

5. **Caderno 05 — Boas Práticas em Vue:** Organização de pastas, props e eventos tipados, importância do atributo `:key` no `v-for` (*Identidade na lista*), design tokens em `:root`, carregamento de rotas sob demanda (lazy loading), gerenciamento de estado com Pinia, consumo de API e métricas Core Web Vitals (LCP, INP e CLS).

6. **Caderno 06 — Desafio:** Atividade prática final que exige o uso do laboratório de Grid para descobrir a largura exata de quebra de colunas.



---



## Tecnologias e Padrões Utilizados



* **Framework:** Vue 3 (Composition API + `<script setup>`)

* **Build Tool:** Vite

* **Roteamento:** Vue Router (com carregamento sob demanda / *lazy loading*)

* **Gerenciamento de Estado:** Pinia

* **Estilização:** CSS puro com arquitetura *Mobile-First* (`min-width`), unidades relativas em `rem` e variáveis globais (Design Tokens) em `:root`

* **Hospedagem:** Netlify



---



## Como Executar o Projeto Localmente



1. **Clone o repositório:**

   ```bash

   git clone https://github.com/miguelsenai2024/Projeto-Responsividade.git

   ```



2. **Acesse a pasta do projeto:**

   ```bash

   cd Projeto-Responsividade

   ```



3. **Instale as dependências:**

   ```bash

   npm install

   ```



4. **Inicie o servidor de desenvolvimento:**

   ```bash

   npm run dev

   ```



5. Abra no navegador o endereço local exibido no terminal (geralmente `http://localhost:5173`).



---

