<script setup lang="ts">
import { ref } from "vue";
import { useGuide } from "../stores/guide";
const value = ref<number>();
const message = ref("");
const guide = useGuide();
function check() {
  guide.solved = value.value === 704;
  message.value = guide.solved
    ? "Correto! 3 × 224 + 2 × 16 = 704 px."
    : "Teste a largura no laboratório e conte os dois intervalos entre as três peças.";
}
</script>
<template>
  <b class="eyebrow ink">Caderno 06 / Desafio</b>
  <h1>Encontre a terceira coluna.</h1>
  <p class="lead">
    No laboratório de Grid, qual é a menor largura em que as três peças da
    primeira linha aparecem lado a lado?
  </p>
  <form class="sheet" @submit.prevent="check">
    <label for="answer">Largura do contêiner em pixels</label
    ><input
      id="answer"
      type="number"
      inputmode="numeric"
      required
      min="1"
      v-model="value"
      @input="
        message = '';
        guide.solved = false;
      "
    /><button>Conferir resposta</button>
    <p role="status">{{ message }}</p>
  </form>
  <RouterLink class="next" to="/layout"
    >← Investigar no laboratório de Grid</RouterLink
  >
</template>
