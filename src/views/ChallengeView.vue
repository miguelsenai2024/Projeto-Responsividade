<script setup lang="ts">
import { ref } from "vue";
import { gridLab, minimumGridWidth } from "../gridLab";
import { useGuide } from "../stores/guide";

const guide = useGuide();
const value = ref<number>();
const message = ref("");
const pieces = gridLab.prints.length;
const gaps = pieces - 1;
const target = minimumGridWidth(pieces);

function clearFeedback() {
  message.value = "";
  guide.solved = false;
}

function check() {
  guide.solved = value.value === target;
  if (guide.solved) {
    const totalRem = target / gridLab.rootPx;
    message.value = `Correto! ${pieces} × ${gridLab.columnRem}rem + ${gaps} × ${gridLab.gapRem}rem = ${totalRem}rem. Com a raiz de ${gridLab.rootPx}px, são ${target}px.`;
  } else if (Number(value.value) < target) {
    message.value = "Ainda falta espaço. Aumente a régua até a última gravura entrar na primeira linha.";
  } else {
    message.value = "As gravuras já cabem nessa largura. Diminua a régua de 1 em 1px para encontrar a primeira largura que funciona.";
  }
}
</script>

<template>
  <b class="eyebrow ink">Caderno 06 / Desafio</b>
  <h1>Desafio de Grid</h1>
  <p class="lead">
    Na Bancada de Grid, a partir de quantos pixels de largura do contêiner a
    gravura {{ gridLab.prints[2] }} entra na primeira linha, ao lado de
    {{ gridLab.prints[0] }} e {{ gridLab.prints[1] }}?
  </p>
  <RouterLink class="next" to="/layout">Investigar no laboratório de Grid →</RouterLink>
  <form class="sheet" @submit.prevent="check">
    <label for="answer">Largura do contêiner em pixels</label>
    <input id="answer" v-model.number="value" type="number" inputmode="numeric"
      required min="1" step="1" @input="clearFeedback" />
    <button type="submit">Conferir resposta</button>
    <p role="status">{{ message }}</p>
  </form>
</template>
