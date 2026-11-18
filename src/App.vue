<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { chapters } from "./chapters";
import { useGuide } from "./stores/guide";
import "./style.css";
const menuOpen = ref(false);
function closeMenu() {
  menuOpen.value = false;
}
const route = useRoute();
const guide = useGuide();
guide.load();
watch(
  () => route.path,
  () => {
    closeMenu();
    const chapter = chapters.find((item) => item.path === route.path);
    document.title = (chapter?.title ?? "Guia") + " · Escala";
  },
  { immediate: true },
);
</script>
<template>
  <a
    class="skip"
    href="#conteudo"
    @click.prevent="($refs.main as HTMLElement).focus()"
    >Ir para o conteúdo</a
  >
  <header>
    <div class="mast">
      <RouterLink class="brand" to="/viewport" @click="closeMenu"
        ><i aria-hidden="true">▥</i> Escala<span>.</span></RouterLink
      ><span class="edition">Caderno de interfaces</span
      ><button
        type="button"
        class="menu"
        aria-controls="indice"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? "Fechar ×" : "Menu ☰" }}
      </button>
    </div>
  </header>
  <div class="shell">
    <nav id="indice" :class="{ open: menuOpen }" aria-label="Índice do guia">
      <b class="eyebrow">Neste guia</b
      ><RouterLink v-for="(c, i) in chapters" :key="c.path" :to="c.path" @click="closeMenu"
        ><small>0{{ i + 1 }}</small
        >{{ c.title }}</RouterLink
      >
    </nav>
    <main id="conteudo" tabindex="-1" ref="main">
      <RouterView :key="route.path" />
    </main>
  </div>
  <footer>Escala. <span>Guia de responsividade • Vue 3</span></footer>
</template>
