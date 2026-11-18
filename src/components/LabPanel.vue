<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import type { LessonIndex } from "../chapters";
import { GRID_GAP_REM, MIN_CARD_REM, ROOT_FONT_SIZE_PX, getActiveColumns, getMinWidthForColumnsPx, prints } from "../gridLab";

const props = defineProps<{ index: LessonIndex }>();
const titles = [
  "Mesa de viewport",
  "Régua tipográfica",
  "Bancada de Grid",
  "Janela de recorte e estabilidade",
  "Identidade na lista",
];
const wide = ref(props.index === 2 ? 480 : 640);
const frame = ref<HTMLElement>();
const available = ref(1);
let observer: ResizeObserver | undefined;
onMounted(() => {
  if (frame.value) {
    observer = new ResizeObserver(([entry]) => {
      if (entry) available.value = entry.contentRect.width;
    });
    observer.observe(frame.value);
  }
});
const preview = ref<HTMLIFrameElement>();
const previewHeight = ref(280);
// auto-fit recolhe as trilhas sem gravura.
const columns = computed(() => Math.min(prints.length, getActiveColumns(wide.value)));
let previewObserver: ResizeObserver | undefined;
function observePreview() {
  previewObserver?.disconnect();
  const grid = preview.value?.contentDocument?.querySelector("main");
  if (!grid) return;
  previewObserver = new ResizeObserver(() => {
    previewHeight.value = Math.ceil(grid.getBoundingClientRect().height);
  });
  previewObserver.observe(grid);
}
onBeforeUnmount(() => {
  observer?.disconnect();
  previewObserver?.disconnect();
  window.clearTimeout(imageTimer);
});
const scale = computed(() => Math.min(1, available.value / wide.value));
const base = ref(16);
const fit = ref<"cover" | "contain" | "fill">("cover");
const ratio = ref("4 / 1");
const reserveSpace = ref(true);
const loadingImage = ref(false);
let imageTimer: number | undefined;
function replayImage() {
  window.clearTimeout(imageTimer);
  loadingImage.value = true;
  imageTimer = window.setTimeout(() => { loadingImage.value = false; }, 1200);
}

const originalAnimals = [
  { id: 1, name: "Arara" },
  { id: 2, name: "Onça" },
  { id: 3, name: "Tatu" },
];
const animals = ref([...originalAnimals]);
const round = ref(0);
function reset() {
  animals.value = [...originalAnimals];
  round.value++;
}

const layout = props.index === 2
  ? `grid-template-columns:repeat(auto-fit,minmax(${MIN_CARD_REM}rem,1fr));gap:${GRID_GAP_REM}rem;`
  : "grid-template-columns:1fr;gap:0.5rem;";
const demo =
  '<!doctype html><html lang="pt-BR"><meta name="viewport" content="width=device-width, initial-scale=1"><style>*{box-sizing:border-box}html{overflow:hidden;font-size:' + ROOT_FONT_SIZE_PX + 'px}body{margin:0;font:14px monospace;color:#e5e5e5}main{display:grid;' +
  layout +
  "}article{padding:10px;background:#262729;border:1px solid #54565a}b{display:block;margin-top:5px}.art{height:45px;background:repeating-linear-gradient(135deg,#c7c8ca 0 12px,#55575a 12px 23px)}article:nth-child(2) .art{background:radial-gradient(circle at 50% 100%,#d6d6d6 0 24%,#8f9194 25% 44%,#434447 45%)}article:nth-child(3) .art{background:repeating-radial-gradient(circle at 100% 100%,#484a4c 0 10px,#b1b2b4 11px 20px)}" +
  (props.index === 0
    ? "@media(min-width:600px){main{grid-template-columns:repeat(3,1fr)}}"
    : "") +
  "</style><main>" +
  prints
    .map(
      (s, i) =>
        '<article><div class="art"></div><b>0' +
        (i + 1) +
        " / " +
        s +
        "</b></article>",
    )
    .join("") +
  "</main></html>";
