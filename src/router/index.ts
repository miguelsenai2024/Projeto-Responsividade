import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/viewport" },
    {
      path: "/viewport",
      name: "viewport",
      component: () => import("../views/ChapterView.vue"),
      props: { index: 0 },
    },
    {
      path: "/unidades",
      name: "unidades",
      component: () => import("../views/ChapterView.vue"),
      props: { index: 1 },
    },
    {
      path: "/layout",
      name: "layout",
      component: () => import("../views/ChapterView.vue"),
      props: { index: 2 },
    },
    {
      path: "/imagens",
      name: "imagens",
      component: () => import("../views/ChapterView.vue"),
      props: { index: 3 },
    },
    {
      path: "/boas-praticas",
      name: "boas-praticas",
      component: () => import("../views/ChapterView.vue"),
      props: { index: 4 },
    },
    { path: "/vue", redirect: "/boas-praticas" },
    {
      path: "/desafio",
      name: "desafio",
      component: () => import("../views/ChallengeView.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/viewport" },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
