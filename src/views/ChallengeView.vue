<script setup lang="ts">
import { ref } from "vue";
import { GRID_GAP_REM, MIN_CARD_REM, ROOT_FONT_SIZE_PX, getMinWidthForColumnsPx, prints } from "../gridLab";
import { useGuideStore } from "../stores/guide";

const guide = useGuideStore();
const value = ref<number>();
const message = ref("");
const pieces = prints.length;
const gaps = pieces - 1;
const target = getMinWidthForColumnsPx(pieces);

function clearFeedback() {
  message.value = "";
  guide.solved = false;
}

function check() {
  guide.solved = value.value === target;
  if (guide.solved) {
    const totalRem = target / ROOT_FONT_SIZE_PX;
    message.value = `Correto! ${pieces} × ${MIN_CARD_REM}rem + ${gaps} × ${GRID_GAP_REM}rem = ${totalRem}rem. Com a raiz de ${ROOT_FONT_SIZE_PX}px, são ${target}px.`;
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
    gravura {{ prints[2] }} entra na primeira linha, ao lado de
    {{ prints[0] }} e {{ prints[1] }}?
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
