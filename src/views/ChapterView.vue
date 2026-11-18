<script setup lang="ts">
import { computed } from "vue";
import { chapters } from "../chapters";
import { useGuide } from "../stores/guide";
import LabPanel from "../components/LabPanel.vue";
import VueRelease from "../components/VueRelease.vue";
const props = defineProps<{ index: number }>();
const guide = useGuide();
const current = computed(() => chapters[props.index]!);
const lesson = computed(() => guide.lessons.find((item) => "/" + item.slug === current.value.path)
  ?? guide.lessons[props.index]);
</script>
<template>
  <div class="eyebrow ink">Caderno 0{{ index + 1 }} / {{ current.title }}</div>
  <h1>{{ current.headline }}</h1>
  <template v-if="lesson"
    ><p class="lead">{{ lesson.intro }}</p>
    <LabPanel :index="index" />
    <VueRelease v-if="index === 4" />
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
      <pre><code>{{ lesson.code }}</code></pre>
    </section>
    <section class="answer">
      <b class="eyebrow">Pergunta-guia</b>
      <h2>{{ lesson.question }}</h2>
      <p v-for="paragraph in lesson.answer.split('\n')" :key="paragraph">{{ paragraph }}</p>
    </section>
    <section>
      <h2>Fontes consultadas</h2>
      <div class="sources">
        <a v-for="[name, url] in lesson.sources" :key="url" :href="url"
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