</script>
<template>
  <section class="lab">
    <div class="labhead">
      <b class="eyebrow">Experimento 0{{ index + 1 }}</b
      ><span aria-hidden="true">⌖</span>
    </div>
    <h2>{{ titles[index] }}</h2>
    <template v-if="index === 0 || index === 2"
      ><p>
        {{
          index === 0
            ? "Mova a régua. A vitrine troca de composição quando a janela interna chega a 600 px."
            : `Aumente a bancada e observe quando cabe mais uma peça. Cada peça exige ${getMinWidthForColumnsPx(1)} px e cada intervalo mede ${GRID_GAP_REM * ROOT_FONT_SIZE_PX} px.`
        }}
      </p>
      <div class="board">
        <div ref="frame" class="frame">
          <div :style="{ height: previewHeight * scale + 'px' }">
            <iframe
              ref="preview"
              @load="observePreview"
              title="Vitrine de três gravuras em escala"
              :srcdoc="demo"
              :style="{
                width: wide + 'px',
                height: previewHeight + 'px',
                transform: 'scale(' + scale + ')',
              }"
              tabindex="-1"
            />
          </div>
        </div>
      </div>
      <div class="control">
        <label :for="'r' + index">Largura simulada</label
        ><output :for="'r' + index">{{ wide }} px<span v-if="index === 2"> · {{ columns }} {{ columns === 1 ? "coluna" : "colunas" }}</span></output>
      </div>
      <input
        :id="'r' + index"
        type="range"
        min="240"
        max="960"
        step="1"
        v-model.number="wide"
      /><small>240 px <span class="right">960 px</span></small></template
    >
    <template v-else-if="index === 1"
      ><p>
        Simule a fonte raiz do navegador e compare duas letras com a mesma
        medida inicial.
      </p>
      <div class="samples">
        <div>
          <small>24 px</small><strong style="font-size: 24px">Aa</strong>
        </div>
        <div>
          <small>1,5 rem</small
          ><strong :style="{ fontSize: base * 1.5 + 'px' }">Aa</strong>
        </div>
      </div>
      <div class="control">
        <label for="root">Fonte raiz simulada</label
        ><output>{{ base }} px</output>
      </div>
      <input id="root" type="range" min="12" max="32" v-model.number="base" />
      <p>1,5 × {{ base }} = {{ base * 1.5 }} px</p></template
    >
    <template v-else-if="index === 3">
      <p>Escolha a moldura e o encaixe. Observe as marcas TOPO e BASE para descobrir o que foi cortado ou esticado.</p>
      <div class="actions">
        <label>Encaixe
          <select v-model="fit">
            <option>cover</option><option>contain</option><option>fill</option>
          </select>
        </label>
        <label>Proporção da moldura
          <select v-model="ratio">
            <option value="4 / 1">Panorâmica (4:1)</option>
            <option value="3 / 2">Original (3:2)</option>
            <option value="1 / 1">Quadrada (1:1)</option>
          </select>
        </label>
      </div>
      <div class="actions">
        <label><input type="checkbox" v-model="reserveSpace" /> Reservar espaço antes da imagem</label>
        <button type="button" @click="replayImage">Simular carregamento</button>
      </div>
      <p role="status">{{ loadingImage ? "Aguardando a imagem…" : "Imagem disponível." }}</p>
      <figure class="poster">
        <div :style="{ aspectRatio: reserveSpace || !loadingImage ? ratio : undefined }">
          <img
            v-if="!loadingImage"
            src="../assets/cartaz.png"
            srcset="../assets/cartaz-menor.png 360w, ../assets/cartaz.png 720w"
            sizes="(min-width: 48rem) 40rem, 90vw"
            :width="reserveSpace ? 720 : undefined"
            :height="reserveSpace ? 480 : undefined"
            alt="Cartaz geométrico com inscrições TOPO e BASE"
            :style="{ objectFit: fit }"
          />
        </div>
        <figcaption>Observe esta legenda enquanto o cartaz carrega. Com espaço reservado, ela permanece no lugar.</figcaption>
      </figure>
    </template>
    <template v-else>
      <p>Digite “azul” para a Onça nas duas listas. Remova o primeiro animal e veja quem fica com a cor em cada lista.</p>
      <div class="animal-lists" :key="round">
        <fieldset>
          <legend>Chave por índice</legend>
          <!-- A chave por posição reproduz a troca de fichas neste experimento. -->
          <label v-for="(animal, i) in animals" :key="i" class="animal">
            {{ animal.name }}<input type="text" placeholder="Cor da ficha" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Chave por ID</legend>
          <label v-for="animal in animals" :key="animal.id" class="animal">
            {{ animal.name }}<input type="text" placeholder="Cor da ficha" />
          </label>
        </fieldset>
      </div>
      <div class="actions">
        <button type="button" :disabled="!animals.length" @click="animals.shift()">Remover 1º Animal</button>
        <button type="button" @click="reset">Reiniciar</button>
      </div>
    </template>
  </section>
</template>
