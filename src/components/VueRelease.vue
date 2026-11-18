<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps<{ repository: string }>();
const emit = defineEmits<{
  "release-loaded": [version: string];
}>();

const version = ref("");
const error = ref(false);
async function load() {
  error.value = false;
  try {
    const response = await fetch(
      `https://api.github.com/repos/${props.repository}/releases/latest`,
      { signal: AbortSignal.timeout(6000) },
    );
    if (!response.ok) throw new Error();
    const { tag_name } = await response.json();
    if (typeof tag_name !== "string" || !tag_name) throw new Error();
    version.value = tag_name;
    emit("release-loaded", tag_name);
  } catch {
    error.value = true;
  }
}
onMounted(load);
</script>
<template>
  <aside class="release">
    <b>Vue no GitHub</b>
    <p v-if="version">Versão estável publicada · {{ version }}</p>
    <p v-else-if="error">
      Consulta indisponível. <button @click="load">Tentar novamente</button>
    </p>
    <p v-else>Consultando a versão…</p>
  </aside>
</template>
