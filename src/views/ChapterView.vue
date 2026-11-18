<script setup lang="ts">
import Prism from "prismjs";
import { computed, ref } from "vue";
import { chapters, type LessonIndex } from "../chapters";
import { useGuideStore } from "../stores/guide";
import LabPanel from "../components/LabPanel.vue";
import VueRelease from "../components/VueRelease.vue";
const props = defineProps<{ index: LessonIndex }>();
const guide = useGuideStore();
const current = computed(() => chapters[props.index]!);
const lesson = computed(() => guide.lessons.find((item) => "/" + item.slug === current.value.path)
  ?? guide.lessons[props.index]);
const highlightedCode = computed(() => {
  if (!lesson.value) return "";
  const language = lesson.value.language === "CSS" ? "css" : "markup";
  return Prism.highlight(lesson.value.code, Prism.languages[language]!, language);
});
const vueRepository = "vuejs/core";
const releaseVersion = ref("");
const sources = computed(() => {
  const references = lesson.value?.sources ?? [];
  if (props.index !== 4 || !releaseVersion.value) return references;
  const tag = encodeURIComponent(releaseVersion.value);
  const release: [string, string] = [
    `Vue · Notas da versão ${releaseVersion.value}`,
    `https://github.com/${vueRepository}/releases/tag/${tag}`,
  ];
  return [...references, release];
});
</script>
<template>
  <div class="eyebrow ink">Caderno 0{{ index + 1 }} / {{ current.title }}</div>
  <h1>{{ current.headline }}</h1>
  <template v-if="lesson"
    ><p class="lead">{{ lesson.intro }}</p>
    <LabPanel :index="index" />
    <VueRelease
      v-if="index === 4"
      :repository="vueRepository"
      @release-loaded="releaseVersion = $event"
    />
    <section>
      <h2>Como funciona</h2>
      <ul>
        <li v-for="point in lesson.points" :key="point">{{ point }}</li>
      </ul>
    </section>
    <section>
      <div class="sectionhead">
        <h2>Código comentado</h2>
        <small>{{ lesson.language }}</small>
      </div>
      <pre><code v-html="highlightedCode"></code></pre>
    </section>
    <section class="answer">
      <b class="eyebrow">Pergunta-guia</b>
      <h2>{{ lesson.question }}</h2>
      <p v-for="paragraph in lesson.answer.split('\n')" :key="paragraph">{{ paragraph }}</p>
    </section>
    <section>
      <h2>Fontes consultadas</h2>
      <div class="sources">
        <a v-for="[name, url] in sources" :key="url" :href="url"
          >{{ name }} ↗</a
        >
      </div>
    </section>
    <RouterLink class="next" :to="chapters[index + 1]!.path"
      >Continuar · {{ chapters[index + 1]!.title }} →</RouterLink
    ></template
  >
  <p v-else-if="guide.error" role="alert">
    {{ guide.error }} <button @click="guide.load()">Tentar novamente</button>
  </p>
  <p v-else>Carregando a lição…</p>
</template>
