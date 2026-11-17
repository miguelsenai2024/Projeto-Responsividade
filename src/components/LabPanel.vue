<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
const props = defineProps<{ index: number }>();
const titles = [
  "Mesa de viewport",
  "Régua tipográfica",
  "Bancada de Grid",
  "Janela de recorte",
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
onBeforeUnmount(() => observer?.disconnect());
const scale = computed(() => Math.min(1, available.value / wide.value));
const base = ref(16);
const fit = ref("cover");
const keyed = ref(false);
const animals = ref(["Arara", "Onça", "Tatu"]);
const round = ref(0);
function reset() {
  animals.value = ["Arara", "Onça", "Tatu"];
  round.value++;
}
const layout =
  props.index === 2
    ? "grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;"
    : "grid-template-columns:1fr;gap:8px;";
const demo =
  '<!doctype html><html lang="pt-BR"><meta name="viewport" content="width=device-width, initial-scale=1"><style>*{box-sizing:border-box}html{font-size:16px}body{margin:0;font:14px monospace;color:#17271c}main{display:grid;' +
  layout +
  "}article{padding:10px;background:#fbf7ea;border:1px solid #203f34}b{display:block;margin-top:5px}.art{height:45px;background:repeating-linear-gradient(135deg,#cce68b 0 12px,#214a40 12px 23px)}article:nth-child(2) .art{background:radial-gradient(circle at 50% 100%,#df784e 0 24%,#ffe7a8 25% 44%,#9ab4a4 45%)}article:nth-child(3) .art{background:repeating-radial-gradient(circle at 100% 100%,#1d5548 0 10px,#c3d7be 11px 20px)}" +
  (props.index === 0
    ? "@media(min-width:600px){main{grid-template-columns:repeat(3,1fr)}}"
    : "") +
  "</style><main>" +
  ["Diagonal", "Órbita", "Curva"]
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
            : "Aumente a bancada e observe quando cabe mais uma peça. Cada peça exige 224 px e cada intervalo mede 16 px."
        }}
      </p>
      <div class="board">
        <div ref="frame" class="frame">
          <div
            :style="{
              height:
                (index === 0 && wide < 600
                  ? 275
                  : index === 2 && wide < 464
                    ? 275
                    : index === 2 && wide < 704
                      ? 182
                      : 94) *
                  scale +
                'px',
            }"
          >
            <iframe
              title="Vitrine de três gravuras em escala"
              :srcdoc="demo"
              :style="{
                width: wide + 'px',
                height: '280px',
                transform: 'scale(' + scale + ')',
              }"
              tabindex="-1"
            />
          </div>
        </div>
      </div>
      <div class="control">
        <label :for="'r' + index">Largura simulada</label
        ><output>{{ wide }} px</output>
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
    <template v-else-if="index === 3"
      ><p>
        Compare o mesmo cartaz em uma moldura panorâmica. Observe as letras nas
        bordas.
      </p>
      <img
        src="../assets/cartaz.png"
        srcset="../assets/cartaz-menor.png 360w, ../assets/cartaz.png 720w"
        sizes="(min-width: 48rem) 40rem, 90vw"
        width="720"
        height="480"
        alt="Cartaz geométrico com inscrições TOPO e BASE"
        :style="{ objectFit: fit as 'cover' | 'contain' }"
      /><label for="fit">Modo de encaixe</label
      ><select id="fit" v-model="fit">
        <option>cover</option>
        <option>contain</option>
      </select>
      <p>
        {{
          fit === "cover"
            ? "A imagem preenche a janela e perde parte do topo e da base."
            : "A imagem inteira aparece e sobra espaço nas laterais."
        }}
      </p></template
    >
    <template v-else
      ><p>
        Digite uma cor para a Onça e remova a Arara. Repita com uma chave
        estável para comparar.
      </p>
      <label
        ><input type="checkbox" v-model="keyed" @change="reset" /> Usar o nome
        como chave</label
      >
      <div :key="round">
        <label
          v-for="(animal, i) in animals"
          :key="keyed ? animal : i"
          class="animal"
          >{{ animal }}<input placeholder="Cor da ficha"
        /></label>
      </div>
      <div class="actions">
        <button :disabled="animals.length < 3" @click="animals.shift()">
          Remover Arara</button
        ><button @click="reset">Reiniciar</button>
      </div></template
    >
  </section>
</template>
